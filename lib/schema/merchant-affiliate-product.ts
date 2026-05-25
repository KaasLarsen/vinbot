import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig, merchantPartnerAdsClickUrl } from "@/lib/wine-detail-pages/merchants";
import type { WineDetailFeaturedPick } from "@/lib/wine-detail-pages/types";
import {
  productJsonLdIdentifierFields,
  resolveProductBrandForJsonLd,
  shopifyProductSlugFromUrl,
} from "@/lib/schema/product-identifiers";

export const DSF_MERCHANT = {
  name: "Den Sidste Flaske",
  url: "https://densidsteflaske.dk",
  refundPolicyUrl: "https://densidsteflaske.dk/policies/refund-policy",
  shippingPolicyUrl: "https://densidsteflaske.dk/policies/shipping-policy",
} as const;

export type MerchantOfferMeta = {
  name: string;
  url: string;
  refundPolicyUrl?: string;
};

const MERCHANT_OFFER_META: Record<MerchantWineId, MerchantOfferMeta> = {
  "den-sidste-flaske": DSF_MERCHANT,
  "lauridsen-vine": {
    name: "Lauridsen Vine",
    url: "https://lauridsenvine.dk",
    refundPolicyUrl: "https://lauridsenvine.dk/policies/refund-policy",
  },
  "winther-vin": {
    name: "Winther Vin",
    url: "https://winthervin.dk",
  },
  "dh-wines": {
    name: "DH Wines",
    url: "https://dhwines.dk",
    refundPolicyUrl: "https://dhwines.dk/policies/refund-policy",
  },
  "johnsen-wine": {
    name: "Johnsen Wine",
    url: "https://www.johnsenwine.dk",
  },
};

/** DSF-specifik shipping/return — andre forhandlere får generisk DK-levering. */
export function dsfOfferShippingAndReturn() {
  return {
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "DKK" },
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "DK" },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 2, unitCode: "DAY" },
        transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 5, unitCode: "DAY" },
      },
    },
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      applicableCountry: "DK",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      merchantReturnDays: 30,
      returnMethod: "https://schema.org/ReturnByMail",
      merchantReturnLink: DSF_MERCHANT.refundPolicyUrl,
      returnFees: "https://schema.org/ReturnShippingFees",
      returnShippingFeesAmount: { "@type": "MonetaryAmount", value: "49", currency: "DKK" },
    },
  } as const;
}

function genericOfferShippingAndReturn(refundPolicyUrl?: string) {
  return {
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingDestination: { "@type": "DefinedRegion", addressCountry: "DK" },
    },
    ...(refundPolicyUrl
      ? {
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            applicableCountry: "DK",
            returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
            merchantReturnLink: refundPolicyUrl,
          },
        }
      : {}),
  } as const;
}

function pickHasValidOfferPrice(p: WineDetailFeaturedPick): boolean {
  return p.listPrice != null && Number.isFinite(p.listPrice) && p.listPrice > 0;
}

export function buildMerchantAffiliateProductNode(
  merchantId: MerchantWineId,
  pick: WineDetailFeaturedPick,
  options?: {
    canonicalPageUrl?: string;
    description?: string;
    additionalImageUrls?: readonly string[];
  },
): Record<string, unknown> | null {
  if (!pickHasValidOfferPrice(pick)) return null;
  const meta = MERCHANT_OFFER_META[merchantId];
  const cfg = getMerchantWineConfig(merchantId);
  const affiliateUrl = pick.directLink ? pick.productUrl : merchantPartnerAdsClickUrl(merchantId, pick.productUrl);
  const extra =
    merchantId === "den-sidste-flaske" ? dsfOfferShippingAndReturn() : genericOfferShippingAndReturn(meta.refundPolicyUrl);
  const currency = pick.priceCurrency ?? "DKK";
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url: affiliateUrl,
    price: String(pick.listPrice),
    priceCurrency: currency,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@type": "Organization", name: meta.name, url: meta.url },
    ...extra,
  };
  const desc = (options?.description ?? pick.blurb)?.trim().slice(0, 5000);
  const brandName =
    resolveProductBrandForJsonLd({ titles: [pick.title] }) ?? pick.title.split(/\s[-|–—]\s/)[0]?.trim().slice(0, 64);
  const product: Record<string, unknown> = {
    "@type": "Product",
    name: pick.title,
    url: options?.canonicalPageUrl ?? cfg.sanitizeProductUrl(pick.productUrl),
    ...(desc ? { description: desc } : {}),
    ...(brandName ? { brand: { "@type": "Brand", name: brandName } } : {}),
    ...productJsonLdIdentifierFields({ sku: shopifyProductSlugFromUrl(pick.productUrl) ?? undefined }),
    offers: offer,
  };
  const imgs = [...(pick.imageUrl ? [pick.imageUrl] : []), ...(options?.additionalImageUrls ?? [])]
    .map((u) => u.trim())
    .filter(Boolean);
  const unique = [...new Set(imgs)];
  if (unique.length === 1) product.image = unique[0];
  else if (unique.length > 1) product.image = unique;
  return product;
}
