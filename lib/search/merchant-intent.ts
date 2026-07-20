import { FEEDS } from "@/lib/feeds/config";
import { normalize } from "./helpers";

export type MerchantIntent = {
  /** Eksakt merchant-navn som i FEEDS. */
  merchant: string;
  /** Query uden butiksnavn — tom = browse hele sortimentet. */
  remainingQuery: string;
};

type AliasEntry = {
  merchant: string;
  /** Normaliseret frase (kan være flere tokens). */
  phrase: string;
  tokens: string[];
};

/** Tokens der ikke må stå alene som butiksalias (for generiske). */
const GENERIC_TOKENS = new Set([
  "vin",
  "vine",
  "wine",
  "wines",
  "dk",
  "store",
  "with",
  "the",
  "om",
  "me",
  "beer",
  "og",
  "de",
  "a",
]);

/** Ekstra søgefraser ud over automatik fra merchant-navn. */
const EXTRA_ALIASES: Record<string, string[]> = {
  "Winther Vin": ["winther"],
  "Johnsen Vine": ["johnsen"],
  "Havnens Vin": ["havnens"],
  "DH Wines": ["dh wines", "dhwines", "dh"],
  "D’Wine": ["dwine", "d wine", "dwines"],
  "Lauridsen Vine": ["lauridsen"],
  "Mere om Vin": ["mereomvin", "mere om vin"],
  "SPS Wine": ["sps", "sps wine"],
  "Westjysk Smag": ["westjysk"],
  "Bottles With History": ["bottles with history", "bwh"],
  "8wines": ["8 wines", "8wine"],
  "Wine Store": ["winestore", "wine store"],
  "Erling Christensen Møbler": ["erling christensen", "erling christensen mobler", "christensen mobler"],
  "Homeshop.dk": ["homeshop", "home shop"],
  "Kai Berntsen ApS": ["kai berntsen", "kai bertsen", "kai berntsen aps"],
  "Vinkøleskabet.dk": ["vinkoleskabet", "vinkøleskabet"],
  "LforLiving.dk": ["lforliving", "l for living"],
  "Likehome.dk": ["likehome", "like home"],
  Vinpalle: ["vinpalle", "vin palle"],
  Winesommelier: ["wine sommelier"],
  Gourmetshoppen: ["gourmet shoppen"],
  Winefriends: ["wine friends"],
  Whiskystack: ["whisky stack"],
  "Beer Me": ["beerme", "beer me"],
  Barlife: ["bar life"],
  Vinea: ["vinea"],
};

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = new Array<number>(b.length + 1);
  for (let j = 0; j <= b.length; j++) row[j] = j;
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return row[b.length];
}

function maxFuzzyDistance(aliasLen: number): number {
  if (aliasLen >= 8) return 2;
  if (aliasLen >= 5) return 1;
  return 0;
}

function significantTokensFromMerchant(merchant: string): string[] {
  const norm = normalize(merchant.replace(/\.dk$/i, ""));
  const parts = norm.split(/\s+/).filter(Boolean);
  const significant = parts.filter((p) => p.length >= 4 && !GENERIC_TOKENS.has(p));
  return significant;
}

function buildAliasIndex(): AliasEntry[] {
  const byKey = new Map<string, AliasEntry>();

  const add = (merchant: string, rawPhrase: string) => {
    const phrase = normalize(rawPhrase);
    if (!phrase || phrase.length < 2) return;
    const tokens = phrase.split(/\s+/).filter(Boolean);
    if (!tokens.length) return;
    if (tokens.length === 1 && GENERIC_TOKENS.has(tokens[0])) return;
    const key = `${merchant}::${phrase}`;
    if (byKey.has(key)) return;
    byKey.set(key, { merchant, phrase, tokens });
  };

  for (const feed of FEEDS) {
    const m = feed.merchant;
    add(m, m);
    add(m, m.replace(/\.dk$/i, ""));
    for (const t of significantTokensFromMerchant(m)) add(m, t);
    for (const extra of EXTRA_ALIASES[m] || []) add(m, extra);
  }

  // Sorter længste fraser først (mere specifikke matcher først).
  return Array.from(byKey.values()).sort(
    (a, b) => b.phrase.length - a.phrase.length || a.merchant.localeCompare(b.merchant, "da"),
  );
}

let cachedIndex: AliasEntry[] | null = null;

function aliasIndex(): AliasEntry[] {
  if (!cachedIndex) cachedIndex = buildAliasIndex();
  return cachedIndex;
}

type MatchHit = {
  merchant: string;
  phrase: string;
  /** Indeks i token-array for første matchede token. */
  start: number;
  /** Antal tokens i query der matches. */
  length: number;
  score: number;
};

/**
 * Genkend butiksnavn i søgequery.
 * Exact/frase først, derefter let fuzzy på enkelte tokens (stavefejl).
 */
export function detectMerchantIntent(qRaw: string): MerchantIntent | null {
  const raw = qRaw.replace(/\s*&\s*/g, " ").trim();
  if (!raw) return null;

  const tokens = raw.split(/\s+/).filter(Boolean);
  const normTokens = tokens.map((t) => normalize(t));
  if (!normTokens.length) return null;

  const index = aliasIndex();
  const candidates: MatchHit[] = [];

  for (const entry of index) {
    const n = entry.tokens.length;

    // Exact phrase: consecutive tokens
    for (let i = 0; i <= normTokens.length - n; i++) {
      let ok = true;
      for (let k = 0; k < n; k++) {
        if (normTokens[i + k] !== entry.tokens[k]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        candidates.push({
          merchant: entry.merchant,
          phrase: entry.phrase,
          start: i,
          length: n,
          score: 1000 + entry.phrase.length,
        });
      }
    }

    // Fuzzy: kun enkelt-token aliases
    if (n === 1) {
      const alias = entry.tokens[0];
      const maxDist = maxFuzzyDistance(alias.length);
      if (maxDist <= 0) continue;
      for (let i = 0; i < normTokens.length; i++) {
        const tok = normTokens[i];
        if (tok.length < 4) continue;
        if (tok === alias) continue; // allerede fanget som exact
        const dist = levenshtein(tok, alias);
        if (dist > 0 && dist <= maxDist) {
          candidates.push({
            merchant: entry.merchant,
            phrase: entry.phrase,
            start: i,
            length: 1,
            score: 500 - dist * 10 + alias.length,
          });
        }
      }
    }
  }

  if (!candidates.length) return null;

  candidates.sort(
    (a, b) => b.score - a.score || b.phrase.length - a.phrase.length || a.merchant.localeCompare(b.merchant, "da"),
  );
  const matched = candidates[0];

  const remainingTokens = tokens.filter((_, i) => i < matched.start || i >= matched.start + matched.length);
  return {
    merchant: matched.merchant,
    remainingQuery: remainingTokens.join(" ").trim(),
  };
}
