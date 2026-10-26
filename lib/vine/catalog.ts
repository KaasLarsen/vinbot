import { unstable_cache } from "next/cache";
import { cache } from "react";

import { FEEDS } from "@/lib/feeds/config";
import type { FeedProduct } from "@/lib/search/types";
import { getCachedFeedProducts } from "@/lib/search/fetch-feed";
import { isWineLike, normalize, productEligibleForWineSearch } from "@/lib/search/helpers";

import { inferWineProducerBrand } from "@/lib/schema/product-identifiers";

import { combineRichDescriptions } from "./product-text";
import { attachRelatedCards } from "./related-wines";
import { WINE_SHARD_COUNT, wineShardIndex } from "./shards";
import { shortHash, wineSlugFromId } from "./slug";
import type { CanonicalWine, VineOffer, WineCatalog } from "./types";

function resolveClusterBrand(acc: { brand: string; titles: string[] }): string {
  if (acc.brand.trim()) return acc.brand.trim();
  for (const title of acc.titles) {
    const inferred = inferWineProducerBrand(title);
    if (inferred) return inferred;
  }
  return "";
}

/** Årgang i titel fjernes til signatur-match på tværs af butikker. */
function stripVintage(title: string): string {
  return title.replace(/\b(19|20)\d{2}\b/g, " ").replace(/\s+/g, " ").trim();
}

/** Titlen normaliseres ud over årgang så samme vin fra forskellige feeds rammer samme hash oftere. */
function normalizeTitleForSignature(raw: string): string {
  let t = normalize(stripVintage(raw));
  t = t.replace(/\b(75|37[,.]?\s*5?)\s*(cl|ml)\b/gi, " ");
  t = t.replace(/\b0[,.]75\s*l\b/gi, " ");
  t = t.replace(/\b750\s*ml\b/gi, " ");
  t = t.replace(/[^\w\sæøå]/gi, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t.slice(0, 200);
}

export function canonicalKeyForProduct(p: FeedProduct): string {
  if (p.gtin) return `gtin:${p.gtin}`;
  const brand = normalize(p.brand || "").slice(0, 120);
  const tit = normalizeTitleForSignature(p.title);
  const h = shortHash(`${brand}|${tit}`, 24);
  return `sig:${h}`;
}

function pickDisplayTitle(titles: string[]): string {
  const uniq = [...new Set(titles.map((t) => t.trim()).filter(Boolean))];
  if (!uniq.length) return "Vin";
  uniq.sort((a, b) => a.length - b.length || a.localeCompare(b, "da"));
  return uniq[0];
}

function mergeOffers(offers: VineOffer[]): VineOffer[] {
  const byMerchant = new Map<string, VineOffer>();
  for (const o of offers) {
    const prev = byMerchant.get(o.merchant);
    if (!prev) {
      byMerchant.set(o.merchant, o);
      continue;
    }
    const pa = prev.price ?? Number.POSITIVE_INFINITY;
    const pb = o.price ?? Number.POSITIVE_INFINITY;
    if (pb < pa || (prev.price == null && o.price != null)) {
      byMerchant.set(o.merchant, o);
    }
  }
  return [...byMerchant.values()].sort((a, b) => {
    const xa = a.price ?? 9e9;
    const xb = b.price ?? 9e9;
    // Samme pris: betalende partnere før gratis butikker.
    return xa - xb || (a.tier === "free" ? 1 : 0) - (b.tier === "free" ? 1 : 0) || a.merchant.localeCompare(b.merchant, "da");
  });
}

async function buildWineCatalog(): Promise<WineCatalog> {
  type Acc = {
    titles: string[];
    descriptions: string[];
    brand: string;
    category: string;
    image: string | null;
    gtin: string | null;
    mpn: string | null;
    offers: VineOffer[];
  };

  const clusters = new Map<string, Acc>();

  const feedProducts = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        return await getCachedFeedProducts(feed);
      } catch {
        return [] as FeedProduct[];
      }
    }),
  );

  for (const products of feedProducts) {
    for (const p of products) {
      if (!productEligibleForWineSearch(p)) continue;
      if (!isWineLike(p)) continue;

      const key = canonicalKeyForProduct(p);
      let acc = clusters.get(key);
      if (!acc) {
        acc = {
          titles: [],
          descriptions: [],
          brand: (p.brand || "").trim(),
          category: (p.category || "").trim(),
          image: p.image?.trim() || null,
          gtin: p.gtin,
          mpn: p.mpn,
          offers: [],
        };
        clusters.set(key, acc);
      }
      acc.titles.push(p.title);
      if (p.desc?.trim()) acc.descriptions.push(p.desc);
      if (!acc.brand && p.brand) acc.brand = p.brand.trim();
      if (!acc.category && p.category) acc.category = p.category.trim();
      if (!acc.gtin && p.gtin) acc.gtin = p.gtin;
      if (!acc.image && p.image?.trim()) acc.image = p.image.trim();

      const offer: VineOffer = {
        merchant: p.merchant,
        tier: p.tier,
        price: p.price,
        currency: p.currency || "DKK",
        url: p.url,
        listingTitle: p.title,
      };
      // Kun sat når feedet har tal — null på hvert tilbud sprænger Next.js' 2 MB cache-loft.
      if (typeof p.referencePrice === "number") offer.referencePrice = p.referencePrice;
      if (typeof p.discountPercent === "number") offer.discountPercent = p.discountPercent;
      acc.offers.push(offer);
    }
  }

  const now = new Date().toISOString();
  const wines: CanonicalWine[] = [];

  for (const [key, acc] of clusters) {
    const displayTitle = pickDisplayTitle(acc.titles);
    const brand = resolveClusterBrand(acc);
    const slug = wineSlugFromId(key, displayTitle, brand);
    const offers = mergeOffers(acc.offers);
    const description = combineRichDescriptions(acc.descriptions);
    const alternateListingTitles = [...new Set(acc.titles.map((t) => t.trim()).filter(Boolean))]
      .filter((t) => t !== displayTitle)
      .sort((a, b) => a.length - b.length || a.localeCompare(b, "da"))
      .slice(0, 8);

    wines.push({
      id: key,
      slug,
      displayTitle,
      brand,
      category: acc.category,
      description,
      alternateListingTitles,
      image: acc.image,
      gtin: acc.gtin,
      mpn: acc.mpn,
      offers,
      updated: now,
    });
  }

  wines.sort((a, b) => {
    const d = b.offers.length - a.offers.length;
    if (d !== 0) return d;
    return a.displayTitle.localeCompare(b.displayTitle, "da", { sensitivity: "base" });
  });

  return {
    wines,
    offerCount: wines.reduce((n, w) => n + w.offers.length, 0),
    generatedAt: now,
  };
}

