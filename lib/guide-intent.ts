/**
 * Afled søgeintent (q + max-pris) fra en guide-slug.
 * Returnerer null hvis slug ikke naturligt mapper til produktsøgning.
 *
 * Strategi:
 * - `bedste-*-under-NN-kr` → base-kategori som `q`, NN som `max`.
 * - `rodvin-til-<mad>` / `hvidvin-til-<mad>` osv. → drue + mad som `q`.
 * - `vin-til-<mad>` → mad + retningsgivende vin-hints (via intents.ts).
 * - `vinregion-<navn>` → regionnavn som `q`.
 * - Kendte drue-slugs (`<drue>-druen`) → druenavn som `q`.
 */

import { searchQueryForGuideSlug } from "@/lib/lande/registry";

export type GuideIntent = {
  q: string;
  /** Øvre grænse i DKK (inklusive). Null = ingen max. */
  max: number | null;
  /** Kort label til CTA-knap, fx "rødvin under 75 kr" eller "vin til sushi". */
  label: string;
};

/** Synlig i JSX — brug hvis frontmatter ikke overstyrer. */
export function deriveGuideIntent(
  slug: string,
  overrides?: { searchIntent?: string; searchMax?: number; searchLabel?: string },
): GuideIntent | null {
  if (overrides?.searchIntent || overrides?.searchMax) {
    return {
      q: overrides.searchIntent?.trim() || "vin",
      max: overrides.searchMax ?? null,
      label: overrides.searchLabel?.trim() || "vin",
    };
  }

  if (slug === "sadan-vaelger-du-vinglas") {
    return {
      q: "vinglas champagneglas rødvinsglas krystal bourgogne flute tulip vinreol vinhylder karaffel dekanter",
      max: null,
      label: "vinglas",
    };
  }

  if (slug === "hvilken-vin-til-madlavning-sovs") {
    return {
      q: "merlot gamay rhône chianti sauvignon blanc riesling madlavning sovs",
      max: 100,
      label: "vin til madlavning og sovs",
    };
  }

  if (slug === "bedste-box-vin" || slug === "papvin-vs-flaske-pris") {
    return {
      q: "bag-in-box bib",
      max: null,
      label: "boxvin og papvin",
    };
  }

  if (slug === "bedste-papvin-under-150-kr") {
    return {
      q: "bag-in-box bib",
      max: 150,
      label: "papvin under 150 kr",
    };
  }

  if (slug === "bedste-rose-paa-boks") {
    return {
      q: "bag-in-box rosato bib",
      max: null,
      label: "rosé på boks",
    };
  }

  if (slug === "bedste-rod-papvin") {
    return {
      q: "bag-in-box bib rodvin",
      max: null,
      label: "rød papvin",
    };
  }

  if (slug === "bedste-hvid-papvin") {
    return {
      q: "bag-in-box bib hvidvin",
      max: null,
      label: "hvid papvin",
    };
  }

  if (slug === "papvin-bedst-i-test" || slug === "papvin-tilbud" || slug === "papvin-5-liter") {
    return {
      q: "bag-in-box bib",
      max: null,
      label: "papvin og boxvin",
    };
  }

  if (
    slug === "hvor-mange-flasker-i-en-3-liter-papvin" ||
    slug === "hvor-meget-papvin-til-fest" ||
    slug === "temperatur-guide-papvin" ||
    slug === "hvorfor-har-papvin-udloebsdato" ||
    slug === "papvin-co2-og-klima" ||
    slug === "papvin-til-reception" ||
    slug === "papvin-15-og-225-liter" ||
    slug === "premium-papvin" ||
    slug === "papvin-myter-hovedpine" ||
    slug === "okologisk-og-naturvin-paa-boks" ||
    slug === "hvorfor-smager-papvin-anderledes" ||
    slug === "papvin-til-sommerhus-og-camping" ||
    slug === "kan-man-fryse-papvin" ||
    slug === "sadan-tommer-du-papvin" ||
    slug === "papvin-graensehandel-tyskland"
  ) {
    return {
      q: "bag-in-box bib",
      max: null,
      label: "papvin og boxvin",
    };
  }

  if (slug === "glogg-paa-papvin" || slug === "papvin-til-skiferie") {
    return {
      q: "bag-in-box bib rodvin",
      max: null,
      label: "rød papvin",
    };
  }

  const m = slug.match(/^bedste-(.+?)-under-(\d+)-kr$/);
  if (m) {
    const cat = m[1];
    const max = parseInt(m[2], 10);
    const q = categoryToSearchTerm(cat);
    const label = `${categoryToLabel(cat)} under ${max} kr`;
    return { q, max, label };
  }

  if (slug.startsWith("bedste-")) {
    const rest = slug.replace(/^bedste-/, "");
    const q = categoryToSearchTerm(rest);
    const label = `bedste ${categoryToLabel(rest)}`;
    return { q, max: null, label };
  }

  const drueFood = slug.match(
    /^(rodvin|hvidvin|rosevin|bobler|champagne|prosecco|cava|pinot-noir|chardonnay|sauvignon-blanc|riesling|malbec|sangiovese|syrah)-til-(.+)$/,
  );
  if (drueFood) {
    const drue = drueFood[1].replace(/-/g, " ");
    const food = drueFood[2].replace(/-/g, " ");
    return {
      q: `${drue} ${food}`.trim(),
      max: null,
      label: `${drue} til ${food}`,
    };
  }

  /** Pinse/kristi himmelfart: slug alene matcher ikke vin-feed; brug sommer-/bobler-hints. */
  if (slug === "vin-til-pinse-og-kristi-himmelfart") {
    return {
      q: "cava crémant rosé sauvignon blanc albariño sommer bobler",
      max: null,
      label: "vin til pinse og Kristi Himmelfart",
    };
  }

  if (slug.startsWith("vin-til-")) {
    const food = slug.replace(/^vin-til-/, "").replace(/-/g, " ");
    return {
      q: food,
      max: null,
      label: `vin til ${food}`,
    };
  }

  if (slug === "hvorfor-smager-rodvin-grimt-til-ost") {
    return {
      q: "pinot noir beaujolais tawny portvin",
      max: null,
      label: "vin til ost",
    };
  }

  if (slug === "alkoholfri-bobler-til-nytaar") {
    return {
      q: "alkoholfri bobler 0% leitz noughty",
      max: null,
      label: "alkoholfrie bobler til nytår",
    };
  }

  if (slug === "alkoholfri-vin-til-flaesketeg") {
    return {
      q: "alkoholfri vin 0% leitz pinot",
      max: null,
      label: "alkoholfri vin til flæskesteg",
    };
  }

  if (slug.startsWith("alkoholfri-vin-til-")) {
    const occasion = slug.replace(/^alkoholfri-vin-til-/, "").replace(/-/g, " ");
    return {
      q: `alkoholfri vin 0% ${occasion}`.trim(),
      max: null,
      label: `alkoholfri vin til ${occasion}`,
    };
  }

  if (slug === "leitz-eins-zwei-zero") {
    return {
      q: "leitz eins zwei zero alkoholfri",
      max: null,
      label: "Leitz Eins-Zwei-Zero",
    };
  }

  if (slug === "bedste-alkoholfri-maerker-2026") {
    return {
      q: "alkoholfri leitz torres noughty french bloom",
      max: null,
      label: "alkoholfri mærker",
    };
  }

  if (slug === "alkoholfri-vin-i-netto-foetex") {
    return {
      q: "alkoholfri torres natureo leitz",
      max: 120,
      label: "alkoholfri vin til supermarked-pris",
    };
  }

  if (slug === "smager-alkoholfri-vin-godt") {
    return {
      q: "alkoholfri leitz bobler riesling 0%",
      max: null,
      label: "alkoholfri vin der smager af vin",
    };
  }

  if (slug === "torres-natureo") {
    return {
      q: "torres natureo alkoholfri",
      max: 120,
      label: "Torres Natureo",
    };
  }

  if (slug === "noughty-alkoholfri-vin") {
    return {
      q: "noughty alkoholfri sparkling",
      max: null,
      label: "Noughty alkoholfri",
    };
  }

  if (slug === "kalorier-i-alkoholfri-vin") {
    return {
      q: "alkoholfri leitz noughty 0%",
      max: null,
      label: "alkoholfri vin",
    };
  }

  if (
    slug === "alkoholfri-riesling" ||
    slug === "alkoholfri-sauvignon-blanc" ||
    slug === "alkoholfri-chardonnay" ||
    slug === "alkoholfri-pinot-grigio" ||
    slug === "alkoholfri-gewurztraminer-og-muscat" ||
    slug === "tor-alkoholfri-hvidvin" ||
    slug === "halvtor-og-soed-alkoholfri-hvidvin" ||
    slug === "alkoholfri-frizzante-hvidvin" ||
    slug === "alkoholfri-hvidvin-med-fadlagring" ||
    slug === "okologisk-og-biodynamisk-alkoholfri-hvidvin" ||
    slug === "alkoholfri-hvidvin-til-skaldyr-og-fisk" ||
    slug === "alkoholfri-hvidvin-til-asiatisk-mad" ||
    slug === "alkoholfri-hvidvin-til-ost" ||
    slug === "alkoholfri-hvidvin-til-sommermenu" ||
    slug === "holdbarhed-aabnet-alkoholfri-hvidvin" ||
    slug === "serveringstemperatur-alkoholfri-hvidvin" ||
    slug === "hvordan-fjernes-alkohol-fra-hvidvin" ||
    slug === "kalorier-i-alkoholfri-hvidvin" ||
    slug === "alkoholfri-hvidvin-i-madlavning" ||
    slug === "alkoholfri-hvidvin-til-gravide"
  ) {
    const grapeHints: Record<string, string> = {
      "alkoholfri-riesling": "alkoholfri riesling leitz 0%",
      "alkoholfri-sauvignon-blanc": "alkoholfri sauvignon blanc giesen 0%",
      "alkoholfri-chardonnay": "alkoholfri chardonnay noughty 0%",
      "alkoholfri-pinot-grigio": "alkoholfri pinot grigio 0%",
      "alkoholfri-gewurztraminer-og-muscat": "alkoholfri muscat torres natureo",
      "alkoholfri-frizzante-hvidvin": "alkoholfri sparkling bobler 0%",
      "okologisk-og-biodynamisk-alkoholfri-hvidvin": "oekologisk alkoholfri noughty 0%",
    };
    return {
      q: grapeHints[slug] || "alkoholfri hvidvin 0% leitz giesen",
      max: null,
      label: "alkoholfri hvidvin",
    };
  }

  if (slug === "hvad-er-hedvin" || slug === "hedvin-alkoholprocent") {
    return {
      q: "hedvin portvin sherry madeira",
      max: null,
      label: "hedvin, port og sherry",
    };
  }

  if (slug === "hvad-er-isvin") {
    return {
      q: "isvin eiswein icewine",
      max: null,
      label: "isvin og Eiswein",
    };
  }

  if (slug === "hvad-er-madeira-vin") {
    return {
      q: "madeira vin",
      max: null,
      label: "madeira",
    };
  }

  if (slug === "hvad-er-vermouth") {
    return {
      q: "vermouth",
      max: null,
      label: "vermouth",
    };
  }

  if (slug === "hvad-er-portvin") {
    return {
      q: "portvin tawny LBV ruby",
      max: null,
      label: "portvin",
    };
  }

  if (slug === "hvad-er-sherry-vin") {
    return {
      q: "sherry fino manzanilla oloroso jerez",
      max: null,
      label: "sherry",
    };
  }

  if (slug.startsWith("vinregion-")) {
    const fromLand = searchQueryForGuideSlug(slug);
    const region = slug.replace(/^vinregion-/, "").replace(/-/g, " ");
    return {
      q: fromLand || region,
      max: null,
      label: `vin fra ${region}`,
    };
  }

  if (slug.endsWith("-druen")) {
    const drue = slug.replace(/-druen$/, "").replace(/-/g, " ");
    return {
      q: drue,
      max: null,
      label: drue,
    };
  }

  const drueRegion = matchDrueRegionSlug(slug);
  if (drueRegion) {
    const { drue, region } = drueRegion;
    const drueLabel = drue.replace(/-/g, " ");
    const regionLabel = region.replace(/-/g, " ");
    return {
      q: `${drueLabel} ${regionLabel}`.trim(),
      max: null,
      label: `${drueLabel} fra ${regionLabel}`,
    };
  }

  if (slug === "afkoelt-roedvin") {
    return {
      q: "gamay beaujolais pinot noir lettere rødvin",
      max: null,
      label: "afkølet let rødvin",
    };
  }

  if (slug === "vin-gode-koeb-regioner") {
    return {
      q: "portugal vinho verde douro etna sicilien",
      max: 200,
      label: "value-vin og regioner",
    };
  }

  if (slug === "bobler-til-takeaway-og-fastfood") {
    return {
      q: "prosecco cava brut takeaway pizza burger",
      max: 100,
      label: "bobler til takeaway",
    };
  }

  if (slug === "vin-til-pakkeleg") {
    return {
      q: "prosecco cava beaujolais bobler gave",
      max: 50,
      label: "vin til pakkeleg under 50 kr",
    };
  }

  if (slug === "vin-swap-underdog-regioner") {
    return {
      q: "etna nerello mascalese gamay douro touriga gruner veltliner",
      max: 150,
      label: "underdog-regioner og value-swap",
    };
  }

  if (slug === "etna-vin-vulkanvin-sicilien") {
    return {
      q: "etna nerello mascalese carricante sicilia",
      max: null,
      label: "Etna og vulkanvin fra Sicilien",
    };
  }

  if (slug === "mindful-drikke-low-no-alkohol") {
    return {
      q: "alkoholfri leitz riesling kabinett vinho verde lavalkohol",
      max: 150,
      label: "mindful drinking — low og no alkohol",
    };
  }

  if (slug === "orangevin-for-begyndere") {
    return {
      q: "orange wine ramato naturvin skin contact",
      max: 200,
      label: "orangevin for begyndere",
    };
  }

  if (slug === "vin-til-asiatisk-takeaway-dumplings-sushi-ramen") {
    return {
      q: "asiatisk riesling gewurztraminer gruner veltliner sushi",
      max: 150,
      label: "vin til asiatisk takeaway",
    };
  }

  if (slug === "vin-marketing-tricks-forbruger-guide") {
    return {
      q: "rioja reserva cotes du rhone douro",
      max: 150,
      label: "vin uden marketing-hype",
    };
  }

  if (slug === "hurtig-koeling-vin-is-salt-10-minutter") {
    return {
      q: "prosecco cava sauvignon blanc bobler",
      max: 150,
      label: "vin til hurtig afkøling",
    };
  }

  if (slug === "hvordan-aabner-du-vin-uden-proptreakker") {
    return {
      q: "rødvin hvidvin skruelåg",
      max: 150,
      label: "vin til hverdag og sommerhus",
    };
  }

  if (slug === "kan-roedvin-blive-for-gammel") {
    return {
      q: "rioja reserva barolo chianti",
      max: 200,
      label: "rødvin til lagring eller hverdag",
    };
  }

  if (slug === "vin-tiktok-trends-spicy-sauvy-og-vineddike") {
    return {
      q: "sauvignon blanc marlborough hvidvin",
      max: 100,
      label: "sauvignon til Spicy Sauvy B",
    };
  }

  if (slug === "hverdags-bobler") {
    return {
      q: "prosecco cava cremant brut bobler",
      max: 100,
      label: "hverdagsbobler under 100 kr",
    };
  }

  if (slug === "hovedpine-af-roedvin") {
    return {
      q: "gamay pinot noir riesling kabinett vinho verde",
      max: 150,
      label: "lettere vine med færre hovedpine-triggere",
    };
  }

  if (slug === "bedste-vin-i-netto-under-70-kr") {
    return {
      q: "primitivo tempranillo cava prosecco vinho verde",
      max: 70,
      label: "supermarkedsvin under 70 kr",
    };
  }

  if (slug === "vin-til-svigerforaeldre-besog") {
    return {
      q: "crémant rioja chianti gruner veltliner",
      max: 200,
      label: "vin til gæster og svigerforældre",
    };
  }

  if (slug === "vin-og-overgangsalder-histamin") {
    return {
      q: "riesling kabinett gruner veltliner vinho verde alkoholfri",
      max: 150,
      label: "let vin og lav histamin-stil",
    };
  }

  if (slug === "vin-til-asiatisk-mad") {
    return {
      q: "riesling gewurztraminer gruner veltliner albarino cava",
      max: 150,
      label: "vin til asiatisk mad",
    };
  }

  return null;
}

