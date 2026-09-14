import type { PriceRunnerProductKey } from "@/lib/pricerunner/products";
import { getPriceRunnerProduct } from "@/lib/pricerunner/products";

/**
 * Kuraterede olier til klikguide, opskrifter og gaveguide.
 * Holdes ude af vinsøgningen (olie filtreres i lib/search/helpers.ts).
 */
export type OilProfile = "mild" | "kraftig" | "urte" | "citrus" | "troffel";

export type OilPick = {
  id: string;
  priceRunnerKey: PriceRunnerProductKey;
  profile: OilProfile;
  /** Kort finish-note til måltidet — ikke terroir-sommelier-copy. */
  pairingNote: string;
  dishIds: readonly string[];
  recipeSlugs: readonly string[];
};

export const OIL_PICKS: readonly OilPick[] = [
  {
    id: "nicolas-vahe-evoo",
    priceRunnerKey: "nicolas-vahe-ekstra-jomfru-50cl",
    profile: "kraftig",
    pairingNote:
      "Gaveflaske-EVOO til at dryppe over tapas, bøf og ost — finish, ikke stegeolie.",
    dishIds: ["tapas", "boef", "flaeskesteg"],
    recipeSlugs: ["manchego-marineret-i-hvidvin", "caponata-med-rodvin"],
  },
  {
    id: "roemer-greek",
    priceRunnerKey: "roemer-olivenolie-ekstra-jomfru-50cl",
    profile: "mild",
    pairingNote: "Mild, græsk ekstra jomfru til salat, fisk og lyse retter, hvor olien skal bære uden at pebe.",
    dishIds: ["kylling"],
    recipeSlugs: ["graesk-salat"],
  },
  {
    id: "clearspring-italian",
    priceRunnerKey: "clearspring-italiensk-evoo-100cl",
    profile: "kraftig",
    pairingNote: "Italiensk EVOO til tomatpasta — den type olie opskrifter kalder «god olivenolie».",
    dishIds: ["pasta-tomat"],
    recipeSlugs: [],
  },
  {
    id: "herbes-provence",
    priceRunnerKey: "nicolas-vahe-herbes-de-provence",
    profile: "urte",
    pairingNote: "Urteolie til grill, ratatouille og grønt — dryp ved bordet.",
    dishIds: ["grill", "vegetar"],
    recipeSlugs: ["ratatouille-med-hvidvin"],
  },
  {
    id: "basilikum",
    priceRunnerKey: "nicolas-vahe-basilikum",
    profile: "urte",
    pairingNote: "Basilikumolie over caprese-agtig pasta og pizza lige før servering.",
    dishIds: ["pizza"],
    recipeSlugs: ["pesto-pasta-hvidvin", "pesto-med-hvidvin"],
  },
  {
    id: "citron",
    priceRunnerKey: "nicolas-vahe-lemon",
    profile: "citrus",
    pairingNote: "Citrusskær til fisk — et par dråber over tallerkenen, ikke i panden.",
    dishIds: ["fisk"],
    recipeSlugs: [],
  },
  {
    id: "hvidloeg",
    priceRunnerKey: "nicolas-vahe-hvidloeg",
    profile: "urte",
    pairingNote: "Hvidløgsolie til brød og tapas, når du vil have aroma uden at stege fedtet.",
    dishIds: [],
    recipeSlugs: [],
  },
  {
    id: "hvid-troffel",
    priceRunnerKey: "deli-drengene-hvid-troffelolie",
    profile: "troffel",
    pairingNote: "Hvid trøffelolie til cremet pasta, risotto og bagt ost — få dråber, aldrig opvarmning.",
    dishIds: ["pasta-floede"],
    recipeSlugs: ["bagt-camembert-med-hvidvin", "risotto-med-rodvin-barolo"],
  },
];

export function getOilForDish(dishId: string | null | undefined): OilPick | null {
  if (!dishId) return null;
  return OIL_PICKS.find((o) => o.dishIds.includes(dishId)) ?? null;
}

export function getOilForRecipe(slug: string | null | undefined): OilPick | null {
  if (!slug) return null;
  return OIL_PICKS.find((o) => o.recipeSlugs.includes(slug)) ?? null;
}

export function oilPriceRunnerTitle(pick: OilPick): string {
  return getPriceRunnerProduct(pick.priceRunnerKey)?.title ?? pick.id;
}
