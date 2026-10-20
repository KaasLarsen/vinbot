import { siteUrl } from "@/lib/site";
import { getCachedWineSitemapIndex } from "@/lib/vine/catalog";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";

export const revalidate = 21600;
export const maxDuration = 60;

/**
 * Vin-katalog-hub + alle aktuelle `/vine/[slug]` fra feed-kataloget.
 * Gone/404-slugs er ikke i kataloget og listes ikke.
 */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const index = await getCachedWineSitemapIndex();
  const lastmod = new Date(index.generatedAt);

  const urls: SitemapUrl[] = [
    {
      loc: `${base}/vine`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.55,
    },
    ...index.slugs.map((slug) => ({
      loc: `${base}/vine/${slug}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return new Response(renderUrlset(urls), sitemapResponseInit);
}
