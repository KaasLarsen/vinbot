import { normalize } from "@/lib/search/helpers";
import type { CanonicalWine } from "@/lib/vine/types";
import { vineCatalogStyleFromBlob } from "@/lib/vine/catalog-style";

/** Laveste tilbudspris (til sammenligning i samme «hylde»). */
export function lowestShelfPrice(w: CanonicalWine): number | null {
  let m: number | null = null;
  for (const o of w.offers) {
    if (typeof o.price !== "number") continue;
    if (m == null || o.price < m) m = o.price;
  }
  return m;
}

function wineBlob(w: CanonicalWine): string {
  return `${w.displayTitle} ${w.category} ${w.brand}`;
}

/** Kategoritekst fra feeds: ofte «… > …» eller lignende — deles til sammenlignelige segmenter. */
function categorySegments(cat: string): string[] {
  return cat
    .split(/\s*[>|]\s*|\s*\/\s*/)
    .map((s) => normalize(s.replace(/\s+/g, " ").trim()))
    .filter((s) => s.length > 1);
}

/** Længste fælles suffiks af kategoritrin (fx Frankrig · Bordeaux matcher begge veje). */
function categorySuffixOverlap(a: string[], b: string[]): number {
  let pts = 0;
  const max = Math.min(a.length, b.length);
  for (let i = 1; i <= max; i++) {
    if (a[a.length - i] === b[b.length - i]) pts += 26;
    else break;
  }
  return pts;
}

function scoreRelated(current: CanonicalWine, other: CanonicalWine): number {
  if (other.id === current.id) return -Infinity;

  let score = 0;
  const blobC = wineBlob(current);
  const blobO = wineBlob(other);
  const styleC = vineCatalogStyleFromBlob(blobC);
  const styleO = vineCatalogStyleFromBlob(blobO);
  if (styleC && styleO && styleC === styleO) score += 44;

  const segsC = categorySegments(current.category);
  const segsO = categorySegments(other.category);
  if (segsC.length && segsO.length) score += categorySuffixOverlap(segsC, segsO);

  const fullC = normalize(current.category);
  const fullO = normalize(other.category);
  if (fullC.length > 6 && fullC === fullO) score += 32;

  const bC = normalize(current.brand);
  const bO = normalize(other.brand);
  if (bC.length > 2 && bC === bO) score += 16;

  const pC = lowestShelfPrice(current);
  const pO = lowestShelfPrice(other);
  if (pC != null && pO != null && pC > 0) {
    const ratio = Math.abs(pO - pC) / pC;
    if (ratio <= 0.25) score += 38;
    else if (ratio <= 0.45) score += 20;
    else if (ratio <= 0.65) score += 10;
  }

  return score;
}

export type PickRelatedWinesOptions = {
  /** Antal vine (standard 8). */
  limit?: number;
};

/**
 * Finder andre vine i kataloget ud fra stil (rød/hvid/rosé/bobler), overlappende kategori/ «sti»,
 * samme producent og pris i nærheden af denne vins laveste tilbudspris.
 */
export function pickRelatedWines(
  current: CanonicalWine,
  wines: CanonicalWine[],
  opts: PickRelatedWinesOptions = {},
): CanonicalWine[] {
  const limit = opts.limit ?? 8;
  const others = wines.filter((w) => w.id !== current.id);
  if (others.length === 0) return [];

  const ranked = others
    .map((w) => ({ w, s: scoreRelated(current, w) }))
    .sort((a, b) => b.s - a.s || b.w.offers.length - a.w.offers.length);

  const strong = ranked.filter((x) => x.s >= 28);
  let out: CanonicalWine[] = strong.slice(0, limit).map((x) => x.w);

  if (out.length < Math.min(4, limit)) {
    const seen = new Set(out.map((w) => w.id));
    for (const x of ranked) {
      if (x.s < 16) continue;
      if (seen.has(x.w.id)) continue;
      seen.add(x.w.id);
      out.push(x.w);
      if (out.length >= limit) break;
    }
  }

  if (out.length < 2) {
    out = ranked.filter((x) => x.s > 0).slice(0, limit).map((x) => x.w);
  }

  return out.slice(0, limit);
}
