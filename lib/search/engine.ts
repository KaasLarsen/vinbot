import { FEEDS } from "@/lib/feeds/config";
import type { ProductHit, SearchResult } from "./types";
import { expandQuery, normalizeUrl, parsePriceFilter, productEligibleForWineSearch, proxyImg, score } from "./helpers";
import { getCachedFeedProducts } from "./fetch-feed";
import { brandTermsBeyondFormat, productIsBagInBox, productMatchesWineFormat, wineFormatIntentFromQuery } from "./wine-format";
import { productMatchesWineStyle, wineStyleIntentFromQuery } from "./wine-style";

const RESULT_CAP = 48;
/** Antal top-resultater vi forsøger at diversificere (dækker 3/5 første visning + "Se flere"). */
const DIVERSIFY_PREFIX = 12;
/** Foretræk forskellige butikker i top; hæves kun hvis der ikke er nok butikker. */
const DIVERSIFY_PREFERRED_MAX_PER_MERCHANT = 1;
/** Hård grænse: undgå 3 fra samme butik når alternativer findes. */
const DIVERSIFY_ABSOLUTE_MAX_PER_MERCHANT = 2;

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

  // Pass 1: én pr. butik når muligt (bevarer score-rækkefølge ved at scanne hele listen).
  fill(DIVERSIFY_PREFERRED_MAX_PER_MERCHANT);
  // Pass 2: tillad én ekstra pr. butik før vi giver op på diversitet.
  if (out.length < target) fill(DIVERSIFY_ABSOLUTE_MAX_PER_MERCHANT);
  // Pass 3: kun når få butikker matcher — fyld resten i ren relevans-rækkefølge.
  if (out.length < target) fill(Number.POSITIVE_INFINITY);

  const rest = items.filter((_, i) => !picked.has(i));
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

  items = diversifyTopByMerchant(items, DIVERSIFY_PREFIX);

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
