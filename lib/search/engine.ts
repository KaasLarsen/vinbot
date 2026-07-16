import { FEEDS } from "@/lib/feeds/config";
import type { ProductHit, SearchResult } from "./types";
import { expandQuery, normalizeUrl, parsePriceFilter, productEligibleForWineSearch, proxyImg, score } from "./helpers";
import { getCachedFeedProducts } from "./fetch-feed";
import { brandTermsBeyondFormat, productIsBagInBox, productMatchesWineFormat, wineFormatIntentFromQuery } from "./wine-format";
import { productMatchesWineStyle, wineStyleIntentFromQuery } from "./wine-style";

const RESULT_CAP = 48;
const DIVERSIFY_PREFIX = 12;
const DIVERSIFY_MAX_PER_MERCHANT = 2;

function diversifyTopByMerchant(items: ProductHit[], prefixCount: number, maxPerMerchant: number): ProductHit[] {
  if (items.length <= 1) return items;
  const prefix = items.slice(0, Math.min(prefixCount, items.length));
  const rest = items.slice(prefix.length);

  const picked = new Set<number>();
  const counts = new Map<string, number>();
  const out: ProductHit[] = [];

  // Pass 1: pick in-order, respecting maxPerMerchant.
  for (let i = 0; i < prefix.length; i++) {
    const p = prefix[i];
    const m = p.merchant || "";
    const c = counts.get(m) ?? 0;
    if (c >= maxPerMerchant) continue;
    counts.set(m, c + 1);
    picked.add(i);
    out.push(p);
  }

  // Pass 2: if we couldn't fill the prefix, relax constraint (keep original ranking).
  if (out.length < prefix.length) {
    for (let i = 0; i < prefix.length; i++) {
      if (picked.has(i)) continue;
      out.push(prefix[i]);
      picked.add(i);
      if (out.length >= prefix.length) break;
    }
  }

  return [...out, ...rest];
}

export async function runSearch(qRaw: string, budgetMaxParam: number | null): Promise<SearchResult> {
  const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
  const priceMin = priceFilter.min;
  const priceMax = priceFilter.max;

  const terms = expandQuery(qRaw);
  const styleIntent = wineStyleIntentFromQuery(qRaw);
  const formatIntent = wineFormatIntentFromQuery(qRaw);
  let feeds_ok = 0;
  let feeds_failed = 0;

  const lists = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        let products = await getCachedFeedProducts(feed);

        if (priceMin != null || priceMax != null) {
          products = products.filter((p) => {
            if (p.price == null) return false;
            if (priceMin != null && p.price < priceMin) return false;
            if (priceMax != null && p.price > priceMax) return false;
            return true;
          });
        }

        if (!products.length) {
          feeds_ok++;
          return [];
        }

        const matches = products.filter((p) => {
          if (!productEligibleForWineSearch(p)) return false;
          if (styleIntent && !productMatchesWineStyle(p, styleIntent)) return false;
          if (formatIntent && !productMatchesWineFormat(p, formatIntent)) return false;
          if (formatIntent === "bag-in-box") {
            const brandTerms = brandTermsBeyondFormat(terms);
            const hay = p._search || "";
            if (brandTerms.length > 0) {
              return brandTerms.some((t) => hay.includes(t));
            }
            return terms.some((t) => hay.includes(t)) || productIsBagInBox(p);
          }
          return terms.some((t) => (p._search || "").includes(t));
        });

        if (!matches.length) {
          feeds_ok++;
          return [];
        }

        const withProxy: ProductHit[] = matches.map((p) => {
          const img = normalizeUrl(p.image, p.url);
          return img ? { ...p, image: proxyImg(img) } : { ...p, image: null };
        });

        feeds_ok++;
        return withProxy;
      } catch (err) {
        feeds_failed++;
        console.error(`[search] feed FAILED for ${feed.merchant}:`, err instanceof Error ? err.message : err);
        return [];
      }
    }),
  );

  let items = lists.flat();

  items = items.sort((a, b) => {
    const bibBoost = (p: ProductHit) =>
      formatIntent === "bag-in-box" && productIsBagInBox(p) ? 30 : 0;
    const sa = score(a, terms) + bibBoost(a);
    const sb = score(b, terms) + bibBoost(b);
    return sb - sa || (a.image ? 0 : 1) - (b.image ? 0 : 1) || (a.price ?? 9e9) - (b.price ?? 9e9);
  });

  items = diversifyTopByMerchant(items, DIVERSIFY_PREFIX, DIVERSIFY_MAX_PER_MERCHANT);

  const matched_before_cap = items.length;
  const results_capped = matched_before_cap > RESULT_CAP;
  items = items.slice(0, RESULT_CAP);

  const meta = {
    feeds_total: FEEDS.length,
    feeds_ok,
    feeds_failed,
    priceMin,
    priceMax,
    matched_before_cap,
    results_capped,
  };

  if (items.length) return { source: "feed", products: items, meta };
  return { source: "fallback", products: [], meta };
}
