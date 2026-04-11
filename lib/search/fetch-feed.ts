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

async function fetchFeedProductsInner(merchant: string, url: string): Promise<FeedProduct[]> {
  const headers = {
    "user-agent": UA,
    accept: "text/xml,application/xml,text/plain,text/csv,*/*",
  };
  const r = await fetch(url, { headers, redirect: "follow" });
  const buf = await r.arrayBuffer();
  const text = decodeText(buf);

  let products = looksLikeXML(text) ? parseXMLProducts(text, merchant) : parseCSVProducts(text, merchant);
  products = products.filter(isWineLike);
  return products;
}

/** Cache pr. feed (6 timer). Tag `vinbot-feeds` til cron revalidate. */
export function getCachedFeedProducts(feed: FeedConfig): Promise<FeedProduct[]> {
  return unstable_cache(
    () => fetchFeedProductsInner(feed.merchant, feed.url),
    ["vinbot-feed", feed.merchant, feed.url],
    { revalidate: 21600, tags: ["vinbot-feeds"] },
  )();
}