async function buildWineCatalogForCache(): Promise<WineCatalog> {
  const catalog = await buildWineCatalog();
  const slim = catalog.wines.map((w) => ({
    ...w,
    description: (w.description ?? "").slice(0, 400) || null,
    alternateListingTitles: (w.alternateListingTitles ?? []).slice(0, 4),
  }));
  return {
    ...catalog,
    wines: attachRelatedCards(slim),
  };
}

const CATALOG_MEMO_TTL_MS = 5 * 60 * 1000;
let catalogMemo: { at: number; catalog: WineCatalog } | null = null;
let catalogInflight: Promise<WineCatalog> | null = null;

/**
 * Én klyngning pr. proces, også når flere shards fyldes parallelt.
 * Request-stien kalder ikke denne direkte — kun unstable_cache-callbacks og cron-warm.
 */
function buildWineCatalogSingleFlight(): Promise<WineCatalog> {
  if (catalogMemo && Date.now() - catalogMemo.at < CATALOG_MEMO_TTL_MS) {
    return Promise.resolve(catalogMemo.catalog);
  }
  if (!catalogInflight) {
    catalogInflight = buildWineCatalogForCache()
      .then((catalog) => {
        catalogMemo = { at: Date.now(), catalog };
        return catalog;
      })
      .finally(() => {
        catalogInflight = null;
      });
  }
  return catalogInflight;
}

const emptyCatalog = (): WineCatalog => ({
  wines: [],
  offerCount: 0,
  generatedAt: new Date(0).toISOString(),
});

let loggedEmptyCatalog = false;

function logEmptyCatalogOnce(): void {
  if (loggedEmptyCatalog) return;
  loggedEmptyCatalog = true;
  console.error("[catalog] cache empty or failed");
}

