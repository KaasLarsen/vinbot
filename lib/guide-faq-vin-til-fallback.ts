/**
 * FAQ til FAQPage JSON-LD for madguides (vin-til-*) når der ikke findes manuel post i guide-faq.ts.
 * Manuel FAQ i guide-faq.ts har altid forrang. Supplér vigtige sider med håndskrevne FAQ’er dér.
 */

export type VinTilFaqItem = { question: string; answer: string };

function emneFraTitle(title: string): string {
  const uden = title.replace(/^\s*vin\s+til\s+/i, "").trim();
  const foerKolon = uden.split(":")[0]?.trim() ?? uden;
  return foerKolon || "retten";
}

type Kat =
  | "seafood"
  | "grill"
  | "redmeat"
  | "poultry"
  | "spicy"
  | "veg"
  | "italian"
  | "festive"
  | "dessert"
  | "brunch"
  | "generic";

function kategori(slug: string): Kat {
  if (/vin-til-.*(julemad|paaske|nytaar|fastelavn|mortensaften|sankt-hans|julefrokost)/.test(slug)) return "festive";
  if (slug.includes("grill")) return "grill";
  if (/vin-til-(dessert|kransekage)/.test(slug)) return "dessert";
  if (/vin-til-brunch/.test(slug)) return "brunch";
  if (/vin-til-(pizza|lasagne|risotto|italiensk|pizza-og-pasta)/.test(slug)) return "italian";
  if (/krydret|thai|indisk|koreansk|vietnamesisk|kebab|nachos|tacos|wok|couscous|ramen/.test(slug)) return "spicy";
  if (/vegetar|gront|falafel/.test(slug)) return "veg";
  if (/kylling|kalkun|and/.test(slug)) return "poultry";
  if (/fisk|laks|torsk|rejer|muslinger|skaldyr|ceviche|sild|krebse/.test(slug)) return "seafood";
  if (/boeff|burger|lam|svine|medister|flaesk|vildt|tatar|carpaccio|gryderet|bolognese|koed/.test(slug)) return "redmeat";
  return "generic";
}

const KOMPLET = "[komplet guide til vin og mad](/guides/komplet-guide-til-vin-og-mad)";
const TEMP = "[temperatur og opbevaring](/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske)";
const FISK = "[vin til fisk og skaldyr](/guides/vin-til-fisk-og-skaldyr)";
const KRYDRET = "[vin til krydret og stærk mad](/guides/vin-til-krydret-og-staerk-mad)";
const BOBLER = "[bobler](/guides/bobler-champagne-cava-prosecco-og-cremant)";
const FORSIDE = "Brug søgningen på forsiden for at sammenligne flasker med pris fra flere forhandlere.";

