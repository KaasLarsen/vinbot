import type { CanonicalWine } from "@/lib/vine/types";
import { vineCatalogStyleFromBlob } from "@/lib/vine/catalog-style";
import type { TasteCandidate } from "./types";

const STYLE_LABEL: Record<string, string> = {
  rod: "Rød",
  hvid: "Hvid",
  rose: "Rosé",
  bobler: "Bobler",
};

/** Diverse kandidater til smagsprofil-wizard (stil-mix + billede). */
export function pickTasteCandidates(wines: CanonicalWine[], limit = 8): TasteCandidate[] {
  const withImage = wines.filter((w) => w.image);
  const buckets: Record<string, CanonicalWine[]> = {
    rod: [],
    hvid: [],
    rose: [],
    bobler: [],
    other: [],
  };

  for (const w of withImage) {
    const blob = [w.displayTitle, w.brand, w.category].filter(Boolean).join(" ");
    const style = vineCatalogStyleFromBlob(blob) ?? "other";
    const key = style in buckets ? style : "other";
    buckets[key].push(w);
  }

  const order = ["rod", "hvid", "bobler", "rose", "rod", "hvid", "bobler", "rose"];
  const picked: TasteCandidate[] = [];
  const seen = new Set<string>();

  for (const style of order) {
    if (picked.length >= limit) break;
    const list = buckets[style] ?? [];
    const w = list.find((x) => !seen.has(x.slug));
    if (!w) continue;
    seen.add(w.slug);
    picked.push({
      slug: w.slug,
      title: w.displayTitle,
      brand: w.brand,
      image: w.image,
      styleHint: STYLE_LABEL[style] ?? null,
    });
  }

  for (const w of withImage) {
    if (picked.length >= limit) break;
    if (seen.has(w.slug)) continue;
    seen.add(w.slug);
    const blob = [w.displayTitle, w.brand, w.category].filter(Boolean).join(" ");
    const style = vineCatalogStyleFromBlob(blob);
    picked.push({
      slug: w.slug,
      title: w.displayTitle,
      brand: w.brand,
      image: w.image,
      styleHint: style ? STYLE_LABEL[style] ?? null : null,
    });
  }

  return picked;
}
