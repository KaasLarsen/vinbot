import type { DrinkFrontmatter } from "@/lib/content/drink-types";

export function normalizeDrinkDate(iso: string | undefined, fallback: string): string {
  const raw = (iso || fallback).trim().slice(0, 10);
  const d = new Date(`${raw}T12:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return fallback.slice(0, 10);
  return raw.length >= 10 ? raw : d.toISOString().slice(0, 10);
}

export function drinkPublicationAndModified(
  fm: Pick<DrinkFrontmatter, "published" | "updated">,
  fallbackDate: string,
) {
  const modified = normalizeDrinkDate(fm.updated, fallbackDate);
  const published = fm.published ? normalizeDrinkDate(fm.published, modified) : modified;
  return { datePublished: published, dateModified: modified };
}
