/** Sæson-mængder til juleaften, julefrokost og nytår — ud fra Vinbots egne guidetabeller. */

import { BUFFER_PCT, GLASSES_PER_BOTTLE } from "./formula.ts";

export type SeasonEvent = "juleaften" | "julefrokost" | "nytaar";

export type SeasonDish = "and" | "flaesk" | "begge";

export type SeasonRedStyle = "classic" | "kraftig";

export type SeasonQuantityInput = {
  guests: number;
  event: SeasonEvent;
};

export type SeasonBreakdown = {
  welcomeBubbles: number;
  white: number;
  red: number;
  dessert: number;
};

export type SeasonQuantityResult = {
  event: SeasonEvent;
  guests: number;
  baseBottles: number;
  bufferPct: number;
  totalBottles: number;
  breakdown: SeasonBreakdown;
  formulaLabel: string;
};

function ceil(n: number): number {
  return Math.max(0, Math.ceil(n));
}

function scaleBreakdown(breakdown: SeasonBreakdown, baseBottles: number, totalBottles: number): SeasonBreakdown {
  if (baseBottles <= 0) return breakdown;
  const scale = totalBottles / baseBottles;
  const scaled: SeasonBreakdown = {
    welcomeBubbles: ceil(breakdown.welcomeBubbles * scale),
    white: ceil(breakdown.white * scale),
    red: ceil(breakdown.red * scale),
    dessert: ceil(breakdown.dessert * scale),
  };
  const sum = scaled.welcomeBubbles + scaled.white + scaled.red + scaled.dessert;
  if (sum < totalBottles) scaled.red += totalBottles - sum;
  return scaled;
}

/**
 * Juleaften: 1 glas bobler (~10 cl), 2–2½ glas rød, ½ glas dessert.
 * Julefrokost: længere bord — mere hvid til sild/fisk + rød til det salte.
 * Nytår: velkomstbobler (1/6 flaske/gæst), hvid 1/3, rød 1/2, midnatsbobler 1/6.
 */
export function calculateSeasonWineQuantity(input: SeasonQuantityInput): SeasonQuantityResult {
  const guests = Math.max(0, Math.min(500, Math.floor(input.guests || 0)));
  const event = input.event;

  let breakdown: SeasonBreakdown = { welcomeBubbles: 0, white: 0, red: 0, dessert: 0 };
  let formulaLabel: string;

  if (guests > 0 && event === "juleaften") {
    breakdown = {
      welcomeBubbles: ceil(guests / 8),
      white: 0,
      red: ceil((guests * 2.25) / GLASSES_PER_BOTTLE),
      dessert: ceil(guests / 12) || 1,
    };
    formulaLabel = "Juleaften: velkomstbobler + rød til and/flæsk + sød vin til risalamande";
  } else if (guests > 0 && event === "julefrokost") {
    breakdown = {
      welcomeBubbles: ceil(guests / 6),
      white: ceil(guests / 4),
      red: ceil(guests / 3),
      dessert: guests >= 6 ? ceil(guests / 12) : 0,
    };
    formulaLabel = "Julefrokost: bobler, hvid til det salte og rød til det fede";
  } else if (guests > 0) {
    breakdown = {
      welcomeBubbles: ceil(guests / 6),
      white: ceil(guests / 3),
      red: ceil(guests / 2),
      dessert: ceil(guests / 6),
    };
    formulaLabel = "Nytårsaften: velkomstbobler, hvid, rød og bobler til midnat";
  } else {
    formulaLabel = "Angiv antal voksne";
  }

  const baseBottles =
    breakdown.welcomeBubbles + breakdown.white + breakdown.red + breakdown.dessert;
  const totalBottles = ceil(baseBottles * (1 + BUFFER_PCT));
  const scaled = scaleBreakdown(breakdown, baseBottles, totalBottles);

  return {
    event,
    guests,
    baseBottles,
    bufferPct: BUFFER_PCT,
    totalBottles,
    breakdown: scaled,
    formulaLabel,
  };
}

export function seasonGuideHref(event: SeasonEvent): string {
  if (event === "juleaften") return "/guides/vin-til-juleaften";
  if (event === "julefrokost") return "/guides/vin-til-julefrokost";
  return "/guides/vin-til-nytaar-og-nytaarsmenu";
}

export function defaultEventForGuideSlug(slug: string): SeasonEvent | null {
  if (
    slug === "vin-til-juleaften" ||
    slug === "bedste-julevin" ||
    slug === "vin-til-juleand" ||
    slug === "vin-til-julemad-den-store-guide" ||
    slug === "vin-til-risalamande"
  ) {
    return "juleaften";
  }
  if (slug === "vin-til-julefrokost") return "julefrokost";
  if (
    slug === "vin-til-nytarsaften" ||
    slug === "vin-til-nytaar-og-nytaarsmenu" ||
    slug === "bedste-champagne-til-nytaar"
  ) {
    return "nytaar";
  }
  return null;
}
