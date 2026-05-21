import type { RecipeFrontmatter } from "@/lib/content/recipe-types";

/** Normaliserer frontmatter-dato til YYYY-MM-DD til JSON-LD. */
export function normalizeRecipeDate(iso: string | undefined, fallback: string): string {
  const raw = (iso || fallback).trim().slice(0, 10);
  const d = new Date(`${raw}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return fallback.slice(0, 10);
  return raw.length >= 10 ? raw : d.toISOString().slice(0, 10);
}

export function recipePublicationAndModified(
  fm: Pick<RecipeFrontmatter, "published" | "updated">,
  fallbackDate: string,
) {
  const modified = normalizeRecipeDate(fm.updated, fallbackDate);
  const published = fm.published ? normalizeRecipeDate(fm.published, modified) : modified;
  return { datePublished: published, dateModified: modified };
}
