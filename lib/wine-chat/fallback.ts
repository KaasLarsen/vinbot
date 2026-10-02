/**
 * Heuristisk fallback når OpenAI fejler — stadig vin-forslag via katalog-søgning.
 */

const RED_HINTS =
  /\b(rød|rødt|okse|bøf|steak|lam|gris|flæsk|and|vildt|grill|burger|pasta|bolognese|chili|krydre[dt]?)\b/i;
const WHITE_HINTS =
  /\b(hvid|hvidt|fisk|laks|reje|skaldyr|kylling|salat|gedeost|feta|citron|asparges|risotto)\b/i;
const BUBBLE_HINTS = /\b(bobler|champagne|prosecco|cava|mousserende|nytår|fest)\b/i;
const ROSE_HINTS = /\b(rosé|rose|sommer|grillmad)\b/i;

const BUDGET_RE = /(?:under|max|højst|til)\s*(\d{2,4})\s*(?:kr|kroner)?/i;

export type WineChatPlan = {
  reply: string;
  searchQueries: string[];
  budgetMax: number | null;
};

export function heuristicWineChatPlan(message: string): WineChatPlan {
  const text = message.trim();
  const budgetMatch = text.match(BUDGET_RE);
  const budgetMax = budgetMatch ? Number(budgetMatch[1]) : null;

  const wantsRed = RED_HINTS.test(text);
  const wantsWhite = WHITE_HINTS.test(text);
  const wantsBubbles = BUBBLE_HINTS.test(text);
  const wantsRose = ROSE_HINTS.test(text);

  const queries: string[] = [];
  const styles: string[] = [];

  if (wantsBubbles) {
    queries.push("prosecco cava");
    styles.push("bobler");
  }
  if (wantsRose && !wantsRed && !wantsWhite) {
    queries.push("rosévin");
    styles.push("rosé");
  }
  if (wantsRed && !wantsWhite) {
    queries.push("rødvin til grill");
    styles.push("rødvin");
  } else if (wantsWhite && !wantsRed) {
    queries.push("hvidvin til mad");
    styles.push("hvidvin");
  } else if (wantsRed && wantsWhite) {
    // «Rød eller hvid?» + kød/salat → foreslå begge spor
    queries.push("rødvin til kød", "frisk hvidvin");
    styles.push("rødvin og hvidvin");
  }

  // Fri søgning ud fra brugerens tekst (afkortet)
  const free = text
    .replace(/[?!.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  if (free.length >= 3) {
    queries.push(`vin til ${free}`);
  }

  if (!queries.length) {
    queries.push("vin til mad");
  }

  const styleNote = styles.length
    ? ` Jeg kigger især efter ${styles.join(" / ")}.`
    : "";
  const budgetNote =
    budgetMax != null ? ` Holder mig omkring max ${budgetMax} kr.` : "";

  const reply =
    `Jeg matcher det, du har i køleskabet, med vine hos danske forhandlere.${styleNote}${budgetNote} Her er nogle bud — prøv også at justere beskeden hvis du vil have en anden stil.`;

  return {
    reply,
    searchQueries: [...new Set(queries)].slice(0, 3),
    budgetMax: budgetMax != null && Number.isFinite(budgetMax) ? budgetMax : null,
  };
}
