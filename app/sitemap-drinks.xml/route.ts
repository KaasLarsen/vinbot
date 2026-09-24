import { siteUrl } from "@/lib/site";
import { getAllDrinks } from "@/lib/content/drinks";
import { renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const drinks = getAllDrinks();

  const xml = renderUrlset([
    {
      loc: `${base}/drinks`,
      changefreq: "weekly" as const,
      priority: 0.85,
    },
    ...drinks.map((d) => ({
      loc: `${base}/drinks/${d.slug}`,
      lastmod: d.updated ? new Date(d.updated) : new Date(d.fallbackDate),
      changefreq: "monthly" as const,
      priority: 0.8,
    })),
  ]);

  return new Response(xml, sitemapResponseInit);
}
