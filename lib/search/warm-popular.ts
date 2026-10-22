import { runSearch } from "@/lib/search/engine";
import { runSpiritsSearch } from "@/lib/search/spirits-engine";

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
  wine: { q: string; ok: boolean; n: number }[];
  spirits: { q: string; ok: boolean; n: number }[];
};

/**
 * Fylder søgeresultat-cachen så første bruger efter cron ikke betaler cold path.
 * Fejl i enkelte queries stopper ikke resten.
 */
export async function warmPopularSearches(): Promise<WarmPopularSearchResult> {
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

  return { wine, spirits };
}
