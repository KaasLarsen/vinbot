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
const DH_FEED_MERCHANT = "DH Wines";
const DH_HOST = "dhwines.dk";
const DH_MIN_DISCOUNT_PERCENT = 30;

const OFFER_ID_PREFIX: Record<PlaMerchantId, string> = {
  "sps-wine": "sps",
  "dh-wines": "dh",
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

export function spsFeedConfig() {
  const feed = FEEDS.find((f) => f.merchant === SPS_FEED_MERCHANT);
  if (!feed) throw new Error("SPS Wine mangler i FEEDS");
  return feed;
}

export function dhFeedConfig() {
  const feed = FEEDS.find((f) => f.merchant === DH_FEED_MERCHANT);
  if (!feed) throw new Error("DH Wines mangler i FEEDS");
  return feed;
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
    if (p.discountPercent == null || p.discountPercent < DH_MIN_DISCOUNT_PERCENT) return null;
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

async function buildDhPlaCatalog(): Promise<PlaCatalogItem[]> {
  const products = await getCachedFeedProductsForPla(dhFeedConfig());
  return dedupeCatalog(products, "dh-wines", DH_HOST, { requireDiscount: true });
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

export async function getDhPlaCatalog(): Promise<PlaCatalogItem[]> {
  try {
    return await unstable_cache(buildDhPlaCatalog, ["vinbot-pla-dh-catalog-v1"], {
      revalidate: 21600,
      tags: ["vinbot-feeds"],
    })();
  } catch {
    return buildDhPlaCatalog();
  }
}

export async function getPlaCatalog(): Promise<PlaCatalogItem[]> {
  const [sps, dh] = await Promise.all([getSpsPlaCatalog(), getDhPlaCatalog()]);
  return [...sps, ...dh];
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
