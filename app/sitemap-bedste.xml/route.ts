import { siteUrl } from "@/lib/site";
import { guidesByCategory } from "@/lib/sitemap-categories";
import { guideToUrl, renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** Bedste vine: bedste-* top-lister (pris, lejlighed, stil, region, drue). */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const urls = guidesByCategory("bedste").map((g) => guideToUrl(base, g));
  return new Response(renderUrlset(urls), sitemapResponseInit);
}
