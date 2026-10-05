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
  /** KitchenOne produktside — sendes som partner-klik `htmlurl`. */
  shopUrl: string;
  /** Produktbillede fra partner-feedet (KitchenOne). */
  imageUrl: string;
  /** Pris i DKK fra partner-feedet. Kan have ændret sig i shoppen. */
  listPrice: number;
  /** false når feedet sagde udsolgt. */
  inStock: boolean;
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
    imageUrl: "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/TiPvRmOJckzX-68268_1.jpeg?format=jpeg",
    listPrice: 249.95,
    inStock: true,
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
    imageUrl: "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/79437_1.jpg?format=jpeg",
    listPrice: 209.95,
    inStock: true,
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
    imageUrl: "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/79438_1.jpg?format=jpeg",
    listPrice: 259.95,
    inStock: true,
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
    imageUrl:
      "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/HwHHSQrssmYn-nicolas-vahe-olive-oil-with-herbes-de-provence-25-cl-105790102-62855-1.jpg?format=jpeg",
    listPrice: 89,
    inStock: false,
    profile: "urte",
    pairingNote: "Urteolie til grill, ratatouille og grønt — dryp ved bordet.",
    dishIds: ["grill", "vegetar"],
    recipeSlugs: ["ratatouille-med-hvidvin"],
  },
  {
    id: "basilikum",
    title: "Nicolas Vahé olivenolie med basilikum 25 cl",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vahe-olive-oil-with-basil-25-cl_62857",
    imageUrl:
      "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/ufzIKAtuOgdZ-nicolas-vahe-olive-oil-with-basil-25-cl-105790103-62857-1.jpg?format=jpeg",
    listPrice: 84,
    inStock: true,
    profile: "urte",
    pairingNote: "Basilikumolie over caprese-agtig pasta og pizza lige før servering.",
    dishIds: ["pizza"],
    recipeSlugs: ["pesto-pasta-hvidvin", "pesto-med-hvidvin"],
  },
  {
    id: "hvidloeg",
    title: "Gridelli Olio e aglio — olivenolie med hvidløg 250 ml",
    shopUrl: "https://www.kitchenone.dk/p/gridelli-olio-e-aglio-olivenolie-m-hvidloeg-250-ml_70158",
    imageUrl: "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/lhhTEC-70158_1.jpg?format=jpeg",
    listPrice: 179,
    inStock: true,
    profile: "urte",
    pairingNote:
      "Hvidløgsolie til brød, tapas og pizza lige efter ovnen — aroma uden at stege fedtet.",
    dishIds: [],
    recipeSlugs: ["aioli-med-hvidvin"],
  },
  {
    id: "chili",
    title: "Nicolas Vahé olivenolie med chili 25 cl",
    shopUrl: "https://www.kitchenone.dk/p/nicolas-vahe-olive-oil-with-chili-25-cl_62856",
    imageUrl:
      "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/JCANzNFGgNGQ-nicolas-vahe-olive-oil-with-chili-25-cl-105790101-62856-1.jpg?format=jpeg",
    listPrice: 89,
    inStock: true,
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
    imageUrl:
      "https://media.enad.io/20dccf88-6cf1-4912-a8a3-40dbcf6e8e0f/glqeleuPdACy-nicolas-vahe-virgin-olive-oil-with-white-truffle-25-cl-105790300-62847-1.jpg?format=jpeg",
    listPrice: 128,
    inStock: true,
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

/** Extra virgin først, derefter urte, chili, hvidløg og trøffel. */
const HUB_OIL_IDS = [
  "nicolas-vahe-evoo",
  "nicolas-vahe-greece",
  "nicolas-vahe-italy",
  "herbes-provence",
  "basilikum",
  "chili",
  "hvidloeg",
  "hvid-troffel",
] as const;

export function listHubOilPicks(): OilPick[] {
  return HUB_OIL_IDS.map((id) => getOilById(id)).filter((oil): oil is OilPick => oil != null);
}

export function formatOilPrice(amount: number): string {
  return new Intl.NumberFormat("da-DK", { style: "currency", currency: "DKK" }).format(amount);
}

export function oilAffiliateHref(pick: OilPick): string {
  return partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.kitchenOne, pick.shopUrl);
}
