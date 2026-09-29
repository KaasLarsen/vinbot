import type { CanonicalWine } from "./types";
import { extractVintageYear } from "./product-text";

/** Deterministisk variation pr. slug — samme vin får samme tekst ved hver build. */
export function stableHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function parseCategoryTrail(cat: string): string[] {
  return cat
    .split(/\s*[>|]\s*|\s*\/\s*/)
    .map((t) => t.replace(/\s+/g, " ").trim())
    .filter((t) => t.length > 1);
}

function merchantPhrase(w: CanonicalWine): string {
  const names = [...new Set(w.offers.map((o) => o.merchant))].sort((a, b) => a.localeCompare(b, "da"));
  if (names.length === 0) return "forhandler-feeds";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} og ${names[1]}`;
  return `${names.slice(0, 2).join(", ")} og ${names.length - 2} andre butikker`;
}

function openingParagraph(w: CanonicalWine, variant: number): string {
  const title = w.displayTitle.trim();
  const brand = w.brand.trim();
  const year = extractVintageYear(w.displayTitle);
  const who = brand ? `${title} (${brand})` : title;
  const mp = merchantPhrase(w);
  const yearBit = year ? ` (${year})` : "";

  switch (variant % 2) {
    case 0:
      return `${who}${yearBit} — oversigt fra Vinbot med data fra ${mp}. Vi sælger ikke vin; du handler hos forhandleren.`;
    default:
      return `Profil for ${who}${yearBit}. Priser og produkttekst kommer fra ${mp}. Vinbot er et overblik — købet sker i butikken.`;
  }
}

function categoryParagraph(w: CanonicalWine): string {
  const trail = parseCategoryTrail(w.category);
  if (trail.length === 0) {
    return `Ingen tydelig kategori-sti i feedet — det ændrer ikke matchningen af samme flaske på tværs af butikker.`;
  }
  const formatted = trail.join(" · ");
  return `I butikkernes data: ${formatted}.`;
}

function responsibilityParagraph(): string {
  return `Smagsnoter og madmatch er vejledende. Tjek altid forhandlerens side for pris, allergener og lager — se også vores [redaktionelle proces](/redaktionel-proces).`;
}

/**
 * Supplerende redaktionelt lag på vinprofiler — udvider tynde sider med forklaring og kontekst.
 */
export function vineEditorialBridgeParagraphs(w: CanonicalWine): string[] {
  const h = stableHash(w.slug);
  return [openingParagraph(w, h % 2), categoryParagraph(w), responsibilityParagraph()];
}

export type VineProductFaqItem = { question: string; answer: string };

/** FAQ til synlig blok og FAQPage JSON-LD — svar har konkrete detaljer om den aktuelle vin hvor relevant. */
export function vineProductFaqItems(w: CanonicalWine): VineProductFaqItem[] {
  const title = w.displayTitle.trim();
  const mp = merchantPhrase(w);
  const descSource = w.description?.trim()
    ? "Teksten under «Om produktet» samler feed-tekst fra forhandlerne (uden HTML)."
    : "Der er endnu lidt fritekst i feeds — brug tilbudslisten og butikkernes egne sider.";

  return [
    {
      question: "Sælger Vinbot denne vin?",
      answer: `Nej. Siden om «${title}» er et overblik med links til ${mp}. Købet er mellem dig og butikken.`,
    },
    {
      question: "Hvor kommer priser og produkttekster fra?",
      answer: `${descSource} Priser kan ændre sig — dobbelttjek hos forhandleren.`,
    },
    {
      question: "Hvorfor er den samme vin listet flere steder?",
      answer:
        w.offers.length > 1
          ? `Vinbot genkender samme produkt på tværs af netbutikker (GTIN eller signatur). Her: ${w.offers.length} listninger.`
          : `Her er ét aktuelt tilbud i indekset — flere kan dukke op, når feeds opdateres.`,
    },
    {
      question: "Skal jeg følge madmatch og smagsnoter?",
      answer: "Nej — det er vejledning. Du kan gå direkte til forhandleren.",
    },
  ];
}

/** Ekstra sætning til meta når feed mangler beskrivelse — mere unikt end ren intro-linje. */
export function vineMetaSupplementSentence(w: CanonicalWine): string {
  const h = stableHash(w.slug + "|meta");
  const trail = parseCategoryTrail(w.category);
  const hint =
    trail.length > 0
      ? `Sortimentssti: ${trail.slice(-2).join(" · ")}.`
      : "Vinprofil og prislinks på Vinbot.";
  const variants = [
    `${hint} Du handler hos forhandleren.`,
    `${hint} Madmatch er vejledende.`,
  ];
  return variants[h % variants.length];
}

/** Bruges til ekstra forklaring når feed-beskrivelse er kort eller mangler. */
export function wineDescriptionIsThin(w: CanonicalWine, maxLen = 220): boolean {
  const d = (w.description || "").replace(/\s+/g, " ").trim();
  return d.length < maxLen;
}

/**
 * Strukturelt resume (ikke madmatch): hvordan vinen typisk opfører sig i glasset ud fra titel/kategori — ikke erstatning for leverandørens fakta.
 */
export function vineStructuralProfileParagraph(w: CanonicalWine): string {
  const title = (w.displayTitle || "").toLowerCase();
  const blob = `${w.displayTitle} ${w.category}`;
  const t = blob.toLowerCase();

  if (/\bportvin\b|\btawny\b|\b(lbv|late bottled)\b|\bport\b/i.test(title)) {
    return "Portvin: koncentreret frugt, restsødme og høj alkohol — anderledes mundfølelse end almindelig rødvin.";
  }
  if (/\b(champagne|cava|prosecco|crémant|cremant|spumante|mousserende)\b/i.test(title)) {
    return "Mousserende vine lever på syre og bobler — strukturen føles skarpere end stille vin med samme alkohol.";
  }
  if (/rosé|rosevin/i.test(t)) {
    return "Rosé spænder fra knastør til næsten lys rød — farven siger lidt om syre eller alkohol.";
  }
  if (/hvid|white|chardonnay|riesling|sauvignon|hvidvin/i.test(t)) {
    return "Hvidvin drejer sig om syre, tekstur og evt. fad — restsukker og alkohol kræver butikkens tal.";
  }
  if (/\bpinot\s*noir\b|burgunder\b|rød burgunder/i.test(t)) {
    return "Pinot noir: ofte lys farve, fin tannin og markant syre — mere silke end massiv ekstrakt.";
  }
  if (/cabernet|malbec/i.test(t)) {
    return "Cabernet og malbec har oftere udtalt tannin — fad og årgang kan gøre dem rundere.";
  }
  if (/syrah|shiraz/i.test(t)) {
    return "Syrah/shiraz: mørke bær, peber og struktur — klima afgør om det lander let eller tungt.";
  }
  if (/riesling/i.test(t)) {
    return "Riesling spænder fra knastør til sød — restsukker og syre afgør oplevelsen, ikke titlen alene.";
  }
  if (/chardonnay|chablis|meursault|puligny/i.test(t)) {
    return "Chardonnay kan være mineralsk eller fadfyldt — vinifikation styrer mere end druenavnet.";
  }

  const h = stableHash(w.slug + "|struct");
  const fallbacks = [
    "Alkohol, restsukker og fadbrug kan ikke læses præcist af titel alene — brug butikkens fakta.",
    "Stil varierer inden for samme drue — dette er et generelt mønster, ikke et løfte om flasken.",
  ];
  return fallbacks[h % fallbacks.length];
}

/** Ekstra tydelighed når siden mangler udbygget leverandørtekst — styrker substans uden at fjerne noget. */
export function vineStructuralExtraWhenThin(w: CanonicalWine): string | null {
  if (!wineDescriptionIsThin(w, 180)) return null;
  return "Leverandørteksten er kort her — tjek butikssiden for alkohol, allergener og årgang.";
}
