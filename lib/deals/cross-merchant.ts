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
};

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

async function buildCrossMerchantDeals(opts: ListCrossMerchantDealsOptions = {}): Promise<CrossMerchantDeal[]> {
  const minPct = opts.minSavingsPercent ?? DEFAULT_MIN_SAVINGS_PERCENT;
  const minAmount = opts.minSavingsAmount ?? DEFAULT_MIN_SAVINGS_AMOUNT;
  const limit = opts.limit ?? DEFAULT_LIMIT;

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

  return deals.slice(0, limit);
}

const getCachedCrossMerchantDeals = unstable_cache(
  (optsJson: string) => buildCrossMerchantDeals(JSON.parse(optsJson) as ListCrossMerchantDealsOptions),
  ["vinbot-cross-merchant-deals-v1"],
  { revalidate: 21600, tags: ["vinbot-feeds"] },
);

export async function listCrossMerchantDeals(
  opts: ListCrossMerchantDealsOptions = {},
): Promise<CrossMerchantDeal[]> {
  return getCachedCrossMerchantDeals(JSON.stringify(opts));
}
