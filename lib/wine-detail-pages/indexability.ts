import { MIN_INDEXABLE_WORDS_WINE_DETAIL } from "@/lib/content/thresholds";
import type { WineDetailPage } from "@/lib/wine-detail-pages/types";

/** Redaktionelt ordantal på kurateret vinside (ekskl. specs og pris). */
export function wineDetailEditorialWordCount(page: WineDetailPage): number {
  const parts = [
    page.structuredDescriptionSnippet ?? "",
    ...page.bodyParagraphs,
    page.imageAside?.heading ?? "",
    ...(page.imageAside?.bullets ?? []),
    page.imageAside?.footnote ?? "",
    page.foodPairing?.heading ?? "",
    page.foodPairing?.lead ?? "",
    ...(page.foodPairing?.dishes ?? []),
    page.foodPairing?.lessIdeal ?? "",
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

/** Kuraterede vinsider under MIN_INDEXABLE_WORDS_WINE_DETAIL er noindex, men stadig tilgængelige. */
export function isIndexableWineDetailPage(page: WineDetailPage): boolean {
  return wineDetailEditorialWordCount(page) >= MIN_INDEXABLE_WORDS_WINE_DETAIL;
}
