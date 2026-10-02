/**
 * Heuristisk fallback når OpenAI fejler — stadig vin-forslag via katalog-søgning.
 * Svarene skal ligne en kort sommelier-anbefaling, så chatten ikke føles «død».
 */

const RED_HINTS =
  /\b(rød|rødt|okse|bøf|steak|lam|gris|flæsk|and|vildt|grill|burger|pasta|bolognese|chili|krydre[dt]?|kød)\b/i;
const WHITE_HINTS =
  /\b(hvid|hvidt|fisk|laks|reje|skaldyr|kylling|salat|gedeost|feta|citron|asparges|risotto|ost)\b/i;
const BUBBLE_HINTS = /\b(bobler|champagne|prosecco|cava|mousserende|nytår|fest)\b/i;
const ROSE_HINTS = /\b(rosé|rose|sommer)\b/i;
const BOTH_HINTS = /\brød eller hvid\b|\bhvid eller rød\b/i;

const BUDGET_RE = /(?:under|max|højst|til)\s*(\d{2,4})\s*(?:kr|kroner)?/i;

export type WineChatPlan = {
  reply: string;
  searchQueries: string[];
  budgetMax: number | null;
};

function budgetNote(budgetMax: number | null): string {
  return budgetMax != null ? ` Jeg holder mig omkring max ${budgetMax} kr.` : "";
}

export function heuristicWineChatPlan(message: string): WineChatPlan {
  const text = message.trim();
  const budgetMatch = text.match(BUDGET_RE);
  const budgetMax = budgetMatch ? Number(budgetMatch[1]) : null;
  const budget = budgetMax != null && Number.isFinite(budgetMax) ? budgetMax : null;

  const asksBoth = BOTH_HINTS.test(text);
  const wantsRed = RED_HINTS.test(text);
  const wantsWhite = WHITE_HINTS.test(text);
  const wantsBubbles = BUBBLE_HINTS.test(text);
  const wantsRose = ROSE_HINTS.test(text);

  const queries: string[] = [];
  let reply: string;

  if (wantsBubbles) {
    queries.push("prosecco cava", "mousserende vin");
    reply =
      "Til fest og lette anledninger er tørre bobler (prosecco/cava) det sikre valg — friske, sprøde og gode alene eller til snacks." +
      budgetNote(budget);
  } else if (asksBoth || (wantsRed && wantsWhite)) {
    queries.push("rødvin til grill", "frisk hvidvin til salat");
    reply =
      "Begge dele kan fungere: en saftig, kølig rød (fx pinot/gamay eller en blød sydeuropæisk) til grillkødet, og en frisk hvid eller tør rosé til salaten. Hvis du kun skal have én flaske, vælg den røde — den bærer kødet bedst." +
      budgetNote(budget);
  } else if (wantsRose && !wantsRed && !wantsWhite) {
    queries.push("rosévin", "tør rosé");
    reply =
      "En tør rosé er alsidig til sommerbordet — nok frugt til grill og nok friskhed til salat og lette retter." +
      budgetNote(budget);
  } else if (wantsRed && !wantsWhite) {
    queries.push("rødvin til kød", "saftig rødvin");
    reply =
      "Til kød og grill vil jeg pege på en saftig rød med bløde tanniner — noget der kan køles let, så den ikke føles tung til hverdagsmad." +
      budgetNote(budget);
  } else if (wantsWhite && !wantsRed) {
    queries.push("hvidvin til mad", "tør hvidvin");
    reply =
      "Til fisk, kylling, ost eller salat passer en tør, frisk hvidvin — tænk citrus, urter og god syre, så maden ikke bliver flad." +
      budgetNote(budget);
  } else {
    queries.push("vin til mad");
    reply =
      "Ud fra det du beskriver, finder jeg vine hos danske forhandlere. Skriv gerne mere om kød/fisk, sauce og budget, så bliver anbefalingen skarpere." +
      budgetNote(budget);
  }

  const free = text
    .replace(/[?!.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  if (free.length >= 3) {
    queries.push(`vin til ${free}`);
  }

  return {
    reply,
    searchQueries: [...new Set(queries.filter(Boolean))].slice(0, 3),
    budgetMax: budget,
  };
}
