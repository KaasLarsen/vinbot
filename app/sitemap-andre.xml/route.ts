import { siteUrl } from "@/lib/site";
import { indexableGuidesByCategory } from "@/lib/sitemap-categories";
import { guideToUrl, renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const revalidate = 21600;

/** Andre guides: bobler, opbevaring, naturvin, begreber, etikette, stemning, køb-online m.fl. */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const urls = indexableGuidesByCategory("andre").map((g) => guideToUrl(base, g));
  return new Response(renderUrlset(urls), sitemapResponseInit);
}