/** Kendte drue-prefixer for <drue>-fra-<region>-long-tail-sider. */
const DRUE_PREFIXES_FOR_REGION = [
  "chardonnay",
  "sauvignon-blanc",
  "riesling",
  "pinot-grigio",
  "albarino",
  "chenin-blanc",
  "cabernet-sauvignon",
  "merlot",
  "syrah",
  "malbec",
  "tempranillo",
  "sangiovese",
  "pinot-noir",
  "nebbiolo",
  "grenache",
];

export function matchDrueRegionSlug(slug: string): { drue: string; region: string } | null {
  for (const prefix of DRUE_PREFIXES_FOR_REGION) {
    const marker = `${prefix}-fra-`;
    if (slug.startsWith(marker)) {
      const region = slug.slice(marker.length);
      if (region.length > 0) {
        return { drue: prefix, region };
      }
    }
  }
  return null;
}

function categoryToSearchTerm(cat: string): string {
  const table: Record<string, string> = {
    rodvin: "rødvin",
    hvidvin: "hvidvin",
    rosevin: "rosé",
    bobler: "bobler champagne prosecco cava",
    cremant: "crémant alsace bourgogne loire",
    champagne: "champagne",
    cava: "cava brut reserva gran reserva",
    vin: "vin",
    "pinot-noir": "pinot noir",
    chardonnay: "chardonnay",
    "sauvignon-blanc": "sauvignon blanc",
    riesling: "riesling",
    "pinot-grigio": "pinot grigio pinot gris",
    albarino: "albariño",
    "chenin-blanc": "chenin blanc",
    "cabernet-sauvignon": "cabernet sauvignon",
    merlot: "merlot",
    syrah: "syrah shiraz",
    malbec: "malbec",
    tempranillo: "tempranillo rioja",
    sangiovese: "sangiovese chianti",
    nebbiolo: "nebbiolo barolo barbaresco",
    grenache: "grenache garnacha",
    "box-vin": "box vin bag in box",
    portvin: "portvin",
    dessertvin: "dessertvin sauternes",
    "okologiske-vin": "økologisk",
    "dansk-vin": "dansk",
    "italiensk-rodvin": "italiensk rødvin chianti barolo",
    "fransk-rodvin": "fransk rødvin bordeaux bourgogne",
    "spansk-rodvin": "spansk rødvin rioja tempranillo",
    "vin-til-gave": "vin gave",
    "vaertindegave-vin": "vin gave",
    "julegavevin": "vin gave jul",
    "vin-til-begynder": "vin hverdag letdrikkelig",
    "vin-til-hverdag": "vin hverdag",
    "weekendvin": "vin weekend",
    "sommervin": "sommer rosé hvidvin",
    "alkoholfri-rodvin": "alkoholfri rødvin 0%",
    "alkoholfri-hvidvin": "alkoholfri hvidvin 0%",
    "alkoholfri-rose": "alkoholfri rosé 0%",
    "alkoholfri-bobler": "alkoholfri bobler mousserende 0%",
    "alkoholfri-champagne": "alkoholfri champagne bobler 0%",
    "alkoholfri-vin": "alkoholfri vin 0%",
    "lavalkohol-vin": "kabinett moscato vinho verde lav alkohol",
    "vin-smagekasser":
      "smagekasse vin smagskasse gave pakke smagsprøve",
  };
  return table[cat] || cat.replace(/-/g, " ");
}