/** Warn før Next.js Data Cache 2 MB-loftet (~1.5 MB JSON). */
const SHARD_SIZE_WARN_BYTES = Math.floor(1.5 * 1024 * 1024);

function logShardSize(index: number, wines: CanonicalWine[]): void {
  try {
    const bytes = Buffer.byteLength(JSON.stringify(wines), "utf8");
    if (bytes > SHARD_SIZE_WARN_BYTES) {
      console.warn(
        `[catalog] shard ${index} ~${(bytes / (1024 * 1024)).toFixed(2)} MB (${wines.length} wines) — near Data Cache 2 MB limit`,
      );
    }
  } catch {
    /* ignore size probe failures */
  }
}

function shardCache(index: number) {
  return unstable_cache(
    async () => {
      const catalog = await buildWineCatalogSingleFlight();
      const wines = catalog.wines.filter((w) => wineShardIndex(w.slug) === index);
      logShardSize(index, wines);
      return wines;
    },
    ["vinbot-wine-shard-v19", String(index)],
    { revalidate: 21600, tags: ["vinbot-feeds"] },
  );
}

async function readWineShard(index: number): Promise<CanonicalWine[]> {
  try {
    return await shardCache(index)();
  } catch (err) {
    console.error("[catalog] shard cache failed", index, err instanceof Error ? err.message : "unknown");
    if (catalogMemo && Date.now() - catalogMemo.at < CATALOG_MEMO_TTL_MS) {
      return catalogMemo.catalog.wines.filter((w) => wineShardIndex(w.slug) === index);
    }
    return [];
  }
}

export type WineSitemapIndex = {
  generatedAt: string;
  slugs: string[];
};

/**
 * Samme shards som vinsiderne. Et separat katalog-kald kan liste slug'e,
 * der ikke ligger i de shards, siderne læser.
 */
export async function getCachedWineSitemapIndex(): Promise<WineSitemapIndex> {
  const parts = await Promise.all(Array.from({ length: WINE_SHARD_COUNT }, (_, i) => readWineShard(i)));
  const wines = parts.flat();
  if (wines.length === 0) {
    logEmptyCatalogOnce();
    return { generatedAt: emptyCatalog().generatedAt, slugs: [] };
  }
  return {
    generatedAt: wines[0]?.updated ?? emptyCatalog().generatedAt,
    slugs: wines.map((w) => w.slug),
  };
}

function catalogFromWines(wines: CanonicalWine[], generatedAt: string): WineCatalog {
  return {
    wines,
    offerCount: wines.reduce((n, w) => n + w.offers.length, 0),
    generatedAt,
  };
}

/** Samler shards. Ved cache-fejl returneres tomt katalog — ingen feed-parse i requestet. */
export const loadWineCatalog = cache(async (): Promise<WineCatalog> => {
  const parts = await Promise.all(Array.from({ length: WINE_SHARD_COUNT }, (_, i) => readWineShard(i)));
  const wines = parts.flat();
  if (wines.length === 0) {
    logEmptyCatalogOnce();
    return emptyCatalog();
  }
  return catalogFromWines(wines, wines[0]?.updated ?? emptyCatalog().generatedAt);
});

/** Fuld katalog-samling fra shards. Bruges hvor hele listen skal bruges, ikke på `/vine/[slug]`. */
export async function getCachedWineCatalog(): Promise<WineCatalog> {
  return loadWineCatalog();
}

/** Opvarm Data Cache efter cron-revalidate — bygger shards én gang og gemmer dem. */
export async function warmWineCatalog(): Promise<WineCatalog> {
  const parts = await Promise.all(Array.from({ length: WINE_SHARD_COUNT }, (_, i) => readWineShard(i)));
  for (let i = 0; i < parts.length; i++) {
    logShardSize(i, parts[i] ?? []);
  }
  const index = await getCachedWineSitemapIndex();
  const wines = parts.flat();
  if (wines.length === 0) {
    console.error("[catalog] warm produced no wines");
    return emptyCatalog();
  }
  return catalogFromWines(wines, index.generatedAt || wines[0]?.updated || emptyCatalog().generatedAt);
}

export const getWineBySlug = cache(async (slug: string): Promise<CanonicalWine | null> => {
  const shard = await readWineShard(wineShardIndex(slug));
  return shard.find((w) => w.slug === slug) ?? null;
});
