import {
  PARTNER_ADS_KLIK_BANNERS,
  partnerAdsKlikUrl,
} from "@/lib/partner-ads-links";

/**
 * Kuraterede olier til klikguide, opskrifter og gaveguide.
 * Holdes ude af vinsøgningen (olie filtreres i lib/search/helpers.ts).
 * Deeplinks: KitchenOne via Partner-Ads klikbanner 18776 (ikke hele køkkenfeedet).
 */
export type OilProfile = "mild" | "kraftig" | "urte" | "citrus" | "troffel";

export type OilPick = {
  id: string;
  title: string;
  /** KitchenOne produktside — sendes som Partner-Ads `htmlurl`. */
  shopUrl: string;
  profile: OilProfile;
  /** Kort finish-note til måltidet — ikke terroir-sommelier-copy. */
  pairingNote: string;
  dishIds: readonly string[];
  recipeSlugs: readonly string[];
};

export const OIL_PICKS: readonly OilPick[] = [
  {
    id: "nicolas-vahe-evoo",
    title: "Nicolas Vahé Extra Virgin olivenolie 500 ml",
    shopUrl: "https://www.kitchenone.dk/p/extra-virgin-olivenolie-500-ml_68268",
    profile: "kraftig",
    pairingNote:
      "Gaveflaske-EVOO til at dryppe over tapas, bøf og ost — finish, ikke stegeolie.",
    dishIds: ["tapas", "boef", "flaeskesteg"],
    recipeSlugs: ["manchego-marineret-i-hvidvin", "caponata-med-rodvin"],
  },
  {
    id: "nicolas-vahe-greece",
    title: "Nicolas Vahé Extra Virgin olivenolie Greece 500 ml",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vah-virgin-olivenolie-greece-500-ml_79437",
    profile: "mild",
    pairingNote:
      "Mild, frugtig græsk EVOO til salat, fisk og et par dråber over vaniljeis med havsalt — finish, ikke dessert-sirup.",
    dishIds: ["kylling", "fisk"],
    recipeSlugs: ["graesk-salat"],
  },
  {
    id: "nicolas-vahe-italy",
    title: "Nicolas Vahé Extra Virgin olivenolie Italy 500 ml",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vah-virgin-olivenolie-italy-500-ml_79438",
    profile: "kraftig",
    pairingNote:
      "Kraftig italiensk EVOO til caprese og tomatpasta — grøn peber-finish over tomat og mozzarella.",
    dishIds: ["pasta-tomat"],
    recipeSlugs: ["caprese", "carpaccio-med-hvidvindressing"],
  },
  {
    id: "herbes-provence",
    title: "Nicolas Vahé olivenolie med herbes de Provence 25 cl",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vahe-olive-oil-with-herbes-de-provence-25-cl_62855",
    profile: "urte",
    pairingNote: "Urteolie til grill, ratatouille og grønt — dryp ved bordet.",
    dishIds: ["grill", "vegetar"],
    recipeSlugs: ["ratatouille-med-hvidvin"],
  },
  {
    id: "basilikum",
    title: "Nicolas Vahé olivenolie med basilikum 25 cl",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vahe-olive-oil-with-basil-25-cl_62857",
    profile: "urte",
    pairingNote: "Basilikumolie over caprese-agtig pasta og pizza lige før servering.",
    dishIds: ["pizza"],
    recipeSlugs: ["pesto-pasta-hvidvin", "pesto-med-hvidvin"],
  },
  {
    id: "hvidloeg",
    title: "Gridelli Olio e aglio — olivenolie med hvidløg 250 ml",
    shopUrl: "https://www.kitchenone.dk/p/gridelli-olio-e-aglio-olivenolie-m-hvidloeg-250-ml_70158",
    profile: "urte",
    pairingNote:
      "Hvidløgsolie til brød, tapas og pizza lige efter ovnen — aroma uden at stege fedtet.",
    dishIds: [],
    recipeSlugs: [],
  },
  {
    id: "chili",
    title: "Nicolas Vahé olivenolie med chili 25 cl",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vahe-olive-oil-with-chili-25-cl_62856",
    profile: "urte",
    pairingNote:
      "Chiliolie over pizza efter ovnen — varme i finishen, ikke i dejen.",
    dishIds: [],
    recipeSlugs: ["pizza-margherita"],
  },
  {
    id: "hvid-troffel",
    title: "Nicolas Vahé Extra Virgin olivenolie med hvid trøffel 25 cl",
    shopUrl:
      "https://www.kitchenone.dk/p/nicolas-vahe-virgin-olive-oil-with-white-truffle-25-cl_62847",
    profile: "troffel",
    pairingNote:
      "Hvid trøffelolie til cremet pasta, risotto og bagt ost — få dråber, aldrig opvarmning.",
    dishIds: ["pasta-floede"],
    recipeSlugs: ["bagt-camembert-med-hvidvin", "risotto-med-rodvin-barolo"],
  },
];

export function getOilById(id: string | null | undefined): OilPick | null {
  if (!id) return null;
  return OIL_PICKS.find((o) => o.id === id) ?? null;
}

export function getOilForDish(dishId: string | null | undefined): OilPick | null {
  if (!dishId) return null;
  return OIL_PICKS.find((o) => o.dishIds.includes(dishId)) ?? null;
}

export function getOilForRecipe(slug: string | null | undefined): OilPick | null {
  if (!slug) return null;
  return OIL_PICKS.find((o) => o.recipeSlugs.includes(slug)) ?? null;
}

export function oilAffiliateHref(pick: OilPick): string {
  return partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.kitchenOne, pick.shopUrl);
}
