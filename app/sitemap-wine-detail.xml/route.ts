import path from "path";

import { listAllWineDetailSitemapEntries } from "@/lib/wine-detail-pages/registry";
import { fileLastModified } from "@/lib/sitemap-discovery";
import { renderUrlset, sitemapResponseInit, type SitemapUrl } from "@/lib/sitemap-xml";
import { siteUrl } from "@/lib/site";

export const revalidate = 300;

/** Kuraterede enkeltvin-sider på tværs af forhandlere (`/{forhandler}/vin/...`). */
export async function GET(): Promise<Response> {
  const base = siteUrl.replace(/\/$/, "");
  const lastmod = newestOf(
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/registry.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-existing.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-pilot.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch2.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch3.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch4.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch4.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch4.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch4.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch4.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch5.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch5.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch5.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch5.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch5.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/den-sidste-flaske-batch6.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/lauridsen-vine-batch6.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/winther-vin-batch6.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/dh-wines-batch6.ts")),
    fileLastModified(path.join(process.cwd(), "lib/wine-detail-pages/pages/johnsen-wine-batch6.ts")),
  );

  const urls: SitemapUrl[] = listAllWineDetailSitemapEntries().map(({ path: p }) => ({
    loc: `${base}${p}`,
    lastmod,
    changefreq: "weekly" as const,
    priority: 0.65,
  }));

  return new Response(renderUrlset(urls), sitemapResponseInit);
}

function newestOf(...dates: Date[]): Date {
  return dates.reduce((a, b) => (a.getTime() >= b.getTime() ? a : b));
}
