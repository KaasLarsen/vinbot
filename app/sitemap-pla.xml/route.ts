import { getPlaCatalog } from "@/lib/pla/catalog";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";
import { wineDetailPagePath } from "@/lib/wine-detail-pages/merchants";
import { siteUrl } from "@/lib/site";

export const revalidate = 21600;
export const maxDuration = 60;

export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const items = await getPlaCatalog();
  const lastmod = new Date();
  const urls: SitemapUrl[] = items.map((p) => ({
    loc: `${base}${wineDetailPagePath(p.merchantId, p.slug)}`,
    lastmod,
    changefreq: "daily" as const,
    priority: 0.6,
  }));
  return new Response(renderUrlset(urls), sitemapResponseInit);
}
