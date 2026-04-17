import { unstable_cache } from "next/cache";
import type { FeedConfig } from "@/lib/feeds/config";
import type { FeedProduct } from "./types";
import {
  decodeText,
  isWineLike,
  looksLikeXML,
  parseCSVProducts,
  parseXMLProducts,
  UA,
} from "./helpers";

async function fetchFeedProductsInner(feed: FeedConfig): Promise<FeedProduct[]> {
  const { merchant, url } = feed;
  const headers = {
    "user-agent": UA,
    accept: "text/xml,application/xml,text/plain,text/csv,*/*",
  };
  const r = await fetch(url, { headers, redirect: "follow" });
  const buf = await r.arrayBuffer();
  const text = decodeText(buf);

  let products = looksLikeXML(text) ? parseXMLProducts(text, merchant) : parseCSVProducts(text, merchant);
  if (feed.wineFilter !== false) {
    products = products.filter(isWineLike);
  }
  return products;
}

/** Cache pr. feed (6 timer). Tag `vinbot-feeds` til cron revalidate. */
export function getCachedFeedProducts(feed: FeedConfig): Promise<FeedProduct[]> {
  const filterKey = feed.wineFilter === false ? "all" : "wine";
  return unstable_cache(
    () => fetchFeedProductsInner(feed),
    ["vinbot-feed", feed.merchant, feed.url, filterKey],
    { revalidate: 21600, tags: ["vinbot-feeds"] },
  )();
}
