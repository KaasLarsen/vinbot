import type { ProductHit } from "../search/types.ts";
import type { SeasonBudgetId, SeasonMenuRole } from "./roles.ts";
import { getSeasonBudget } from "./roles.ts";

export type MatchableDeal = {
  id: string;
  kind: "feed" | "cross";
  title: string;
  brand: string;
  merchant: string;
  salePrice: number;
  discountPercent: number;
  url: string;
  image: string | null;
  referencePrice: number | null;
  tier?: "paid" | "free";
  catalogSlug?: string;
  savingsAmount?: number;
  highestMerchant?: string;
  merchantCount?: number;
};

function normalize(s = ""): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function dealSearchBlob(deal: { title: string; brand: string }): string {
  return normalize(`${deal.title} ${deal.brand}`);
}

export function dealFitsBudget(price: number, budgetId: SeasonBudgetId): boolean {
  const b = getSeasonBudget(budgetId);
  if (!b) return false;
  if (b.min != null && price < b.min) return false;
  if (b.max != null && price > b.max) return false;
  return true;
}

export function hintHitCount(blob: string, hints: string[]): number {
  const t = normalize(blob);
  let n = 0;
  for (const h of hints) {
    if (t.includes(normalize(h))) n += 1;
  }
  return n;
}

function excluded(blob: string, excludes: string[]): boolean {
  const t = normalize(blob);
  return excludes.some((h) => t.includes(normalize(h)));
}

export function scoreDealForRole(deal: MatchableDeal, role: SeasonMenuRole): number {
  const blob = dealSearchBlob(deal);
  if (excluded(blob, role.excludeHints)) return -1;
  const hits = hintHitCount(blob, role.hints);
  if (hits === 0) return -1;
  return hits * 10 + Math.min(deal.discountPercent, 40) / 10;
}

export function pickDealForRole(
  deals: MatchableDeal[],
  role: SeasonMenuRole,
  budgetId: SeasonBudgetId,
  usedIds: Set<string>,
  usedMerchants: Set<string>,
): MatchableDeal | null {
  const inBudget = deals.filter((d) => dealFitsBudget(d.salePrice, budgetId) && !usedIds.has(d.id));
  const ranked = inBudget
    .map((d) => ({ d, score: scoreDealForRole(d, role) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => {
      const aDup = usedMerchants.has(a.d.merchant) ? 1 : 0;
      const bDup = usedMerchants.has(b.d.merchant) ? 1 : 0;
      if (aDup !== bDup) return aDup - bDup;
      return b.score - a.score || a.d.salePrice - b.d.salePrice;
    });
  return ranked[0]?.d ?? null;
}

export function productHitToCard(hit: ProductHit): MatchableDeal {
  const sale = hit.salePrice ?? hit.price ?? 0;
  return {
    id: `feed:${hit.url}`,
    kind: "feed",
    title: hit.title,
    brand: hit.brand,
    merchant: hit.merchant,
    tier: hit.tier,
    image: hit.image,
    url: hit.url,
    salePrice: sale,
    referencePrice: hit.referencePrice,
    discountPercent: hit.discountPercent ?? 0,
  };
}
