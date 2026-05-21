import { siteUrl } from "@/lib/site";
import { filterIndexableRecipes, getAllRecipes } from "@/lib/content/recipes";
import { renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const recipes = filterIndexableRecipes(getAllRecipes());

  const xml = renderUrlset([
    {
      loc: `${base}/opskrifter`,
      changefreq: "weekly" as const,
      priority: 0.85,
    },
    ...recipes.map((r) => ({
      loc: `${base}/opskrifter/${r.slug}`,
      lastmod: r.updated ? new Date(r.updated) : new Date(r.fallbackDate),
      changefreq: "monthly" as const,
      priority: 0.8,
    })),
  ]);

  return new Response(xml, sitemapResponseInit);
}
