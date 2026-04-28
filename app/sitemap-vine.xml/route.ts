import { siteUrl } from "@/lib/site";
import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const catalog = await getCachedWineCatalog();
  const lastmod = new Date(catalog.generatedAt);

  const xml = renderUrlset(
    catalog.wines.map((w) => ({
      loc: `${base}/vine/${w.slug}`,
      lastmod,
      changefreq: "weekly" as const,
      priority: 0.7,
    })),
  );

  return new Response(xml, sitemapResponseInit);
}
