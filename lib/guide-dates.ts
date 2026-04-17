import type { GuideFrontmatter } from "@/lib/content/guide-types";

/** Normaliserer frontmatter-dato til YYYY-MM-DD til JSON-LD. */
export function normalizeGuideDate(iso: string | undefined, fallback: string): string {
  const raw = (iso || fallback).trim().slice(0, 10);
  const d = new Date(`${raw}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return fallback.slice(0, 10);
  return raw.length >= 10 ? raw : d.toISOString().slice(0, 10);
}

/** Publiceret = eksplicit `published`,ellers samme som senest kendte revision (`updated`). */
export function guidePublicationAndModified(fm: Pick<GuideFrontmatter, "published" | "updated">, fallbackDate: string) {
  const modified = normalizeGuideDate(fm.updated, fallbackDate);
  const published = fm.published ? normalizeGuideDate(fm.published, modified) : modified;
  return { datePublished: published, dateModified: modified };
}
