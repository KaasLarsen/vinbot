import { getMerchantLogo, type MerchantLogo } from "@/lib/merchant-hubs/logos";
import { MERCHANT_HUBS, resolveMerchantHubShopHref } from "@/lib/merchant-hubs/registry";

const EXCLUDED_HUB_SLUGS = new Set(["whiskystack", "beer-me"]);

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
];

export type BlackFridayStore = {
  slug: string;
  displayName: string;
  partner: boolean;
  /** Tracked shop URL eller intern hub-sti. Null = inaktiv (pop-up). */
  href: string | null;
  external: boolean;
  logo: MerchantLogo | null;
};

function isPartnerKind(kind: (typeof MERCHANT_HUBS)[number]["affiliate"]["kind"]): boolean {
  return kind === "partner-ads" || kind === "daisycon" || kind === "feed-only";
}

export function listBlackFridayStores(): BlackFridayStore[] {
  const fromHubs: BlackFridayStore[] = MERCHANT_HUBS.filter((h) => !EXCLUDED_HUB_SLUGS.has(h.slug)).map(
    (hub) => {
      const partner = isPartnerKind(hub.affiliate.kind);
      const shopHref = resolveMerchantHubShopHref(hub);
      const href = partner ? (shopHref ?? `/${hub.slug}`) : null;
      const external = Boolean(partner && shopHref);
      return {
        slug: hub.slug,
        displayName: hub.displayName,
        partner,
        href,
        external,
        logo: getMerchantLogo(hub.slug),
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
  }));

  return [...fromHubs, ...outsiders].sort((a, b) => {
    if (a.partner !== b.partner) return a.partner ? -1 : 1;
    return a.displayName.localeCompare(b.displayName, "da");
  });
}

export function listBlackFridayStoreTeaser(limit = 12): BlackFridayStore[] {
  return listBlackFridayStores().slice(0, limit);
}
