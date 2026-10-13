import type { DealHit } from "@/lib/search/types";

/** Partner-Ads `uid` for dagens-tilbud-popup — må ikke indeholde `/`. */
export const PARTNER_ADS_UID_DAGENS = "vinbot_dagens";

const TOP_CANDIDATES = 5;

/** Kalenderdato i dansk tid (YYYY-MM-DD) — stabil «dag» for tilbud + dismiss. */
export function copenhagenDateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Copenhagen",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function hashDayKey(dayKey: string): number {
  let hash = 0;
  for (let i = 0; i < dayKey.length; i++) {
    hash = (hash * 31 + dayKey.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function isPopupEligible(deal: DealHit): boolean {
  return deal.tier !== "free" && Boolean(deal.image?.trim()) && Boolean(deal.url?.trim());
}

/** Vælg dagens tilbud blandt top-rabatter (stabilt pr. dayKey). */
export function pickDagensFromPool(deals: DealHit[], dayKey: string): DealHit | null {
  const paid = deals
    .filter(isPopupEligible)
    .sort(
      (a, b) =>
        b.discountPercent - a.discountPercent ||
        (a.salePrice ?? 9e9) - (b.salePrice ?? 9e9),
    );
  if (!paid.length) return null;

  const candidates = paid.slice(0, Math.min(TOP_CANDIDATES, paid.length));
  return candidates[hashDayKey(dayKey) % candidates.length] ?? null;
}
