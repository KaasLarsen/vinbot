import { unstable_cache } from "next/cache";

import { FEEDS } from "@/lib/feeds/config";
import { getCachedFeedProductsForPla } from "@/lib/search/fetch-feed";
import type { FeedProduct } from "@/lib/search/types";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import { stripHtmlForDisplay } from "@/lib/vine/product-text";
import { inferWineProducerBrand } from "@/lib/schema/product-identifiers";

import { unwrapAffiliateShopUrl } from "./unwrap-shop-url";
import { decodePlaSlugParam, plaOfferId, plaProductSlug } from "./slug";
import type { PlaCatalogItem, PlaMerchantId } from "./types";

const SPS_FEED_MERCHANT = "SPS Wine";
const SPS_HOST = "spswine.dk";
const SALE_MIN_DISCOUNT_PERCENT = 30;

type SalePlaSource = {
  merchantId: Exclude<PlaMerchantId, "sps-wine">;
  feedMerchant: string;
  host: string;
  prefix: string;
  cacheKey: string;
};

const SALE_PLA_SOURCES: readonly SalePlaSource[] = [
  {
    merchantId: "dh-wines",
    feedMerchant: "DH Wines",
    host: "dhwines.dk",
    prefix: "dh",
    cacheKey: "vinbot-pla-dh-catalog-v1",
  },
  {
    merchantId: "lauridsen-vine",
    feedMerchant: "Lauridsen Vine",
    host: "lauridsenvine.dk",
    prefix: "lv",
    cacheKey: "vinbot-pla-lv-catalog-v1",
  },
];

const OFFER_ID_PREFIX: Record<PlaMerchantId, string> = {
  "sps-wine": "sps",
  "dh-wines": "dh",
  "lauridsen-vine": "lv",
};

function httpsImage(url: string): string | null {
  const t = url.trim();
  if (!t) return null;
  try {
    const u = new URL(t);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    u.protocol = "https:";
    return u.toString();
  } catch {
    return null;
  }
}

function shopUrlForMerchant(rawFeedUrl: string, merchantId: PlaMerchantId, host: string): string | null {
  const unwrapped = unwrapAffiliateShopUrl(rawFeedUrl);
  if (!unwrapped) return null;
  try {
    return getMerchantWineConfig(merchantId).sanitizeProductUrl(unwrapped);
  } catch {
    try {
      const u = new URL(unwrapped);
      if (!u.hostname.endsWith(host)) return null;
      return getMerchantWineConfig(merchantId).sanitizeProductUrl(`https://${u.hostname}${u.pathname}`);
    } catch {
      return null;
    }
  }
}

function feedConfigByMerchant(feedMerchant: string) {
  const feed = FEEDS.find((f) => f.merchant === feedMerchant);
  if (!feed) throw new Error(`${feedMerchant} mangler i FEEDS`);
  return feed;
}

export function spsFeedConfig() {
  return feedConfigByMerchant(SPS_FEED_MERCHANT);
}

export function dhFeedConfig() {
  return feedConfigByMerchant("DH Wines");
}

function toCatalogItem(
  p: FeedProduct,
  merchantId: PlaMerchantId,
  host: string,
  opts?: { requireDiscount?: boolean },
): PlaCatalogItem | null {
  const priceValue = p.salePrice ?? p.price;
  if (priceValue == null || !Number.isFinite(priceValue) || priceValue <= 0) return null;

  if (opts?.requireDiscount) {
    if (p.discountPercent == null || p.discountPercent < SALE_MIN_DISCOUNT_PERCENT) return null;
    if (p.salePrice == null || p.referencePrice == null) return null;
  }

  const imageUrl = httpsImage(p.image);
  if (!imageUrl) return null;
  const shopUrl = shopUrlForMerchant(p.url, merchantId, host);
  if (!shopUrl) return null;

  const cfg = getMerchantWineConfig(merchantId);
  const brand = p.brand.trim() || inferWineProducerBrand(p.title) || cfg.displayName;
  const slug = plaProductSlug(shopUrl, p.title);
  const description = stripHtmlForDisplay(p.desc);

  const onSale =
    p.referencePrice != null &&
    Number.isFinite(p.referencePrice) &&
    p.referencePrice > priceValue &&
    p.discountPercent != null;

  return {
    offerId: plaOfferId(shopUrl, OFFER_ID_PREFIX[merchantId]),
    slug,
    merchantId,
    title: p.title.trim().slice(0, 150),
    description,
    brand: brand.slice(0, 70),
    category: p.category.trim(),
    gtin: p.gtin,
    mpn: p.mpn,
    price: priceValue,
    ...(onSale
      ? { referencePrice: p.referencePrice!, discountPercent: p.discountPercent! }
      : {}),
    currency: (p.currency || "DKK").toUpperCase() === "DKK" ? "DKK" : p.currency || "DKK",
    imageUrl,
    shopUrl,
    feedUrl: p.url,
  };
}

