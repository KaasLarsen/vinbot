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

  switch (variant % 4) {
    case 0:
      return `Vinbots vinprofiler samler den samme vin, når den findes hos flere forhandlere, så du kan sammenligne udgangspriser og åbne den shop, du foretrækker. Denne side handler om ${who}${year ? ` — med årgang ${year}` : ""}, og den er baseret på offentlige produktdata fra ${mp}.`;
    case 1:
      return `Denne vinprofil er en oversigt: Vi forsøger at koble samme flaske på tværs af danske netbutikker, når feeds matcher hinanden via GTIN eller stabil titel-match. Her drejer det sig om ${who}${year ? ` (${year})` : ""}. Aktuelle tilbud og tekster kommer fra ${mp}.`;
    case 2:
      return `Vinbot er ikke vinhandler — vi hjælper dig med at finde flasken og hoppe videre til forhandlerens egen side med pris og vilkår for dét øjeblik, du klikker. Profilen om ${who} viser, hvad ${mp} aktuelt har registreret om produktet.`;
    default:
      return `Formålet med vinprofiler er mindre jagt på rabatkoder og mere tryg navigation: ét sted med kontekst om flasken, før du beslutter dig. Denne tekst omhandler ${who}${brand ? ` fra ${brand}` : ""}, og tilbudstabellen under er samlet på tværs af ${mp}.`;
  }
}

function categoryParagraph(w: CanonicalWine): string {
  const trail = parseCategoryTrail(w.category);
  if (trail.length === 0) {
    return `Når Vinbot ikke har modtaget en tydelig kategori-sti fra forhandler-feedet, kan hierarkiet udebliver — det påvirker ikke forsøget på at samme produkt korrekt med andre listninger af samme vin.`;
  }
  const formatted = trail.join(" · ");
  const leaf = trail[trail.length - 1];
  return `I handelsdata er den typisk klassificeret som: ${formatted}. Den sidste del («${leaf}») kommer fra butikkens sortimentslogik og kan afvige fra traditionelle vinbegreber — vi viser den, fordi den hjælper dig med at finde beslægtede vine og forstå butikkens kuratering.`;
}

function responsibilityParagraph(variant: number): string {
  switch (variant % 3) {
    case 0:
      return `Smagsnoter og madmatch på Vinbot er vejledende og kan ikke erstatte din egen smag eller menu — vi kombinerer åbne signaler fra titel og kategori med redaktionelle retningslinjer, du kan læse om under «Redaktionel proces».`;
    case 1:
      return `Har du allergier eller streng budgetdisciplin, bør du altid læse varens side hos forhandleren, før du handler — Vinbots tekst er journalistisk hjælp og overblik, ikke ingrediensliste eller prismærkningsmyndighed.`;
    default:
      return `Vinbots guides og dybe artikler findes et andet sted på sitet; vinprofiler er produktoplysning og praktisk navigation med redaktionel ramme — ikke et krav om at du skal handle via os; du kan også bruge siden kun til orientering.`;
  }
}

/**
 * Supplerende redaktionelt lag på vinprofiler — udvider tynde sider med forklaring og kontekst.
 */
export function vineEditorialBridgeParagraphs(w: CanonicalWine): string[] {
  const h = stableHash(w.slug);
  return [
    openingParagraph(w, h % 4),
    categoryParagraph(w),
    responsibilityParagraph((h >> 7) % 3),
  ];
}

export type VineProductFaqItem = { question: string; answer: string };

/** FAQ til synlig blok og FAQPage JSON-LD — svar har konkrete detaljer om den aktuelle vin hvor relevant. */
export function vineProductFaqItems(w: CanonicalWine): VineProductFaqItem[] {
  const title = w.displayTitle.trim();
  const mp = merchantPhrase(w);
  const descSource = w.description?.trim()
    ? "Beskriften under «Om produktet» samler tekst fra de forhandler-feeds, der har indhold om varen — vi fjerner HTML og forsøger at undgå ren gentagelse."
    : "Der ligger endnu ikke nok fritekst i feeds til en samlet beskrivelse her — du kan stadig bruge tilbudslisten og titlen til orientering og åbne butikkernes egne sider.";

  return [
    {
      question: "Sælger Vinbot denne vin?",
      answer:
        `Nej. Vinbot er ikke vinhandler — siden om «${title}» er et redaktionelt og teknisk overblik med links ud til ${mp}. Købsaftalen er altid mellem dig og den shop, du vælger.`,
    },
    {
      question: "Hvor kommer priser og produkttekster fra?",
      answer: `${descSource} Priser og lagerstatus kan ændre sig — altid dobbelttjek på forhandlerens side.`,
    },
    {
      question: "Hvorfor er den samme vin listet flere steder?",
      answer:
        w.offers.length > 1
          ? `Fordi Vinbot forsøger at genkende samme produkt på tværs af netbutikker (GTIN eller samme vin-signatur). Her har vi fundet ${w.offers.length} aktuelle tilbud, du kan sammenligne.`
          : `Her er registreret ét aktuelt tilbud i Vinbots indeks — flere kan dukke op senere, når feeds opdateres.`,
    },
    {
      question: "Er madmatch og smagsnoter et krav til mig?",
      answer:
        "Nej — det er vejledende idéer ud fra titel og kategori. Din ret til at hoppe direkte til forhandler uden at følge Vinbots forslag er fuldstændig uændret.",
    },
    {
      question: "Hvad er Vinbots journalistiske rolle udover vinprofiler?",
      answer:
        "Vinbot publicerer også selvstændige guides om mad og vin (find dem via «Guides» i menuen). Vinprofiler og prissammenligning er et supplement til den redaktionelle kerne — ikke en erstatning.",
    },
  ];
}

