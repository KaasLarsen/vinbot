import { FEEDS, type FeedConfig } from "@/lib/feeds/config";
import { WINE_COOLER_MERCHANTS } from "@/lib/search/wine-cooler";
import { WINE_GLASS_MERCHANTS } from "@/lib/search/wine-glass";

/**
 * Feeds der indgår i almindelig vinsøgning (/api/search).
 * Vinkøleskab-/møbel-giganter og glas-feeds holdes ude —
 * de parses kun via /api/search/wine-coolers og /api/search/wine-glasses.
 */
export function isWineSearchFeed(feed: Pick<FeedConfig, "merchant">): boolean {
  if (WINE_COOLER_MERCHANTS.includes(feed.merchant)) return false;
  if (WINE_GLASS_MERCHANTS.includes(feed.merchant)) return false;
  return true;
}

export const WINE_SEARCH_FEEDS: FeedConfig[] = FEEDS.filter(isWineSearchFeed);
