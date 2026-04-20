import { siteUrl } from "@/lib/site";
import { discoverStaticAppRoutes, fileLastModified } from "@/lib/sitemap-discovery";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** Statiske App Router-sider (hub-sider, forside, info). */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const urls: SitemapUrl[] = discoverStaticAppRoutes().map(({ pathname, pageFile }) => {
    const loc = pathname === "/" ? base : `${base}${pathname}`;
    const priority = pathname === "/" ? 1 : pathname.split("/").length <= 2 ? 0.85 : 0.8;
    return {
      loc,
      lastmod: fileLastModified(pageFile),
      changefreq: pathname === "/" ? "daily" : "weekly",
      priority,
    };
  });

  return new Response(renderUrlset(urls), sitemapResponseInit);
}
