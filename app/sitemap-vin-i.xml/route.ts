import path from "path";
import { getAllChains } from "@/lib/supermarket/chains";
import { siteUrl } from "@/lib/site";
import { fileLastModified } from "@/lib/sitemap-discovery";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";

export const dynamic = "force-dynamic";

/** /vin-i + /vin-i/[slug] */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const lastmod = fileLastModified(path.join(process.cwd(), "lib/supermarket/chains.ts"));

  const urls: SitemapUrl[] = [
    { loc: `${base}/vin-i`, lastmod },
    ...getAllChains().map((chain) => ({
      loc: `${base}/vin-i/${chain.slug}`,
      lastmod,
    })),
  ];

  return new Response(renderUrlset(urls), sitemapResponseInit);
}
