import type { GuideFrontmatter } from "@/lib/content/guides";

/** Én URL i et sub-sitemap. */
export type SitemapUrl = {
  loc: string;
  lastmod?: Date;
  changefreq?: "daily" | "weekly" | "monthly" | "yearly";
  priority?: number;
};

/** Én post i et sitemap-index. */
export type SitemapIndexEntry = {
  loc: string;
  lastmod?: Date;
};

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';

function iso(d: Date | undefined): string | undefined {
  if (!d) return undefined;
  return d.toISOString();
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Render en urlset-sitemap (<urlset>...</urlset>). */
export function renderUrlset(urls: SitemapUrl[]): string {
  const items = urls
    .map((u) => {
      const parts = [`    <loc>${escapeXml(u.loc)}</loc>`];
      const lm = iso(u.lastmod);
      if (lm) parts.push(`    <lastmod>${lm}</lastmod>`);
      if (u.changefreq) parts.push(`    <changefreq>${u.changefreq}</changefreq>`);
      if (typeof u.priority === "number") parts.push(`    <priority>${u.priority.toFixed(1)}</priority>`);
      return `  <url>\n${parts.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `${XML_HEADER}\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

/** Render et sitemap-index (<sitemapindex>...</sitemapindex>). */
export function renderIndex(entries: SitemapIndexEntry[]): string {
  const items = entries
    .map((e) => {
      const parts = [`    <loc>${escapeXml(e.loc)}</loc>`];
      const lm = iso(e.lastmod);
      if (lm) parts.push(`    <lastmod>${lm}</lastmod>`);
      return `  <sitemap>\n${parts.join("\n")}\n  </sitemap>`;
    })
    .join("\n");

  return `${XML_HEADER}\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>\n`;
}

/** Konverter guide-frontmatter til en SitemapUrl. */
export function guideToUrl(base: string, g: GuideFrontmatter): SitemapUrl {
  const d = g.updated ? new Date(g.updated) : new Date();
  const lastmod = Number.isNaN(d.getTime()) ? new Date() : d;
  return {
    loc: `${base}/guides/${g.slug}`,
    lastmod,
    changefreq: "weekly",
    priority: 0.9,
  };
}

/** Standard XML-response headers til sitemap-ruter. */
export const sitemapResponseInit: ResponseInit = {
  headers: {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=86400",
  },
};
