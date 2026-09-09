import { copenhagenParts, type CopenhagenParts } from "../home-moment.ts";

export type BlackFridayPhase = "prelude" | "live" | "offseason";

export type BlackFridayWindow = {
  year: number;
  /** 4th Friday of November (US Black Friday). */
  blackFriday: { year: number; month: number; day: number };
  blackWeekMonday: { year: number; month: number; day: number };
  cyberMonday: { year: number; month: number; day: number };
  preludeStart: { year: number; month: number; day: number };
};

function ymd(year: number, month: number, day: number) {
  return { year, month, day };
}

function toOrdinal(p: { year: number; month: number; day: number }): number {
  return p.year * 10000 + p.month * 100 + p.day;
}

/** Fourth Thursday in November (UTC calendar), then +1 day = Black Friday. */
export function blackFridayYmd(year: number): { year: number; month: number; day: number } {
  const d = new Date(Date.UTC(year, 10, 1));
  let thursdays = 0;
  while (d.getUTCMonth() === 10) {
    if (d.getUTCDay() === 4) {
      thursdays += 1;
      if (thursdays === 4) {
        d.setUTCDate(d.getUTCDate() + 1);
        return ymd(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
      }
    }
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return ymd(year, 11, 27);
}

function addUtcDays(
  p: { year: number; month: number; day: number },
  delta: number,
): { year: number; month: number; day: number } {
  const d = new Date(Date.UTC(p.year, p.month - 1, p.day + delta));
  return ymd(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

export function blackFridayWindow(year: number): BlackFridayWindow {
  const blackFriday = blackFridayYmd(year);
  return {
    year,
    blackFriday,
    blackWeekMonday: addUtcDays(blackFriday, -4),
    cyberMonday: addUtcDays(blackFriday, 3),
    preludeStart: ymd(year, 9, 1),
  };
}

export function resolveBlackFridayPhase(
  parts: Pick<CopenhagenParts, "year" | "month" | "day">,
): BlackFridayPhase {
  const window = blackFridayWindow(parts.year);
  const today = toOrdinal(parts);
  const prelude = toOrdinal(window.preludeStart);
  const liveStart = toOrdinal(window.blackWeekMonday);
  const liveEnd = toOrdinal(window.cyberMonday);

  if (today >= liveStart && today <= liveEnd) return "live";
  if (today >= prelude && today < liveStart) return "prelude";
  return "offseason";
}

export function getBlackFridayPhase(now: Date = new Date()): BlackFridayPhase {
  return resolveBlackFridayPhase(copenhagenParts(now));
}

export function campaignNavActive(now: Date = new Date()): boolean {
  const phase = getBlackFridayPhase(now);
  return phase === "prelude" || phase === "live";
}

export type BlackFridayHeroCopy = {
  kicker: string;
  h1: string;
  lead: string;
  ctaTitle: string;
  ctaHint: string;
};

export function nextBlackFridayYear(parts: Pick<CopenhagenParts, "year" | "month" | "day">): number {
  const window = blackFridayWindow(parts.year);
  if (toOrdinal(parts) > toOrdinal(window.cyberMonday)) return parts.year + 1;
  return parts.year;
}

export function blackFridayHeroCopy(
  phase: BlackFridayPhase,
  year: number,
  merchantCount: number,
): BlackFridayHeroCopy {
  const shops = merchantCount > 0 ? String(merchantCount) : "danske";

  if (phase === "prelude") {
    return {
      kicker: `Black Friday vin ${year} — optakt`,
      h1: `Gennemsku Black Friday: Find de ægte vintilbud på tværs af ${shops} forhandlere`,
      lead: `Black Friday vin-hubben åbner snart. Vi scanner ${shops} danske vinforhandlere og sorterer de mest oppustede førpriser fra. Skriv dig op og få de bedste tilbud før alle andre — og se de nuværende nedsættelser nedenfor imens.`,
      ctaTitle: "Få besked, når Black Week går live",
      ctaHint: "Tilmeld dig og få de vildeste vintilbud i indbakken, når forhandlerne tyvstarter.",
    };
  }

  if (phase === "live") {
    return {
      kicker: `Live: Black Friday vin tilbud ${year}`,
      h1: `Gennemsku Black Friday: Find de ægte vintilbud på tværs af ${shops} forhandlere`,
      lead: `Vi scanner ${shops} danske vinforhandlere og viser både nedsættelser i shop (før-pris fra butikken) og prisforskelle på samme flaske. Find billig julevin og bobler til nytår — tjek altid slutpris og lager hos forhandleren.`,
      ctaTitle: "Få direkte besked, når vintilbuddene opdateres",
      ctaHint: "Live-opdateringer under Black Week — uden at du skal refreshe ti shops.",
    };
  }

  return {
    kicker: `Black Friday vin — tilbage ${year}`,
    h1: `Gennemsku Black Friday: Find de ægte vintilbud på tværs af ${shops} forhandlere`,
    lead: `Vi er tilbage næste år med en fuld Black Friday vin-hub. Imens kan du se de nuværende bedste vintilbud: nedsatte flasker og prisforskelle på tværs af ${shops} forhandlere. Spar penge på vin ved at sammenligne — ikke ved at stole på en gul mærkat alene.`,
    ctaTitle: "Få besked, når Black Friday åbner igen",
    ctaHint: "Skriv dig op, så du får de bedste vintilbud i indbakken næste Black Week.",
  };
}
