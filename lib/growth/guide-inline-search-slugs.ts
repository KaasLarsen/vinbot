/** Guides med inline vinsøgning (fase 2 — udvid efter GSC-data). */
export const GUIDE_INLINE_SEARCH_SLUGS = new Set([
  "vin-til-tapas",
  "vin-til-gryderet",
  "vin-til-nytaar-og-nytaarsmenu",
  "rodvin-til-pizza",
  "vin-til-fisk-og-skaldyr",
  "vin-til-grill-og-bbq",
  "vin-til-pizza",
  "bedste-vin-til-gave",
  "bobler-champagne-cava-prosecco-og-cremant",
]);

export function guideHasInlineSearch(slug: string): boolean {
  return GUIDE_INLINE_SEARCH_SLUGS.has(slug);
}
