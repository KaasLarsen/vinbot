import type { FeedProduct } from "./types";
import { foldDa } from "./wine-cooler";

/** Feeds der indgår i vinglas-søgning (ikke almindelig vinsøgning). */
export const WINE_GLASS_MERCHANTS: readonly string[] = ["LforLiving.dk", "Likehome.dk"];

const GLASS_TITLE_MARKERS: readonly string[] = [
  "vinglas",
  "roedvinsglas",
  "rodvinsglas",
  "rødvinsglas",
  "hvidvinsglas",
  "champagneglas",
  "roseglas",
  "roséglas",
  "bourgogneglas",
  "bordeauxglas",
  "flute",
  "wine glass",
  "universalglas",
];

const NOT_GLASS_TITLE_MARKERS: readonly string[] = [
  "karaffel",
  "dekanter",
  "decanter",
  "proptrekker",
  "proptrækker",
  "korkskrue",
  "vinreol",
  "vinstativ",
  "vinkoleskab",
  "vinkøleskab",
  "flaskekoeler",
  "flaskekøler",
  "vinaerator",
  "coravin",
  "cocktailglas",
  "whiskyglas",
  "olglas",
  "ølglas",
  "snapseglas",
  "highball",
  "martiniglas",
];

/** Titel/beskrivelse der ligner et vinglas (ikke karaffel/proptrækker). */
export function productIsWineGlass(p: Pick<FeedProduct, "title" | "desc" | "category">): boolean {
  const hay = foldDa(`${p.title || ""} ${p.desc || ""} ${p.category || ""}`);
  if (NOT_GLASS_TITLE_MARKERS.some((m) => hay.includes(foldDa(m)))) return false;
  return GLASS_TITLE_MARKERS.some((m) => hay.includes(foldDa(m)));
}

/** Udvid søgeord for almindelige glas-synonymer. */
export function expandWineGlassQuery(qRaw: string): string[] {
  const q = foldDa(qRaw).trim();
  if (!q) return ["vinglas"];
  const terms = new Set<string>(q.split(/\s+/).filter(Boolean));
  if (terms.has("rod") || terms.has("roed") || terms.has("rodvin") || terms.has("roedvin")) {
    terms.add("roedvinsglas");
    terms.add("rodvinsglas");
    terms.add("vinglas");
  }
  if (terms.has("hvid") || terms.has("hvidvin")) {
    terms.add("hvidvinsglas");
    terms.add("vinglas");
  }
  if (terms.has("bobler") || terms.has("champagne") || terms.has("prosecco") || terms.has("cava")) {
    terms.add("champagneglas");
    terms.add("flute");
  }
  if (terms.has("universal") || terms.has("allround")) {
    terms.add("universalglas");
    terms.add("vinglas");
  }
  terms.add("vinglas");
  return [...terms];
}

export function wineGlassSearchHayMatchesTerm(hay: string, term: string): boolean {
  const h = foldDa(hay);
  const t = foldDa(term);
  return t.length > 0 && h.includes(t);
}
