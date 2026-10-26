/** Antal cache-entries for vin-kataloget. Hver shard skal holde sig under Next.js' 2 MB-loft. */
export const WINE_SHARD_COUNT = 16;

/** Stabil shard for en slug. Samme slug rammer altid samme shard. */
export function wineShardIndex(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % WINE_SHARD_COUNT;
}
