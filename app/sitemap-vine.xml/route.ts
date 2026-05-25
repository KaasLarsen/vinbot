import { siteUrl } from "@/lib/site";
import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Kun vin-katalog-hub — individuelle `/vine/[slug]` er noindex (feed roterer).
 * Undgår at GSC indekserer tusindvis af midlertidige produkt-URL’er.
 */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const catalog = await getCachedWineCatalog();
  const lastmod = new Date(catalog.generatedAt);

  const xml = renderUrlset([
    {
      loc: `${base}/vine`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.55,
    },
  ]);

  return new Response(xml, sitemapResponseInit);
}
