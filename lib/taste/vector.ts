import type { TasteRatedWine, TasteStyleKey, TasteVector } from "./types";

/** Lokal normalize — undgår @/-imports så vector kan unit-testes i Node. */
function normalize(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const GRAPE_TOKENS = [
  "primitivo",
  "zinfandel",
  "cabernet",
  "merlot",
  "pinot noir",
  "pinot",
  "syrah",
  "shiraz",
  "malbec",
  "tempranillo",
  "sangiovese",
  "nebbiolo",
  "grenache",
  "garnacha",
  "riesling",
  "chardonnay",
  "sauvignon",
  "pinot grigio",
  "pinot gris",
  "gewurz",
  "albarino",
  "viognier",
  "chenin",
  "gamay",
  "barbera",
  "montepulciano",
  "nero d avola",
  "aglianico",
  "touriga",
  "carignan",
  "mourvedre",
] as const;

const REGION_TOKENS = [
  "rioja",
  "ribera",
  "chianti",
  "barolo",
  "barbaresco",
  "bordeaux",
  "bourgogne",
  "burgundy",
  "mosel",
  "rheingau",
  "alsace",
  "rhone",
  "rhone",
  "priorat",
  "toscana",
  "tuscany",
  "puglia",
  "sicilia",
  "napa",
  "mendoza",
  "stellenbosch",
  "douro",
  "porto",
  "champagne",
  "prosecco",
  "cava",
] as const;

const BODY_HEAVY = [
  "primitivo",
  "zinfandel",
  "cabernet",
  "malbec",
  "syrah",
  "shiraz",
  "nebbiolo",
  "barolo",
  "amarone",
  "porto",
  "portvin",
  "tawny",
  "reserva",
  "riserva",
  "gran reserva",
  "crianza",
  "fadlagret",
  "oak",
  "barrique",
  "kraftig",
  "fyldig",
];

const BODY_LIGHT = [
  "riesling",
  "pinot noir",
  "gamay",
  "beaujolais",
  "mosel",
  "sancerre",
  "provence",
  "let",
  "frisk",
  "mineral",
];

const OAK_HINTS = [
  "fad",
  "fadlagret",
  "oak",
  "barrique",
  "roble",
  "barrica",
  "reserva",
  "riserva",
  "gran reserva",
  "crianza",
  "barrel",
  "toasted",
];

function styleFromBlob(blob: string): TasteStyleKey | null {
  const t = normalize(blob);
  if (!t) return null;
  if (t.includes("champagne")) return "champagne";
  if (
    t.includes("prosecco") ||
    t.includes("cava") ||
    t.includes("cremant") ||
    t.includes("mousserende") ||
    t.includes("sparkling")
  ) {
    return "sparkling";
  }
  if (t.includes("rose") || t.includes("rosé") || t.includes("rosevin")) return "rose";
  if (
    t.includes("riesling") ||
    t.includes("chardonnay") ||
    t.includes("sauvignon") ||
    t.includes("hvidvin") ||
    t.includes("white wine") ||
    (t.includes("hvid") && t.includes("vin"))
  ) {
    return "white";
  }
  if (
    t.includes("primitivo") ||
    t.includes("cabernet") ||
    t.includes("merlot") ||
    t.includes("syrah") ||
    t.includes("shiraz") ||
    t.includes("malbec") ||
    t.includes("tempranillo") ||
    t.includes("rodvin") ||
    t.includes("red wine") ||
    (t.includes("rod") && t.includes("vin"))
  ) {
    return "red";
  }
  return null;
}

function bump(map: Record<string, number>, key: string, weight: number) {
  if (!key) return;
  map[key] = (map[key] ?? 0) + weight;
}

function extractTokens(blob: string): string[] {
  const t = normalize(blob);
  const found: string[] = [];
  for (const g of GRAPE_TOKENS) {
    if (t.includes(normalize(g))) found.push(normalize(g));
  }
  for (const r of REGION_TOKENS) {
    const n = normalize(r);
    if (t.includes(n) && !found.includes(n)) found.push(n);
  }
  return found;
}

function bodyScore(blob: string): number {
  const t = normalize(blob);
  let score = 0;
  for (const h of BODY_HEAVY) if (t.includes(normalize(h))) score += 1;
  for (const h of BODY_LIGHT) if (t.includes(normalize(h))) score -= 1;
  return score;
}

function oakScore(blob: string): number {
  const t = normalize(blob);
  let score = 0;
  for (const h of OAK_HINTS) if (t.includes(normalize(h))) score += 1;
  return score;
}

/** Byg smagsvektor ud fra liked vine (disliked trækkes en smule fra). */
export function buildTasteVector(ratings: TasteRatedWine[]): TasteVector {
  const styles: Partial<Record<TasteStyleKey, number>> = {};
  const tokens: Record<string, number> = {};
  let body = 0;
  let oak = 0;
  let likedCount = 0;

  for (const r of ratings) {
    const blob = `${r.title} ${r.brand}`;
    const weight = r.liked ? 2 : -0.75;
    const style = styleFromBlob(blob);
    if (style) styles[style] = (styles[style] ?? 0) + weight;

    for (const tok of extractTokens(blob)) bump(tokens, tok, weight);
    body += bodyScore(blob) * weight;
    oak += oakScore(blob) * weight;
    if (r.liked) likedCount += 1;
  }

  if (likedCount > 0) {
    body /= likedCount;
    oak /= likedCount;
  }

  return { styles, tokens, body, oak };
}

/** Similarity 0–1 mellem tekstblob og profil. */
export function tasteSimilarity(blob: string, vector: TasteVector | null | undefined): number {
  if (!vector) return 0;
  const t = normalize(blob);
  if (!t) return 0;

  let score = 0;
  let max = 0;

  const style = styleFromBlob(t);
  const styleEntries = Object.entries(vector.styles) as [TasteStyleKey, number][];
  const styleTotal = styleEntries.reduce((s, [, v]) => s + Math.max(0, v), 0);
  if (styleTotal > 0) {
    max += 3;
    if (style) {
      const w = Math.max(0, vector.styles[style] ?? 0);
      score += 3 * (w / styleTotal);
    }
  }

  const tokenEntries = Object.entries(vector.tokens).filter(([, v]) => v > 0);
  if (tokenEntries.length) {
    max += 4;
    let hit = 0;
    let tokSum = 0;
    for (const [tok, w] of tokenEntries) {
      tokSum += w;
      if (t.includes(tok)) hit += w;
    }
    if (tokSum > 0) score += 4 * Math.min(1, hit / tokSum);
  }

  max += 2;
  const bodyTarget = vector.body;
  const bodyHere = bodyScore(t);
  if (bodyTarget !== 0 || bodyHere !== 0) {
    const diff = Math.abs(bodyTarget - bodyHere);
    score += 2 * Math.max(0, 1 - diff / 4);
  } else {
    score += 0.5;
  }

  max += 1;
  const oakTarget = vector.oak;
  const oakHere = oakScore(t);
  if (oakTarget > 0.5) {
    score += oakHere > 0 ? 1 : 0;
  } else if (oakTarget < -0.2) {
    score += oakHere === 0 ? 1 : 0.2;
  } else {
    score += 0.4;
  }

  return max > 0 ? Math.min(1, score / max) : 0;
}

/** Sorter items efter taste boost oven på en base-score (højere base = bedre). */
export function rankByTaste<T>(
  items: T[],
  getBlob: (item: T) => string,
  getBase: (item: T) => number,
  vector: TasteVector | null | undefined,
): T[] {
  if (!vector || items.length <= 1) return items;
  return [...items].sort((a, b) => {
    const sa = getBase(a) + tasteSimilarity(getBlob(a), vector) * 40;
    const sb = getBase(b) + tasteSimilarity(getBlob(b), vector) * 40;
    return sb - sa;
  });
}
