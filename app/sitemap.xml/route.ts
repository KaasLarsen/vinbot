import { siteUrl } from "@/lib/site";
import { listGuides } from "@/lib/content/guides";
import { classifyGuide } from "@/lib/sitemap-categories";
import { discoverStaticAppRoutes, fileLastModified } from "@/lib/sitemap-discovery";
import { renderIndex, sitemapResponseInit } from "@/lib/sitemap-xml";

/** Opdater ved hvert crawl (korrekt efter deploy + nye guides). */
export const dynamic = "force-dynamic";

function newest(dates: Date[]): Date | undefined {
  if (!dates.length) return undefined;
  return dates.reduce((a, b) => (a.getTime() >= b.getTime() ? a : b));
}

/**
 * Sitemap-index:
 *   /sitemap.xml → peger på fem under-sitemaps opdelt efter indholdstype.
 * Submit dette i Google Search Console — hver underfil får egne indekseringsrapporter.
 */
export async function GET(): Promise<Response> {
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

  const xml = renderIndex([
    { loc: `${base}/sitemap-pages.xml`, lastmod: pagesLastmod },
    { loc: `${base}/sitemap-mad.xml`, lastmod: newest(byCat.mad) },
    { loc: `${base}/sitemap-druer.xml`, lastmod: newest(byCat.druer) },
    { loc: `${base}/sitemap-regioner.xml`, lastmod: newest(byCat.regioner) },
    { loc: `${base}/sitemap-bedste.xml`, lastmod: newest(byCat.bedste) },
    { loc: `${base}/sitemap-viden.xml`, lastmod: newest(byCat.viden) },
    { loc: `${base}/sitemap-andre.xml`, lastmod: newest(byCat.andre) },
  ]);

  return new Response(xml, sitemapResponseInit);
}
