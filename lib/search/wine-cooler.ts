import type { FeedProduct } from "./types";
import { normalize } from "./helpers";

export const VINKOLESKABET_MERCHANT = "Vinkøleskabet.dk";

/** Danske bogstaver ø/å/æ → ascii så «vinkøleskab» og «vinkoleskab» matcher. */
export function foldDa(s = ""): string {
  return normalize(s).replace(/ø/g, "o").replace(/å/g, "a").replace(/æ/g, "ae");
}

/** Produkter der er rigtige vinkøleskabe / vinlagringsskabe — ikke tilbehør, øl eller reoler. */
const COOLER_MARKERS: readonly string[] = [
  "vinkoleskab",
  "vinkoleskabe",
  "vinlagringsskab",
  "vinlagring",
  "winekeeper",
  "winecave",
  "wineexpert",
  "winestore",
  "integrerbart vinkoleskab",
  "integrerbar vinkoleskab",
  "fritstaende vinkoleskab",
  "indbygning vinkoleskab",
  "indbygbar vinkoleskab",
  "wine - built-in",
  "wine built-in",
];

/** Titler der alene er tilbehør/reservedele — selv i Vinkøleskabet-feedet. */
const ACCESSORY_TITLE_PREFIX =
  /^(hylde|metalhylde|hyldefront|multifunktionshylde|ventilationsrist|kulfilter|dorklaes|dorlas)\b/;

const EXCLUDE_IN_TITLE: readonly string[] = [
  "olkoleskab",
  "beerserver",
  "drikkekoleskab",
  "proptrækker",
  "proptræk",
  "vinreol",
  "vinaeske",
  "vinmaerkat",
  "duftsaet",
  "champagnesabel",
  "folieskaerer",
  "rengoringskugler",
  "isspand",
  "gaveaeske",
  "kapselaabner",
  "vinset i bambus",
  "le nez du vin",
];

export function productIsWineCooler(p: Pick<FeedProduct, "title" | "desc" | "category">): boolean {
  const title = foldDa(p.title || "");
  const hay = foldDa(`${p.title || ""} ${p.desc || ""} ${p.category || ""}`);

  if (!title) return false;
  if (ACCESSORY_TITLE_PREFIX.test(title)) return false;

  for (const bad of EXCLUDE_IN_TITLE) {
    if (title.includes(bad) && !COOLER_MARKERS.some((m) => hay.includes(m))) return false;
  }

  return COOLER_MARKERS.some((m) => hay.includes(m));
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
