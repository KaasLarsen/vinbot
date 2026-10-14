import { SERP_DESCRIPTION_MAX, SERP_TITLE_BUDGET, truncateMetaDescription } from "../seo/serp-meta.ts";

export type CopenhagenMonthYear = {
  month: string;
  year: number;
};

/** Dansk månedsnavn og år i Europe/Copenhagen. */
export function copenhagenMonthYear(date = new Date()): CopenhagenMonthYear {
  const parts = new Intl.DateTimeFormat("da-DK", {
    timeZone: "Europe/Copenhagen",
    month: "long",
    year: "numeric",
  }).formatToParts(date);
  const month = (parts.find((p) => p.type === "month")?.value ?? "").toLowerCase();
  const year = Number(parts.find((p) => p.type === "year")?.value);
  return { month, year };
}

/** Synlig H1: «Bedste vin i Netto lige nu (oktober 2026)». */
export function chainH1(name: string, date = new Date()): string {
  const { month, year } = copenhagenMonthYear(date);
  return `Bedste vin i ${name} lige nu (${month} ${year})`;
}

/**
 * Meta title uden «| Vinbot». Falder tilbage uden «lige nu», hvis den rammer
 * SERP-budgettet (52 tegn, samme loft som guidetitel-hjælperen).
 */
export function chainMetaTitle(name: string, date = new Date()): string {
  const full = chainH1(name, date);
  if (full.length <= SERP_TITLE_BUDGET) return full;
  const { month, year } = copenhagenMonthYear(date);
  const short = `Bedste vin i ${name} (${month} ${year})`;
  if (short.length <= SERP_TITLE_BUDGET) return short;
  return short.slice(0, SERP_TITLE_BUDGET).trim();
}

/** Meta description. `{month}` og `{year}` udfyldes, og teksten klippes ved 155 tegn. */
export function chainMetaDescription(template: string, date = new Date()): string {
  const { month, year } = copenhagenMonthYear(date);
  const filled = template.replaceAll("{month}", month).replaceAll("{year}", String(year));
  return truncateMetaDescription(filled, SERP_DESCRIPTION_MAX);
}

export function indexMetaTitle(date = new Date()): string {
  const { month, year } = copenhagenMonthYear(date);
  const title = `Vin i supermarkedet — ${month} ${year}`;
  return title.length <= SERP_TITLE_BUDGET ? title : title.slice(0, SERP_TITLE_BUDGET).trim();
}
