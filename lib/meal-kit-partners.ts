import {
  ADTRACTION_BETTERFEAST,
  ADTRACTION_FACTOR,
  ADTRACTION_HELLOFRESH,
} from "@/lib/adtraction-links";
import { rotationIndex } from "@/lib/partner-ads-hub-rotations";

export type MealKitPartnerId = "hellofresh" | "betterfeast" | "factor";

export type MealKitPartner = {
  id: MealKitPartnerId;
  name: string;
  href: string;
  /** Kort body der binder madkasse til vin */
  body: string;
  ctaLabel: string;
};

/** Madkasse-partnere uden feed — kun Adtraction shop-/kampagnelinks. */
export const MEAL_KIT_PARTNERS: MealKitPartner[] = [
  {
    id: "hellofresh",
    name: "HelloFresh",
    href: ADTRACTION_HELLOFRESH,
    body: "Ingredienser og opskrift leveret — Vinbot finder flasken til aftensretten.",
    ctaLabel: "Prøv HelloFresh",
  },
  {
    id: "betterfeast",
    name: "BetterFeast",
    href: ADTRACTION_BETTERFEAST,
    body: "Når maden skal være nem at lave — og vinen skal matche.",
    ctaLabel: "Prøv BetterFeast",
  },
  {
    id: "factor",
    name: "Factor",
    href: ADTRACTION_FACTOR,
    body: "Når middagen er klar på få minutter — vælg en flaske der følger med.",
    ctaLabel: "Prøv Factor",
  },
];

/** Stabil rotation pr. side-slug, så én partner ikke dominerer overalt. */
export function pickMealKitPartner(slug: string): MealKitPartner {
  const idx = rotationIndex(slug, MEAL_KIT_PARTNERS.length);
  return MEAL_KIT_PARTNERS[idx]!;
}
