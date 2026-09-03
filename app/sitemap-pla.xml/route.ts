import { getSpsPlaCatalog } from "@/lib/pla/catalog";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";
import { siteUrl } from "@/lib/site";

export const revalidate = 21600;
export const maxDuration = 60;

export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const items = await getSpsPlaCatalog();
  const lastmod = new Date();
  const urls: SitemapUrl[] = items.map((p) => ({
    loc: `${base}/sps-wine/vin/${p.slug}`,
    lastmod,
    changefreq: "daily" as const,
    priority: 0.6,
  }));
  return new Response(renderUrlset(urls), sitemapResponseInit);
}
