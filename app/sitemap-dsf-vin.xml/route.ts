import path from "path";

import { listDsfPopularWineSlugs } from "@/lib/dsf-popular-wines";
import { fileLastModified } from "@/lib/sitemap-discovery";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

/** Redaktionelle DSF-populær-vin sider (`/den-sidste-flaske/vin/...`). */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const lastmod = newerOf(
    fileLastModified(path.join(process.cwd(), "lib/dsf-popular-wines.ts")),
    fileLastModified(path.join(process.cwd(), "app/den-sidste-flaske/vin/[slug]/page.tsx")),
  );

  const urls: SitemapUrl[] = listDsfPopularWineSlugs().map((slug) => ({
    loc: `${base}/den-sidste-flaske/vin/${slug}`,
    lastmod,
    changefreq: "weekly" as const,
    priority: 0.65,
  }));

  return new Response(renderUrlset(urls), sitemapResponseInit);
}

function newerOf(a: Date, b: Date): Date {
  return a.getTime() >= b.getTime() ? a : b;
}
