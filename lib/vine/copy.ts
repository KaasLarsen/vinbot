import type { CanonicalWine } from "./types";
import { vineMetaSupplementSentence } from "./editorial-product-copy";
import { extractVintageYear } from "./product-text";

/** Kort SEO/meta — foretrækker feed-beskrivelse når den findes; ellers intro + redaktionelt supplement for mere varierede snippets. */
export function vineMetaDescription(w: CanonicalWine, maxLen = 158): string {
  if (w.description) {
    const oneLine = w.description.replace(/\s+/g, " ").trim();
    if (oneLine.length <= maxLen) return oneLine;
    return `${oneLine.slice(0, maxLen - 1).trim()}…`;
  }
  const intro = vinePageIntro(w).replace(/\s+/g, " ").trim();
  const extra = vineMetaSupplementSentence(w);
  const combined = `${intro} ${extra}`;
  if (combined.length <= maxLen) return combined;
  return `${combined.slice(0, maxLen - 1).trim()}…`;
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

  const headline = `${vintagePhrase}${w.displayTitle}${w.brand ? ` — ${w.brand}` : ""}`;

  if (n === 1) {
    const m = w.offers[0].merchant;
    return `${headline}. Kan findes hos ${m}.${priceBit} Priser og lager kan ændre sig — tjek hos butikken.`;
  }
  return `${headline}. Kan købes hos ${n} butikker.${priceBit} Sammenlign pris nedenfor og gå videre til den forhandler, du foretrækker.`;
}

/** Dru-/stil-specifik tekst ud fra titel og kategori; ellers farve-kaskade. */
export function vinePagePairing(w: CanonicalWine): string {
  const title = (w.displayTitle || "").toLowerCase();
  const blob = `${w.displayTitle} ${w.category}`;

  /** Port før druer og bobler — undgår falske bobler fra shop-kategori «Vin og champagne». */
  if (
    /\bportvin\b|\btawny\b|\bruby port\b|\bvintage port\b|\blbv\b|late bottled|colheita\b|\b10 års\b|\b20 års\b|\b30 års\b|\b40 års\b/i.test(title) ||
    /\bport\b/i.test(title)
  ) {
    return "Portvin er ofte koncentreret og sødmefuld — klassisk til modne oste, nødder, chokolade og som afslutningsglas.";
  }

  const g = grapePairingLine(blob);
  if (g) return g;

  const cat = blob.toLowerCase();
  /** Kræv bobler/champagne i titel eller tydeligt boble-signal — ikke kun «Vin og champagne» i kategori-sti. */
  const bubblesInTitle =
    /\b(champagne|cava|prosecco|crémant|cremant|franciacorta|sekt|asti spumante|cuvée brut|extra brut|blanc de)\b/i.test(title) ||
    /\bmousserende\b|\bcava\b|\bprosecco\b|\bchampagne\b/i.test(title);
  if (bubblesInTitle || /\bboble|\bmousse|\bsparkling wine\b/i.test(title)) {
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
