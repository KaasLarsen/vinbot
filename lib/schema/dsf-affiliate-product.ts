import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import type { WineDetailFeaturedPick } from "@/lib/wine-detail-pages/types";
import {
  buildMerchantAffiliateProductNode,
} from "@/lib/schema/merchant-affiliate-product";

export type { MerchantOfferMeta } from "@/lib/schema/merchant-affiliate-product";

/** Offentlige policies hos Den Sidste Flaske — beholdt for bagudkompatibilitet. */
export { DSF_MERCHANT, dsfOfferShippingAndReturn } from "@/lib/schema/merchant-affiliate-product";

type PickInput = Omit<WineDetailFeaturedPick, "merchantId"> & { merchantId?: MerchantWineId };

function withMerchant(p: PickInput): WineDetailFeaturedPick {
  return { ...p, merchantId: p.merchantId ?? "den-sidste-flaske" };
}

export function buildDsfAffiliateProductNode(
  pick: PickInput,
  options?: Parameters<typeof buildMerchantAffiliateProductNode>[2],
): ReturnType<typeof buildMerchantAffiliateProductNode> {
  return buildMerchantAffiliateProductNode("den-sidste-flaske", withMerchant(pick), options);
}

export function buildDsfFeaturedProductsItemList(picks: PickInput[]) {
  const withPrice = picks.filter((p) => p.listPrice != null && Number.isFinite(p.listPrice) && p.listPrice > 0);
  const itemListElement = withPrice
    .map((p, i) => {
      const item = buildMerchantAffiliateProductNode("den-sidste-flaske", withMerchant(p));
      if (!item) return null;
      return { "@type": "ListItem", position: i + 1, item };
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement,
  };
}

export function buildMerchantFeaturedProductsItemList(merchantId: MerchantWineId, picks: WineDetailFeaturedPick[]) {
  const filtered = picks.filter((p) => p.merchantId === merchantId);
  const withPrice = filtered.filter((p) => p.listPrice != null && Number.isFinite(p.listPrice) && p.listPrice > 0);
  const itemListElement = withPrice
    .map((p, i) => {
      const item = buildMerchantAffiliateProductNode(merchantId, p);
      if (!item) return null;
      return { "@type": "ListItem", position: i + 1, item };
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement,
  };
}