/** Ekstra sætning til meta når feed mangler beskrivelse — mere unikt end ren intro-linje. */
export function vineMetaSupplementSentence(w: CanonicalWine): string {
  const h = stableHash(w.slug + "|meta");
  const trail = parseCategoryTrail(w.category);
  const hint =
    trail.length > 0
      ? `Sortimentssti fra butikker: ${trail.slice(-2).join(" · ")}.`
      : "Uafhængig vinprofil og prislinks på Vinbot.";
  const variants = [
    `${hint} Vinbot sælger ikke vin — du handler hos forhandleren.`,
    `${hint} Sammenlign tilbud og læs mere på butikkernes egne sider.`,
    `${hint} Redaktionel kontekst og madmatch er vejledende.`,
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
    return "Portvine har typisk koncentreret frugt, markant restsødme og høj alkohol — mundfornemmelsen afviger klart fra almindelig rødvin med samme farveintensitet.";
  }
  if (/\b(champagne|cava|prosecco|crémant|cremant|spumante|mousserende)\b/i.test(title)) {
    return "Mousserende vine lever på syre og CO₂ — selv ved lav farve kan strukturen føles mere «skarp» end en stille vin med samme alkohol på papiret.";
  }
  if (/rosé|rosevin/i.test(t)) {
    return "Rosés struktur afhænger af skalkontakt og vinifikation — fra knastør til næsten lys rød; farven afslører ikke automatisk syre eller alkohol.";
  }
  if (/hvid|white|chardonnay|riesling|sauvignon|hvidvin/i.test(t)) {
    return "Hvidvin drejer sig typisk om syre, tekstur og evt. fad — ud fra titel og kategori kan ikke udledes restsukker eller alkohol præcist uden leverandørens tal.";
  }
  if (/\bpinot\s*noir\b|burgunder\b|rød burgunder/i.test(t)) {
    return "Pinot noir kan have lys farve men fin tanninkurve og markant syre — strukturen kan opleves mere «silke» end «massiv ekstrakt» sammenlignet med fx cabernet.";
  }
  if (/cabernet|malbec/i.test(t)) {
    return "Kraftige røddruer som cabernet eller malbec har oftere udtalt tannin og ekstrakt — fad og årgang kan flytte oplevelsen fra stram til rund.";
  }
  if (/syrah|shiraz/i.test(t)) {
    return "Syrah/shiraz kan kombinere mørke bær med peber og strukturerede tanniner — klima og udbytte påvirker om det lander «lettere» eller «tungere».";
  }
  if (/riesling/i.test(t)) {
    return "Riesling spænder bredt fra knastør til sødmefuld — restsukker og syre er afgørende for mundfornemmelse og ikke synlig på titlen alene.";
  }
  if (/chardonnay|chablis|meursault|puligny/i.test(t)) {
    return "Chardonnay kan være alt fra mineralsk til fadfyldt og cremet — strukturen styres af vinifikation mere end af druenavnet på label.";
  }

  const h = stableHash(w.slug + "|struct");
  const fallbacks = [
    "Ud fra titel og kategori alene kan alkoholprocent, restsukker og fadbrug ikke fastslås præcist — brug butikkens fakta til den endelige vurdering.",
    "Stil og krop varierer selv inden for samme drue — resumeet her er et generelt mønster, ikke et løfte om den konkrete flaske.",
    "Syre, tannin og tekstur bør altid afstemmes mod den virkelige vin — sidens tekst er et første hjælpesignal ud fra åbne produktoplysninger.",
  ];
  return fallbacks[h % fallbacks.length];
}

/** Ekstra tydelighed når siden mangler udbygget leverandørtekst — styrker substans uden at fjerne noget. */
export function vineStructuralExtraWhenThin(w: CanonicalWine): string | null {
  if (!wineDescriptionIsThin(w, 180)) return null;
  return "Fordi tilgængelig leverandørtekst på denne profil er kort eller mangler, er struktur-resumeet ekstra afhængigt af titel og kategori — åbn altid butiksitet for fakta om alkohol, allergener og årgangsvariation.";
}
