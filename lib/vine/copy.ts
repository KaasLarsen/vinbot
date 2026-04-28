import type { CanonicalWine } from "./types";
import { extractVintageYear } from "./product-text";

/** Kort SEO/meta — foretrækker feed-beskrivelse når den findes. */
export function vineMetaDescription(w: CanonicalWine, maxLen = 158): string {
  if (w.description) {
    const oneLine = w.description.replace(/\s+/g, " ").trim();
    if (oneLine.length <= maxLen) return oneLine;
    return `${oneLine.slice(0, maxLen - 1).trim()}…`;
  }
  return vinePageIntro(w).slice(0, maxLen);
}

export function vinePageIntro(w: CanonicalWine): string {
  const n = w.offers.length;
  const vintage = extractVintageYear(w.displayTitle);
  const vintagePhrase = vintage ? `Årgang ${vintage}. ` : "";

  const lowest = w.offers
    .filter((o) => typeof o.price === "number")
    .sort((a, b) => (a.price ?? 9e9) - (b.price ?? 9e9))[0];
  const priceBit =
    lowest && typeof lowest.price === "number"
      ? ` Fra omkring ${lowest.price} ${lowest.currency === "DKK" || !lowest.currency ? "kr" : lowest.currency} hos ${lowest.merchant}.`
      : "";

  const cat = (w.category || "").trim();
  const catBit =
    cat && cat.length > 2 && cat.length < 180
      ? ` I feeds er produktet ofte klassificeret som: ${cat.replace(/\s*[>|]\s*/g, " · ")}.`
      : "";

  const headline = `${vintagePhrase}${w.displayTitle}${w.brand ? ` (${w.brand})` : ""}`;

  if (n === 1) {
    const m = w.offers[0].merchant;
    return `${headline} er i øjeblikket listet hos ${m} i Vinbots vin-indeks.${priceBit}${catBit} Priser og lager kan skifte — tjek altid hos butikken.`;
  }
  return `${headline} findes i Vinbots indeks hos ${n} forhandlere.${priceBit}${catBit} Sammenlign pris og åbn den butik, der passer dig.`;
}

/** Dru-/stil-specifik tekst ud fra titel og kategori; ellers farve-kaskade. */
export function vinePagePairing(w: CanonicalWine): string {
  const blob = `${w.displayTitle} ${w.category}`;
  const g = grapePairingLine(blob);
  if (g) return g;

  const cat = blob.toLowerCase();
  if (/boble|champagne|sparkling|cava|prosecco|mousserende|cremant/i.test(cat)) {
    return "Bobler passer ofte til appetitvækkere, skaldyr og lette forretter — og som velkomstdrink til selskab.";
  }
  if (/rosé|rose/i.test(cat)) {
    return "Rosé er alsidig: salat, grill, lyst kød og som uformel sommerdrik — vælg tør stil til mad med syre.";
  }
  if (/hvid|white|chardonnay|riesling|sauvignon|hvidvin/i.test(cat)) {
    return "Hvidvin matcher ofte fisk, fjerkræ, salater og retter med urter og citron — sørg for god syre mod fedme i retten.";
  }
  return "Rødvin og kraftigere vine matcher ofte grillede retter, simremad og okse — lad tannin og alkohol følge rettens vægt.";
}

function grapePairingLine(blob: string): string | null {
  const t = blob.toLowerCase();
  if (/zinfandel|primitivo/i.test(t)) {
    return "Zinfandel og nære stilarter er ofte frugtrige med modne bær, krydderi og fyld — ofte god til grill, bbq, kraftige pastaer og pizza med kød.";
  }
  if (/\bpinot\s*noir\b|spätburgunder|burgunder\b|bourgogne|rød burgunder/i.test(t)) {
    return "Pinot noir er ofte lysere i strukturen med røde bær og jord — velegnet til fjerkræ, svampe, mildere simreretter og ostebord.";
  }
  if (/cabernet|malbec/i.test(t) || /\bcabernet\s+sauvignon\b/i.test(t)) {
    return "Kraftige cabernet-/blend-stilarter matcher ofte okse, lam og retter med tanninstruktur og fad — god til grillede og langtidssimrede retter.";
  }
  if (/syrah|shiraz/i.test(t)) {
    return "Syrah/shiraz kan give mørke bær, peber og kød — passer til grill, vildt og krydret mad.";
  }
  if (/riesling/i.test(t)) {
    return "Riesling kan være fra knastør til halvtør — til fed fisk, asiatisk med syre, eller ost til den sødmefulde type.";
  }
  if (/chardonnay|chablis|puligny|meursault/i.test(t)) {
    return "Chardonnay spænder fra slank mineralitet til fadfyld — til skaldyr, fjerkræ, cremede saucer eller ovnbagt fisk afhængigt af udtrykket.";
  }
  if (/sauvignon\s*blanc|sancerre|marlborough/i.test(t)) {
    return "Sauvignon og lignende kan have frisk citrus og urter — ofte god til salater, grønt og lettere fisk.";
  }
  if (/gamay|beaujolais/i.test(t)) {
    return "Gamay kan være saftig og lav på tannin — velegnet lidt afkølet til charcuteri, lighter kød og hverdagsmad.";
  }
  if (/nebbiolo|barolo|barbaresco/i.test(t)) {
    return "Nebbiolo kan have høj syre og tannin med markante aromaer — matcher ofte til retter med struktur: okse, trøffel og modne oste.";
  }
  if (/sangiovese|chianti|brunello/i.test(t)) {
    return "Sangiovese-dominante vine passer ofte til tomatbaserede retter, italiensk køkken og grillede retter med syre.";
  }
  if (/tempranillo|rioja|ribera/i.test(t)) {
    return "Tempranillo fra Iberia passer ofte til lam, grill og lagret ost.";
  }
  return null;
}
