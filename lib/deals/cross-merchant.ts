import { unstable_cache } from "next/cache";

import { loadWineCatalog } from "@/lib/vine/catalog";
import type { CanonicalWine, VineOffer } from "@/lib/vine/types";

const DEFAULT_MIN_SAVINGS_PERCENT = 15;
const DEFAULT_MIN_SAVINGS_AMOUNT = 20;
const DEFAULT_LIMIT = 48;

export type CrossMerchantDeal = {
  wine: CanonicalWine;
  lowestOffer: VineOffer;
  highestOffer: VineOffer;
  savingsPercent: number;
  savingsAmount: number;
};

export type ListCrossMerchantDealsOptions = {
  minSavingsPercent?: number;
  minSavingsAmount?: number;
  limit?: number;
  /** Fritekstsøgning i titel/brand/alternativtitler. */
  q?: string;
};

type CrossDealsPoolOpts = {
  minSavingsPercent: number;
  minSavingsAmount: number;
};

function crossDealMatchesQuery(deal: CrossMerchantDeal, q: string): boolean {
  const t = q.trim().toLowerCase();
  if (!t) return true;
  if (deal.wine.displayTitle.toLowerCase().includes(t)) return true;
  if (deal.wine.brand.toLowerCase().includes(t)) return true;
  if (deal.wine.category.toLowerCase().includes(t)) return true;
  return deal.wine.alternateListingTitles.some((title) => title.toLowerCase().includes(t));
}

function isNoisyTitle(title: string): boolean {
  const t = title.trim();
  if (t.length < 12) return true;
  if (/^(vin|rødvin|hvidvin|rosé|rose|bobler|champagne)\b/i.test(t) && t.length < 25) return true;
  return false;
}

function computeCrossMerchantDeal(wine: CanonicalWine): CrossMerchantDeal | null {
  const priced = wine.offers.filter((o): o is VineOffer & { price: number } => typeof o.price === "number");
  if (priced.length < 2) return null;
  if (isNoisyTitle(wine.displayTitle)) return null;

  const sorted = [...priced].sort((a, b) => a.price - b.price);
  const lowestOffer = sorted[0];
  const highestOffer = sorted[sorted.length - 1];
  if (lowestOffer.merchant === highestOffer.merchant) return null;

  const savingsAmount = highestOffer.price - lowestOffer.price;
  if (savingsAmount <= 0) return null;

  const savingsPercent = Math.round((savingsAmount / highestOffer.price) * 100);
  return { wine, lowestOffer, highestOffer, savingsPercent, savingsAmount };
}

/** Fuld sorteret cross-deal-pool (uden q/limit) — én cache pr. filter-sæt. */
async function buildCrossMerchantDealsPool(opts: CrossDealsPoolOpts): Promise<CrossMerchantDeal[]> {
  const { minSavingsPercent: minPct, minSavingsAmount: minAmount } = opts;

  const { wines } = await loadWineCatalog();
  const deals: CrossMerchantDeal[] = [];

  for (const wine of wines) {
    const deal = computeCrossMerchantDeal(wine);
    if (!deal) continue;
    if (deal.savingsPercent < minPct) continue;
    if (deal.savingsAmount < minAmount) continue;
    deals.push(deal);
  }

  deals.sort(
    (a, b) =>
      b.savingsPercent - a.savingsPercent ||
      b.savingsAmount - a.savingsAmount ||
      b.wine.offers.length - a.wine.offers.length,
  );

  return deals;
}

const getCachedCrossMerchantDealsPool = unstable_cache(
  (optsJson: string) => buildCrossMerchantDealsPool(JSON.parse(optsJson) as CrossDealsPoolOpts),
  ["vinbot-cross-merchant-deals-pool-v1"],
  { revalidate: 21600, tags: ["vinbot-feeds"] },
);

async function loadCrossMerchantDealsPool(opts: CrossDealsPoolOpts): Promise<CrossMerchantDeal[]> {
  try {
    return await getCachedCrossMerchantDealsPool(JSON.stringify(opts));
  } catch {
    return buildCrossMerchantDealsPool(opts);
  }
}

export async function listCrossMerchantDeals(
  opts: ListCrossMerchantDealsOptions = {},
): Promise<CrossMerchantDeal[]> {
  const minSavingsPercent = opts.minSavingsPercent ?? DEFAULT_MIN_SAVINGS_PERCENT;
  const minSavingsAmount = opts.minSavingsAmount ?? DEFAULT_MIN_SAVINGS_AMOUNT;
  const limit = opts.limit ?? DEFAULT_LIMIT;
  const q = opts.q?.trim() || "";

  let deals = await loadCrossMerchantDealsPool({ minSavingsPercent, minSavingsAmount });
  if (q) {
    deals = deals.filter((d) => crossDealMatchesQuery(d, q));
  }
  return deals.slice(0, limit);
}
