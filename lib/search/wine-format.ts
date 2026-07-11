import type { ProductHit } from "./types";
import { normalize } from "./helpers";

export type WineFormatFilter = "bag-in-box";

/** Søgetermer der kun beskriver format — ikke mærke/region. */
export const BIB_FORMAT_TERMS = new Set([
  "bib",
  "bag-in-box",
  "papvin",
  "boxvin",
  "box",
  "bag",
  "boks",
  "liter",
  "liters",
]);

export function brandTermsBeyondFormat(terms: string[]): string[] {
  return terms.filter((t) => t.length > 2 && !BIB_FORMAT_TERMS.has(t));
}

function productText(p: Pick<ProductHit, "_search" | "title" | "desc" | "category">): string {
  return normalize([p.title, p.desc, p.category, p._search].filter(Boolean).join(" "));
}

/** True for bag-in-box / papvin / BiB — ikke magnum-flasker eller tilbehør. */
export function productIsBagInBox(p: Pick<ProductHit, "_search" | "title" | "desc" | "category">): boolean {
  const t = productText(p);

  if (/\bbib\b/.test(t)) return true;
  if (t.includes("bag-in-box") || t.includes("bag in box")) return true;
  if (t.includes("papvin") || t.includes("boxvin")) return true;

  return false;
}

/** Eksplicit BiB/papvin/boxvin i søgefeltet. */
export function wineFormatIntentFromQuery(q = ""): WineFormatFilter | null {
  const t = normalize(q);
  if (!t) return null;

  if (/bag[\s-]?in[\s-]?box/.test(t)) return "bag-in-box";
  if (/\bbib\b/.test(t)) return "bag-in-box";
  if (t.includes("papvin") || t.includes("boxvin")) return "bag-in-box";
  if (/\bbox\s*vin\b/.test(t) || /\bboks\s*vin\b/.test(t)) return "bag-in-box";

  return null;
}

export function productMatchesWineFormat(
  p: Pick<ProductHit, "_search" | "title" | "desc" | "category">,
  format: WineFormatFilter,
): boolean {
  if (format === "bag-in-box") return productIsBagInBox(p);
  return true;
}
