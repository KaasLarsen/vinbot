import { unstable_cache } from "next/cache";

import { FEEDS } from "@/lib/feeds/config";
import type { FeedProduct } from "@/lib/search/types";
import { getCachedFeedProducts } from "@/lib/search/fetch-feed";
import { isWineLike, normalize, productEligibleForWineSearch } from "@/lib/search/helpers";

import { pickBestDescription } from "./product-text";
import { shortHash, wineSlugFromId } from "./slug";
import type { CanonicalWine, VineOffer, WineCatalog } from "./types";

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
    return xa - xb || a.merchant.localeCompare(b.merchant, "da");
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
    offers: VineOffer[];
  };

  const clusters = new Map<string, Acc>();

  for (const feed of FEEDS) {
    let products: FeedProduct[];
    try {
      products = await getCachedFeedProducts(feed);
    } catch {
      continue;
    }
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
          offers: [],
        };
        clusters.set(key, acc);
      }
      acc.titles.push(p.title);
      if (!acc.brand && p.brand) acc.brand = p.brand.trim();
      if (!acc.category && p.category) acc.category = p.category.trim();
      if (!acc.gtin && p.gtin) acc.gtin = p.gtin;
      if (!acc.image && p.image?.trim()) acc.image = p.image.trim();

      acc.offers.push({
        merchant: p.merchant,
        price: p.price,
        currency: p.currency || "DKK",
        url: p.url,
        listingTitle: p.title,
      });
    }
  }

  const now = new Date().toISOString();
  const wines: CanonicalWine[] = [];

  for (const [key, acc] of clusters) {
    const displayTitle = pickDisplayTitle(acc.titles);
    const brand = acc.brand || "";
    const slug = wineSlugFromId(key, displayTitle, brand);
    const offers = mergeOffers(acc.offers);
    const description = pickBestDescription(acc.descriptions);
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

export const getCachedWineCatalog = unstable_cache(buildWineCatalog, ["vinbot-wine-catalog-v5"], {
  revalidate: 21600,
  tags: ["vinbot-feeds"],
});

export async function getWineBySlug(slug: string): Promise<CanonicalWine | null> {
  const { wines } = await getCachedWineCatalog();
  return wines.find((w) => w.slug === slug) ?? null;
}
