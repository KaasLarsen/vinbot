/** Max produkt-URL’er i sitemap-vine — begrænser crawl-bølger / CDN-spikes. */
export const WINE_SITEMAP_SLUG_LIMIT = 500;

type SitemapWine = {
  slug: string;
  image: string | null;
};

/**
 * Featured først, derefter vine med billede (stabil slug-sortering).
 * Holder sitemap under CDN-alert-niveau uden at noindexe resten.
 */
export function pickWineSitemapSlugs(
  wines: readonly SitemapWine[],
  featured: readonly string[],
  limit: number = WINE_SITEMAP_SLUG_LIMIT,
): string[] {
  if (limit <= 0 || wines.length === 0) return [];

  const bySlug = new Map(wines.map((w) => [w.slug, w]));
  const out: string[] = [];
  const seen = new Set<string>();

  for (const slug of featured) {
    if (!bySlug.has(slug) || seen.has(slug)) continue;
    out.push(slug);
    seen.add(slug);
    if (out.length >= limit) return out;
  }

  const rest = wines
    .filter((w) => !seen.has(w.slug) && Boolean(w.image))
    .map((w) => w.slug)
    .sort((a, b) => a.localeCompare(b));

  for (const slug of rest) {
    out.push(slug);
    if (out.length >= limit) break;
  }

  return out;
}
