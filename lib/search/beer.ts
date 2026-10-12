import type { FeedProduct } from "./types";

/** Lokal normalize — undgår runtime-import af hele helpers i node:test. */
function normalize(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const BEER_ME_MERCHANT = "Beer Me";

/** Feeds der indgår i øl-søgning (ikke almindelig vinsøgning). */
export const BEER_MERCHANTS: readonly string[] = [BEER_ME_MERCHANT];

const BEER_POSITIVE: readonly string[] = [
  "øl",
  "oel",
  "beer",
  "ipa",
  "stout",
  "porter",
  "lager",
  "pilsner",
  "pale ale",
  "neipa",
  "witbier",
  "weizen",
  "weissbier",
  "saison",
  "gose",
  "lambic",
  "gueuze",
  "tripel",
  "dubbel",
  "barleywine",
  "brown ale",
  "amber ale",
  "märzen",
  "marzen",
  "bock",
  "dunkel",
  "kölsch",
  "kolsch",
  "sour ale",
  "craft beer",
  "specialøl",
  "specialoel",
  "bryghus",
  "brewery",
  "alkoholfri øl",
  "alkoholfri oel",
];

const BEER_NEGATIVE: readonly string[] = [
  "ølglas",
  "oelglas",
  "beer glass",
  "pintglas",
  "vinglas",
  "wine glass",
  "t-shirt",
  "hoodie",
  "merchandise",
  "kasket",
  "vinkøleskab",
  "vinkoleskab",
];

function hayForProduct(p: Pick<FeedProduct, "title" | "desc" | "category" | "brand">): string {
  return normalize(`${p.title || ""} ${p.desc || ""} ${p.category || ""} ${p.brand || ""}`);
}

/** Katalogrække der ligner øl (til beer-søgning / feed-filter). */
export function isBeerLike(
  p: Pick<FeedProduct, "title" | "desc" | "category" | "brand">,
): boolean {
  const hay = hayForProduct(p);
  if (!hay) return false;
  if (BEER_NEGATIVE.some((n) => hay.includes(normalize(n)))) return false;
  return BEER_POSITIVE.some((w) => hay.includes(normalize(w)));
}

/** Til øl-produktsøgning — samme som isBeerLike i MVP. */
export function productEligibleForBeerSearch(
  p: Pick<FeedProduct, "title" | "desc" | "category" | "brand">,
): boolean {
  return isBeerLike(p);
}

const BEER_STOPWORDS = new Set([
  "ol",
  "oel",
  "beer",
  "til",
  "for",
  "med",
  "og",
  "en",
  "et",
  "den",
  "det",
  "de",
  "jeg",
  "vil",
  "gerne",
  "have",
  "specialol",
  "specialoel",
  "maden",
  "mad",
]);

/** Udvid øl-query med stil-synonymer. */
export function expandBeerQuery(q: string): string[] {
  const raw = q.replace(/\s*&\s*/g, " ");
  const lower = normalize(raw);
  const set = new Set<string>();

  if (/\bipa\b|india pale/.test(lower)) {
    set.add("ipa");
    set.add("india pale");
    set.add("neipa");
  }
  if (/\bstout\b|\bporter\b/.test(lower)) {
    set.add("stout");
    set.add("porter");
  }
  if (/\blager\b|\bpils\b|\bpilsner\b/.test(lower)) {
    set.add("lager");
    set.add("pilsner");
  }
  if (/\bale\b/.test(lower)) set.add("ale");
  if (/alkoholfri|uden alkohol|non.?alcoholic/.test(lower)) {
    set.add("alkoholfri");
    set.add("non-alcoholic");
  }
  if (/grill|bof|bøf|steak|burger|bbq/.test(lower)) {
    set.add("ipa");
    set.add("pale ale");
  }
  if (/and|okse|braiser|gryde|kaebe|kæbe|steg/.test(lower)) {
    set.add("stout");
    set.add("porter");
  }
  if (/ost|chili|krydre/.test(lower)) {
    set.add("ipa");
    set.add("saison");
  }

  for (const tok of lower.split(/[^a-z0-9]+/).filter(Boolean)) {
    if (tok.length < 2 || BEER_STOPWORDS.has(tok)) continue;
    set.add(tok);
  }

  if (!set.size && lower.length >= 2) set.add(lower.slice(0, 40));
  return [...set];
}
