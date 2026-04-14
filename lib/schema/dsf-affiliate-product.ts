import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { partnerAdsDsfClickUrl } from "@/lib/site";

/** Offentlige policies hos Den Sidste Flaske. Opdater URL-felter ved behov. */
export const DSF_MERCHANT = {
  name: "Den Sidste Flaske",
  url: "https://densidsteflaske.dk",
  refundPolicyUrl: "https://densidsteflaske.dk/policies/refund-policy",
  shippingPolicyUrl: "https://densidsteflaske.dk/policies/shipping-policy",
} as const;

/**
 * Ekstra felter Google ofte efterspørger til Merchant Listings / Product-offers.
 * Baseret på "Fri fragt" til DK og fortrydelsesret beskrevet på forhandlerens sider.
 */
export function dsfOfferShippingAndReturn() {
  return {
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "DKK",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "DK",
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: 0,
          maxValue: 2,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: 5,
          unitCode: "DAY",
        },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "DK",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      merchantReturnLink: DSF_MERCHANT.refundPolicyUrl,
    },
  } as const;
}

function offerBlock(pick: DsfFeaturedPick, position: number) {
  const affiliateUrl = pick.directLink ? pick.productUrl : partnerAdsDsfClickUrl(pick.productUrl);
  const extra = dsfOfferShippingAndReturn();
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: affiliateUrl,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: DSF_MERCHANT.name,
      url: DSF_MERCHANT.url,
    },
    ...extra,
  };
  if (pick.listPrice != null && Number.isFinite(pick.listPrice)) {
    offer.price = String(pick.listPrice);
    offer.priceCurrency = pick.priceCurrency ?? "DKK";
  }
  const product: Record<string, unknown> = {
    "@type": "Product",
    name: pick.title,
    url: pick.productUrl,
    description: pick.blurb ?? undefined,
    brand: { "@type": "Brand", name: DSF_MERCHANT.name },
    offers: offer,
  };
  if (pick.imageUrl) product.image = pick.imageUrl;
  return {
    "@type": "ListItem",
    position,
    item: product,
  };
}

/** ItemList med Product — til forsiden / DSF-side. Uden review/aggregateRating (ingen fabrikerede stjerner). */
export function buildDsfFeaturedProductsItemList(picks: DsfFeaturedPick[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: picks.map((p, i) => offerBlock(p, i + 1)),
  };
}
