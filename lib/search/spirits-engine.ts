import { unstable_cache } from "next/cache";

import { FEEDS } from "@/lib/feeds/config";
import { normalizeSearchArgs } from "@/lib/search/cache-key";
import type { ProductHit, SearchResult } from "./types";
import {
  expandSpiritsQuery,
  productIsSpiritLike,
  SPIRITS_MERCHANTS,
  spiritsSearchHayMatchesTerm,
} from "./spirits";
import { normalizeUrl, parsePriceFilter, proxyImg, score } from "./helpers";
import { withSearchFeedTimeout } from "./feed-timeout";
import { getCachedFeedProductsForSearch } from "./fetch-feed";

const RESULT_CAP = 48;
const DIVERSIFY_PREFIX = 12;
const DIVERSIFY_PREFERRED_MAX_PER_MERCHANT = 2;

const spiritsFeeds = FEEDS.filter((f) => SPIRITS_MERCHANTS.includes(f.merchant));
if (!spiritsFeeds.length) {
  throw new Error("Ingen spiritus-feeds i FEEDS-konfigurationen");
}

function diversifyTopByMerchant(items: ProductHit[], prefixCount: number): ProductHit[] {
  if (items.length <= 1) return items;
  const target = Math.min(prefixCount, items.length);
  const picked = new Set<number>();
  const counts = new Map<string, number>();
  const out: ProductHit[] = [];

  const fill = (maxPerMerchant: number) => {
    for (let i = 0; i < items.length && out.length < target; i++) {
      if (picked.has(i)) continue;
      const m = items[i].merchant || "";
      const countForMerchant = counts.get(m) ?? 0;
      if (countForMerchant >= maxPerMerchant) continue;
      counts.set(m, countForMerchant + 1);
      picked.add(i);
      out.push(items[i]);
    }
  };

  fill(DIVERSIFY_PREFERRED_MAX_PER_MERCHANT);
  if (out.length < target) fill(Number.POSITIVE_INFINITY);
  const rest = items.filter((_, i) => !picked.has(i));
  return [...out, ...rest];
}

async function runSpiritsSearchUncached(qRaw: string, budgetMaxParam: number | null): Promise<SearchResult> {
  const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
  const { min: priceMin, max: priceMax } = priceFilter;
  const terms = expandSpiritsQuery(qRaw);
  const query = (qRaw || "").trim();

  let feeds_ok = 0;
  let feeds_failed = 0;

  const lists = await Promise.all(
    spiritsFeeds.map(async (feed) => {
      try {
        const loaded = await withSearchFeedTimeout(getCachedFeedProductsForSearch(feed), []);
        if (!loaded.length) {
          feeds_failed++;
          return [] as ProductHit[];
        }
        let products = loaded.filter(productIsSpiritLike);

        if (priceMin != null || priceMax != null) {
          products = products.filter((p) => {
            if (p.price == null) return false;
            if (priceMin != null && p.price < priceMin) return false;
            if (priceMax != null && p.price > priceMax) return false;
            return true;
          });
        }

        const matches =
          query.length === 0
            ? products
            : products.filter((p) => terms.some((t) => spiritsSearchHayMatchesTerm(p._search || "", t)));

        feeds_ok++;
        return matches.map((p) => {
          const img = normalizeUrl(p.image, p.url);
          return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
        });
      } catch (err) {
        feeds_failed++;
        console.error(
          `[spirits-search] feed FAILED for ${feed.merchant}:`,
          err instanceof Error ? err.message : err,
        );
        return [] as ProductHit[];
      }
    }),
  );

  let items = lists.flat().sort((a, b) => {
    const sa = score(a, terms);
    const sb = score(b, terms);
    return sb - sa || (a.image ? 0 : 1) - (b.image ? 0 : 1) || (a.price ?? 9e9) - (b.price ?? 9e9);
  });

  items = diversifyTopByMerchant(items, DIVERSIFY_PREFIX);

  const matched_before_cap = items.length;
  const results_capped = matched_before_cap > RESULT_CAP;
  items = items.slice(0, RESULT_CAP);

  const meta = {
    feeds_total: spiritsFeeds.length,
    feeds_ok,
    feeds_failed,
    priceMin,
    priceMax,
    matched_before_cap,
    results_capped,
    merchant_browse: null,
    merchant_browse_tier: null,
  };

  if (items.length) return { source: "feed", products: items, meta };
  return {
    source: feeds_failed === spiritsFeeds.length && feeds_ok === 0 ? "error" : "fallback",
    products: [],
    meta,
  };
}

const cachedRunSpiritsSearch = unstable_cache(
  async (q: string, budgetMax: number | null) => runSpiritsSearchUncached(q, budgetMax),
  ["vinbot-spirits-search-v2-search-feed-cache"],
  { revalidate: 600, tags: ["vinbot-feeds"] },
);

/** Identiske spiritus-søgninger genbruges i 10 minutter. */
export async function runSpiritsSearch(qRaw: string, budgetMaxParam: number | null): Promise<SearchResult> {
  const normalized = normalizeSearchArgs(qRaw, null, budgetMaxParam);
  return cachedRunSpiritsSearch(normalized.q, normalized.budgetMax);
}
