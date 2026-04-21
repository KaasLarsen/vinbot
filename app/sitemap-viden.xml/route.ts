import { siteUrl } from "@/lib/site";
import { guidesByCategory } from "@/lib/sitemap-categories";
import { guideToUrl, renderUrlset, sitemapResponseInit } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** Vinviden: hvor længe holder, hvor mange glas, hvad er X, sådan gør du. */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const urls = guidesByCategory("viden").map((g) => guideToUrl(base, g));
  return new Response(renderUrlset(urls), sitemapResponseInit);
}
