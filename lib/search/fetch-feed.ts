import { unstable_cache } from "next/cache";
import { feedTier, type FeedConfig } from "@/lib/feeds/config";
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

export async function fetchFeedProductsInner(feed: FeedConfig): Promise<FeedProduct[]> {
  const { merchant, url } = feed;
  const tier = feedTier(feed);
  const headers = {
    "user-agent": UA,
    accept: "text/xml,application/xml,text/plain,text/csv,*/*",
  };
  const r = await fetch(url, {
    headers,
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(45_000),
  });
  const buf = await r.arrayBuffer();
  const text = decodeText(buf);

  let products = looksLikeXML(text) ? parseXMLProducts(text, merchant) : parseCSVProducts(text, merchant);
  products = products.map((p) => ({ ...p, tier }));
  if (feed.wineFilter !== false) {
    products = products.filter(isWineLike);
  } else {
    products = filterVinAdjacentCatalog(feed, products);
  }
  return products;
}

/** Fjern tunge felter så Data Cache holder sig under Next.js 2MB-grænsen. */
function slimFeedProductsForCache(products: FeedProduct[]): FeedProduct[] {
  return products.map((p) => ({
    ...p,
    desc: "",
    _search: (p._search || "").slice(0, 240),
  }));
}

async function fetchFeedProductsForCache(feed: FeedConfig): Promise<FeedProduct[]> {
  const products = await fetchFeedProductsInner(feed);
  return slimFeedProductsForCache(products);
}

const PLA_DESC_MAX = 1800;

/** Til Google PLA og dynamiske produktsider — beholder kort beskrivelse (egen cache-nøgle). */
function slimFeedProductsForPla(products: FeedProduct[]): FeedProduct[] {
  return products.map((p) => ({
    ...p,
    desc: (p.desc || "").slice(0, PLA_DESC_MAX),
    _search: "",
  }));
}

async function fetchFeedProductsForPlaCache(feed: FeedConfig): Promise<FeedProduct[]> {
  const products = await fetchFeedProductsInner(feed);
  return slimFeedProductsForPla(products);
}

/** Bump ved parser-/filterændringer så tomme Daisycon-cache ikke hænger efter deploy. */
const FEED_PRODUCTS_CACHE_VERSION = "v12-wine-only-grocery";
const PLA_FEED_CACHE_VERSION = "v2-pla-desc";

/** Cache pr. feed (6 timer). Tag `vinbot-feeds` til cron revalidate. */
export async function getCachedFeedProducts(feed: FeedConfig): Promise<FeedProduct[]> {
  const filterKey =
    feed.wineFilter !== false
      ? "wine"
      : [
          "nof-wine-filter",
          feed.vinAdjacentIncludeAny?.join(",") ?? "",
          feed.vinAdjacentExcludeAny?.join(",") ?? "",
        ].join("|");
  try {
    return await unstable_cache(
      () => fetchFeedProductsForCache(feed),
      ["vinbot-feed", FEED_PRODUCTS_CACHE_VERSION, feed.merchant, feed.url, feedTier(feed), filterKey],
      { revalidate: 21600, tags: ["vinbot-feeds"] },
    )();
  } catch {
    return fetchFeedProductsInner(feed);
  }
}

export async function getCachedFeedProductsForPla(feed: FeedConfig): Promise<FeedProduct[]> {
  const filterKey =
    feed.wineFilter !== false
      ? "wine"
      : [
          "nof-wine-filter",
          feed.vinAdjacentIncludeAny?.join(",") ?? "",
          feed.vinAdjacentExcludeAny?.join(",") ?? "",
        ].join("|");
  try {
    return await unstable_cache(
      () => fetchFeedProductsForPlaCache(feed),
      ["vinbot-feed-pla", PLA_FEED_CACHE_VERSION, feed.merchant, feed.url, feedTier(feed), filterKey],
      { revalidate: 21600, tags: ["vinbot-feeds"] },
    )();
  } catch {
    return slimFeedProductsForPla(await fetchFeedProductsInner(feed));
  }
}
