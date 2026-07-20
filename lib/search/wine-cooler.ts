import type { FeedProduct } from "./types";
import { normalize } from "./helpers";

export const VINKOLESKABET_MERCHANT = "Vinkøleskabet.dk";
export const ERLING_CHRISTENSEN_MERCHANT = "Erling Christensen Møbler";

/** Feeds der indgår i vinkøleskab-søgning (ikke almindelig vinsøgning). */
export const WINE_COOLER_MERCHANTS: readonly string[] = [
  VINKOLESKABET_MERCHANT,
  ERLING_CHRISTENSEN_MERCHANT,
];

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
  /** Danske shop-kategorier (fx Erling Christensen). */
  "vinkoleskabe",
  "vinkoleskab",
];

const NOT_COOLER_CATEGORY_MARKERS: readonly string[] = [
  "wine - accessories",
  "wine - wine cooler shelves",
  "wine - wine rack",
  "beer -",
  "spare parts",
  "kitchen - accessories",
  "outdoor kitchen",
  "vinglas",
  "grej til hjemmebaren",
];

/** Reservetitel-match hvis feed mangler kategori (burde ikke ske for Vinkøleskabet). */
const COOLER_TITLE_PREFIX =
  /^(vinkoleskab|vinkoleskabe|integrerbar|integrerbart|vinlagringsskab|vinlagring|fritstaende vinkoleskab|indbygbar vinkoleskab|indbygning vinkoleskab)\b/;

/** Titel indeholder rigtigt skab (ikke isbøtte/vinkøler). */
const COOLER_TITLE_WORD = /\b(vinkoleskab|vinkoleskabe|vinlagringsskab|wine\s*cooler)\b/;

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

/**
 * Kun dedikerede vinkøleskabe / vinlagringsskabe.
 * Afviser isbøtter («vinkøler»), hylder og øvrigt tilbehør.
 */
export function productIsWineCooler(p: Pick<FeedProduct, "title" | "desc" | "category">): boolean {
  const title = foldDa(p.title || "");
  const category = foldDa(p.category || "");

  if (!title) return false;

  if (ACCESSORY_TITLE_MARKERS.some((m) => title.includes(m))) return false;
  /** Ren vinkøler/isbøtte uden «vinkøleskab» i titel. */
  if (/\bvinkoler\b/.test(title) && !COOLER_TITLE_WORD.test(title)) return false;
  if (NOT_COOLER_CATEGORY_MARKERS.some((m) => category.includes(m))) return false;
  if (COOLER_CATEGORY_MARKERS.some((m) => category.includes(m))) {
    if (category.includes("vinkoleskab") || COOLER_TITLE_WORD.test(title) || COOLER_TITLE_PREFIX.test(title)) {
      return true;
    }
  }
  if (COOLER_TITLE_WORD.test(title)) return true;
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
    scandomestic: ["scandomestic"],
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
