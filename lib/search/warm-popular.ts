import { runSearch } from "@/lib/search/engine";
import { getCachedFeedProductsForSearch } from "@/lib/search/fetch-feed";
import { runSpiritsSearch } from "@/lib/search/spirits-engine";
import { WINE_SEARCH_FEEDS } from "@/lib/search/wine-search-feeds";

/** Populære forespørgsler der fyldes i Data Cache efter feed-revalidate. */
export const POPULAR_WINE_SEARCH_QUERIES: readonly string[] = [
  "rødvin",
  "hvidvin",
  "rioja",
  "champagne",
  "boksvin",
  "prosecco",
  "pinot noir",
];

export const POPULAR_SPIRITS_SEARCH_QUERIES: readonly string[] = ["whisky", "gin", ""];

export type WarmPopularSearchResult = {
  feeds: { merchant: string; ok: boolean; n: number }[];
  wine: { q: string; ok: boolean; n: number }[];
  spirits: { q: string; ok: boolean; n: number }[];
};

/**
 * Fylder søge-feed-cache + populære result-caches, så første bruger efter cron
 * ikke betaler Daisycon-cold-downloads.
 */
export async function warmPopularSearches(): Promise<WarmPopularSearchResult> {
  const feeds = await Promise.all(
    WINE_SEARCH_FEEDS.map(async (feed) => {
      try {
        const products = await getCachedFeedProductsForSearch(feed);
        return { merchant: feed.merchant, ok: products.length > 0, n: products.length };
      } catch (err) {
        console.error("[warm-search] feed failed", feed.merchant, err instanceof Error ? err.message : err);
        return { merchant: feed.merchant, ok: false, n: 0 };
      }
    }),
  );

  const wine = await Promise.all(
    POPULAR_WINE_SEARCH_QUERIES.map(async (q) => {
      try {
        const result = await runSearch(q, null, null);
        return { q, ok: result.products.length > 0, n: result.products.length };
      } catch (err) {
        console.error("[warm-search] wine failed", q, err instanceof Error ? err.message : err);
        return { q, ok: false, n: 0 };
      }
    }),
  );

  const spirits = await Promise.all(
    POPULAR_SPIRITS_SEARCH_QUERIES.map(async (q) => {
      try {
        const result = await runSpiritsSearch(q, null);
        return { q: q || "(empty)", ok: result.products.length > 0, n: result.products.length };
      } catch (err) {
        console.error("[warm-search] spirits failed", q, err instanceof Error ? err.message : err);
        return { q: q || "(empty)", ok: false, n: 0 };
      }
    }),
  );

  return { feeds, wine, spirits };
}
