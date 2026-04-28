import { FEEDS } from "@/lib/feeds/config";
import type { ProductHit, SearchResult } from "./types";
import { expandQuery, normalizeUrl, parsePriceFilter, productEligibleForWineSearch, proxyImg, score } from "./helpers";
import { getCachedFeedProducts } from "./fetch-feed";

export async function runSearch(qRaw: string, budgetMaxParam: number | null): Promise<SearchResult> {
  const priceFilter = parsePriceFilter(qRaw, budgetMaxParam);
  const priceMin = priceFilter.min;
  const priceMax = priceFilter.max;

  const terms = expandQuery(qRaw);
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

        const matches = products.filter(
          (p) =>
            productEligibleForWineSearch(p) &&
            terms.some((t) => (p._search || "").includes(t)),
        );

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

  items = items
    .sort((a, b) => {
      const sa = score(a, terms);
      const sb = score(b, terms);
      return sb - sa || (a.image ? 0 : 1) - (b.image ? 0 : 1) || (a.price ?? 9e9) - (b.price ?? 9e9);
    })
    .slice(0, 48);

  const meta = {
    feeds_total: FEEDS.length,
    feeds_ok,
    feeds_failed,
    priceMin,
    priceMax,
  };

  if (items.length) return { source: "feed", products: items, meta };
  return { source: "fallback", products: [], meta };
}
