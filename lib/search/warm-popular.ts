import { runSearch } from "@/lib/search/engine";
import { getCachedFeedProductsForSearch } from "@/lib/search/fetch-feed";
import { runSpiritsSearch } from "@/lib/search/spirits-engine";
import { WINE_SEARCH_FEEDS } from "@/lib/search/wine-search-feeds";

/**
 * Populære forespørgsler der fyldes i Data Cache efter feed-revalidate.
 * Hold listen kort — hver query downloader/parser mange feeds ved cold miss.
 */
export const POPULAR_WINE_SEARCH_QUERIES: readonly string[] = ["rødvin", "hvidvin", "champagne"];

export const POPULAR_SPIRITS_SEARCH_QUERIES: readonly string[] = ["whisky", "gin"];

export type WarmPopularSearchResult = {
  feeds: { merchant: string; ok: boolean; n: number }[];
  wine: { q: string; ok: boolean; n: number }[];
  spirits: { q: string; ok: boolean; n: number }[];
};

const FEED_WARM_CONCURRENCY = 6;

async function mapPool<T, R>(items: readonly T[], concurrency: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      out[i] = await fn(items[i]!);
    }
  }
  const n = Math.min(concurrency, items.length);
  await Promise.all(Array.from({ length: n }, () => worker()));
  return out;
}

/**
 * Fylder søge-feed-cache + populære result-caches, så første bruger efter cron
 * ikke betaler Daisycon-cold-downloads. Begrænset concurrency for at holde
 * provisioned memory nede under Fluid Compute.
 */
export async function warmPopularSearches(): Promise<WarmPopularSearchResult> {
  const feeds = await mapPool(WINE_SEARCH_FEEDS, FEED_WARM_CONCURRENCY, async (feed) => {
    try {
      const products = await getCachedFeedProductsForSearch(feed, { warm: true });
      return { merchant: feed.merchant, ok: products.length > 0, n: products.length };
    } catch (err) {
      console.error("[warm-search] feed failed", feed.merchant, err instanceof Error ? err.message : err);
      return { merchant: feed.merchant, ok: false, n: 0 };
    }
  });

  const wine = await mapPool(POPULAR_WINE_SEARCH_QUERIES, 2, async (q) => {
    try {
      const result = await runSearch(q, null, null);
      return { q, ok: result.products.length > 0, n: result.products.length };
    } catch (err) {
      console.error("[warm-search] wine failed", q, err instanceof Error ? err.message : err);
      return { q, ok: false, n: 0 };
    }
  });

  const spirits = await mapPool(POPULAR_SPIRITS_SEARCH_QUERIES, 2, async (q) => {
    try {
      const result = await runSpiritsSearch(q, null);
      return { q, ok: result.products.length > 0, n: result.products.length };
    } catch (err) {
      console.error("[warm-search] spirits failed", q, err instanceof Error ? err.message : err);
      return { q, ok: false, n: 0 };
    }
  });

  return { feeds, wine, spirits };
}
