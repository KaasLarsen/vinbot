import { siteUrl } from "@/lib/site";
import { guidesByCategory } from "@/lib/sitemap-categories";
import { guideToUrl, renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** Mad & vin: vin-til-*, komplet guide og rosévin + sommer. */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const urls = guidesByCategory("mad").map((g) => guideToUrl(base, g));
  return new Response(renderUrlset(urls), sitemapResponseInit);
}
