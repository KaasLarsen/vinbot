import { FEEDS, type FeedConfig } from "@/lib/feeds/config";
import { WINE_COOLER_MERCHANTS } from "@/lib/search/wine-cooler";

/**
 * Feeds der indgår i almindelig vinsøgning (/api/search).
 * Vinkøleskab-/møbel-giganter (Homeshop, Erling, Witt m.fl.) holdes ude —
 * de parses kun via /api/search/wine-coolers.
 */
export function isWineSearchFeed(feed: Pick<FeedConfig, "merchant">): boolean {
  return !WINE_COOLER_MERCHANTS.includes(feed.merchant);
}

export const WINE_SEARCH_FEEDS: FeedConfig[] = FEEDS.filter(isWineSearchFeed);
