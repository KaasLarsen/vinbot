import { normalize } from "@/lib/search/helpers";
import type { CanonicalWine } from "@/lib/vine/types";

const GONE_HASH_SUFFIX = /-([a-f0-9]{8})$/i;

/** Udtræk læsbar tekst fra en udløbet `/vine/[slug]` (uden hash-suffiks). */
export function parseGoneWineSlug(slug: string): { prefix: string; label: string } | null {
  const trimmed = slug.trim();
  const m = trimmed.match(GONE_HASH_SUFFIX);
  if (!m) return null;
  const prefix = trimmed.slice(0, -m[0].length).replace(/-+$/g, "");
  if (!prefix) return null;
  const label = prefix.replace(/-/g, " ").replace(/\s+/g, " ").trim();
  return { prefix, label: label || "vin" };
}

function tokenOverlapScore(slugTokens: string[], wine: CanonicalWine): number {
  const hay = `${wine.slug} ${normalize(wine.brand)} ${normalize(wine.displayTitle)}`;
  let score = 0;
  for (const t of slugTokens) {
    if (t.length < 3) continue;
    if (hay.includes(t)) score += 12;
  }
  return score;
}

/** Forslag til vine der stadig er i kataloget, ud fra en gammel slug. */
export function suggestWinesForGoneSlug(
  slug: string,
  wines: CanonicalWine[],
  limit = 8,
): CanonicalWine[] {
  if (!wines.length) return [];

  const parsed = parseGoneWineSlug(slug);
  if (!parsed) {
    return [...wines]
      .sort((a, b) => b.offers.length - a.offers.length)
      .slice(0, limit);
  }

  const tokens = parsed.prefix.split("-").filter((t) => t.length > 2);

  const ranked = wines
    .map((w) => {
      let score = 0;
      const max = Math.min(parsed.prefix.length, w.slug.length);
      let common = 0;
      while (common < max && parsed.prefix[common] === w.slug[common]) common++;
      score += common * 3;
      score += tokenOverlapScore(tokens, w);
      const brand = normalize(w.brand);
      if (brand.length > 2 && parsed.prefix.includes(brand.replace(/\s+/g, "-"))) score += 24;
      return { w, score };
    })
    .filter((x) => x.score >= 20)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.w.offers.length - a.w.offers.length ||
        a.w.displayTitle.localeCompare(b.w.displayTitle, "da", { sensitivity: "base" }),
    );

  if (ranked.length >= 2) return ranked.slice(0, limit).map((x) => x.w);

  const loose = wines
    .map((w) => ({ w, score: tokenOverlapScore(tokens, w) }))
    .filter((x) => x.score >= 12)
    .sort((a, b) => b.score - a.score || b.w.offers.length - a.w.offers.length);

  if (loose.length) return loose.slice(0, limit).map((x) => x.w);

  return [...wines]
    .sort((a, b) => b.offers.length - a.offers.length)
    .slice(0, limit);
}
