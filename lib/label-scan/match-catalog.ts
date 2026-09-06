import type { CanonicalWine } from "../vine/types.ts";
import type { LabelScanMatch } from "./types.ts";

/** Lokal normalize — undgår `@/`-imports så match-logik kan unit-testes i Node. */
function normalize(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeBarcodeDigits(raw: string | null | undefined): string | null {
  const d = String(raw ?? "").replace(/\D/g, "");
  return d.length >= 8 ? d : null;
}

/** Stopord der ofte står på etiketter uden at identificere flasken. */
const STOP = new Set([
  "vin",
  "wine",
  "vino",
  "rouge",
  "blanc",
  "rose",
  "rosé",
  "red",
  "white",
  "brut",
  "sec",
  "dry",
  "extra",
  "reserve",
  "reserva",
  "riserva",
  "appellation",
  "controlee",
  "controle",
  "protege",
  "denominazione",
  "origine",
  "product",
  "of",
  "the",
  "and",
  "und",
  "des",
  "les",
  "la",
  "le",
  "du",
  "de",
  "di",
  "da",
  "del",
  "della",
  "alc",
  "vol",
  "alcohol",
  "contains",
  "sulphites",
  "sulfites",
  "allergen",
  "produced",
  "bottled",
  "estate",
  "chateau",
  "château",
  "domaine",
  "mis",
  "en",
  "bouteille",
  "france",
  "italy",
  "italia",
  "spain",
  "españa",
  "espana",
  "deutschland",
  "germany",
  "portugal",
  "chile",
  "australia",
  "california",
  "napa",
  "valley",
  "ml",
  "cl",
  "liter",
  "litre",
  "producteur",
  "importer",
  "importor",
  "www",
  "http",
  "https",
  "com",
  "dk",
]);

/** Tokeniser OCR/vision-tekst til matchbare ord (+ eventuel EAN). */
export function tokenizeLabelText(raw: string): { tokens: string[]; barcode: string | null } {
  const barcode = (() => {
    const digits = raw.match(/\b\d{8,14}\b/g) ?? [];
    for (const d of digits) {
      const n = normalizeBarcodeDigits(d);
      if (n) return n;
    }
    return null;
  })();

  const cleaned = normalize(raw)
    .replace(/[^a-z0-9æøå\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  const tokens = cleaned
    .split(" ")
    .map((t) => t.trim())
    .filter((t) => t.length >= 3)
    .filter((t) => !STOP.has(t))
    .filter((t) => !/^\d{1,4}$/.test(t));

  return { tokens: [...new Set(tokens)], barcode };
}

/** Byg en kort søgestreng fra tokens (max ~6 stærke ord). */
export function queryFromTokens(tokens: string[], fallbackRaw: string): string {
  const preferred = tokens
    .filter((t) => t.length >= 4)
    .sort((a, b) => b.length - a.length)
    .slice(0, 6);
  if (preferred.length >= 2) return preferred.slice(0, 4).join(" ");
  if (preferred.length === 1) return preferred[0];
  const words = normalize(fallbackRaw)
    .split(/\s+/)
    .filter((w) => w.length >= 3)
    .slice(0, 5);
  return words.join(" ") || fallbackRaw.trim().slice(0, 80);
}

function wineHaystack(wine: CanonicalWine): string {
  return normalize(
    [
      wine.displayTitle,
      wine.brand,
      ...(wine.alternateListingTitles ?? []),
      wine.category,
      wine.gtin ?? "",
    ].join(" "),
  );
}

function scoreWineAgainstTokens(hay: string, tokens: string[]): number {
  if (!tokens.length) return 0;
  let score = 0;
  let hits = 0;
  for (const t of tokens) {
    if (!hay.includes(t)) continue;
    hits += 1;
    score += t.length >= 8 ? 5 : t.length >= 5 ? 3 : 1;
  }
  if (hits === 0) return 0;
  if (hits >= 3) score += 4;
  else if (hits >= 2) score += 2;
  return score;
}

function toMatch(wine: CanonicalWine, score: number): LabelScanMatch {
  const prices = wine.offers.map((o) => o.price).filter((p): p is number => p != null);
  return {
    slug: wine.slug,
    displayTitle: wine.displayTitle,
    brand: wine.brand,
    score,
    lowestPrice: prices.length ? Math.min(...prices) : null,
    merchantCount: wine.offers.length,
    image: wine.image,
  };
}

export type CatalogMatchResult = {
  match: LabelScanMatch | null;
  alternatives: LabelScanMatch[];
  query: string;
};

/**
 * Match rå etiket-tekst mod vin-kataloget.
 * Stærkt match når score er høj nok og klart foran nr. 2.
 */
export function matchCatalogFromLabelText(
  wines: CanonicalWine[],
  rawText: string,
): CatalogMatchResult {
  const { tokens, barcode } = tokenizeLabelText(rawText);
  const query = barcode ?? queryFromTokens(tokens, rawText);

  if (barcode) {
    const byGtin = wines.find((w) => w.gtin && normalizeBarcodeDigits(w.gtin) === barcode);
    if (byGtin) {
      return {
        match: toMatch(byGtin, 100),
        alternatives: [],
        query: barcode,
      };
    }
  }

  if (!tokens.length) {
    return { match: null, alternatives: [], query };
  }

  const scored: LabelScanMatch[] = [];
  for (const wine of wines) {
    const hay = wineHaystack(wine);
    const score = scoreWineAgainstTokens(hay, tokens);
    if (score > 0) scored.push(toMatch(wine, score));
  }

  scored.sort((a, b) => b.score - a.score || a.displayTitle.localeCompare(b.displayTitle, "da"));
  const top = scored[0] ?? null;
  const second = scored[1];

  const strongEnough = top != null && top.score >= 5;
  const clearWinner =
    top != null && (second == null || top.score >= second.score + 2 || top.score >= 10);

  const match = strongEnough && clearWinner ? top : null;
  const alternatives = scored.slice(match ? 1 : 0, match ? 4 : 3);

  return { match, alternatives, query };
}
