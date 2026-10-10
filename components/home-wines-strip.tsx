import { looksLikeWineCabinetOrAromaKit } from "@/lib/search/non-wine-cabinet";
import { resolveFeaturedHomeWines } from "@/lib/vine/featured-slugs";
import { loadWineCatalog } from "@/lib/vine/catalog";
import { HomeWinesStripClient } from "@/components/home-wines-strip-client";
import type { CanonicalWine } from "@/lib/vine/types";

function isBottle(wine: CanonicalWine): boolean {
  return !looksLikeWineCabinetOrAromaKit({
    title: [wine.displayTitle, wine.brand].filter(Boolean).join(" "),
    category: wine.category,
  });
}

/** Server: hent flere kandidater; klient re-ranker efter smagsprofil. */
export async function HomeWinesStrip() {
  const [{ wines: catalog }, featured] = await Promise.all([loadWineCatalog(), resolveFeaturedHomeWines()]);

  const bySlug = new Map(catalog.map((w) => [w.slug, w]));
  const pool: (typeof featured)[number][] = [];
  const seen = new Set<string>();

  for (const w of featured) {
    if (!w.image || seen.has(w.slug) || !isBottle(w)) continue;
    seen.add(w.slug);
    pool.push(w);
  }

  for (const w of catalog) {
    if (pool.length >= 16) break;
    if (!w.image || seen.has(w.slug) || !isBottle(w)) continue;
    seen.add(w.slug);
    pool.push(w as (typeof featured)[number]);
  }

  // Sørg for featured først i default-rækkefølge når der ingen profil er
  const orderedDefault = [
    ...featured.filter((w) => isBottle(w) && (bySlug.has(w.slug) || w.image)),
    ...pool.filter((w) => !featured.some((f) => f.slug === w.slug)),
  ].slice(0, 16);

  if (orderedDefault.length === 0) return null;

  return <HomeWinesStripClient wines={orderedDefault} />;
}
