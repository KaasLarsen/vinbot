import { normalize } from "@/lib/search/helpers";
import { wineStyleOfBlob } from "@/lib/search/wine-style";
import type { TilbudCardItem } from "@/lib/deals/types";

const JULEVIN_HINTS = [
  "amarone",
  "chateauneuf",
  "châteauneuf",
  "ribera",
  "priorat",
  "rioja",
  "barolo",
  "barbaresco",
  "brunello",
  "chianti classico",
  "cotes du rhone",
  "côtes du rhône",
  "cote rotie",
  "hermitage",
  "ribera del duero",
  "tempranillo reserva",
  "primitivo di manduria",
  "nero d avola",
  "julevin",
  "juleaften",
  "flæskesteg",
  "andesteg",
];

export function dealSearchBlob(deal: TilbudCardItem): string {
  return normalize(`${deal.title} ${deal.brand}`);
}

export function isJulevinDeal(deal: TilbudCardItem): boolean {
  const t = dealSearchBlob(deal);
  return JULEVIN_HINTS.some((h) => t.includes(normalize(h)));
}

export function isBubblesDeal(deal: TilbudCardItem): boolean {
  const style = wineStyleOfBlob(`${deal.title} ${deal.brand}`);
  return style === "sparkling" || style === "champagne";
}

export function pickTopByDiscount(deals: TilbudCardItem[], limit: number): TilbudCardItem[] {
  return [...deals].sort((a, b) => b.discountPercent - a.discountPercent || a.salePrice - b.salePrice).slice(0, limit);
}
