import { loadWineCatalog } from "@/lib/vine/catalog";
import type { CanonicalWine } from "@/lib/vine/types";

/** Kurateret mix på forsiden: rød, hvid, bobler + alkoholfri sparkling — opdater når feeds skifter. */
export const FEATURED_WINE_SLUGS = [
  "chateau-chateau-del-ish-sparkling-espumante-alko-b092e0bc",
  "rapaura-springs-rapaura-springs-sauvignon-blanc-4daa24a0",
  "laurent-perrier-champagne-laurent-perrier-cuvee-0c705d33",
  "hamilton-russell-hamilton-russell-pinot-noir-202-feeca1a9",
] as const;

export const FEATURED_ALCOHOL_FREE_SLUGS = [
  "chateau-chateau-del-ish-sparkling-espumante-alko-b092e0bc",
] as const;

export type FeaturedWineSlug = (typeof FEATURED_WINE_SLUGS)[number];

export function wineLooksAlcoholFree(wine: CanonicalWine): boolean {
  const blob = [wine.displayTitle, wine.brand, wine.category, wine.description, ...wine.alternateListingTitles]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return /alkoholfri|\b0[,.]0\s*%/.test(blob);
}

function withImage(wine: CanonicalWine | null | undefined): (CanonicalWine & { image: string }) | null {
  if (!wine?.image) return null;
  return wine as CanonicalWine & { image: string };
}

/** Fire flasker til forsiden — altid mindst én alkoholfri hvis kataloget har en med billede. */
export async function resolveFeaturedHomeWines(): Promise<(CanonicalWine & { image: string })[]> {
  const { wines } = await loadWineCatalog();
  const bySlug = new Map(wines.map((w) => [w.slug, w]));

  const picked: (CanonicalWine & { image: string })[] = [];
  const seen = new Set<string>();

  const push = (w: CanonicalWine | null | undefined) => {
    const ok = withImage(w);
    if (!ok || seen.has(ok.slug)) return;
    seen.add(ok.slug);
    picked.push(ok);
  };

  for (const slug of FEATURED_ALCOHOL_FREE_SLUGS) push(bySlug.get(slug));
  if (!picked.some(wineLooksAlcoholFree)) {
    push(wines.find((w) => wineLooksAlcoholFree(w) && w.image) ?? null);
  }

  for (const slug of FEATURED_WINE_SLUGS) {
    if (picked.length >= 4) break;
    push(bySlug.get(slug));
  }

  return picked.slice(0, 4);
}