function faqFor(kat: Kat, emne: string): VinTilFaqItem[] {
  const e = emne.charAt(0).toLowerCase() + emne.slice(1);

  const base: Record<Kat, VinTilFaqItem[]> = {
    seafood: [
      {
        question: `Hvilken vin passer til ${e}?`,
        answer: `Start med hvidvin med syre og friskhed — muscadet, albariño, verdejo eller tørre bobler skærer ofte godt igennem salt og fedme. Se også ${KOMPLET}, ${FISK} og ${BOBLER}.`,
      },
      {
        question: `Kan man drikke rødvin til ${e}?`,
        answer:
          "Ofte primært hvid eller bobler. Let pinot noir eller gamay kan fungere, hvis retten har tomat, paprika eller kraftigere sauce — ellers dominerer tannin og alkohol ofte delikat skaldyr.",
      },
      {
        question: "Hvor koldt skal vinen serveres?",
        answer: `Typisk 8–12 °C for hvid og bobler til skaldyr. Se ${TEMP} for generelle pejlemærker.`,
      },
    ],
    grill: [
      {
        question: `Hvilken vin passer til ${e}?`,
        answer: `Syrah, malbec, zinfandel/primitivo, grenache og andre kraftige røde med frugt matcher ofte røg, fedme og krydderi. Rosé og tør hvid kan til lettere grill og fisk — se ${KOMPLET}.`,
      },
      {
        question: "Passer rosé til grill?",
        answer:
          "Ja — tør rosé er alsidig til pølser, kylling, salat og lettere kød. Til tungere kød og røg vælges ofte rød med krop.",
      },
      {
        question: "Hvor finder jeg konkrete flasker?",
        answer: FORSIDE,
      },
    ],
    redmeat: [
      {
        question: `Hvilken rødvin til ${e}?`,
        answer: `Vælg efter fedme og tilberedning: cabernet, malbec, syrah eller bordeaux-lignende vine til kraftigt kød; pinot, gamay eller sangiovese til lettere udtryk. Læs ${KOMPLET}.`,
      },
      {
        question: "Hvornår er hvidvin bedre end rød?",
        answer:
          "Ved lette saucer, citron, urter eller når du foretrækker friskhed — ellers dominerer ofte rød til rødt kød.",
      },
      {
        question: "Hvilken temperatur for rødvin til kød?",
        answer: `Ofte 15–18 °C afhængigt af krop — se ${TEMP}.`,
      },
    ],
    poultry: [
      {
        question: `Hvilken vin til ${e}?`,
        answer: `Chardonnay med friskhed, pinot noir, gamay eller lettere røde passer ofte til fjerkræ — afhængigt af sauce, fedme og krydderi. Se ${KOMPLET}.`,
      },
      {
        question: "Passer hvidvin til fjerkræ?",
        answer:
          "Ja — især ved citron, fløde, svampe eller kylling uden tung røg. Rød vælges ofte til mørk kød, røg eller kraftig sauce.",
      },
      {
        question: "Hvor finder jeg flasker?",
        answer: FORSIDE,
      },
    ],
    spicy: [
      {
        question: `Hvilken vin til krydret mad som ${e}?`,
        answer: `Off-dry riesling, gewürztraminer, halvtør hvid eller frugtrig rosé tåler ofte chili og krydderi bedre end hårdt tannin-dominerende røde. Se ${KOMPLET} og ${KRYDRET}.`,
      },
      {
        question: "Hvorfor smager tung rød ofte dårligt til meget stærk mad?",
        answer:
          "Tanniner og høj alkohol forstærker ofte brændende fornemmelse sammen med capsaicin. Syre og lidt sødme i vinen balancerer bedre.",
      },
      {
        question: "Hvad med bobler?",
        answer: `Tørre bobler med syre kan fungere til lettere asiatisk og til forret — smag dig frem. Se ${BOBLER}.`,
      },
    ],
    veg: [
      {
        question: `Hvilken vin til vegetar og ${e}?`,
        answer: `Syrefuld hvid, rosé og let rød (gamay, pinot) matcher ofte grøntsager, urter og ost. Undgå overdrevent tung fad-hvid til salat uden fedme — se ${KOMPLET}.`,
      },
      {
        question: "Passer rødvin til grønt?",
        answer:
          "Ja — let rød til svampe, grillede grøntsager og ost; hvid til salat, citrus og lette saucer.",
      },
      {
        question: "Hvor finder jeg inspiration til flasker?",
        answer: FORSIDE,
      },
    ],
    italian: [
      {
        question: `Hvilken vin til italiensk inspireret mad (${e})?`,
        answer: `Sangiovese/chianti, barbera, primitivo og syrefuld rød matcher ofte tomat og ost. Hvid med syre til pesto og skaldyr — se ${KOMPLET}.`,
      },
      {
        question: "Hvorfor er syre vigtig til tomat?",
        answer:
          "Tomat har høj syre og umami; vin med egen friskhed føles balanceret, mens flade, alkoholstærke røde uden syre ofte skuffe.",
      },
      {
        question: "Hvad med bobler til pizza?",
        answer: `Tørre bobler (cava brut, crémant) er oplagt til salt ost og sprød bund — se ${BOBLER}.`,
      },
    ],
    festive: [
      {
        question: `Hvilken vin til ${e}?`,
        answer: `Vælg efter menuens hovedret og sauce: lam, and, svin og fisk kræver forskellig struktur. Brug Vinbots sæson- og juleguides og ${KOMPLET} som udgangspunkt.`,
      },
      {
        question: "Bobler til fest?",
        answer: `Champagne, crémant og cava er klassikere til forret og skål — læs ${BOBLER} om brut vs sødme.`,
      },
      {
        question: "Hvordan undgår jeg at vælge forkert til gæster?",
        answer:
          "Sats på middelvejsvine med god syre og moderat alkohol, og tilbyd evt. både en frisk hvid og en saftig rød.",
      },
    ],
    dessert: [
      {
        question: `Hvilken vin til dessert og ${e}?`,
        answer: `Vinen skal have mindst samme sødmeforhold som desserten — ellers smager den sur. Sød riesling, dessertvin, port eller bobler med restsødme er typiske valg. Se ${KOMPLET}.`,
      },
      {
        question: "Kan man drikke tør vin til kage?",
        answer: "Sjældent med god balance — tør vin til sød kage føles ofte skarp og stram.",
      },
      {
        question: "Hvad med bobler til dessert?",
        answer: "Halvtør eller sødere bobler kan passe — tjek restsødme på etiketten.",
      },
    ],
    brunch: [
      {
        question: `Hvilken vin til brunch og ${e}?`,
        answer: `Tørre bobler, rosé, let hvid og frisk rød (gamay) dækker ofte både æg, fisk og bagværk. Se ${KOMPLET}.`,
      },
      {
        question: "Passer orangevin til brunch?",
        answer:
          "Kan fungere til ost, nødder og krydret — smag og temperament varierer; start med bobler hvis du er i tvivl.",
      },
      {
        question: "Hvor finder jeg flasker?",
        answer: FORSIDE,
      },
    ],
    generic: [
      {
        question: `Hvilken vin passer til ${e}?`,
        answer: `Udgangspunktet er balance: syre mod fedme, tanniner mod protein, sødme mod stærk krydderi. Læs ${KOMPLET} og brug søgningen på forsiden til konkrete flasker.`,
      },
      {
        question: "Hvordan bruger jeg Vinbot til at vælge?",
        answer: `${FORSIDE} Guiderne forklarer principper; priser og lager opdateres hos forhandlerne.`,
      },
      {
        question: "Hvor koldt skal vinen serveres?",
        answer: `Se ${TEMP} for hvid, rød og rosé.`,
      },
    ],
  };

  return base[kat];
}

/**
 * Returnerer 3 FAQ-poster til JSON-LD når slug er vin-til-* og der ikke findes manuel FAQ.
 */
export function getVinTilFallbackFaq(slug: string, title: string): VinTilFaqItem[] | null {
  if (!slug.startsWith("vin-til-")) return null;
  const emne = emneFraTitle(title);
  const kat = kategori(slug);
  return faqFor(kat, emne);
}
