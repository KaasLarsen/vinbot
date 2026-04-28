import type { ProductHit } from "./types";
import { normalize } from "./helpers";

export type WineStyleFilter = "all" | "red" | "white" | "rose" | "sparkling" | "champagne";

/** Fritekst fra titel/kategori/brand — samme klassifikation som forsøgning. */
export function wineStyleOfBlob(blob: string): "red" | "white" | "rose" | "sparkling" | "champagne" | null {
  const t = normalize(blob);
  if (!t || t.length < 3) return null;

  if (isChampagneWine(t)) return "champagne";

  if (isSparklingWine(t, false)) return "sparkling";

  if (isRoseWine(t)) return "rose";

  if (isPortOrHeavyDessert(t)) return "red";

  if (isWhiteWine(t) && !isRedWine(t)) return "white";
  if (isRedWine(t) && !isWhiteWine(t)) return "red";

  if (isWhiteWine(t) && isRedWine(t)) {
    if (t.includes("hvid") || t.includes("white") || t.includes("riesling") || t.includes("chardonnay")) return "white";
    if (t.includes("rød") || t.includes("red") || t.includes("cabernet") || t.includes("pinot noir")) return "red";
    return "red";
  }

  if (t.includes("dessertvin") || t.includes("sauternes") || t.includes("tokaj")) return "white";

  return null;
}

/** True hvis tydelig champagne-**vin** (ikke glas). */
function isChampagneWine(t: string): boolean {
  if (!t.includes("champagne")) return false;
  if (/champagneglas|champagne glas|champagne-k|flutes|sæt\s*\d|gavekort/i.test(t)) return false;
  return true;
}

function isSparklingWine(t: string, champagne: boolean): boolean {
  if (champagne) return true;
  return (
    /\bcava\b/.test(t) ||
    t.includes("prosecco") ||
    t.includes("cremant") ||
    t.includes("crémant") ||
    t.includes("mousserende") ||
    t.includes("sekt") ||
    t.includes("spumante") ||
    t.includes("frizzante") ||
    t.includes("pet nat") ||
    t.includes("pet-nat") ||
    t.includes("petillant") ||
    t.includes("pétillant") ||
    t.includes("lambrusco") ||
    t.includes("sparkling") ||
    t.includes("asti")
  );
}

function isRoseWine(t: string): boolean {
  if (t.includes("rosé") || t.includes("rosevin") || t.includes("rosévin")) return true;
  if (t.includes("rosado")) return true;
  if (/\b(rose|roese)\b/.test(t) && (t.includes("vin") || t.includes("wine"))) return true;
  return false;
}

const WHITE_HINTS = [
  "hvidvin",
  "white wine",
  "wei",
  "weis",
  "hvid",
  "riesling",
  "chardonnay",
  "sauvignon blanc",
  "sauvignon",
  "gewurz",
  "gewürz",
  "albarino",
  "albariño",
  "chablis",
  "muscadet",
  "pinot grigio",
  "gruner veltliner",
  "gruener veltliner",
  "verdejo",
  "vermentino",
  "fiano",
  "godello",
  "chenin",
  "viognier",
  "sancerre hvid",
  "halbtrocken", // tysk hvid, ofte
  " trocken ", // ofte tysk
];

const RED_HINTS = [
  "rødvin",
  "rød vin",
  "red wine",
  "rotwein",
  "cabernet",
  "merlot",
  "malbec",
  "pinot noir",
  "shiraz",
  "syrah",
  "tempranillo",
  "sangiovese",
  "nebbiolo",
  "barolo",
  "barbaresco",
  "brunello",
  "chianti",
  "zinfandel",
  "primitivo",
  "amarone",
  "rioja",
  "bordeaux",
  "cotes du rhone",
  "côtes du rhone",
  "bourgogne rød",
  "gigondas",
  "chateauneuf",
  "hermitage",
  "cahors",
  "cannonau",
  "nero",
  "montepulciano",
  "aglianico",
  "grenache",
  "gamay",
  "beaujolais",
  "mencia",
  "carmenere",
  "pais",
  "carignan",
  "touriga",
  "pinotage",
];

function isWhiteWine(t: string): boolean {
  for (const h of WHITE_HINTS) {
    if (t.includes(h)) return true;
  }
  return false;
}

function isRedWine(t: string): boolean {
  for (const h of RED_HINTS) {
    if (t.includes(h)) return true;
  }
  if (t.includes(" rød ") || t === "rød" || t.startsWith("rød ")) return true; // meget få
  if (t.includes("tinto") || t.includes(" rosso ")) return true;
  if (t.includes("rouge") && t.includes("vin")) return true;
  return false;
}

/**
 * Klassificerer produkt udfra fritekst (dansk/eng/typiske shop-felter).
 * Returnerer null hvis vi ikke tør skønne — så vises varen **kun** under "Alle" ved stilfilter.
 */
export function wineStyleOfProduct(p: ProductHit): "red" | "white" | "rose" | "sparkling" | "champagne" | null {
  return wineStyleOfBlob([p._search, p.title, p.desc, p.category, p.brand].filter(Boolean).join(" "));
}

function isPortOrHeavyDessert(t: string): boolean {
  if (t.includes("portvin") || /\bport wine\b/.test(t)) return true;
  if (t.includes("ruby port") || t.includes("tawny")) return true;
  return false;
}

export function productMatchesWineStyle(p: ProductHit, style: WineStyleFilter): boolean {
  if (style === "all") return true;
  const w = wineStyleOfProduct(p);
  if (w == null) return false;
  if (style === "champagne") return w === "champagne";
  if (style === "sparkling") return w === "champagne" || w === "sparkling";
  return w === style;
}
