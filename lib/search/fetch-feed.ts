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
    signal: AbortSignal.timeout(12_000),
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

/**
 * Max produkter pr. feed i søge-cachen. Kæmpe Daisycon-kataloger (fx Decantalo ~5k+)
 * gør ellers hver multi-feed-søgning dyr at deserialisere fra Data Cache.
 */
const SEARCH_FEED_PRODUCT_CAP = 1500;

/** Ultra-slim + cap — kun til live søgning, ikke katalog/PLA/browse. */
function slimFeedProductsForSearch(products: FeedProduct[]): FeedProduct[] {
  const ranked = [...products].sort(
    (a, b) =>
      (a.image ? 0 : 1) - (b.image ? 0 : 1) ||
      (a.price == null ? 1 : 0) - (b.price == null ? 1 : 0) ||
      (a.price ?? 9e9) - (b.price ?? 9e9),
  );
  return ranked.slice(0, SEARCH_FEED_PRODUCT_CAP).map((p) => ({
    merchant: p.merchant,
    tier: p.tier,
    title: p.title,
    desc: "",
    category: "",
    brand: p.brand || "",
    gtin: p.gtin,
    mpn: null,
    price: p.price,
    salePrice: p.salePrice,
    referencePrice: p.referencePrice,
    discountPercent: p.discountPercent,
    currency: p.currency || "DKK",
    image: p.image,
    url: p.url,
    _search: (p._search || "").slice(0, 160),
  }));
}

async function fetchFeedProductsForSearchCache(feed: FeedConfig): Promise<FeedProduct[]> {
  const products = await fetchFeedProductsInner(feed);
  return slimFeedProductsForSearch(products);
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
const FEED_PRODUCTS_CACHE_VERSION = "v15-spirits-hub";
const SEARCH_FEED_CACHE_VERSION = "v1-search-cap-1500";
const PLA_FEED_CACHE_VERSION = "v4-spirits-hub";

function feedFilterKey(feed: FeedConfig): string {
  return feed.wineFilter !== false
    ? "wine"
    : [
        "nof-wine-filter",
        feed.vinAdjacentIncludeAny?.join(",") ?? "",
        feed.vinAdjacentExcludeAny?.join(",") ?? "",
      ].join("|");
}

/** Cache pr. feed (6 timer). Tag `vinbot-feeds` til cron revalidate. */
export async function getCachedFeedProducts(feed: FeedConfig): Promise<FeedProduct[]> {
  const filterKey = feedFilterKey(feed);
  try {
    return await unstable_cache(
      () => fetchFeedProductsForCache(feed),
      ["vinbot-feed", FEED_PRODUCTS_CACHE_VERSION, feed.merchant, feed.url, feedTier(feed), filterKey],
      { revalidate: 21600, tags: ["vinbot-feeds"] },
    )();
  } catch (err) {
    console.error(
      `[feed] cache FAILED for ${feed.merchant}:`,
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

/**
 * Lettere feed-cache til multi-feed vinsøgning/spiritus.
 * Cap + slim holder Data Cache-læsning hurtig (Decantalo m.fl.).
 * Merchant-browse og katalog bruger stadig `getCachedFeedProducts`.
 */
export async function getCachedFeedProductsForSearch(feed: FeedConfig): Promise<FeedProduct[]> {
  const filterKey = feedFilterKey(feed);
  try {
    return await unstable_cache(
      () => fetchFeedProductsForSearchCache(feed),
      ["vinbot-feed-search", SEARCH_FEED_CACHE_VERSION, feed.merchant, feed.url, feedTier(feed), filterKey],
      { revalidate: 21600, tags: ["vinbot-feeds"] },
    )();
  } catch (err) {
    console.error(
      `[feed-search] cache FAILED for ${feed.merchant}:`,
      err instanceof Error ? err.message : err,
    );
    return [];
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
