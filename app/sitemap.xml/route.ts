import { unstable_cache } from "next/cache";

import path from "path";

import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { siteUrl } from "@/lib/site";
import { listGuides } from "@/lib/content/guides";
import { getAllRecipes } from "@/lib/content/recipes";
import { classifyGuide } from "@/lib/sitemap-categories";
import { discoverStaticAppRoutes, fileLastModified } from "@/lib/sitemap-discovery";
import { renderIndex, sitemapResponseInit } from "@/lib/sitemap-xml";

/** Undgår timeout ved kolde starts (tungere end undersitemaps: guides + disk-scan + vin-katalog). */
export const maxDuration = 60;

/** Opdater ved hvert crawl (korrekt efter deploy + nye guides). */
export const dynamic = "force-dynamic";

function newest(dates: Date[]): Date | undefined {
  if (!dates.length) return undefined;
  return dates.reduce((a, b) => (a.getTime() >= b.getTime() ? a : b));
}

async function buildSitemapIndexXml(): Promise<string> {
  const base = siteUrl.replace(/\/$/, "");

  const guides = listGuides();
  const byCat = {
    mad: [] as Date[],
    druer: [] as Date[],
    regioner: [] as Date[],
    bedste: [] as Date[],
    viden: [] as Date[],
    andre: [] as Date[],
  };
  for (const g of guides) {
    const d = g.updated ? new Date(g.updated) : new Date();
    const safe = Number.isNaN(d.getTime()) ? new Date() : d;
    byCat[classifyGuide(g.slug)].push(safe);
  }

  const pagesLastmod = newest(
    discoverStaticAppRoutes().map(({ pageFile }) => fileLastModified(pageFile)),
  );

  const catalog = await getCachedWineCatalog();
  const vineLastmod = new Date(catalog.generatedAt);

  const recipesLastmod = newest(
    getAllRecipes().map((r) => {
      const d = r.updated ? new Date(r.updated) : new Date(r.fallbackDate);
      return Number.isNaN(d.getTime()) ? new Date() : d;
    }),
  );

  const wineDetailLastmod = newest([
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/registry.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-existing.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-pilot.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch3.ts")),
  ]);

  return renderIndex([
    { loc: `${base}/sitemap-pages.xml`, lastmod: pagesLastmod },
    { loc: `${base}/sitemap-vine.xml`, lastmod: vineLastmod },
    { loc: `${base}/sitemap-opskrifter.xml`, lastmod: recipesLastmod },
    { loc: `${base}/sitemap-wine-detail.xml`, lastmod: wineDetailLastmod },
    { loc: `${base}/sitemap-mad.xml`, lastmod: newest(byCat.mad) },
    { loc: `${base}/sitemap-druer.xml`, lastmod: newest(byCat.druer) },
    { loc: `${base}/sitemap-regioner.xml`, lastmod: newest(byCat.regioner) },
    { loc: `${base}/sitemap-bedste.xml`, lastmod: newest(byCat.bedste) },
    { loc: `${base}/sitemap-viden.xml`, lastmod: newest(byCat.viden) },
    { loc: `${base}/sitemap-andre.xml`, lastmod: newest(byCat.andre) },
  ]);
}

/**
 * Cache kort — indekset er et let XML-dokument, men **generering** kan være langsom (I/O).
 * Undersitemaps som `sitemap-vine.xml` kalder kun ét dataset og rammer sjældnere timeout i GSC.
 */
const getCachedSitemapIndexXml = unstable_cache(buildSitemapIndexXml, ["vinbot-sitemap-index-v1"], {
  revalidate: 300,
  tags: ["sitemap-index", "vinbot-feeds"],
});

/**
 * Sitemap-index:
 *   /sitemap.xml → peger på under-sitemaps opdelt efter indholdstype.
 * Submit dette i Google Search Console — hver underfil får egne indekseringsrapporter.
 */
export async function GET(): Promise<Response> {
  const xml = await getCachedSitemapIndexXml();
  return new Response(xml, sitemapResponseInit);
}
