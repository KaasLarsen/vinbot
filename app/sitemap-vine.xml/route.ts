import { siteUrl } from "@/lib/site";
import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { FEATURED_WINE_SLUGS } from "@/lib/vine/featured-slugs";
import { pickWineSitemapSlugs, WINE_SITEMAP_SLUG_LIMIT } from "@/lib/vine/sitemap-slugs";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";

export const revalidate = 21600;
export const maxDuration = 60;

/**
 * Vin-katalog-hub + capped `/vine/[slug]` (featured + billed-vine).
 * Cap begrænser crawl-bølger / CDN-spikes; øvrige sider findes via interne links.
 */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const catalog = await getCachedWineCatalog();
  const lastmod = new Date(catalog.generatedAt);
  const slugs = pickWineSitemapSlugs(catalog.wines, FEATURED_WINE_SLUGS, WINE_SITEMAP_SLUG_LIMIT);

  const urls: SitemapUrl[] = [
    {
      loc: `${base}/vine`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.55,
    },
    ...slugs.map((slug) => ({
      loc: `${base}/vine/${slug}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return new Response(renderUrlset(urls), sitemapResponseInit);
}
