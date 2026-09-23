import { siteUrl } from "@/lib/site";
import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Vin-katalog-hub + alle aktuelle `/vine/[slug]` fra feed-kataloget.
 * Gone/404-slugs er ikke i kataloget og listes ikke.
 */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const catalog = await getCachedWineCatalog();
  const lastmod = new Date(catalog.generatedAt);

  const urls: SitemapUrl[] = [
    {
      loc: `${base}/vine`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.55,
    },
    ...catalog.wines.map((w) => ({
      loc: `${base}/vine/${w.slug}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return new Response(renderUrlset(urls), sitemapResponseInit);
}
