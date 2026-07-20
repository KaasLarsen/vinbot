import type { CrossMerchantDeal } from "@/lib/deals/cross-merchant";

/** Serialiseret tilbud til klient-komponenter (feed + tværs-forhandler). */
export type TilbudCardItem = {
  id: string;
  kind: "feed" | "cross";
  title: string;
  brand: string;
  merchant: string;
  /** Gratis butik = ingen affiliate. */
  tier?: "paid" | "free";
  image: string | null;
  url: string;
  salePrice: number;
  referencePrice: number | null;
  discountPercent: number;
  catalogSlug?: string;
  savingsAmount?: number;
  highestMerchant?: string;
  merchantCount?: number;
};

export function feedDealToCard(deal: {
  merchant: string;
  tier?: "paid" | "free";
  title: string;
  brand: string;
  image: string | null;
  url: string;
  salePrice: number | null;
  referencePrice: number;
  discountPercent: number;
}): TilbudCardItem {
  return {
    id: `feed:${deal.url}`,
    kind: "feed",
    title: deal.title,
    brand: deal.brand,
    merchant: deal.merchant,
    tier: deal.tier ?? "paid",
    image: deal.image,
    url: deal.url,
    salePrice: deal.salePrice ?? deal.referencePrice,
    referencePrice: deal.referencePrice,
    discountPercent: deal.discountPercent,
  };
}

export function crossMerchantDealToCard(deal: CrossMerchantDeal): TilbudCardItem {
  return {
    id: `cross:${deal.wine.slug}`,
    kind: "cross",
    title: deal.wine.displayTitle,
    brand: deal.wine.brand,
    merchant: deal.lowestOffer.merchant,
    tier: deal.lowestOffer.tier,
    image: deal.wine.image,
    url: deal.lowestOffer.url,
    salePrice: deal.lowestOffer.price ?? deal.highestOffer.price ?? 0,
    referencePrice: deal.highestOffer.price,
    discountPercent: deal.savingsPercent,
    catalogSlug: deal.wine.slug,
    savingsAmount: deal.savingsAmount,
    highestMerchant: deal.highestOffer.merchant,
    merchantCount: deal.wine.offers.length,
  };
}
