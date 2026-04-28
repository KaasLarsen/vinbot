import { unstable_cache } from "next/cache";
import type { FeedConfig } from "@/lib/feeds/config";
import type { FeedProduct } from "./types";
import {
  decodeText,
  isWineLike,
  looksLikeXML,
  normalize,
  parseCSVProducts,
  parseXMLProducts,
  UA,
} from "./helpers";

/** Kun vin/vintilbehør i feeds der ellers har blandet sortiment (fx glas + smykker). */
function filterVinAdjacentCatalog(feed: FeedConfig, products: FeedProduct[]): FeedProduct[] {
  const inc = feed.vinAdjacentIncludeAny;
  const exc = feed.vinAdjacentExcludeAny;
  if ((!inc || inc.length === 0) && (!exc || exc.length === 0)) return products;

  return products.filter((p) => {
    const hay = normalize(`${p.title} ${p.desc} ${p.category} ${p.brand}`);
    if (exc?.length && exc.some((t) => hay.includes(normalize(t)))) return false;
    if (!inc?.length) return true;
    return inc.some((t) => hay.includes(normalize(t)));
  });
}

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
  } else {
    products = filterVinAdjacentCatalog(feed, products);
  }
  return products;
}

/** Cache pr. feed (6 timer). Tag `vinbot-feeds` til cron revalidate. */
export function getCachedFeedProducts(feed: FeedConfig): Promise<FeedProduct[]> {
  const filterKey =
    feed.wineFilter !== false
      ? "wine"
      : [
          "nof-wine-filter",
          feed.vinAdjacentIncludeAny?.join(",") ?? "",
          feed.vinAdjacentExcludeAny?.join(",") ?? "",
        ].join("|");
  return unstable_cache(
    () => fetchFeedProductsInner(feed),
    ["vinbot-feed", feed.merchant, feed.url, filterKey],
    { revalidate: 21600, tags: ["vinbot-feeds"] },
  )();
}
