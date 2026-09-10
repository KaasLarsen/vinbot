import {
  BLACK_FRIDAY_STORE_CATEGORIES,
  blackFridayPartnerBlurb,
  blackFridayStoreCategory,
  type BlackFridayStoreCategoryId,
} from "@/lib/black-friday/store-copy";
import { getMerchantLogo, type MerchantLogo } from "@/lib/merchant-hubs/logos";
import { MERCHANT_HUBS, resolveMerchantHubShopHref } from "@/lib/merchant-hubs/registry";
import type { MerchantHubConfig } from "@/lib/merchant-hubs/types";
import { partnerAdsKlikUrl } from "@/lib/partner-ads-links";

const EXCLUDED_HUB_SLUGS = new Set(["beer-me"]);

/** Kendte danske vinshops uden partnerskab (ingen udgående link). */
const CURATED_OUTSIDERS: { slug: string; displayName: string }[] = [
  { slug: "philipson-wine", displayName: "Philipson Wine" },
  { slug: "theis-vine", displayName: "Theis Vine" },
  { slug: "kjaer-sommerfeldt", displayName: "Kjær & Sommerfeldt" },
  { slug: "sigurd-muller", displayName: "Sigurd Müller" },
  { slug: "poetzsch-wine", displayName: "Poetzsch Wine" },
  { slug: "hj-hansen-vin", displayName: "H.J. Hansen Vin" },
  { slug: "vinoble", displayName: "Vinoble" },
  { slug: "winefamly", displayName: "Winefamly" },
  { slug: "laudrup-vin", displayName: "Laudrup Vin" },
  { slug: "erik-sorensen-vin", displayName: "Erik Sørensen Vin" },
  { slug: "jysk-vin", displayName: "Jysk Vin" },
  { slug: "skjold-burne", displayName: "Skjold Burne" },
  { slug: "supervin", displayName: "Supervin" },
  { slug: "vildmedvin", displayName: "VildMedVin" },
  { slug: "vinmedmere", displayName: "Vinmedmere" },
  { slug: "andrup-vin", displayName: "Andrup Vin" },
  { slug: "bichel-vine", displayName: "Bichel Vine" },
  { slug: "holte-vinlager", displayName: "Holte Vinlager" },
  { slug: "vin-og-vin", displayName: "Vin & Vin" },
];

/** Hjemmeside når hubben er feed-only (ingen shop-klikbanner). */
const FEED_ONLY_HOMEPAGES: Record<string, string> = {
  "bottles-with-history": "https://bottleswithhistory.dk/",
  "8wines": "https://8wines.com/",
  "wine-store": "https://www.wine-store.dk/",
};

/**
 * Valgfri Black Friday-kampagneside pr. slug.
 * Tom indtil butikkerne har en BF-landing — wraps i Partner-Ads når hubben har banner-id.
 */
const BLACK_FRIDAY_LANDING_URLS: Record<string, string> = {};

export type BlackFridayStore = {
  slug: string;
  displayName: string;
  partner: boolean;
  /** Tracked eller direkte shop-URL. Null = inaktiv (pop-up). */
  href: string | null;
  external: boolean;
  logo: MerchantLogo | null;
  category: BlackFridayStoreCategoryId;
  /** Kun betalende partnere. */
  blurb?: string;
};

function isPartnerKind(kind: MerchantHubConfig["affiliate"]["kind"]): boolean {
  return kind === "partner-ads" || kind === "daisycon" || kind === "feed-only";
}

function resolveBlackFridayStoreHref(hub: MerchantHubConfig): string | null {
  const landing = BLACK_FRIDAY_LANDING_URLS[hub.slug]?.trim();
  const a = hub.affiliate;

  if (landing) {
    if (a.kind === "partner-ads") return partnerAdsKlikUrl(a.bannerId, landing);
    return landing;
  }

  const shopHref = resolveMerchantHubShopHref(hub);
  if (shopHref) return shopHref;
  if (a.kind === "feed-only") return FEED_ONLY_HOMEPAGES[hub.slug] ?? null;
  return null;
}

export function listBlackFridayStores(): BlackFridayStore[] {
  const fromHubs: BlackFridayStore[] = MERCHANT_HUBS.filter((h) => !EXCLUDED_HUB_SLUGS.has(h.slug)).map(
    (hub) => {
      const partner = isPartnerKind(hub.affiliate.kind);
      const href = partner ? resolveBlackFridayStoreHref(hub) : null;
      return {
        slug: hub.slug,
        displayName: hub.displayName,
        partner,
        href,
        external: Boolean(partner && href),
        logo: getMerchantLogo(hub.slug),
        category: blackFridayStoreCategory(hub.slug),
        blurb: partner ? blackFridayPartnerBlurb(hub.slug) : undefined,
      };
    },
  );

  const outsiders: BlackFridayStore[] = CURATED_OUTSIDERS.map((s) => ({
    slug: s.slug,
    displayName: s.displayName,
    partner: false,
    href: null,
    external: false,
    logo: getMerchantLogo(s.slug),
    category: blackFridayStoreCategory(s.slug),
  }));

  return [...fromHubs, ...outsiders].sort((a, b) => {
    if (a.partner !== b.partner) return a.partner ? -1 : 1;
    return a.displayName.localeCompare(b.displayName, "da");
  });
}

export function listBlackFridayStoreTeaser(limit = 12): BlackFridayStore[] {
  return listBlackFridayStores().slice(0, limit);
}

export function groupBlackFridayStoresByCategory(stores: BlackFridayStore[]): {
  id: BlackFridayStoreCategoryId;
  heading: string;
  partners: BlackFridayStore[];
  others: BlackFridayStore[];
}[] {
  const byName = (a: BlackFridayStore, b: BlackFridayStore) =>
    a.displayName.localeCompare(b.displayName, "da");

  return BLACK_FRIDAY_STORE_CATEGORIES.map((cat) => {
    const inCat = stores.filter((s) => s.category === cat.id);
    return {
      id: cat.id,
      heading: cat.heading,
      partners: inCat.filter((s) => s.partner).sort(byName),
      others: inCat.filter((s) => !s.partner).sort(byName),
    };
  }).filter((g) => g.partners.length + g.others.length > 0);
}
