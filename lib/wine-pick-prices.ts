import type { WineDetailVolumePrice } from "@/lib/wine-detail-pages/types";

export type WinePickPriceInput = {
  listPrice?: number;
  priceCurrency?: string;
  volumePrices?: readonly WineDetailVolumePrice[];
};

export function formatWinePriceDkk(amount: number, currency = "DKK") {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Laveste pris pr. flaske (enkelt eller kasse) — til budget-filter. */
export function lowestPricePerBottle(pick: WinePickPriceInput): number | null {
  const prices: number[] = [];
  if (pick.listPrice != null) prices.push(pick.listPrice);
  for (const v of pick.volumePrices ?? []) prices.push(v.pricePerBottle);
  return prices.length > 0 ? Math.min(...prices) : null;
}
