import type { FeedProduct } from "./types";

/** Lokal fold — undgå import-cyklus helpers ↔ spirits ↔ wine-cooler. */
function foldDa(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/æ/g, "ae")
    .replace(/\s+/g, " ")
    .trim();
}

/** Feeds der indgår i spiritus-søgning (ikke almindelig vinsøgning). */
export const SPIRITS_MERCHANTS: readonly string[] = [
  "Whiskystack",
  "Spitus",
  "Skotlander Spirits",
  "Barlife",
];

const SPIRIT_MARKERS: readonly string[] = [
  "gin",
  "rom",
  "rum",
  "whisky",
  "whiskey",
  "vodka",
  "likor",
  "likør",
  "liqueur",
  "spiritus",
  "akvavit",
  "aquavit",
  "cognac",
  "brandy",
  "tequila",
  "snaps",
  "mezcal",
  "armagnac",
  "calvados",
  "bourbon",
  "scotch",
  "single malt",
];

/** Substring-excludes (sikre fraser — undgå korte ord som «ol» der matcher «old»). */
const NOT_SPIRIT_SUBSTRINGS: readonly string[] = [
  "plakat",
  "poster",
  "merchandise",
  "t-shirt",
  "tshirt",
  "hoodie",
  "craft beer",
  "vinglas",
  "whiskyglas",
  "cocktailglas",
  "highball",
  "vinkoleskab",
  "vinkoleskab",
];

/** Ordgrænse-excludes for øl m.m. */
const NOT_SPIRIT_WORDS: readonly string[] = ["ol", "oel", "beer", "bryg", "ipa", "stout", "lager"];

function hasWord(hay: string, word: string): boolean {
  const esc = foldDa(word).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9æøå])${esc}(?:[^a-z0-9æøå]|$)`, "i").test(hay);
}

/** Flaske/spiritus — ikke merchandise, øl eller bar-glas. */
export function productIsSpiritLike(p: Pick<FeedProduct, "title" | "desc" | "category">): boolean {
  const hay = foldDa(`${p.title || ""} ${p.desc || ""} ${p.category || ""}`);
  if (NOT_SPIRIT_SUBSTRINGS.some((m) => hay.includes(foldDa(m)))) return false;
  if (NOT_SPIRIT_WORDS.some((m) => hasWord(hay, m))) return false;
  return SPIRIT_MARKERS.some((m) => hasWord(hay, m));
}

/** Udvid søgeord: rom↔rum, whisky↔whiskey, tom søgning → brede spiritus-termer. */
export function expandSpiritsQuery(qRaw: string): string[] {
  const q = foldDa(qRaw).trim();
  if (!q) return ["gin", "rom", "rum", "whisky", "whiskey", "vodka", "likor", "spiritus"];
  const terms = new Set<string>(q.split(/\s+/).filter(Boolean));
  if (terms.has("rom") || terms.has("rum")) {
    terms.add("rom");
    terms.add("rum");
  }
  if (terms.has("whisky") || terms.has("whiskey") || terms.has("bourbon") || terms.has("scotch")) {
    terms.add("whisky");
    terms.add("whiskey");
  }
  if (terms.has("likor") || terms.has("likør") || terms.has("liqueur")) {
    terms.add("likor");
    terms.add("liqueur");
  }
  if (terms.has("akvavit") || terms.has("aquavit") || terms.has("snaps")) {
    terms.add("akvavit");
    terms.add("aquavit");
    terms.add("snaps");
  }
  if (terms.has("spiritus") || terms.has("spirit")) {
    terms.add("gin");
    terms.add("rom");
    terms.add("whisky");
    terms.add("vodka");
  }
  return [...terms];
}

export function spiritsSearchHayMatchesTerm(hay: string, term: string): boolean {
  const h = foldDa(hay);
  const t = foldDa(term);
  return t.length > 0 && h.includes(t);
}