function categoryToLabel(cat: string): string {
  const table: Record<string, string> = {
    rodvin: "rødvin",
    hvidvin: "hvidvin",
    rosevin: "rosévin",
    bobler: "bobler",
    champagne: "champagne",
    cremant: "crémant",
    cava: "cava",
    vin: "vin",
    "pinot-noir": "pinot noir",
    chardonnay: "chardonnay",
    "sauvignon-blanc": "sauvignon blanc",
    riesling: "riesling",
    "pinot-grigio": "pinot grigio",
    albarino: "albariño",
    "chenin-blanc": "chenin blanc",
    "cabernet-sauvignon": "cabernet sauvignon",
    merlot: "merlot",
    syrah: "syrah/shiraz",
    malbec: "malbec",
    tempranillo: "tempranillo",
    sangiovese: "sangiovese",
    nebbiolo: "nebbiolo",
    grenache: "grenache",
    "box-vin": "box-vin",
    portvin: "portvin",
    dessertvin: "dessertvin",
    "okologiske-vin": "økologisk vin",
    "dansk-vin": "dansk vin",
    "italiensk-rodvin": "italiensk rødvin",
    "fransk-rodvin": "fransk rødvin",
    "spansk-rodvin": "spansk rødvin",
    "alkoholfri-rodvin": "alkoholfri rødvin",
    "alkoholfri-hvidvin": "alkoholfri hvidvin",
    "alkoholfri-rose": "alkoholfri rosé",
    "alkoholfri-bobler": "alkoholfri bobler",
    "alkoholfri-champagne": "alkoholfri champagne",
    "alkoholfri-vin": "alkoholfri vin",
    "lavalkohol-vin": "lavalkohol-vin",
    "vin-smagekasser": "vin-smagekasser",
  };
  return table[cat] || cat.replace(/-/g, " ");
}
