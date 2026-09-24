import type { CanonicalWine } from "./types";

/** Kurateret mix på forsiden: alkoholfri + hvid + bobler + rød — opdater når feeds skifter. */
export const FEATURED_WINE_SLUGS = [
  "johnsen-wine-copenhagen-sparkling-tea-lysegrøn-9e4756b9",
  "riesling-2024-riesling-l-dr-loosen-515ff401",
  "chardonnay-pinot-noir-pinot-meunier-2019-rathfin-18692602",
  "tempranillo-2020-rioja-reserva-bodegas-ondarre-d38602fd",
] as const;

export const FEATURED_ALCOHOL_FREE_SLUGS = [
  "johnsen-wine-copenhagen-sparkling-tea-lysegrøn-9e4756b9",
] as const;

export type FeaturedWineSlug = (typeof FEATURED_WINE_SLUGS)[number];

type RoughStyle = "hvid" | "bobler" | "rod" | "rose";

const FALLBACK_STYLE_ORDER: RoughStyle[] = ["hvid", "bobler", "rod", "rose"];

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

/** Groft stilskøn til forside-fallback (uafhængigt af søge-engine). */
function roughStyleOf(wine: CanonicalWine): RoughStyle | null {
  const t = [wine.displayTitle, wine.brand, wine.category].filter(Boolean).join(" ").toLowerCase();
  if (/champagne|prosecco|cava|cr[eé]mant|mousserende|sparkling|\bbobler\b/.test(t)) return "bobler";
  if (/ros[eé]|rosevin/.test(t)) return "rose";
  if (/hvidvin|white wine|riesling|chardonnay|sauvignon|pinot grigio|gr[uü]ner/.test(t)) return "hvid";
  if (
    /rødvin|red wine|cabernet|merlot|pinot noir|tempranillo|sangiovese|rioja|chianti|syrah|shiraz|nebbiolo|malbec/.test(
      t,
    )
  ) {
    return "rod";
  }
  return null;
}

/**
 * Vælg op til `limit` flasker til forsiden.
 * Kuraterede slug'e først; mangler de i kataloget, fyldes op med stil-diversitet
 * (kataloget er allerede sorteret efter butiksantal).
 */
export function pickFeaturedHomeWinesFromCatalog(
  wines: CanonicalWine[],
  preferredSlugs: readonly string[] = FEATURED_WINE_SLUGS,
  alcoholFreeSlugs: readonly string[] = FEATURED_ALCOHOL_FREE_SLUGS,
  limit = 4,
): (CanonicalWine & { image: string })[] {
  const bySlug = new Map(wines.map((w) => [w.slug, w]));
  const picked: (CanonicalWine & { image: string })[] = [];
  const seen = new Set<string>();

  const push = (w: CanonicalWine | null | undefined): boolean => {
    const ok = withImage(w);
    if (!ok || seen.has(ok.slug)) return false;
    seen.add(ok.slug);
    picked.push(ok);
    return true;
  };

  for (const slug of alcoholFreeSlugs) push(bySlug.get(slug));
  if (!picked.some(wineLooksAlcoholFree)) {
    push(wines.find((w) => wineLooksAlcoholFree(w) && w.image) ?? null);
  }

  for (const slug of preferredSlugs) {
    if (picked.length >= limit) break;
    push(bySlug.get(slug));
  }

  if (picked.length < limit) {
    const haveStyles = new Set(picked.map(roughStyleOf).filter((s): s is RoughStyle => Boolean(s)));
    const alreadyHasAf = picked.some(wineLooksAlcoholFree);

    for (const style of FALLBACK_STYLE_ORDER) {
      if (picked.length >= limit) break;
      if (haveStyles.has(style)) continue;
      const candidate = wines.find((w) => {
        if (seen.has(w.slug) || !w.image) return false;
        if (alreadyHasAf && wineLooksAlcoholFree(w)) return false;
        return roughStyleOf(w) === style;
      });
      if (candidate && push(candidate)) haveStyles.add(style);
    }

    for (const w of wines) {
      if (picked.length >= limit) break;
      if (alreadyHasAf && wineLooksAlcoholFree(w)) continue;
      push(w);
    }
  }

  return picked.slice(0, limit);
}

/** Fire flasker til forsiden — altid mindst én alkoholfri hvis kataloget har en med billede. */
export async function resolveFeaturedHomeWines(): Promise<(CanonicalWine & { image: string })[]> {
  const { loadWineCatalog } = await import("@/lib/vine/catalog");
  const { wines } = await loadWineCatalog();
  return pickFeaturedHomeWinesFromCatalog(wines);
}
