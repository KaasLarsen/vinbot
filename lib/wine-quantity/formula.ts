/** Vinbot-formlen: flasker til fest — ren beregning uden UI. */

export type PartyType = "middag" | "cocktail" | "bryllup";

export type WineQuantityInput = {
  guests: number;
  partyType: PartyType;
  /** Cocktail: timer (1–6). Ignoreres for andre typer. */
  hours?: number;
  /** Middag/bryllup: fordel på bobler/hvid/rød (+ evt. dessert). */
  withPhases?: boolean;
  /** Inkluder dessertvin i fasefordeling. */
  withDessert?: boolean;
};

export type WineQuantityBreakdown = {
  bubbles: number;
  white: number;
  red: number;
  dessert: number;
};

export type WineQuantityResult = {
  guests: number;
  partyType: PartyType;
  baseBottles: number;
  bufferPct: number;
  totalBottles: number;
  casesOf6: number;
  breakdown: WineQuantityBreakdown | null;
  perGuestRate: number;
  formulaLabel: string;
};

export const BUFFER_PCT = 0.15;

function ceil(n: number): number {
  return Math.max(0, Math.ceil(n));
}

/** Glas pr. flaske (standard 12,5 cl). */
export const GLASSES_PER_BOTTLE = 6;

/**
 * Vinbot-formlen:
 * - Middag: 0,5 flaske/gæst (eller fasebaseret)
 * - Cocktail: ~0,35–0,55 afhængig af timer
 * - Bryllup/lang fest: 1 flaske/gæst
 * - Buffer: +15 %, afrundet op
 */
export function calculateWineQuantity(input: WineQuantityInput): WineQuantityResult {
  const guests = Math.max(0, Math.min(500, Math.floor(input.guests || 0)));
  const partyType = input.partyType;
  const withPhases = Boolean(input.withPhases);
  const withDessert = Boolean(input.withDessert);
  const hours = Math.max(1, Math.min(8, input.hours ?? 3));

  let perGuestRate: number;
  let formulaLabel: string;
  let breakdown: WineQuantityBreakdown | null = null;
  let baseBottles: number;

  if (partyType === "cocktail") {
    // Ca. 1 glas/time, max ~4–5 glas; 6 glas/flaske → 0,35–0,55
    perGuestRate = Math.min(0.55, Math.max(0.35, (hours * 0.9) / GLASSES_PER_BOTTLE));
    formulaLabel = `Cocktail (~${hours} t): ca. ${(perGuestRate * GLASSES_PER_BOTTLE).toFixed(1)} glas/gæst`;
    baseBottles = guests * perGuestRate;
    if (withPhases && guests > 0) {
      const half = baseBottles / 2;
      breakdown = {
        bubbles: ceil(half * 0.4),
        white: ceil(half * 0.6),
        red: ceil(baseBottles / 2),
        dessert: 0,
      };
      baseBottles = breakdown.bubbles + breakdown.white + breakdown.red;
    }
  } else if (partyType === "bryllup") {
    perGuestRate = 1;
    formulaLabel = "Bryllup/lang fest: 1 flaske vin/gæst (+ bobler til skål)";
    if (withPhases && guests > 0) {
      // Bobler til velkomst+skål: ~1,5 glas ≈ 1/4 flaske; resten fordelt hvid/rød
      const bubbles = ceil(guests / 4);
      const white = ceil(guests * 0.35);
      const red = ceil(guests * 0.5);
      const dessert = withDessert ? ceil(guests / 12) : 0;
      breakdown = { bubbles, white, red, dessert };
      baseBottles = bubbles + white + red + dessert;
    } else {
      baseBottles = guests * perGuestRate;
    }
  } else {
    // middag
    perGuestRate = 0.5;
    formulaLabel = withPhases
      ? "Middag (faser): bobler + hvid + rød" + (withDessert ? " + dessert" : "")
      : "Middag: ½ flaske/gæst";
    if (withPhases && guests > 0) {
      const bubbles = ceil(guests / GLASSES_PER_BOTTLE); // 1 glas
      const white = ceil(guests / GLASSES_PER_BOTTLE); // 1 glas forret
      const red = ceil((guests * 2) / GLASSES_PER_BOTTLE); // 2 glas hovedret
      const dessert = withDessert ? ceil(guests / 15) : 0;
      breakdown = { bubbles, white, red, dessert };
      baseBottles = bubbles + white + red + dessert;
    } else {
      baseBottles = guests * perGuestRate;
    }
  }

  const totalBottles = ceil(baseBottles * (1 + BUFFER_PCT));
  const casesOf6 = ceil(totalBottles / 6);

  // Skalér breakdown op med buffer, hvis vi har en
  let scaledBreakdown = breakdown;
  if (breakdown && baseBottles > 0) {
    const scale = totalBottles / baseBottles;
    scaledBreakdown = {
      bubbles: ceil(breakdown.bubbles * scale),
      white: ceil(breakdown.white * scale),
      red: ceil(breakdown.red * scale),
      dessert: ceil(breakdown.dessert * scale),
    };
    // Justér så sum ≈ total (små afrundingsfejl)
    const sum =
      scaledBreakdown.bubbles + scaledBreakdown.white + scaledBreakdown.red + scaledBreakdown.dessert;
    if (sum < totalBottles) {
      scaledBreakdown.red += totalBottles - sum;
    }
  }

  return {
    guests,
    partyType,
    baseBottles: ceil(baseBottles),
    bufferPct: BUFFER_PCT,
    totalBottles,
    casesOf6,
    breakdown: scaledBreakdown,
    perGuestRate,
    formulaLabel,
  };
}

export function wineQuantitySearchHref(result: WineQuantityResult): string {
  const q =
    result.partyType === "bryllup"
      ? "bryllup fest kasse"
      : result.partyType === "cocktail"
        ? "fest selskab bobler kasse"
        : "fest selskab kasse";
  return `/?q=${encodeURIComponent(q)}`;
}

/** Alias så UI kan bruge «casesOf6» konsistent. */
export function casesNeeded(totalBottles: number, size = 6): number {
  return Math.ceil(totalBottles / size);
}

