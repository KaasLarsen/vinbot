import type { MetadataRoute } from "next";
import { listGuides } from "@/lib/content/guides";
import { discoverStaticAppRoutes, fileLastModified } from "@/lib/sitemap-discovery";
import { siteUrl } from "@/lib/site";

/**
 * Sitemap-kilder (ved nyt indhold — ingen manuel URL-liste for guides):
 * 1. Statiske App Router-sider via discoverStaticAppRoutes (ikke dynamiske guide-URL'er).
 * 2. Alle MDX-filer i content/guides med frontmatter → /guides/{slug} via listGuides.
 * Ny guide: tilføj .mdx og sæt updated. Ny dynamisk route-type: udvid sitemap her.
 */
/** Altid frisk sitemap ved crawl (korrekt efter deploy; lastModified fra fil og guide-datoer). */
export const dynamic = "force-dynamic";

function parseGuideDate(iso: string | undefined): Date {
  if (!iso) return new Date();
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl.replace(/\/$/, "");

  const staticRoutes = discoverStaticAppRoutes();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ pathname, pageFile }) => {
    const url = pathname === "/" ? base : `${base}${pathname}`;
    const lastModified = fileLastModified(pageFile);
    const priority = pathname === "/" ? 1 : pathname.split("/").length <= 2 ? 0.85 : 0.8;
    return {
      url,
      lastModified,
      changeFrequency: pathname === "/" ? ("daily" as const) : ("weekly" as const),
      priority,
    };
  });

  const guides = listGuides().map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: parseGuideDate(g.updated),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const byUrl = new Map<string, MetadataRoute.Sitemap[0]>();

  for (const entry of staticEntries) {
    byUrl.set(entry.url, entry);
  }
  for (const entry of guides) {
    byUrl.set(entry.url, entry);
  }

  return Array.from(byUrl.values()).sort((a, b) => a.url.localeCompare(b.url, "da"));
}
