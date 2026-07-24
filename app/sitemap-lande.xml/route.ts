import path from "path";
import { getAllLande } from "@/lib/lande/registry";
import { siteUrl } from "@/lib/site";
import { fileLastModified } from "@/lib/sitemap-discovery";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** /lande + /lande/[slug] */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const lastmod = fileLastModified(path.join(process.cwd(), "lib/lande/registry.ts"));

  const urls: SitemapUrl[] = [
    { loc: `${base}/lande`, lastmod },
    ...getAllLande().map((l) => ({
      loc: `${base}/lande/${l.slug}`,
      lastmod,
    })),
  ];

  return new Response(renderUrlset(urls), sitemapResponseInit);
}
