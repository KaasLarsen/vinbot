import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import { DEN_SIDSTE_FLASKE_WINE_DETAIL_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-existing";
import { DEN_SIDSTE_FLASKE_PILOT_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-pilot";
import { DEN_SIDSTE_FLASKE_BATCH2_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-batch2";
import { DEN_SIDSTE_FLASKE_BATCH3_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-batch3";
import { DEN_SIDSTE_FLASKE_BATCH4_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-batch4";
import { DEN_SIDSTE_FLASKE_BATCH5_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-batch5";
import { DEN_SIDSTE_FLASKE_BATCH6_PAGES } from "@/lib/wine-detail-pages/pages/den-sidste-flaske-batch6";
import { LAURIDSEN_VINE_WINE_DETAIL_PAGES } from "@/lib/wine-detail-pages/pages/lauridsen-vine";
import { LAURIDSEN_VINE_BATCH2_PAGES } from "@/lib/wine-detail-pages/pages/lauridsen-vine-batch2";
import { LAURIDSEN_VINE_BATCH3_PAGES } from "@/lib/wine-detail-pages/pages/lauridsen-vine-batch3";
import { LAURIDSEN_VINE_BATCH4_PAGES } from "@/lib/wine-detail-pages/pages/lauridsen-vine-batch4";
import { LAURIDSEN_VINE_BATCH5_PAGES } from "@/lib/wine-detail-pages/pages/lauridsen-vine-batch5";
import { LAURIDSEN_VINE_BATCH6_PAGES } from "@/lib/wine-detail-pages/pages/lauridsen-vine-batch6";
import { WINTHER_VIN_WINE_DETAIL_PAGES } from "@/lib/wine-detail-pages/pages/winther-vin";
import { WINTHER_VIN_BATCH2_PAGES } from "@/lib/wine-detail-pages/pages/winther-vin-batch2";
import { WINTHER_VIN_BATCH3_PAGES } from "@/lib/wine-detail-pages/pages/winther-vin-batch3";
import { WINTHER_VIN_BATCH4_PAGES } from "@/lib/wine-detail-pages/pages/winther-vin-batch4";
import { WINTHER_VIN_BATCH5_PAGES } from "@/lib/wine-detail-pages/pages/winther-vin-batch5";
import { WINTHER_VIN_BATCH6_PAGES } from "@/lib/wine-detail-pages/pages/winther-vin-batch6";
import { DH_WINES_WINE_DETAIL_PAGES } from "@/lib/wine-detail-pages/pages/dh-wines";
import { DH_WINES_BATCH2_PAGES } from "@/lib/wine-detail-pages/pages/dh-wines-batch2";
import { DH_WINES_BATCH3_PAGES } from "@/lib/wine-detail-pages/pages/dh-wines-batch3";
import { DH_WINES_BATCH4_PAGES } from "@/lib/wine-detail-pages/pages/dh-wines-batch4";
import { DH_WINES_BATCH5_PAGES } from "@/lib/wine-detail-pages/pages/dh-wines-batch5";
import { DH_WINES_BATCH6_PAGES } from "@/lib/wine-detail-pages/pages/dh-wines-batch6";
import { JOHNSEN_WINE_WINE_DETAIL_PAGES } from "@/lib/wine-detail-pages/pages/johnsen-wine";
import { JOHNSEN_WINE_BATCH2_PAGES } from "@/lib/wine-detail-pages/pages/johnsen-wine-batch2";
import { JOHNSEN_WINE_BATCH3_PAGES } from "@/lib/wine-detail-pages/pages/johnsen-wine-batch3";
import { JOHNSEN_WINE_BATCH4_PAGES } from "@/lib/wine-detail-pages/pages/johnsen-wine-batch4";
import { JOHNSEN_WINE_BATCH5_PAGES } from "@/lib/wine-detail-pages/pages/johnsen-wine-batch5";
import { JOHNSEN_WINE_BATCH6_PAGES } from "@/lib/wine-detail-pages/pages/johnsen-wine-batch6";
import type { WineDetailFeaturedPick, WineDetailPage, WineDetailGuideRef, WineDetailSpec, WineDetailAside, WineDetailFoodPairing } from "@/lib/wine-detail-pages/types";

const ALL_PAGES: readonly WineDetailPage[] = [
  ...DEN_SIDSTE_FLASKE_WINE_DETAIL_PAGES,
  ...DEN_SIDSTE_FLASKE_PILOT_PAGES,
  ...DEN_SIDSTE_FLASKE_BATCH2_PAGES,
  ...DEN_SIDSTE_FLASKE_BATCH3_PAGES,
  ...DEN_SIDSTE_FLASKE_BATCH4_PAGES,
  ...DEN_SIDSTE_FLASKE_BATCH5_PAGES,
  ...DEN_SIDSTE_FLASKE_BATCH6_PAGES,
  ...LAURIDSEN_VINE_WINE_DETAIL_PAGES,
  ...LAURIDSEN_VINE_BATCH2_PAGES,
  ...LAURIDSEN_VINE_BATCH3_PAGES,
  ...LAURIDSEN_VINE_BATCH4_PAGES,
  ...LAURIDSEN_VINE_BATCH5_PAGES,
  ...LAURIDSEN_VINE_BATCH6_PAGES,
  ...WINTHER_VIN_WINE_DETAIL_PAGES,
  ...WINTHER_VIN_BATCH2_PAGES,
  ...WINTHER_VIN_BATCH3_PAGES,
  ...WINTHER_VIN_BATCH4_PAGES,
  ...WINTHER_VIN_BATCH5_PAGES,
  ...WINTHER_VIN_BATCH6_PAGES,
  ...DH_WINES_WINE_DETAIL_PAGES,
  ...DH_WINES_BATCH2_PAGES,
  ...DH_WINES_BATCH3_PAGES,
  ...DH_WINES_BATCH4_PAGES,
  ...DH_WINES_BATCH5_PAGES,
  ...DH_WINES_BATCH6_PAGES,
  ...JOHNSEN_WINE_WINE_DETAIL_PAGES,
  ...JOHNSEN_WINE_BATCH2_PAGES,
  ...JOHNSEN_WINE_BATCH3_PAGES,
  ...JOHNSEN_WINE_BATCH4_PAGES,
  ...JOHNSEN_WINE_BATCH5_PAGES,
  ...JOHNSEN_WINE_BATCH6_PAGES,
];

function normalizedProductKey(merchantId: MerchantWineId, url: string): string {
  return getMerchantWineConfig(merchantId).sanitizeProductUrl(url);
}

export function listAllWineDetailPages(): readonly WineDetailPage[] {
  return ALL_PAGES;
}

export function listWineDetailSlugsForMerchant(merchantId: MerchantWineId): string[] {
  return ALL_PAGES.filter((p) => p.merchantId === merchantId).map((p) => p.slug);
}

export function getWineDetailPage(merchantId: MerchantWineId, slug: string): WineDetailPage | undefined {
  return ALL_PAGES.find((p) => p.merchantId === merchantId && p.slug === slug);
}

/** Alle kuraterede sider for én forhandler — til relaterede flasker på detail-siden. */
export function listWineDetailPagesForMerchant(merchantId: MerchantWineId): readonly WineDetailPage[] {
  return ALL_PAGES.filter((p) => p.merchantId === merchantId);
}

export function wineDetailPageUrl(page: WineDetailPage): string {
  return getMerchantWineConfig(page.merchantId).hubPath + `/vin/${page.slug}`;
}

/** Til featured-kort og krydslinks — match på sanitiseret produkt-URL inden for samme forhandler. */
export function wineDetailSlugForProductUrl(merchantId: MerchantWineId, productUrl: string): string | undefined {
  const key = normalizedProductKey(merchantId, productUrl);
  for (const page of ALL_PAGES) {
    if (page.merchantId !== merchantId) continue;
    if (normalizedProductKey(merchantId, page.productPageUrl) === key) return page.slug;
  }
  return undefined;
}

/** Match kurateret side ud fra vilkårlig butiks-URL (typisk fra katalog-tilbud). */
export function findWineDetailPageByProductUrl(productUrl: string): WineDetailPage | undefined {
  for (const page of ALL_PAGES) {
    try {
      if (normalizedProductKey(page.merchantId, page.productPageUrl) === normalizedProductKey(page.merchantId, productUrl)) {
        return page;
      }
    } catch {
      continue;
    }
  }
  return undefined;
}

/** Kuraterede sider der linker til en given guide via `guideRefs`. */
export function listWineDetailPagesForGuide(guideSlug: string, limit = 3): WineDetailPage[] {
  return ALL_PAGES.filter((p) => p.guideRefs.some((r) => r.slug === guideSlug)).slice(0, limit);
}

export function wineDetailPageToFeaturedPick(page: WineDetailPage): WineDetailFeaturedPick {
  const cfg = getMerchantWineConfig(page.merchantId);
  return {
    merchantId: page.merchantId,
    title: page.displayTitle,
    blurb: page.structuredDescriptionSnippet ?? page.metaDescription.slice(0, 240),
    productUrl: cfg.sanitizeProductUrl(page.productPageUrl),
    imageUrl: page.imageUrl,
    listPrice: page.listPrice,
    priceCurrency: page.priceCurrency ?? "DKK",
    volumePrices: page.volumePrices,
  };
}

/** Sitemap: alle `{merchant}/vin/{slug}`-stier. */
export function listAllWineDetailSitemapEntries(): { path: string; merchantId: MerchantWineId; slug: string }[] {
  return ALL_PAGES.map((p) => ({
    merchantId: p.merchantId,
    slug: p.slug,
    path: wineDetailPageUrl(p),
  }));
}

// --- Backward-compatible DSF aliases (overgangsfase) ---

export function listDsfPopularWineSlugs(): string[] {
  return listWineDetailSlugsForMerchant("den-sidste-flaske");
}

export function getDsfPopularWineBySlug(slug: string): WineDetailPage | undefined {
  return getWineDetailPage("den-sidste-flaske", slug);
}

export function dsfPopularWineDetailSlugForProductUrl(productUrl: string): string | undefined {
  return wineDetailSlugForProductUrl("den-sidste-flaske", productUrl);
}

export function popularWineToFeaturedPick(page: WineDetailPage): WineDetailFeaturedPick {
  return wineDetailPageToFeaturedPick(page);
}

export type { WineDetailPage as DsfPopularWinePage };
export type { WineDetailGuideRef as DsfPopularWineGuideRef };
export type { WineDetailSpec as DsfPopularWineSpec };
export type { WineDetailAside as DsfPopularWineAside };
export type { WineDetailFoodPairing as DsfPopularWineFoodPairing };
