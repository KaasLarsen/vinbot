import { unstable_cache } from "next/cache";

import { FEEDS } from "@/lib/feeds/config";
import { getCachedFeedProductsForPla } from "@/lib/search/fetch-feed";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import { stripHtmlForDisplay } from "@/lib/vine/product-text";
import { inferWineProducerBrand } from "@/lib/schema/product-identifiers";

import { unwrapAffiliateShopUrl } from "./unwrap-shop-url";
import { decodePlaSlugParam, plaProductSlug } from "./slug";
import type { PlaCatalogItem } from "./types";

const SPS_FEED_MERCHANT = "SPS Wine";
const SPS_HOST = "spswine.dk";

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

function shopUrlForSps(rawFeedUrl: string): string | null {
  const unwrapped = unwrapAffiliateShopUrl(rawFeedUrl);
  if (!unwrapped) return null;
  try {
    return getMerchantWineConfig("sps-wine").sanitizeProductUrl(unwrapped);
  } catch {
    try {
      const u = new URL(unwrapped);
      if (!u.hostname.endsWith(SPS_HOST)) return null;
      return getMerchantWineConfig("sps-wine").sanitizeProductUrl(`https://${u.hostname}${u.pathname}`);
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

function toCatalogItem(p: {
  title: string;
  desc: string;
  brand: string;
  category: string;
  gtin: string | null;
  mpn: string | null;
  price: number | null;
  salePrice: number | null;
  currency: string;
  image: string;
  url: string;
}): PlaCatalogItem | null {
  const priceValue = p.salePrice ?? p.price;
  if (priceValue == null || !Number.isFinite(priceValue) || priceValue <= 0) return null;
  const imageUrl = httpsImage(p.image);
  if (!imageUrl) return null;
  const shopUrl = shopUrlForSps(p.url);
  if (!shopUrl) return null;

  const brand = p.brand.trim() || inferWineProducerBrand(p.title) || "SPS Wine";
  const slug = plaProductSlug(shopUrl, p.title);
  const description = stripHtmlForDisplay(p.desc);

  return {
    slug,
    merchantId: "sps-wine",
    title: p.title.trim().slice(0, 150),
    description,
    brand: brand.slice(0, 70),
    category: p.category.trim(),
    gtin: p.gtin,
    mpn: p.mpn,
    price: priceValue,
    currency: (p.currency || "DKK").toUpperCase() === "DKK" ? "DKK" : p.currency || "DKK",
    imageUrl,
    shopUrl,
    feedUrl: p.url,
  };
}

async function buildSpsPlaCatalog(): Promise<PlaCatalogItem[]> {
  const products = await getCachedFeedProductsForPla(spsFeedConfig());
  const seen = new Set<string>();
  const out: PlaCatalogItem[] = [];
  for (const p of products) {
    const item = toCatalogItem(p);
    if (!item) continue;
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    out.push(item);
  }
  return out;
}

export async function getSpsPlaCatalog(): Promise<PlaCatalogItem[]> {
  try {
    return await unstable_cache(buildSpsPlaCatalog, ["vinbot-pla-sps-catalog-v2"], {
      revalidate: 21600,
      tags: ["vinbot-feeds"],
    })();
  } catch {
    return buildSpsPlaCatalog();
  }
}

export async function getSpsPlaItemBySlug(slug: string): Promise<PlaCatalogItem | undefined> {
  const catalog = await getSpsPlaCatalog();
  const wanted = decodePlaSlugParam(slug);
  return catalog.find((p) => p.slug === wanted || p.slug === slug);
}
