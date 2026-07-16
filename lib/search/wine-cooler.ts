import type { FeedProduct } from "./types";
import { normalize } from "./helpers";

export const VINKOLESKABET_MERCHANT = "Vinkøleskabet.dk";

/** Danske bogstaver ø/å/æ → ascii så «vinkøleskab» og «vinkoleskab» matcher. */
export function foldDa(s = ""): string {
  return normalize(s).replace(/ø/g, "o").replace(/å/g, "a").replace(/æ/g, "ae");
}

/**
 * Vinkøleskabet.dks feed bruger Google product_type — kun disse er rigtige skabe.
 * Tilbehør (hylder, drypbakker, vinmærkater) har fx «Wine - Accessories» eller «Wine - Wine cooler shelves».
 */
const COOLER_CATEGORY_MARKERS: readonly string[] = [
  "wine - built-in (under counter)",
  "wine - built-in (column)",
  "wine - ageing cabinets",
  "wine - free-standing",
];

const NOT_COOLER_CATEGORY_MARKERS: readonly string[] = [
  "wine - accessories",
  "wine - wine cooler shelves",
  "wine - wine rack",
  "beer -",
  "spare parts",
  "kitchen - accessories",
  "outdoor kitchen",
];

/** Reservetitel-match hvis feed mangler kategori (burde ikke ske for Vinkøleskabet). */
const COOLER_TITLE_PREFIX =
  /^(vinkoleskab|vinkoleskabe|integrerbar|integrerbart|vinlagringsskab|vinlagring|fritstaende vinkoleskab|indbygbar vinkoleskab|indbygning vinkoleskab)\b/;

/** Titler der altid er tilbehør — også når de nævner «vinkøleskab» eller WineCave i titlen. */
const ACCESSORY_TITLE_MARKERS: readonly string[] = [
  "drypbakke",
  "flaskekoler",
  "teleskopfod",
  "teleskopfodder",
  "vinmaerkat",
  "hylde ",
  "hylde\"",
  "hylde'",
  "metalhylde",
  "hyldefront",
  "multifunktionshylde",
  "ventilationsrist",
  "proptrækker",
  "vinreol",
  "vinaeske",
  "duftsaet",
  "folieskaerer",
  "rengoringskugler",
  "reservedel",
  "olkoleskab",
  "beerserver",
  "drikkekoleskab",
];

export function productIsWineCooler(p: Pick<FeedProduct, "title" | "desc" | "category">): boolean {
  const title = foldDa(p.title || "");
  const category = foldDa(p.category || "");

  if (!title) return false;

  if (ACCESSORY_TITLE_MARKERS.some((m) => title.includes(m))) return false;
  if (NOT_COOLER_CATEGORY_MARKERS.some((m) => category.includes(m))) return false;
  if (COOLER_CATEGORY_MARKERS.some((m) => category.includes(m))) return true;

  return COOLER_TITLE_PREFIX.test(title);
}

/** Udvid søgeord med almindelige stavevarianter og mærker. */
export function expandWineCoolerQuery(qRaw: string): string[] {
  const base = foldDa(qRaw);
  const set = new Set<string>();
  if (base) set.add(base);

  for (const part of base.split(/\s+/).filter(Boolean)) {
    set.add(part);
  }

  const aliases: Record<string, string[]> = {
    integrerbar: ["integrerbart", "indbygning", "indbygget", "indbygbar", "built-in"],
    integrerbart: ["integrerbar", "indbygning"],
    fritstaende: ["fritstaende"],
    winekeeper: ["wine keeper"],
    mquvee: ["mquvee"],
    zone: ["zoner", "temperaturzone", "temperaturzoner"],
    zoner: ["zone", "temperaturzoner"],
    flasker: ["flasker", "flaske"],
    kompakt: ["15 flasker", "18 flasker", "24 flasker"],
    stor: ["vinlagring", "150 flasker", "180 flasker"],
  };

  for (const part of base.split(/\s+/)) {
    const extra = aliases[part];
    if (extra) extra.forEach((t) => set.add(foldDa(t)));
  }

  if (!set.size) set.add("vinkoleskab");

  return Array.from(set);
}

/** Match søgeterm mod produktets `_search` (normaliseret feed-tekst). */
export function wineCoolerSearchHayMatchesTerm(hayNormalized: string, term: string): boolean {
  const hay = foldDa(hayNormalized);
  const t = foldDa(term);
  return t.length > 0 && hay.includes(t);
}
