import type { CanonicalWine } from "./types";

/** Skabelontekst til unikke afsnit (MVP — redaktion kan udvides pr. vin senere). */
export function vinePageIntro(w: CanonicalWine): string {
  const n = w.offers.length;
  const lowest = w.offers
    .filter((o) => typeof o.price === "number")
    .sort((a, b) => (a.price ?? 9e9) - (b.price ?? 9e9))[0];
  const priceBit =
    lowest && typeof lowest.price === "number"
      ? ` Fra omkring ${lowest.price} ${lowest.currency === "DKK" || !lowest.currency ? "kr" : lowest.currency} hos ${lowest.merchant}.`
      : "";

  return `${w.displayTitle}${w.brand ? ` fra ${w.brand}` : ""} findes i øjeblikket hos ${n} forhandler${n === 1 ? "" : "e"} på Vinbot.${priceBit} Priser og lager kan skifte — tjek altid hos butikken.`;
}

export function vinePagePairing(w: CanonicalWine): string {
  const cat = (w.category || "").toLowerCase();
  if (/boble|champagne|sparkling|cava|prosecco|mousserende|cremant/i.test(cat + w.displayTitle)) {
    return "Bobler passer ofte til appetitvækkere, skaldyr og lette forretter — og som velkomstdrink til selskab.";
  }
  if (/rosé|rose/i.test(cat + w.displayTitle)) {
    return "Rosé er alsidig: salat, grill, lyst kød og som uformel sommerdrik — vælg tør stil til mad med syre.";
  }
  if (/hvid|white|chardonnay|riesling|sauvignon|hvidvin/i.test(cat + w.displayTitle)) {
    return "Hvidvin matcher ofte fisk, fjerkræ, salater og retter med urter og citron — sørg for god syre mod fedme i retten.";
  }
  return "Rødvin og kraftigere vine matcher ofte grillede retter, simremad og okse — lad tannin og alkohol følge rettens vægt.";
}