function dedupeCatalog(products: FeedProduct[], merchantId: PlaMerchantId, host: string, opts?: { requireDiscount?: boolean }) {
  const seen = new Set<string>();
  const out: PlaCatalogItem[] = [];
  for (const p of products) {
    const item = toCatalogItem(p, merchantId, host, opts);
    if (!item) continue;
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
  }
  return out;
}

async function buildSpsPlaCatalog(): Promise<PlaCatalogItem[]> {
  const products = await getCachedFeedProductsForPla(spsFeedConfig());
  return dedupeCatalog(products, "sps-wine", SPS_HOST);
}

async function buildSalePlaCatalog(source: SalePlaSource): Promise<PlaCatalogItem[]> {
  const products = await getCachedFeedProductsForPla(feedConfigByMerchant(source.feedMerchant));
  return dedupeCatalog(products, source.merchantId, source.host, { requireDiscount: true });
}

export async function getSpsPlaCatalog(): Promise<PlaCatalogItem[]> {
  try {
    return await unstable_cache(buildSpsPlaCatalog, ["vinbot-pla-sps-catalog-v3"], {
      revalidate: 21600,
      tags: ["vinbot-feeds"],
    })();
  } catch {
    return buildSpsPlaCatalog();
  }
}

async function getSalePlaCatalog(source: SalePlaSource): Promise<PlaCatalogItem[]> {
  try {
    return await unstable_cache(() => buildSalePlaCatalog(source), [source.cacheKey], {
      revalidate: 21600,
      tags: ["vinbot-feeds"],
    })();
  } catch {
    return buildSalePlaCatalog(source);
  }
}

function saleSource(merchantId: Exclude<PlaMerchantId, "sps-wine">): SalePlaSource {
  const source = SALE_PLA_SOURCES.find((s) => s.merchantId === merchantId);
  if (!source) throw new Error(`PLA sale-kilde mangler for ${merchantId}`);
  return source;
}

export async function getDhPlaCatalog(): Promise<PlaCatalogItem[]> {
  return getSalePlaCatalog(saleSource("dh-wines"));
}

export async function getLauridsenPlaCatalog(): Promise<PlaCatalogItem[]> {
  return getSalePlaCatalog(saleSource("lauridsen-vine"));
}

export async function getPlaCatalog(): Promise<PlaCatalogItem[]> {
  const [sps, ...sale] = await Promise.all([
    getSpsPlaCatalog(),
    ...SALE_PLA_SOURCES.map((source) => getSalePlaCatalog(source)),
  ]);
  return [sps, ...sale].flat();
}

function findBySlug(catalog: PlaCatalogItem[], slug: string): PlaCatalogItem | undefined {
  const wanted = decodePlaSlugParam(slug);
  return catalog.find((p) => p.slug === wanted || p.slug === slug);
}

export async function getSpsPlaItemBySlug(slug: string): Promise<PlaCatalogItem | undefined> {
  return findBySlug(await getSpsPlaCatalog(), slug);
}

export async function getDhPlaItemBySlug(slug: string): Promise<PlaCatalogItem | undefined> {
  return findBySlug(await getDhPlaCatalog(), slug);
}

export async function getLauridsenPlaItemBySlug(slug: string): Promise<PlaCatalogItem | undefined> {
  return findBySlug(await getLauridsenPlaCatalog(), slug);
}

export async function getSalePlaItemBySlug(
  merchantId: Exclude<PlaMerchantId, "sps-wine">,
  slug: string,
): Promise<PlaCatalogItem | undefined> {
  if (merchantId === "dh-wines") return getDhPlaItemBySlug(slug);
  return getLauridsenPlaItemBySlug(slug);
}
