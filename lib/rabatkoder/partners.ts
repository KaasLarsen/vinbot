import { ADTRACTION_VINKOELSKABET_SHOP, ADTRACTION_WITT_LIVING_SHOP } from "@/lib/adtraction-links";
import { QUIEROVINOS_SHOP_HREF } from "@/lib/daisycon-links";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

export type RabatEntry = {
  title: string;
  body: string;
  /** Vises i monospace så koden er nem at kopiere */
  code?: string;
};

export type RabatPartner = {
  name: string;
  /** Butikkens URL (vises ikke som link — brug affiliateHref til shop) */
  shopUrl: string;
  /** Affiliate-destination (Partner-Ads klikbanner eller Adtraction m.m.) */
  affiliateHref: string;
  /** Hvilket netværk der tracker klik (oplysningspligt / gennemsigtighed) */
  affiliateVia: "partner-ads" | "adtraction" | "daisycon";
  entries: RabatEntry[];
  footnote?: string;
};

export type HomepageRabatkode = {
  partnerName: string;
  affiliateHref: string;
  code: string;
  /** Kort fordel til sidebar, fx "100 kr" / "12%" */
  benefit: string;
  title: string;
};

export const PARTNERE: RabatPartner[] = [
  {
    name: "Lauridsen Vine",
    shopUrl: "https://lauridsenvine.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Lauridsen Vine. Tilmelding og vilkår foregår på deres webshop.",
      },
    ],
  },
  {
    name: "Beer Me",
    shopUrl: "https://www.beer-me.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.beerMeShop, "https://www.beer-me.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Beer Me (vin, øl og mere på webshoppen). Tilmelding sker på deres site.",
      },
    ],
  },
  {
    name: "Johnsen Wine",
    shopUrl: "https://www.johnsenwine.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.johnsenWine, "https://www.johnsenwine.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Johnsen Wine. Tilmelding og vilkår på johnsenwine.dk.",
      },
    ],
  },
  {
    name: "Winther Vin",
    shopUrl: "https://winthervin.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.wintherVin, "https://winthervin.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Winther Vin. Tilmelding og vilkår på winthervin.dk.",
      },
    ],
  },
  {
    name: "Winefriends",
    shopUrl: "https://winefriends.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.winefriends, "https://winefriends.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Winefriends. Tilmelding og vilkår på winefriends.dk.",
      },
    ],
  },
  {
    name: "DH Wines",
    shopUrl: "https://dhwines.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.dhWines, "https://dhwines.dk/"),
    entries: [
      {
        title: "100 kr. rabat",
        code: "PA10024",
        body: "Angiv koden i kurven på **hele shoppen** — tjek eventuelle undtagelser på dhwines.dk.",
      },
      {
        title: "5% rabat",
        code: "PA524",
        body: "Angiv koden i kurven — **5% rabat** på hele shoppen.",
      },
    ],
  },
  {
    name: "SPS Wine",
    shopUrl: "https://www.spswine.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.spsWine, "https://www.spswine.dk/"),
    entries: [
      {
        title: "12% rabat",
        code: "YTAK9M8B",
        body: "Gælder **produkterne** i shoppen. **Rabatkoden kan ikke kombineres** med andre rabatkoder — se fulde vilkår på spswine.dk.",
      },
    ],
  },
  {
    name: "QuieroVinos",
    shopUrl: "https://www.quierovinos.com/",
    affiliateVia: "daisycon",
    affiliateHref: QUIEROVINOS_SHOP_HREF,
    entries: [
      {
        title: "5% rabat — første køb",
        code: "WELCOME",
        body: "**5% rabat** på dit **første køb** hos QuieroVinos. Angiv koden i kurven — tjek aktuelle vilkår på quierovinos.com.",
      },
    ],
  },
  {
    name: "Vinkøleskabet.dk",
    shopUrl: "https://www.vinkoleskabet.dk/",
    affiliateVia: "adtraction",
    affiliateHref: ADTRACTION_VINKOELSKABET_SHOP,
    entries: [
      {
        title: "Shop — vinkøleskabe",
        body: "**Vinkøleskabet.dk** sælger vinkøleskabe og tilbehør. Priser, levering og kundeservice er på deres webshop.",
      },
    ],
  },
  {
    name: "Witt Living",
    shopUrl: "https://wittliving.com/da-dk",
    affiliateVia: "adtraction",
    affiliateHref: ADTRACTION_WITT_LIVING_SHOP,
    entries: [
      {
        title: "Shop — vinkøleskabe",
        body: "**Witt Living** sælger vinkøleskabe (Witt, Haier, Liebherr m.fl.). Priser, levering og kundeservice er på deres webshop.",
      },
    ],
  },
];

/** Curated homepage picks: én bedste kode pr. partner. */
const HOMEPAGE_PICKS: { partnerName: string; code: string; benefit: string }[] = [
  { partnerName: "DH Wines", code: "PA10024", benefit: "100 kr" },
  { partnerName: "SPS Wine", code: "YTAK9M8B", benefit: "12%" },
  { partnerName: "QuieroVinos", code: "WELCOME", benefit: "5%" },
];

export function getHomepageRabatkoder(): HomepageRabatkode[] {
  return HOMEPAGE_PICKS.flatMap((pick) => {
    const partner = PARTNERE.find((p) => p.name === pick.partnerName);
    if (!partner) return [];
    const entry = partner.entries.find((e) => e.code === pick.code);
    if (!entry?.code) return [];
    return [
      {
        partnerName: partner.name,
        affiliateHref: partner.affiliateHref,
        code: entry.code,
        benefit: pick.benefit,
        title: entry.title,
      },
    ];
  });
}
