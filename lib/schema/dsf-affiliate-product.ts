import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import {
  productJsonLdIdentifierFields,
  resolveProductBrandForJsonLd,
  shopifyProductSlugFromUrl,
} from "@/lib/schema/product-identifiers";
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
      /** Påkrævet af Google Merchant Listings — tjek forhandlerens aktuelle returvilkår */
      returnFees: "https://schema.org/ReturnShippingFees",
      /** Google kræver eksplicit beløb når returFees === ReturnShippingFees */
      returnShippingFeesAmount: {
        "@type": "MonetaryAmount",
        value: "49",
        currency: "DKK",
      },
    },
  } as const;
}

function pickHasValidOfferPrice(p: DsfFeaturedPick): boolean {
  return p.listPrice != null && Number.isFinite(p.listPrice) && p.listPrice > 0;
}

/**
 * Produktgraf til strukturerede data — med affiliate som `offers.url`.
 * Til ItemList-cards peger Product.url på butikkens side; på Vinbot-detaljesider sættes `canonicalPageUrl`.
 */
export function buildDsfAffiliateProductNode(
  pick: DsfFeaturedPick,
  options?: {
    canonicalPageUrl?: string;
    description?: string;
    /** Flere Shopify-billeder (fx vinkler fra forhandler — undgå gif/spinner-url’er her). */
    additionalImageUrls?: readonly string[];
  },
): Record<string, unknown> | null {
  if (!pickHasValidOfferPrice(pick)) return null;
  const affiliateUrl = pick.directLink ? pick.productUrl : partnerAdsDsfClickUrl(pick.productUrl);
  const extra = dsfOfferShippingAndReturn();
  const currency = pick.priceCurrency ?? "DKK";
  const priceStr = String(pick.listPrice);
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: affiliateUrl,
    price: priceStr,
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: {
      "@type": "Organization",
      name: DSF_MERCHANT.name,
      url: DSF_MERCHANT.url,
    },
    ...extra,
  };
  const desc = (options?.description ?? pick.blurb)?.trim().slice(0, 5000);
  const brandName =
    resolveProductBrandForJsonLd({ titles: [pick.title] }) ?? pick.title.split(/\s[-|–—]\s/)[0]?.trim().slice(0, 64);
  const product: Record<string, unknown> = {
    "@type": "Product",
    name: pick.title,
    url: options?.canonicalPageUrl ?? pick.productUrl,
    ...(desc ? { description: desc } : {}),
    ...(brandName ? { brand: { "@type": "Brand", name: brandName } } : {}),
    ...productJsonLdIdentifierFields({ sku: shopifyProductSlugFromUrl(pick.productUrl) ?? undefined }),
    offers: offer,
  };
  const imgs = [...(pick.imageUrl ? [pick.imageUrl] : []), ...(options?.additionalImageUrls ?? [])].map((u) => u.trim()).filter(Boolean);
  const unique = [...new Set(imgs)];
  if (unique.length === 1) product.image = unique[0];
  else if (unique.length > 1) product.image = unique;
  return product;
}

/** ItemList med Product — til forsiden / DSF-side. Uden review/aggregateRating (ingen fabrikerede stjerner). */
export function buildDsfFeaturedProductsItemList(picks: DsfFeaturedPick[]) {
  const withPrice = picks.filter(pickHasValidOfferPrice);
  const itemListElement = withPrice
    .map((p, i) => {
      const item = buildDsfAffiliateProductNode(p);
      if (!item) return null;
      return {
        "@type": "ListItem",
        position: i + 1,
        item,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x != null);

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement,
  };
}
