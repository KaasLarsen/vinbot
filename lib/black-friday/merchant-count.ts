import { FEEDS } from "@/lib/feeds/config";

/** Vin-feeds (ikke vinkøleskabe/møbler). */
export function wineMerchantFeedCount(): number {
  return FEEDS.filter((f) => f.wineFilter !== false).length;
}
