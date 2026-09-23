export type GuideClusterLink = { slug: string; label: string };

export type GuideClusterTone = "emerald" | "rose" | "amber";

export type GuideClusterBlock = {
  clusterTitle: string;
  intro?: string;
  links: GuideClusterLink[];
  tone?: GuideClusterTone;
};

const HUB: GuideClusterLink = {
  slug: "bedste-alkoholfri-vin",
  label: "Overblik: bedste alkoholfri vin",
};

const BY_TYPE: GuideClusterLink[] = [
  { slug: "bedste-alkoholfri-hvidvin", label: "Bedste alkoholfri hvidvin" },
  { slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" },
  { slug: "bedste-alkoholfri-rose", label: "Bedste alkoholfri rosé" },
  { slug: "bedste-alkoholfri-rodvin", label: "Bedste alkoholfri rødvin" },
  { slug: "bedste-alkoholfri-champagne", label: "Alkoholfri champagne og sparkling" },
];

const OCCASION: GuideClusterLink[] = [
  { slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" },
  { slug: "alkoholfri-bobler-til-nytaar", label: "Alkoholfrie bobler til nytår" },
  { slug: "alkoholfri-vin-til-flaesketeg", label: "Alkoholfri vin til flæskesteg" },
  { slug: "alkoholfri-vin-til-konfirmation", label: "Alkoholfri vin til konfirmation" },
  { slug: "alkoholfri-vin-til-grill", label: "Alkoholfri vin til grill" },
  { slug: "alkoholfri-vin-til-tapas", label: "Alkoholfri vin til tapas" },
  { slug: "alkoholfri-vin-til-pizza-og-pasta", label: "Alkoholfri vin til pizza og pasta" },
  { slug: "alkoholfri-gin-tonic-og-aperitif", label: "Alkoholfri gin, tonic & aperitif" },
  { slug: "alkoholfri-vin-til-jul", label: "Alkoholfri vin til jul" },
  { slug: "alkoholfri-vin-til-brunch", label: "Alkoholfri vin til brunch" },
  { slug: "alkoholfri-mimosa", label: "Alkoholfri mimosa" },
  { slug: "alkoholfri-asti", label: "Alkoholfri Asti" },
  { slug: "alkoholfri-vin-til-dry-january", label: "Alkoholfri vin til Dry January" },
  { slug: "alkoholfri-vin-til-graviditet", label: "Alkoholfri vin under graviditet" },
];

const BUDGET: GuideClusterLink[] = [
  {
    slug: "bedste-alkoholfri-vin-under-100-kr",
    label: "Alkoholfri vin under 100 kr",
  },
  {
    slug: "alkoholfri-vin-i-netto-foetex",
    label: "Alkoholfri vin i Netto, Føtex, Bilka og Meny",
  },
];

const BRANDS: GuideClusterLink[] = [
  {
    slug: "bedste-alkoholfri-maerker-2026",
    label: "Bedste alkoholfri mærker 2026",
  },
  { slug: "leitz-eins-zwei-zero", label: "Leitz Eins-Zwei-Zero" },
  { slug: "torres-natureo", label: "Torres Natureo" },
  { slug: "noughty-alkoholfri-vin", label: "Noughty alkoholfri vin" },
  { slug: "oddbird-alkoholfri-vin", label: "Oddbird alkoholfri vin" },
  { slug: "french-bloom-alkoholfri-vin", label: "French Bloom" },
];

const VIDEN: GuideClusterLink[] = [
  { slug: "smager-alkoholfri-vin-godt", label: "Smager alkoholfri vin godt?" },
  { slug: "kalorier-i-alkoholfri-vin", label: "Kalorier i alkoholfri vin" },
  { slug: "kalorier-i-alkoholfri-hvidvin", label: "Kalorier i alkoholfri hvidvin" },
  { slug: "hvordan-fremstilles-alkoholfri-vin", label: "Hvordan fremstilles alkoholfri vin" },
  { slug: "hvordan-fjernes-alkohol-fra-hvidvin", label: "Hvordan fjernes alkohol fra hvidvin" },
  { slug: "alkoholsvag-og-alkoholfri-vin", label: "Alkoholsvag og alkoholfri vin" },
  {
    slug: "hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin",
    label: "Alkoholfri vs. alkoholsvag vin",
  },
  { slug: "ma-man-kore-efter-alkoholfri-vin", label: "Må man køre efter alkoholfri vin?" },
  {
    slug: "alkoholfri-vin-sukker-og-diabetes",
    label: "Alkoholfri vin, sukker og diabetes",
  },
  { slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" },
  { slug: "mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no" },
  { slug: "tor-alkoholfri-hvidvin", label: "Tør alkoholfri hvidvin" },
  { slug: "serveringstemperatur-alkoholfri-hvidvin", label: "Serveringstemperatur 0 % hvid" },
  { slug: "holdbarhed-aabnet-alkoholfri-hvidvin", label: "Holdbarhed åbnet 0 % hvid" },
];

const RODVIN_DYK: GuideClusterLink[] = [
  { slug: "bedste-alkoholfri-rodvin", label: "Bedste alkoholfri rødvin" },
  { slug: "alkoholfri-pinot-noir", label: "Alkoholfri Pinot Noir" },
  { slug: "alkoholfri-vin-til-pizza-og-pasta", label: "0 % til pizza og pasta" },
  { slug: "alkoholfri-vin-til-flaesketeg", label: "0 % til flæskesteg" },
  { slug: "leitz-eins-zwei-zero", label: "Leitz Eins-Zwei-Zero" },
];

const HVIDVIN_DRUER: GuideClusterLink[] = [
  { slug: "alkoholfri-riesling", label: "Alkoholfri Riesling" },
  { slug: "alkoholfri-sauvignon-blanc", label: "Alkoholfri Sauvignon Blanc" },
  { slug: "alkoholfri-chardonnay", label: "Alkoholfri Chardonnay" },
  { slug: "alkoholfri-pinot-grigio", label: "Alkoholfri Pinot Grigio" },
  { slug: "alkoholfri-gewurztraminer-og-muscat", label: "Alkoholfri Muscat & Gewürz" },
];

const HVIDVIN_STIL: GuideClusterLink[] = [
  { slug: "tor-alkoholfri-hvidvin", label: "Tør alkoholfri hvidvin" },
  { slug: "halvtor-og-soed-alkoholfri-hvidvin", label: "Halvtør og sød 0 % hvid" },
  { slug: "alkoholfri-frizzante-hvidvin", label: "Frizzante vs. mousserende" },
  { slug: "alkoholfri-hvidvin-med-fadlagring", label: "0 % hvid med fadlagring" },
  { slug: "okologisk-og-biodynamisk-alkoholfri-hvidvin", label: "Øko & biodynamisk 0 % hvid" },
];

const HVIDVIN_MAD: GuideClusterLink[] = [
  { slug: "alkoholfri-hvidvin-til-skaldyr-og-fisk", label: "0 % hvid til fisk & skaldyr" },
  { slug: "alkoholfri-hvidvin-til-asiatisk-mad", label: "0 % hvid til asiatisk mad" },
  { slug: "alkoholfri-hvidvin-til-ost", label: "0 % hvid til ost" },
  { slug: "alkoholfri-hvidvin-til-sommermenu", label: "0 % hvid til sommermenu" },
  { slug: "alkoholfri-hvidvin-i-madlavning", label: "0 % hvid i madlavning" },
  { slug: "alkoholfri-hvidvin-til-gravide", label: "0 % hvid til gravide" },
];

function hvidvinBlock(exclude: string[], intro: string): GuideClusterBlock {
  return alkoholfriBlock(
    exclude,
    "Alkoholfri hvidvin — dyk dybere",
    intro,
    [{ slug: "bedste-alkoholfri-hvidvin", label: "Bedste alkoholfri hvidvin" }],
    [HUB],
    HVIDVIN_DRUER,
    HVIDVIN_STIL,
    HVIDVIN_MAD,
    BY_TYPE.filter((l) => l.slug !== "bedste-alkoholfri-hvidvin").slice(0, 3),
  );
}

function cluster(exclude: string[], ...groups: GuideClusterLink[][]): GuideClusterLink[] {
  const seen = new Set<string>();
  const out: GuideClusterLink[] = [];
  for (const link of groups.flat()) {
    if (exclude.includes(link.slug) || seen.has(link.slug)) continue;
    seen.add(link.slug);
    out.push(link);
  }
  return out;
}

function alkoholfriBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "emerald" };
}

const SUPERMARKED_PILLAR: GuideClusterLink = {
  slug: "vin-i-supermarkedet-guide",
  label: "Vin i supermarkedet — overblik",
};

const SUPERMARKED: GuideClusterLink[] = [
  { slug: "vin-i-supermarkedet-guide", label: "Vin i supermarkedet" },
  { slug: "discount-vin-hylde-guide", label: "Discount-hylden under 70 kr" },
  { slug: "bedste-vin-i-netto-under-70-kr", label: "Vin i Netto under 70 kr" },
  { slug: "bedste-vin-i-lidl", label: "Vin i Lidl" },
  { slug: "bedste-vin-i-rema-1000", label: "Vin i Rema 1000" },
  { slug: "bedste-vin-i-foetex-og-bilka", label: "Vin i Føtex og Bilka" },
  { slug: "vin-i-coop-365-og-kvickly", label: "Vin i Coop 365 og Kvickly" },
  { slug: "ugens-vinkup-supermarked", label: "Månedens vinkup" },
  { slug: "alkoholfri-vin-i-netto-foetex", label: "Alkoholfri i Netto og Føtex" },
  { slug: "bedste-rodvin-under-75-kr", label: "Rødvin under 75 kr" },
  { slug: "bedste-vin-til-hverdag", label: "Vin til hverdag" },
  { slug: "bedste-box-vin", label: "Bedste box-vin" },
  { slug: "vin-tilbud-og-foer-pris", label: "Vin tilbud og før-pris" },
];

function supermarketBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "amber" };
}

const HEDVIN_PILLAR: GuideClusterLink = {
  slug: "hvad-er-hedvin",
  label: "Hvad er hedvin?",
};

const HEDVIN_TYPES: GuideClusterLink[] = [
  { slug: "hvad-er-portvin", label: "Hvad er portvin?" },
  { slug: "hvad-er-sherry-vin", label: "Hvad er sherry?" },
  { slug: "hvad-er-madeira-vin", label: "Hvad er madeira?" },
  { slug: "hvad-er-vermouth", label: "Hvad er vermouth?" },
];

const HEDVIN_PORT: GuideClusterLink[] = [
  { slug: "bedste-portvin", label: "Bedste portvin" },
  { slug: "ruby-portvin", label: "Ruby portvin" },
  { slug: "tawny-portvin", label: "Tawny portvin" },
  { slug: "sadan-serverer-du-portvin", label: "Sådan serverer du portvin" },
  { slug: "hvor-laenge-holder-portvin", label: "Hvor længe holder portvin" },
  { slug: "portvin-alkoholprocent", label: "Portvin alkoholprocent" },
  { slug: "portvin-til-ost", label: "Portvin til ost" },
  { slug: "portvin-til-chokolade", label: "Portvin til chokolade" },
];

const HEDVIN_VIDEN: GuideClusterLink[] = [
  { slug: "hedvin-alkoholprocent", label: "Hedvin alkoholprocent" },
  { slug: "bedste-dessertvin", label: "Bedste dessertvin" },
  { slug: "vin-til-portugisisk-mad", label: "Vin til portugisisk mad" },
];

function hedvinBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "amber" };
}

const DANSK_VIN_PILLAR: GuideClusterLink = {
  slug: "bedste-dansk-vin",
  label: "Bedste dansk vin",
};

const DANSK_VIN: GuideClusterLink[] = [
  { slug: "bedste-dansk-vin", label: "Bedste dansk vin" },
  { slug: "danmarks-vingaarde-guide", label: "Danmarks vingårde" },
  { slug: "solaris-druen", label: "Solaris-druen" },
  { slug: "rondo-druen", label: "Rondo-druen" },
  { slug: "cabernet-cortis-druen", label: "Cabernet Cortis-druen" },
  { slug: "regent-druen", label: "Regent-druen" },
  { slug: "dansk-frugtvin-guide", label: "Dansk frugtvin" },
  { slug: "vinbarer-koebenhavn", label: "Vinbarer i København" },
  { slug: "vinbarer-aarhus", label: "Vinbarer i Aarhus" },
  { slug: "vinbarer-odense", label: "Vinbarer i Odense" },
  { slug: "saesonvin-i-danmark", label: "Sæsonvin i Danmark" },
  { slug: "bedste-okologiske-vin", label: "Økologisk vin" },
];

function danskVinBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "rose" };
}

const MAD_HUB: GuideClusterLink = {
  slug: "komplet-guide-til-vin-og-mad",
  label: "Komplet guide til vin og mad",
};

const MAD_FISK: GuideClusterLink[] = [
  { slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" },
  { slug: "vin-til-laks", label: "Vin til laks" },
  { slug: "vin-til-sushi", label: "Vin til sushi" },
  { slug: "vin-til-rejer", label: "Vin til rejer" },
  { slug: "vin-til-ceviche", label: "Vin til ceviche" },
  { slug: "vin-til-stjerneskud", label: "Vin til stjerneskud" },
];

const MAD_KOED: GuideClusterLink[] = [
  { slug: "vin-til-boeff", label: "Vin til bøf og oksekød" },
  { slug: "vin-til-gulasch", label: "Vin til gulasch" },
  { slug: "vin-til-okseskank", label: "Vin til okseskank" },
  { slug: "vin-til-kylling-og-lyst-koed", label: "Vin til kylling" },
  { slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" },
  { slug: "rodvin-til-pizza", label: "Rødvin til pizza" },
];

const MAD_DANSK: GuideClusterLink[] = [
  { slug: "vin-til-stegt-flaesk", label: "Vin til stegt flæsk" },
  { slug: "vin-til-smorrebrod", label: "Vin til smørrebrød" },
  { slug: "vin-til-tarteletter", label: "Vin til tarteletter" },
  { slug: "vin-til-skipperlabskovs", label: "Vin til skipperlabskovs" },
  { slug: "vin-til-gule-aerter", label: "Vin til gule ærter" },
  { slug: "vin-til-stjerneskud", label: "Vin til stjerneskud" },
];

const MAD_OST: GuideClusterLink[] = [
  { slug: "vin-til-ost-og-ostebord", label: "Vin til ost og ostebord" },
  { slug: "vin-til-gammel-knas", label: "Vin til Gammel Knas" },
  { slug: "vin-til-vesterhavsost", label: "Vin til Vesterhavsost" },
  { slug: "vin-til-hele-ostebordet", label: "Én vin til hele ostebordet" },
  { slug: "vin-til-supermarkedets-ostebord", label: "Supermarkedets ostebord" },
  { slug: "hvorfor-smager-rodvin-grimt-til-ost", label: "Hvorfor rødvin smager grimt til ost" },
  { slug: "vin-til-hard-ost", label: "Vin til hård ost" },
  { slug: "vin-til-brie-og-camembert", label: "Vin til brie" },
  { slug: "vin-til-blaaskimmelost", label: "Vin til blåskimmel" },
];

const MAD_SAESON: GuideClusterLink[] = [
  { slug: "vin-til-julemad-den-store-guide", label: "Vin til julemad" },
  { slug: "vin-til-nytaar-og-nytaarsmenu", label: "Vin til nytår" },
  { slug: "vin-til-gas", label: "Vin til gås og gåsesteg" },
  { slug: "rosevin-til-mad-og-sommer", label: "Rosévin til mad og sommer" },
];

function madBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "rose" };
}

const VIN_VIDEN_PILLAR: GuideClusterLink = {
  slug: "opbevaring-af-vin-temperatur-og-aabnet-flaske",
  label: "Rødvin temperatur og opbevaring",
};

const VIDEN_HOLD: GuideClusterLink[] = [
  { slug: "hvor-laenge-holder-rodvin", label: "Hvor længe holder rødvin" },
  { slug: "hvor-laenge-holder-hvidvin", label: "Hvor længe holder hvidvin" },
  { slug: "hvor-laenge-holder-uaabnet-vin", label: "Hvor længe holder uåbnet vin" },
  { slug: "hvor-laenge-holder-aabnet-vin", label: "Hvor længe holder åbnet vin" },
  { slug: "hvor-laenge-holder-boks-vin", label: "Hvor længe holder papvin" },
  { slug: "hvor-laenge-holder-vin-i-karaffel", label: "Holdbarhed i karaffel" },
  { slug: "hvor-laenge-kan-vin-lagres", label: "Hvor længe kan vin lagres" },
  { slug: "kan-vin-blive-daarlig", label: "Kan vin blive dårlig" },
];

const VIDEN_MAENGDER: GuideClusterLink[] = [
  { slug: "hvor-mange-enheder-alkohol-i-et-glas-vin", label: "Genstande pr. glas vin" },
  { slug: "hvor-meget-fylder-en-flaske-vin", label: "Hvor meget fylder en flaske" },
  { slug: "hvor-mange-glas-i-en-flaske-vin", label: "Glas pr. flaske" },
  { slug: "hvor-mange-flasker-i-en-3-liter-papvin", label: "Flasker og glas i 3 L papvin" },
  { slug: "hvor-meget-alkohol-i-vin", label: "Alkoholprocent i vin" },
  { slug: "hvor-mange-kalorier-i-vin", label: "Kalorier i vin" },
];

const VIDEN_FEST: GuideClusterLink[] = [
  { slug: "hvor-meget-vin-til-bryllup", label: "Hvor meget vin til bryllup" },
  { slug: "hvor-meget-vin-til-fest", label: "Hvor meget vin til fest" },
  { slug: "hvor-meget-papvin-til-fest", label: "Papvin til fest" },
  { slug: "maa-man-aabne-vaertsgaven-vin", label: "Må man åbne værtsgaven?" },
  { slug: "crowdpleaser-vin-til-gaester", label: "Crowdpleaser til gæster" },
];

const VIDEN_GLAS: GuideClusterLink[] = [
  { slug: "sadan-vaelger-du-vinglas", label: "Sådan vælger du vinglas" },
  { slug: "sadan-vaelger-du-roedvinsglas", label: "Rødvinsglas" },
  { slug: "sadan-vaelger-du-hvidvinsglas", label: "Hvidvinsglas" },
  { slug: "sadan-vaelger-du-champagneglas", label: "Champagneglas" },
  { slug: "riedel-vs-zalto-vs-spiegelau-vinglas", label: "Riedel vs Zalto vs Spiegelau" },
  { slug: "sadan-vaelger-du-vinkaraffel", label: "Vinkaraffel" },
  { slug: "sadan-serverer-du-vin", label: "Sådan serverer du vin" },
  { slug: "hvor-mange-glas-i-en-flaske-vin", label: "Glas pr. flaske" },
];

function videnBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "amber" };
}

const PAPVIN_PILLAR: GuideClusterLink = {
  slug: "bedste-box-vin",
  label: "Bedste papvin og boxvin",
};

const PAPVIN: GuideClusterLink[] = [
  { slug: "bedste-box-vin", label: "Bedste papvin" },
  { slug: "hvor-laenge-holder-boks-vin", label: "Hvor længe holder papvin" },
  { slug: "hvor-mange-flasker-i-en-3-liter-papvin", label: "Flasker og glas i 3 L" },
  { slug: "hvor-meget-papvin-til-fest", label: "Papvin til fest" },
  { slug: "papvin-vs-flaske-pris", label: "Papvin vs. flaske — pris" },
  { slug: "bedste-papvin-under-150-kr", label: "Papvin under 150 kr" },
  { slug: "temperatur-guide-papvin", label: "Temperatur-guide papvin" },
  { slug: "hvorfor-har-papvin-udloebsdato", label: "Hvorfor udløbsdato" },
  { slug: "bedste-rose-paa-boks", label: "Rosé på boks" },
  { slug: "papvin-co2-og-klima", label: "Papvin og klima" },
  { slug: "papvin-til-reception", label: "Papvin til reception" },
  { slug: "papvin-15-og-225-liter", label: "1,5 og 2,25 L papvin" },
  { slug: "premium-papvin", label: "Premium papvin" },
  { slug: "papvin-myter-hovedpine", label: "Papvin-myter" },
  { slug: "okologisk-og-naturvin-paa-boks", label: "Øko og naturvin på boks" },
  { slug: "hvorfor-smager-papvin-anderledes", label: "Hvorfor smager papvin anderledes" },
  { slug: "papvin-til-sommerhus-og-camping", label: "Papvin til camping" },
  { slug: "glogg-paa-papvin", label: "Gløgg på papvin" },
  { slug: "papvin-til-skiferie", label: "Papvin til skiferie" },
  { slug: "kan-man-fryse-papvin", label: "Kan man fryse papvin" },
  { slug: "sadan-tommer-du-papvin", label: "Tøm den sidste papvin" },
  { slug: "papvin-graensehandel-tyskland", label: "Papvin-grænsehandel" },
  { slug: "papvin-bedst-i-test", label: "Papvin bedst i test" },
  { slug: "bedste-rod-papvin", label: "Bedste rød papvin" },
  { slug: "bedste-hvid-papvin", label: "Bedste hvid papvin" },
  { slug: "papvin-tilbud", label: "Papvin tilbud" },
  { slug: "papvin-5-liter", label: "5 liters papvin" },
];

function papvinBlock(exclude: string[], intro: string): GuideClusterBlock {
  return videnBlock(exclude, "Papvin og bag-in-box", intro, [PAPVIN_PILLAR], PAPVIN);
}

const OIL_GIFT: GuideClusterLink[] = [
  { slug: "vaertindegave-olivenolie", label: "Værtindegave olivenolie" },
  { slug: "olivenolie-gave-fars-dag", label: "Olivenolie til fars dag" },
  { slug: "olivenolie-gave-mors-dag", label: "Olivenolie til mors dag" },
  { slug: "olivenolie-julegave", label: "Olivenolie som julegave" },
  { slug: "vin-og-olie-vaertsgave", label: "Vin og olie som værtsgave" },
  { slug: "olivenolie-finish", label: "Olivenolie som finish" },
];

const OIL_LEXIKON: GuideClusterLink[] = [
  { slug: "hvad-er-ekstra-jomfru-olivenolie", label: "Hvad er ekstra jomfru?" },
  { slug: "falsk-olivenolie", label: "Falsk olivenolie" },
  { slug: "olivenolie-sundhed", label: "Olivenolie og sundhed" },
  { slug: "olivenolie-finish", label: "Olivenolie som finish" },
];

/** Synlige klynge-links på guide-sider — styrker intern linking. */
export const GUIDE_CLUSTER_LINKS: Record<string, GuideClusterBlock | GuideClusterBlock[]> = {
  "bedste-alkoholfri-vin": alkoholfriBlock(
    ["bedste-alkoholfri-vin"],
    "Alkoholfri vin — hele klyngen",
    "Vælg efter type, anledning eller baggrund — alle guider hænger sammen om 0 % og lavalkohol.",
    BY_TYPE,
    BRANDS,
    BUDGET,
    OCCASION,
    VIDEN,
  ),
  "bedste-alkoholfri-maerker-2026": alkoholfriBlock(
    ["bedste-alkoholfri-maerker-2026"],
    "Alkoholfri vin — relaterede guider",
    "Mærker side om side — dyk ned i Leitz, budget og type-guides.",
    [HUB],
    BRANDS,
    BY_TYPE.slice(0, 4),
    BUDGET,
    VIDEN.slice(0, 3),
  ),
  "leitz-eins-zwei-zero": alkoholfriBlock(
    ["leitz-eins-zwei-zero"],
    "Alkoholfri vin — relaterede guider",
    "Leitz som benchmark — sammenlign mærker, typer og budget.",
    [HUB],
    BRANDS,
    BY_TYPE.slice(0, 4),
    BUDGET,
    [{ slug: "smager-alkoholfri-vin-godt", label: "Smager alkoholfri vin godt?" }],
  ),
  "torres-natureo": alkoholfriBlock(
    ["torres-natureo"],
    "Alkoholfri vin — relaterede guider",
    "Natureo til budget og hylden — sammenlign med Leitz og Noughty.",
    [HUB],
    BRANDS,
    BUDGET,
    BY_TYPE.slice(0, 4),
    OCCASION.slice(0, 2),
  ),
  "noughty-alkoholfri-vin": alkoholfriBlock(
    ["noughty-alkoholfri-vin"],
    "Alkoholfri vin — relaterede guider",
    "Noughty til brunch og skål — se også kalorier og bobler.",
    [HUB],
    BRANDS,
    BY_TYPE.slice(0, 2),
    [{ slug: "kalorier-i-alkoholfri-vin", label: "Kalorier i alkoholfri vin" }],
    OCCASION.slice(0, 3),
  ),
  "oddbird-alkoholfri-vin": alkoholfriBlock(
    ["oddbird-alkoholfri-vin"],
    "Alkoholfri vin — relaterede guider",
    "Oddbird til fest og gave — sammenlign med French Bloom og Leitz.",
    [HUB],
    BRANDS,
    BY_TYPE.slice(0, 3),
    [{ slug: "bedste-alkoholfri-champagne", label: "Alkoholfri champagne" }],
    OCCASION.slice(0, 3),
  ),
  "french-bloom-alkoholfri-vin": alkoholfriBlock(
    ["french-bloom-alkoholfri-vin"],
    "Alkoholfri vin — relaterede guider",
    "French Bloom som premium-skål — se Oddbird, bobler og nytår.",
    [HUB],
    BRANDS,
    [{ slug: "bedste-alkoholfri-champagne", label: "Alkoholfri champagne" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "alkoholfri-bobler-til-nytaar", label: "Bobler til nytår" }],
  ),
  "alkoholfri-pinot-noir": alkoholfriBlock(
    ["alkoholfri-pinot-noir"],
    "Alkoholfri rødvin — dyk dybere",
    "Pinot er den stærkeste 0 %-røddrue — se også pizza, flæskesteg og Leitz.",
    [HUB],
    RODVIN_DYK,
    BRANDS.slice(0, 4),
    BY_TYPE.filter((l) => l.slug !== "bedste-alkoholfri-rodvin").slice(0, 3),
  ),
  "ma-man-kore-efter-alkoholfri-vin": alkoholfriBlock(
    ["ma-man-kore-efter-alkoholfri-vin"],
    "Alkoholfri vin — viden",
    "Kørsel, 0,0 % og etiketten — se også graviditet og vs alkoholsvag.",
    [HUB],
    VIDEN.filter((l) => l.slug !== "ma-man-kore-efter-alkoholfri-vin").slice(0, 5),
    [{ slug: "alkoholfri-vin-til-graviditet", label: "Alkoholfri under graviditet" }],
    BRANDS.slice(0, 3),
  ),
  "alkoholfri-vin-sukker-og-diabetes": alkoholfriBlock(
    ["alkoholfri-vin-sukker-og-diabetes"],
    "Alkoholfri vin — viden",
    "Sukker, tør stil og etiketten — se også kalorier og tør hvid.",
    [HUB],
    [
      { slug: "kalorier-i-alkoholfri-vin", label: "Kalorier i alkoholfri vin" },
      { slug: "tor-alkoholfri-hvidvin", label: "Tør alkoholfri hvidvin" },
    ],
    VIDEN.filter((l) => l.slug !== "alkoholfri-vin-sukker-og-diabetes").slice(0, 4),
    BRANDS.slice(0, 4),
  ),
  "alkoholfri-vin-til-tapas": alkoholfriBlock(
    ["alkoholfri-vin-til-tapas"],
    "Alkoholfri til mad og selskab",
    "Rosé, hvid og bobler til tapas — se også grill og pizza.",
    [HUB],
    BY_TYPE.slice(0, 4),
    OCCASION.filter((l) => l.slug !== "alkoholfri-vin-til-tapas").slice(0, 4),
    BUDGET,
  ),
  "alkoholfri-vin-til-pizza-og-pasta": alkoholfriBlock(
    ["alkoholfri-vin-til-pizza-og-pasta"],
    "Alkoholfri til mad",
    "Garnacha og pinot til tomat — se også rødvin-pillar og tapas.",
    [HUB],
    RODVIN_DYK,
    OCCASION.filter((l) => l.slug !== "alkoholfri-vin-til-pizza-og-pasta").slice(0, 3),
    BUDGET,
  ),
  "alkoholfri-gin-tonic-og-aperitif": alkoholfriBlock(
    ["alkoholfri-gin-tonic-og-aperitif"],
    "Alkoholfri til fest",
    "0 % G&T og spritz ved siden af bobler og festguiden.",
    [HUB],
    [{ slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    OCCASION.filter((l) => l.slug !== "alkoholfri-gin-tonic-og-aperitif").slice(0, 4),
  ),
  "kalorier-i-alkoholfri-vin": alkoholfriBlock(
    ["kalorier-i-alkoholfri-vin"],
    "Alkoholfri vin — relaterede guider",
    "Kcal-tal og ærlige forventninger — vælg tør bobler og kendte mærker.",
    [HUB],
    BRANDS,
    VIDEN.filter((l) => l.slug !== "kalorier-i-alkoholfri-vin").slice(0, 3),
  ),
  "alkoholfri-vin-til-konfirmation": alkoholfriBlock(
    ["alkoholfri-vin-til-konfirmation"],
    "Alkoholfri vin — relaterede guider",
    "Konfirmation med 0 % — bobler, mængde og mærker til blandet selskab.",
    [HUB],
    OCCASION.filter((l) => l.slug !== "alkoholfri-vin-til-konfirmation").slice(0, 3),
    BRANDS,
    BY_TYPE.slice(0, 3),
    BUDGET,
  ),
  "alkoholfri-vin-i-netto-foetex": [
    alkoholfriBlock(
      ["alkoholfri-vin-i-netto-foetex"],
      "Alkoholfri vin — relaterede guider",
      "Supermarked vs online — find samme stil billigere og bedre.",
      [HUB],
      BUDGET,
      BRANDS,
      BY_TYPE.slice(0, 3),
      [{ slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" }],
    ),
    supermarketBlock(
      ["alkoholfri-vin-i-netto-foetex"],
      "Supermarked — også med alkohol",
      "Samme hylde-logik til almindelig vin i Netto, Rema og Lidl.",
      [SUPERMARKED_PILLAR],
      SUPERMARKED.filter((l) => l.slug !== "alkoholfri-vin-i-netto-foetex").slice(0, 4),
    ),
  ],
  "vin-i-supermarkedet-guide": supermarketBlock(
    ["vin-i-supermarkedet-guide"],
    "Supermarked og budget",
    "Fra hylden i Netto/Rema til samme stil online.",
    SUPERMARKED,
    [{ slug: "vivino-app-til-vin-anmeldelser", label: "Vivino-app" }],
  ),
  "discount-vin-hylde-guide": supermarketBlock(
    ["discount-vin-hylde-guide"],
    "Supermarked og budget",
    "Navigér discount-hylden — og sammenlign online bagefter.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "bedste-vin-i-netto-under-70-kr": supermarketBlock(
    ["bedste-vin-i-netto-under-70-kr"],
    "Supermarked og budget",
    "Netto under 70 kr hører til den bredere supermarket-klynge.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "bedste-vin-i-lidl": supermarketBlock(
    ["bedste-vin-i-lidl"],
    "Supermarked og budget",
    "Lidl-hylden følger samme stilregler som øvrig discount.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "bedste-vin-i-rema-1000": supermarketBlock(
    ["bedste-vin-i-rema-1000"],
    "Supermarked og budget",
    "Rema under 80 kr — se også Netto, Lidl og Føtex.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "bedste-vin-i-foetex-og-bilka": supermarketBlock(
    ["bedste-vin-i-foetex-og-bilka"],
    "Supermarked og budget",
    "Bredere hylde end discount — stadig stil før marketing.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "vin-i-coop-365-og-kvickly": supermarketBlock(
    ["vin-i-coop-365-og-kvickly"],
    "Supermarked og budget",
    "Coop 365 som discount, Kvickly med mere dybde — samme stilregler.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "ugens-vinkup-supermarked": supermarketBlock(
    ["ugens-vinkup-supermarked"],
    "Supermarked og budget",
    "Månedens kup-logik på tværs af kæderne — se også de enkelte hyldeguides.",
    [SUPERMARKED_PILLAR],
    SUPERMARKED,
  ),
  "danmarks-vingaarde-guide": danskVinBlock(
    ["danmarks-vingaarde-guide"],
    "Dansk vin og oplevelser",
    "Besøg, druer og flasker — samme klynge.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
  ),
  "bedste-dansk-vin": danskVinBlock(
    ["bedste-dansk-vin"],
    "Dansk vin og oplevelser",
    "Fra producenter til besøg og danske druer.",
    DANSK_VIN,
  ),
  "solaris-druen": danskVinBlock(
    ["solaris-druen"],
    "Dansk vin og druer",
    "Solaris er kernen i dansk hvid — se også Rondo og vingårde.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
    [{ slug: "riesling-druen", label: "Riesling-druen" }],
    [{ slug: "gruener-veltliner-druen", label: "Grüner Veltliner" }],
  ),
  "rondo-druen": danskVinBlock(
    ["rondo-druen"],
    "Dansk vin og druer",
    "Rondo i køligt klima — se Solaris og danske producenter.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
    [{ slug: "pinot-noir-druen", label: "Pinot noir-druen" }],
    [{ slug: "gamay-druen", label: "Gamay-druen" }],
  ),
  "cabernet-cortis-druen": danskVinBlock(
    ["cabernet-cortis-druen"],
    "Dansk vin — flere hybrider",
    "Cortis er niche ved siden af Rondo og Regent — se også Solaris og vingårde.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN.filter((l) => l.slug !== "cabernet-cortis-druen"),
  ),
  "regent-druen": danskVinBlock(
    ["regent-druen"],
    "Dansk vin — flere hybrider",
    "Regent giver mørkere dansk rød end Rondo — sammenlign med Cortis og Solaris.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN.filter((l) => l.slug !== "regent-druen"),
  ),
  "dansk-frugtvin-guide": danskVinBlock(
    ["dansk-frugtvin-guide"],
    "Dansk vin og specialiteter",
    "Frugtvin til dessert og ost — ved siden af druevin-pillaren.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
    [{ slug: "vin-til-ost-og-ostebord", label: "Vin til ost" }],
  ),
  "vinbarer-koebenhavn": danskVinBlock(
    ["vinbarer-koebenhavn"],
    "Lokal vinoplevelse",
    "Byens glas — eller tag på vingårdsbesøg i weekenden.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
  ),
  "vinbarer-aarhus": danskVinBlock(
    ["vinbarer-aarhus"],
    "Lokal vinoplevelse",
    "Aarhus-glas og jyske vingårde i samme klynge.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
  ),
  "vinbarer-odense": danskVinBlock(
    ["vinbarer-odense"],
    "Lokal vinoplevelse",
    "Odense-byvin og fynske vingårde — samme klynge.",
    [DANSK_VIN_PILLAR],
    DANSK_VIN,
  ),
  "smager-alkoholfri-vin-godt": alkoholfriBlock(
    ["smager-alkoholfri-vin-godt"],
    "Alkoholfri vin — relaterede guider",
    "Ærlige forventninger — så de flasker der faktisk smager af vin.",
    [HUB],
    BRANDS,
    BY_TYPE.slice(0, 3),
    VIDEN.filter((l) => l.slug !== "smager-alkoholfri-vin-godt").slice(0, 3),
  ),
  "bedste-alkoholfri-vin-under-100-kr": alkoholfriBlock(
    ["bedste-alkoholfri-vin-under-100-kr"],
    "Alkoholfri vin — relaterede guider",
    "Billige 0 %-valg under 100 kr — suppler med type- og grill-guides.",
    [HUB],
    BY_TYPE.slice(0, 4),
    BUDGET,
    BRANDS,
    [{ slug: "alkoholfri-vin-til-grill", label: "Alkoholfri vin til grill" }],
    OCCASION.slice(0, 2),
  ),
  "alkoholfri-vin-til-grill": alkoholfriBlock(
    ["alkoholfri-vin-til-grill"],
    "Alkoholfri vin — relaterede guider",
    "Rosé, bobler og blød rød til grill — også budget under 100 kr.",
    [HUB],
    BY_TYPE.slice(0, 4),
    BUDGET,
    OCCASION.filter((l) => l.slug !== "alkoholfri-vin-til-grill").slice(0, 3),
  ),
  "bedste-alkoholfri-hvidvin": alkoholfriBlock(
    ["bedste-alkoholfri-hvidvin"],
    "Alkoholfri vin — relaterede guider",
    "Hvidvin er stærkest i 0 %-klassen. Dyk ned i druer, stil, mad og how-to.",
    [HUB],
    HVIDVIN_DRUER,
    HVIDVIN_STIL,
    HVIDVIN_MAD.slice(0, 4),
    BY_TYPE,
    OCCASION.slice(0, 2),
  ),
  "alkoholfri-riesling": hvidvinBlock(
    ["alkoholfri-riesling"],
    "Riesling 0 % — syre, sushi og de andre druer i klyngen.",
  ),
  "alkoholfri-sauvignon-blanc": hvidvinBlock(
    ["alkoholfri-sauvignon-blanc"],
    "Sauvignon 0 % — friskhed, salat og skaldyr side om side med riesling.",
  ),
  "alkoholfri-chardonnay": hvidvinBlock(
    ["alkoholfri-chardonnay"],
    "Chardonnay 0 % — fedme uden fadbombe, plus tørheds- og øko-guides.",
  ),
  "alkoholfri-pinot-grigio": hvidvinBlock(
    ["alkoholfri-pinot-grigio"],
    "Pinot grigio 0 % til hverdag — se også tør stil og sommermenu.",
  ),
  "alkoholfri-gewurztraminer-og-muscat": hvidvinBlock(
    ["alkoholfri-gewurztraminer-og-muscat"],
    "Aromatisk 0 % — muscat, sødme og asiatisk madparring.",
  ),
  "tor-alkoholfri-hvidvin": hvidvinBlock(
    ["tor-alkoholfri-hvidvin"],
    "Find knastør 0 %-hvid — og se hvad halvtør/sød egner sig til.",
  ),
  "halvtor-og-soed-alkoholfri-hvidvin": hvidvinBlock(
    ["halvtor-og-soed-alkoholfri-hvidvin"],
    "Sød og halvtør 0 % til velkomst — sammenlign med tør stil og muscat.",
  ),
  "alkoholfri-frizzante-hvidvin": hvidvinBlock(
    ["alkoholfri-frizzante-hvidvin"],
    "Perlende vs. mousserende 0 % — plus bobler og stille hvid.",
  ),
  "alkoholfri-hvidvin-med-fadlagring": hvidvinBlock(
    ["alkoholfri-hvidvin-med-fadlagring"],
    "Fad og 0 % — ærlige forventninger ved siden af chardonnay-guiden.",
  ),
  "okologisk-og-biodynamisk-alkoholfri-hvidvin": hvidvinBlock(
    ["okologisk-og-biodynamisk-alkoholfri-hvidvin"],
    "Øko 0 %-hvid — Noughty, certificering og smagsvalg i klyngen.",
  ),
  "alkoholfri-hvidvin-til-skaldyr-og-fisk": hvidvinBlock(
    ["alkoholfri-hvidvin-til-skaldyr-og-fisk"],
    "Fisk og skaldyr uden alkohol — sauvignon, riesling og madlavning.",
  ),
  "alkoholfri-hvidvin-til-asiatisk-mad": hvidvinBlock(
    ["alkoholfri-hvidvin-til-asiatisk-mad"],
    "Sushi og thai med 0 %-hvid — riesling, muscat og sødme-guides.",
  ),
  "alkoholfri-hvidvin-til-ost": hvidvinBlock(
    ["alkoholfri-hvidvin-til-ost"],
    "Ostebordet uden promille — match til milde og kraftige oste.",
  ),
  "alkoholfri-hvidvin-til-sommermenu": hvidvinBlock(
    ["alkoholfri-hvidvin-til-sommermenu"],
    "Salat og grillkylling — sommer 0 %-hvid og temperatur.",
  ),
  "holdbarhed-aabnet-alkoholfri-hvidvin": hvidvinBlock(
    ["holdbarhed-aabnet-alkoholfri-hvidvin"],
    "Åbnet 0 %-hvid i køleskabet — plus servering og madlavning.",
  ),
  "serveringstemperatur-alkoholfri-hvidvin": hvidvinBlock(
    ["serveringstemperatur-alkoholfri-hvidvin"],
    "Hvor kold skal 0 %-hvid være? Se også stil- og drueguides.",
  ),
  "hvordan-fjernes-alkohol-fra-hvidvin": hvidvinBlock(
    ["hvordan-fjernes-alkohol-fra-hvidvin"],
    "Vakuum og osmose forklaret — videre til smag og bedste flasker.",
  ),
  "kalorier-i-alkoholfri-hvidvin": hvidvinBlock(
    ["kalorier-i-alkoholfri-hvidvin"],
    "Sukker vs. alkohol i kcal — vælg tør stil og kendte mærker.",
  ),
  "alkoholfri-hvidvin-i-madlavning": hvidvinBlock(
    ["alkoholfri-hvidvin-i-madlavning"],
    "0 % i gryden til muslinger og risotto — plus tørheds-guide.",
  ),
  "alkoholfri-hvidvin-til-gravide": hvidvinBlock(
    ["alkoholfri-hvidvin-til-gravide"],
    "Under 0,5 % med fokus på etiket — se også produktion og kalorier.",
  ),
  "bedste-alkoholfri-bobler": alkoholfriBlock(
    ["bedste-alkoholfri-bobler"],
    "Alkoholfri vin — relaterede guider",
    "Bobler og mousserende er det nemmeste festvalg uden alkohol.",
    [HUB],
    BY_TYPE,
    [{ slug: "bedste-alkoholfri-champagne", label: "Premium alkoholfri champagne" }],
    OCCASION.slice(0, 2),
    VIDEN.slice(0, 2),
  ),
  "bedste-alkoholfri-rose": alkoholfriBlock(
    ["bedste-alkoholfri-rose"],
    "Alkoholfri vin — relaterede guider",
    "Rosé til terrasse og tapas — suppler med hvid og bobler.",
    [HUB],
    BY_TYPE,
    OCCASION.slice(0, 2),
    VIDEN.slice(0, 2),
  ),
  "bedste-alkoholfri-rodvin": alkoholfriBlock(
    ["bedste-alkoholfri-rodvin"],
    "Alkoholfri vin — relaterede guider",
    "Rød uden alkohol er sværest — dyk ned i pinot, pizza og bobler før du køber.",
    [HUB],
    RODVIN_DYK,
    BY_TYPE,
    VIDEN.slice(0, 3),
  ),
  "bedste-alkoholfri-champagne": alkoholfriBlock(
    ["bedste-alkoholfri-champagne"],
    "Alkoholfri vin — relaterede guider",
    "Premium sparkling til nytår og fest — ikke ægte champagne, men samme ritual.",
    [HUB],
    BY_TYPE,
    [{ slug: "vin-til-nytaar-og-nytaarsmenu", label: "Vin til nytår og nytårsmenu" }],
    [{ slug: "vin-til-kransekage", label: "Vin til kransekage" }],
    [{ slug: "vin-til-dessert-og-kransekage", label: "Vin til dessert og kransekage" }],
    OCCASION.slice(0, 2),
  ),
  "alkoholsvag-og-alkoholfri-vin": alkoholfriBlock(
    ["alkoholsvag-og-alkoholfri-vin"],
    "Alkoholfri og lavalkohol — videre læsning",
    "Forskellen på 0 %, alkoholsvag og lavalkohol — og hvad du skal vælge til maden.",
    [HUB],
    BY_TYPE.slice(0, 3),
    [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
    [{ slug: "mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no" }],
  ),
  "hvordan-fremstilles-alkoholfri-vin": alkoholfriBlock(
    ["hvordan-fremstilles-alkoholfri-vin"],
    "Alkoholfri vin — praktiske guider",
    "Bag om de-alkoholisering — og hvilke flasker der faktisk smager godt.",
    [HUB],
    BY_TYPE,
    VIDEN.filter((l) => l.slug !== "hvordan-fremstilles-alkoholfri-vin").slice(0, 2),
  ),
  "hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin": alkoholfriBlock(
    ["hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin"],
    "Alkoholfri vin — videre læsning",
    "0 % vs. lavalkohol på etiketten — og hvad det betyder i glasset.",
    [HUB],
    [{ slug: "alkoholsvag-og-alkoholfri-vin", label: "Alkoholsvag og alkoholfri vin" }],
    BY_TYPE.slice(0, 3),
    [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
  ),
  "mindful-drikke-low-no-alkohol": alkoholfriBlock(
    ["mindful-drikke-low-no-alkohol"],
    "Low & no — alkoholfri guider",
    "Bevidst drikke uden at ofre smag eller madparring.",
    [HUB],
    BY_TYPE,
    [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
    OCCASION.slice(0, 2),
  ),
  "bedste-lavalkohol-vin": alkoholfriBlock(
    ["bedste-lavalkohol-vin"],
    "Lavalkohol og alkoholfri",
    "7–11 % ABV og 0 % side om side — vælg efter situation og smag.",
    [HUB],
    BY_TYPE.slice(0, 4),
    [{ slug: "alkoholsvag-og-alkoholfri-vin", label: "Alkoholsvag og alkoholfri vin" }],
  ),
  "alkoholfri-vin-til-fest": alkoholfriBlock(
    ["alkoholfri-vin-til-fest"],
    "Alkoholfri til fest og selskab",
    "Skål uden promille — start med bobler og overblikket.",
    [HUB],
    BY_TYPE,
    OCCASION.filter((l) => l.slug !== "alkoholfri-vin-til-fest").slice(0, 3),
  ),
  "alkoholfri-bobler-til-nytaar": alkoholfriBlock(
    ["alkoholfri-bobler-til-nytaar"],
    "Alkoholfri bobler til fest",
    "Nytår, velkomst og konfirmation — 0 % sparkling først.",
    [HUB],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "bedste-alkoholfri-champagne", label: "Alkoholfri champagne" }],
    OCCASION.filter((l) => l.slug !== "alkoholfri-bobler-til-nytaar").slice(0, 3),
  ),
  "alkoholfri-vin-til-flaesketeg": alkoholfriBlock(
    ["alkoholfri-vin-til-flaesketeg"],
    "Alkoholfri til mad",
    "Flæskesteg og simreretter uden alkohol — syre før tannin.",
    [HUB],
    [{ slug: "vin-til-flaesketesteg", label: "Vin til flæskesteg (med alkohol)" }],
    [{ slug: "alkoholfri-vin-til-jul", label: "Alkoholfri vin til jul" }],
    [{ slug: "bedste-alkoholfri-rodvin", label: "Alkoholfri rødvin" }],
    BY_TYPE.slice(0, 3),
  ),
  "alkoholfri-vin-til-jul": alkoholfriBlock(
    ["alkoholfri-vin-til-jul"],
    "Alkoholfri til jul og hygge",
    "Gløgg-alternativ, bobler til julefrokost og madparring uden alkohol.",
    [HUB],
    BY_TYPE,
    [{ slug: "vin-til-julemad-den-store-guide", label: "Vin til julemad" }],
    OCCASION.filter((l) => l.slug !== "alkoholfri-vin-til-jul").slice(0, 2),
  ),
  "alkoholfri-vin-til-brunch": alkoholfriBlock(
    ["alkoholfri-vin-til-brunch"],
    "Alkoholfri til brunch",
    "Mimosa uden alkohol — bobler og frisk hvid til morgenmad.",
    [HUB],
    [{ slug: "alkoholfri-mimosa", label: "Alkoholfri mimosa" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "bedste-alkoholfri-hvidvin", label: "Bedste alkoholfri hvidvin" }],
    [{ slug: "bobler-til-brunch", label: "Bobler til brunch (med alkohol)" }],
  ),
  "alkoholfri-mimosa": alkoholfriBlock(
    ["alkoholfri-mimosa"],
    "Alkoholfri mimosa og brunch",
    "0 % bobler til juice — samme fest i glasset uden promille.",
    [HUB],
    [{ slug: "alkoholfri-vin-til-brunch", label: "Alkoholfri vin til brunch" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "bobler-til-brunch", label: "Bobler til brunch (med alkohol)" }],
  ),
  "alkoholfri-asti": alkoholfriBlock(
    ["alkoholfri-asti"],
    "Sød 0 % og alkoholfri Asti",
    "Moscato-stil uden alkohol — til kage, ikke til østers.",
    [HUB],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "alkoholfri-mimosa", label: "Alkoholfri mimosa" }],
    [{ slug: "soede-bobler", label: "Søde bobler (med alkohol)" }],
  ),
  "alkoholfri-vin-til-dry-january": alkoholfriBlock(
    ["alkoholfri-vin-til-dry-january"],
    "Alkoholfri i Dry January",
    "0 % der stadig føles som vin — ikke saft i festglas.",
    [HUB],
    BY_TYPE,
    [{ slug: "mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no" }],
  ),
  "alkoholfri-vin-til-graviditet": alkoholfriBlock(
    ["alkoholfri-vin-til-graviditet"],
    "Alkoholfri under graviditet",
    "0 % til skål og middag — bobler og hvid bærer bedst.",
    [HUB],
    BY_TYPE.slice(0, 3),
    [{ slug: "hvordan-fremstilles-alkoholfri-vin", label: "Hvordan fremstilles alkoholfri vin" }],
  ),

  // Indgående links fra høj-trafik-sider til cluster
  "vin-til-sushi": alkoholfriBlock(
    [],
    "Alkoholfri alternativ til sushi",
    "Tør hvid og bobler uden alkohol matcher sushi og sashimi — se de dedikerede 0 %-guider.",
    [{ slug: "bedste-alkoholfri-hvidvin", label: "Alkoholfri hvidvin til sushi" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Alkoholfri bobler til sashimi" }],
    [HUB],
  ),
  "vin-til-nytaar-og-nytaarsmenu": alkoholfriBlock(
    [],
    "Alkoholfri til nytår",
    "Skål og kransekage uden promille — premium sparkling og bobler.",
    [{ slug: "bedste-alkoholfri-champagne", label: "Alkoholfri champagne og sparkling" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [HUB],
  ),
  "bobler-til-brunch": alkoholfriBlock(
    [],
    "Alkoholfri bobler til brunch",
    "Mimosa og velkomstbobler uden alkohol — samme fest i glasset.",
    [{ slug: "alkoholfri-mimosa", label: "Alkoholfri mimosa" }],
    [{ slug: "alkoholfri-vin-til-brunch", label: "Alkoholfri vin til brunch" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [HUB],
  ),
  "vin-og-overgangsalder-histamin": alkoholfriBlock(
    [],
    "Alkoholfri og lavalkohol",
    "Mange oplever bedre tolerance med 0 % bobler, frisk hvid og lavalkohol.",
    [HUB],
    [{ slug: "bedste-alkoholfri-hvidvin", label: "Bedste alkoholfri hvidvin" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
  ),
  "vin-trends-og-forbrug-i-danmark": alkoholfriBlock(
    [],
    "Alkoholfri vin i Danmark",
    "Kategorien vokser hurtigt — her er de guides vi opdaterer løbende.",
    [HUB],
    BY_TYPE,
    [{ slug: "hvordan-fremstilles-alkoholfri-vin", label: "Hvordan fremstilles alkoholfri vin" }],
  ),
  "vin-til-pakkeleg": alkoholfriBlock(
    [],
    "Alkoholfri gaver og pakkeleg",
    "Inkluder gæster der ikke drikker — bobler og hvid i 0 % føles stadig festligt.",
    [{ slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [HUB],
  ),
  "bobler-champagne-cava-prosecco-og-cremant": alkoholfriBlock(
    [],
    "Alkoholfri bobler",
    "Champagne, cava og prosecco har 0 %-pendanter — se de bedste mousserende uden alkohol.",
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "bedste-alkoholfri-champagne", label: "Alkoholfri champagne og sparkling" }],
    [HUB],
  ),
  "vin-til-studenterfest": alkoholfriBlock(
    [],
    "Alkoholfri til studenterfest",
    "Skål for alle — bobler og hvid i 0 % til blandet selskab.",
    [{ slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [HUB],
  ),

  // Mad & vin-klynge
  "komplet-guide-til-vin-og-mad": madBlock(
    ["komplet-guide-til-vin-og-mad"],
    "Vin og mad — populære guider",
    "Dyk ned i konkrete retter og stilarter fra den store madguide.",
    MAD_FISK,
    MAD_KOED,
    MAD_DANSK,
    MAD_SAESON,
    MAD_OST,
    [{ slug: "vin-til-asiatisk-mad", label: "Vin til asiatisk mad" }],
  ),
  "vin-til-ost-og-ostebord": madBlock(
    ["vin-til-ost-og-ostebord"],
    "Ost og ostebord — relaterede guider",
    "Danske oste, supermarkedskurv og én flaske til hele brættet.",
    [MAD_HUB],
    MAD_OST,
  ),
  "vin-til-gammel-knas": madBlock(
    ["vin-til-gammel-knas"],
    "Ost og ostebord — relaterede guider",
    "Gammel Knas ved siden af Vesterhavsost, hård ost og kompromis-vinen.",
    [MAD_HUB],
    MAD_OST,
  ),
  "vin-til-vesterhavsost": madBlock(
    ["vin-til-vesterhavsost"],
    "Ost og ostebord — relaterede guider",
    "Vesterhavsost, Gammel Knas og sherry til lagret dansk ost.",
    [MAD_HUB],
    MAD_OST,
  ),
  "vin-til-hele-ostebordet": madBlock(
    ["vin-til-hele-ostebordet"],
    "Ost og ostebord — relaterede guider",
    "Én flaske til brættet — plus de danske ostesider.",
    [MAD_HUB],
    MAD_OST,
  ),
  "vin-til-supermarkedets-ostebord": madBlock(
    ["vin-til-supermarkedets-ostebord"],
    "Ost og ostebord — relaterede guider",
    "Castello, brie og danablu fra køledisken — og vin du kan søge live.",
    [MAD_HUB],
    MAD_OST,
    [SUPERMARKED_PILLAR],
  ),
  "hvorfor-smager-rodvin-grimt-til-ost": madBlock(
    ["hvorfor-smager-rodvin-grimt-til-ost"],
    "Ost og ostebord — relaterede guider",
    "Tannin vs. ost — og flasker der faktisk virker.",
    [MAD_HUB],
    MAD_OST,
  ),
  "vin-til-hard-ost": madBlock(
    ["vin-til-hard-ost"],
    "Ost og ostebord — relaterede guider",
    "Comté-logik plus danske hårde oste.",
    [MAD_HUB],
    MAD_OST,
  ),
  "vin-til-fisk-og-skaldyr": madBlock(
    ["vin-til-fisk-og-skaldyr"],
    "Fisk og skaldyr — relaterede guider",
    "Syre og mineralitet bærer fisk — se også sushi, laks og skaldyr-retter.",
    [MAD_HUB],
    MAD_FISK,
    [{ slug: "bedste-hvidvin", label: "Bedste hvidvin" }],
  ),
  "vin-til-ceviche": madBlock(
    ["vin-til-ceviche"],
    "Fisk og skaldyr — relaterede guider",
    "Lime, chili og rå fisk — se også stjerneskud, sushi og den brede fiskeguide.",
    [MAD_HUB],
    MAD_FISK,
  ),
  "vin-til-stjerneskud": madBlock(
    ["vin-til-stjerneskud"],
    "Dansk frokost og fisk",
    "Stjerneskud, rejer og smørrebrød — bobler og syrefuld hvid.",
    [MAD_HUB],
    MAD_DANSK,
    MAD_FISK.slice(0, 3),
  ),
  "vin-til-mac-and-cheese": madBlock(
    ["vin-til-mac-and-cheese"],
    "Comfort food og ost",
    "Mac and cheese, cheddar og amerikansk comfort — chardonnay og bobler.",
    [MAD_HUB],
    [{ slug: "vin-til-amerikansk-comfort-mad", label: "Amerikansk comfort" }],
    [{ slug: "vin-til-cheddar", label: "Vin til cheddar" }],
    [{ slug: "vin-til-nachos", label: "Vin til nachos" }],
    [{ slug: "bobler-champagne-cava-prosecco-og-cremant", label: "Bobler" }],
  ),
  "vin-til-skipperlabskovs": madBlock(
    ["vin-til-skipperlabskovs"],
    "Dansk vintermad",
    "Labskovs, gule ærter og gryder — rustik rød og tysk hvid.",
    [MAD_HUB],
    MAD_DANSK,
    [{ slug: "vin-til-gryderet", label: "Vin til gryderet" }],
    [{ slug: "vin-til-okseskank", label: "Vin til okseskank" }],
  ),
  "vin-til-gule-aerter": madBlock(
    ["vin-til-gule-aerter"],
    "Dansk vintermad",
    "Gule ærter, medister og skipperlabskovs — mormormad med vin.",
    [MAD_HUB],
    MAD_DANSK,
    [{ slug: "vin-til-medister", label: "Vin til medister" }],
    [{ slug: "vin-til-gryderet", label: "Vin til gryderet" }],
  ),
  "vin-til-okseskank": madBlock(
    ["vin-til-okseskank"],
    "Kød og braise",
    "Okseskank, gryderet og kraftig rød — Shiraz, Amarone og Rhône.",
    [MAD_HUB],
    MAD_KOED,
    [{ slug: "vin-til-oksekoed-i-sauce", label: "Oksekød i sauce" }],
    [{ slug: "amarone-vs-ripasso", label: "Amarone vs ripasso" }],
  ),
  "vin-til-grill-og-bbq": madBlock(
    ["vin-til-grill-og-bbq"],
    "Grill og BBQ — relaterede guider",
    "Kraftig rød, rosé og afkølet rød til grill — plus pizza og burger.",
    [MAD_HUB],
    MAD_KOED,
    [{ slug: "den-store-grillguide", label: "Den store grillguide (kul, gas, røg)" }],
    [{ slug: "afkoelt-roedvin", label: "Afkølet rødvin" }],
    [{ slug: "vin-til-burger", label: "Vin til burger" }],
  ),
  "den-store-grillguide": madBlock(
    ["den-store-grillguide"],
    "Grill — brændsel og mad",
    "Kul, gas og røg møder zinfandel, shiraz og fad-chardonnay — se også protein-guiden.",
    [MAD_HUB],
    [{ slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" }],
    [{ slug: "vin-til-grillet-gront", label: "Vin til grillet grønt" }],
    [{ slug: "rosevin-til-grill", label: "Rosévin til grill" }],
    [{ slug: "afkoelt-roedvin", label: "Afkølet rødvin" }],
    [{ slug: "vin-til-pulled-pork", label: "Vin til pulled pork" }],
    [{ slug: "alkoholfri-vin-til-grill", label: "Alkoholfri vin til grill" }],
  ),
  "vin-til-mexicansk-mad-og-tacos": madBlock(
    ["vin-til-mexicansk-mad-og-tacos"],
    "Mexicansk mad og tacos",
    "Jalapeño, lime og koriander — dyk ned i taco- eller mole-guiden efter ret.",
    [MAD_HUB],
    [{ slug: "vin-til-tacos", label: "Vin til tacos" }],
    [{ slug: "vin-til-mexicansk-mad", label: "Vin til mexicansk mad" }],
    [{ slug: "vin-til-krydret-og-staerk-mad", label: "Vin til krydret mad" }],
    [{ slug: "vin-til-ceviche", label: "Vin til ceviche" }],
    [{ slug: "afkoelt-roedvin", label: "Afkølet rødvin" }],
  ),
  "vin-til-vegetariske-og-veganske-retter": madBlock(
    ["vin-til-vegetariske-og-veganske-retter"],
    "Vegetar, vegan og grønt",
    "Svampe, linser og rodfrugter — plus vegansk vin-forklaring og sæsonguider.",
    [MAD_HUB],
    [{ slug: "vin-til-vegetar", label: "Vin til vegetar" }],
    [{ slug: "vin-til-vegetar-og-gront", label: "Vin til vegetar og grønt" }],
    [{ slug: "vin-til-risotto", label: "Vin til risotto" }],
    [{ slug: "pinot-noir-druen", label: "Pinot noir-druen" }],
    [{ slug: "hvidvin-uden-for-de-kendte-rammer", label: "Albariño, grüner og viognier" }],
  ),
  "bourgogne-vs-tyskland-pinot-noir": madBlock(
    ["bourgogne-vs-tyskland-pinot-noir"],
    "Pinot noir — Bourgogne og Tyskland",
    "Spätburgunder vs. Bourgogne: druen, regioner og mad til and.",
    [MAD_HUB],
    [{ slug: "pinot-noir-druen", label: "Pinot noir-druen" }],
    [{ slug: "pinot-noir-fra-bourgogne", label: "Pinot noir fra Bourgogne" }],
    [{ slug: "vinregion-tyskland", label: "Vinregion Tyskland" }],
    [{ slug: "vinregion-bourgogne", label: "Vinregion Bourgogne" }],
    [{ slug: "pinot-noir-til-and", label: "Pinot noir til and" }],
    [{ slug: "bedste-pinot-noir", label: "Bedste pinot noir" }],
  ),
  "hvidvin-uden-for-de-kendte-rammer": madBlock(
    ["hvidvin-uden-for-de-kendte-rammer"],
    "Hvidvin — tre oversete druer",
    "Albariño, grüner og viognier side om side med de kendte hverdagsdruer.",
    [MAD_HUB],
    [{ slug: "albarino-druen", label: "Albariño-druen" }],
    [{ slug: "gruener-veltliner-druen", label: "Grüner veltliner-druen" }],
    [{ slug: "viognier-druen", label: "Viognier-druen" }],
    [{ slug: "bedste-hvidvin", label: "Bedste hvidvin" }],
    [{ slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" }],
  ),
  "vin-til-graesk-mad": madBlock(
    ["vin-til-graesk-mad"],
    "Middelhavs-mad og vin",
    "Assyrtiko, rosé og let rød til græsk mad — se også feta og moussaka.",
    [MAD_HUB],
    [{ slug: "vin-til-feta", label: "Vin til feta" }],
    [{ slug: "vin-til-moussaka", label: "Vin til moussaka" }],
    [{ slug: "rosevin-til-mad-og-sommer", label: "Rosévin til sommer" }],
  ),
  "vin-til-asiatisk-mad": madBlock(
    ["vin-til-asiatisk-mad"],
    "Asiatisk mad og vin",
    "Riesling, gewürz og bobler til wok, curry og sushi.",
    [MAD_HUB],
    [{ slug: "vin-til-krydret-og-staerk-mad", label: "Vin til krydret mad" }],
    [{ slug: "vin-til-sushi", label: "Vin til sushi" }],
    [{ slug: "vin-til-pho", label: "Vin til pho" }],
    [{ slug: "vin-til-karryretter", label: "Vin til karry" }],
  ),
  "vin-til-julemad-den-store-guide": madBlock(
    ["vin-til-julemad-den-store-guide"],
    "Julemad og fest — relaterede guider",
    "And, flæskesteg og risalamande — planlæg vin til hele julefrokosten.",
    [MAD_HUB],
    [{ slug: "vin-til-julefrokost", label: "Vin til julefrokost" }],
    [{ slug: "alkoholfri-vin-til-jul", label: "Alkoholfri vin til jul" }],
    [{ slug: "vin-til-kransekage", label: "Vin til kransekage" }],
    [{ slug: "vin-til-dessert-og-kransekage", label: "Vin til dessert og kransekage" }],
  ),
  "vin-til-kransekage": madBlock(
    ["vin-til-kransekage"],
    "Dessert og fest — relaterede guider",
    "Kransekage er den skarpe intent — dessertguiden dækker resten af bordet.",
    [MAD_HUB],
    [{ slug: "vin-til-dessert-og-kransekage", label: "Vin til dessert og kransekage" }],
    [{ slug: "dansk-frugtvin-guide", label: "Dansk frugtvin" }],
    [{ slug: "vin-til-nytaar-og-nytaarsmenu", label: "Vin til nytår" }],
    [{ slug: "vin-til-risalamande", label: "Vin til risalamande" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Alkoholfri bobler til kransekage" }],
  ),
  "vin-til-dessert-og-kransekage": madBlock(
    ["vin-til-dessert-og-kransekage"],
    "Dessert og fest — relaterede guider",
    "Chokolade, tærter og kage — kransekage har egen guide.",
    [MAD_HUB],
    [{ slug: "vin-til-kransekage", label: "Vin til kransekage" }],
    [{ slug: "dansk-frugtvin-guide", label: "Dansk frugtvin" }],
    [{ slug: "vin-til-risalamande", label: "Vin til risalamande" }],
    [{ slug: "bedste-dessertvin", label: "Bedste dessertvin" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Alkoholfri bobler til kransekage" }],
  ),
  "vin-til-laks": madBlock(
    ["vin-til-laks"],
    "Fisk og skaldyr — flere guider",
    "Laks er fed fisk — se også den samlede fiskeguide og sushi.",
    [MAD_HUB],
    [{ slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" }],
    [{ slug: "vin-til-sushi", label: "Vin til sushi" }],
  ),
  "vin-til-boeff": madBlock(
    ["vin-til-boeff"],
    "Kød og grill — relaterede guider",
    "Bøf og oksekød hænger sammen med grill, burger og pizza.",
    [MAD_HUB],
    [{ slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" }],
    [{ slug: "rodvin-til-pizza", label: "Rødvin til pizza" }],
    [{ slug: "bedste-rodvin", label: "Bedste rødvin" }],
  ),
  "rodvin-til-pizza": madBlock(
    ["rodvin-til-pizza"],
    "Italiensk mad og vin",
    "Pizza, pasta og tapas — italienske rødvine og madguider.",
    [MAD_HUB],
    [{ slug: "vin-til-pizza", label: "Vin til pizza og pasta" }],
    [{ slug: "vin-til-lasagne", label: "Vin til lasagne" }],
    [{ slug: "vin-til-carbonara", label: "Vin til carbonara" }],
  ),
  "vin-til-stegt-flaesk": madBlock(
    ["vin-til-stegt-flaesk"],
    "Dansk mad og vin",
    "Klassiske danske retter og syre i glasset.",
    [MAD_HUB],
    MAD_DANSK,
    [{ slug: "vin-til-and", label: "Vin til and" }],
  ),
  "bedste-hvidvin": madBlock(
    [],
    "Hvidvin til mad",
    "Frisk hvid passer til fisk, salat og lette retter — se madguiderne.",
    [MAD_HUB],
    MAD_FISK.slice(0, 3),
    [{ slug: "vin-til-brunch", label: "Vin til brunch" }],
  ),
  "bedste-rodvin": madBlock(
    [],
    "Rødvin til mad",
    "Match rødvin med kød, sauce og struktur på tallerkenen.",
    [MAD_HUB],
    MAD_KOED,
    [{ slug: "afkoelt-roedvin", label: "Afkølet rødvin" }],
  ),
  "bedste-rosevin": madBlock(
    [],
    "Rosé til mad og sommer",
    "Terrasse, grill og lette retter — rosé er madvenlig hele året.",
    [MAD_HUB],
    [{ slug: "rosevin-til-mad-og-sommer", label: "Rosévin til mad og sommer" }],
    [{ slug: "vin-til-grill-og-bbq", label: "Vin til grill" }],
    [{ slug: "bedste-sommervin", label: "Bedste sommervin" }],
  ),

  // Vin-viden-klynge (holdbarhed, mængder, temperatur)
  "opbevaring-af-vin-temperatur-og-aabnet-flaske": videnBlock(
    ["opbevaring-af-vin-temperatur-og-aabnet-flaske"],
    "Vin-viden — holdbarhed og mængder",
    "Temperatur hænger sammen med holdbarhed — se også genstande, flaskestørrelser og lagring.",
    VIDEN_HOLD.slice(0, 5),
    VIDEN_MAENGDER.slice(0, 4),
  ),
  "hvor-mange-enheder-alkohol-i-et-glas-vin": videnBlock(
    ["hvor-mange-enheder-alkohol-i-et-glas-vin"],
    "Vin-viden — mængder og holdbarhed",
    "Genstande og ml hænger sammen med glasstørrelse og flaske — flere praktiske svar.",
    [VIN_VIDEN_PILLAR],
    VIDEN_MAENGDER.filter((l) => l.slug !== "hvor-mange-enheder-alkohol-i-et-glas-vin"),
    VIDEN_HOLD.slice(0, 3),
  ),
  "hvor-meget-fylder-en-flaske-vin": videnBlock(
    ["hvor-meget-fylder-en-flaske-vin"],
    "Vin-viden — flaske og glas",
    "750 ml, magnum og glas pr. flaske — se også genstande og alkoholprocent.",
    [VIN_VIDEN_PILLAR],
    VIDEN_MAENGDER.filter((l) => !["hvor-meget-fylder-en-flaske-vin"].includes(l.slug)),
    VIDEN_HOLD.slice(0, 2),
  ),
  "hvor-laenge-holder-boks-vin": papvinBlock(
    ["hvor-laenge-holder-boks-vin"],
    "Papvin holder længere åbnet — se også 3 L-omregning, udløbsdato og temperatur.",
  ),
  "hvor-mange-flasker-i-en-3-liter-papvin": papvinBlock(
    ["hvor-mange-flasker-i-en-3-liter-papvin"],
    "3 liter = 4 flasker. Brug det til fest-mængde, literpris og holdbarhed.",
  ),
  "hvor-meget-papvin-til-fest": papvinBlock(
    ["hvor-meget-papvin-til-fest"],
    "Gæster til bokse — plus glas i 3 L og bedste papvin til volumen.",
  ),
  "papvin-vs-flaske-pris": papvinBlock(
    ["papvin-vs-flaske-pris"],
    "Literpris hænger sammen med budget-boks, klima og pilaren om bedste papvin.",
  ),
  "bedste-papvin-under-150-kr": papvinBlock(
    ["bedste-papvin-under-150-kr"],
    "Budget-hverdag — sammenlign literpris og se også rosé på boks.",
  ),
  "temperatur-guide-papvin": papvinBlock(
    ["temperatur-guide-papvin"],
    "Køl og sommervarme — se holdbarhed, udløbsdato og camping-logik.",
  ),
  "hvorfor-har-papvin-udloebsdato": papvinBlock(
    ["hvorfor-har-papvin-udloebsdato"],
    "Posen vs. glas: ilt, best-before og hvor længe åbnet boks holder.",
  ),
  "bedste-rose-paa-boks": papvinBlock(
    ["bedste-rose-paa-boks"],
    "Rosé i karton til sæson — plus temperatur, holdbarhed og bedste papvin.",
  ),
  "papvin-co2-og-klima": papvinBlock(
    ["papvin-co2-og-klima"],
    "Vægt vs. glas — se literpris og hvorfor boksen har udløbsdato.",
  ),
  "bedste-box-vin": papvinBlock(
    ["bedste-box-vin"],
    "Pilar for papvin — 3 L, fest, pris, sæson og de praktiske hacks.",
  ),
  "papvin-til-reception": papvinBlock(
    ["papvin-til-reception"],
    "Hvid eller rød til velkomst — plus mængde, karaffel og premium-boks.",
  ),
  "papvin-15-og-225-liter": papvinBlock(
    ["papvin-15-og-225-liter"],
    "Mindre bokse til weekend — se camping, literpris og 3 L-omregning.",
  ),
  "premium-papvin": papvinBlock(
    ["premium-papvin"],
    "Dyrere boks vs. budget — smag, øko og hvorfor flasken kan smage anderledes.",
  ),
  "papvin-myter-hovedpine": papvinBlock(
    ["papvin-myter-hovedpine"],
    "Rus og tømmermænd — se genstande, smagsforskel og holdbarhed.",
  ),
  "okologisk-og-naturvin-paa-boks": papvinBlock(
    ["okologisk-og-naturvin-paa-boks"],
    "Øko-logo på karton vs. sjælden naturvin — plus klima og premium.",
  ),
  "hvorfor-smager-papvin-anderledes": papvinBlock(
    ["hvorfor-smager-papvin-anderledes"],
    "Pose, svovl og ilt — se udløbsdato, myter og premium-boks.",
  ),
  "papvin-til-sommerhus-og-camping": papvinBlock(
    ["papvin-til-sommerhus-og-camping"],
    "Transport og varme — små bokse, temperatur og skiferie.",
  ),
  "glogg-paa-papvin": papvinBlock(
    ["glogg-paa-papvin"],
    "Billig rød som base — budget-boks, frost-rester og holdbarhed.",
  ),
  "papvin-til-skiferie": papvinBlock(
    ["papvin-til-skiferie"],
    "Kraftig rød i hytten — tagboks, frost og grænsehandel.",
  ),
  "kan-man-fryse-papvin": papvinBlock(
    ["kan-man-fryse-papvin"],
    "Isterninger til mad — tøm posen, holdbarhed og gløgg-rest.",
  ),
  "sadan-tommer-du-papvin": papvinBlock(
    ["sadan-tommer-du-papvin"],
    "Vip eller tag posen ud — plus frost og camping.",
  ),
  "papvin-graensehandel-tyskland": papvinBlock(
    ["papvin-graensehandel-tyskland"],
    "Tysk bulk vs. danske priser — literpris, temperatur og fest-mængde.",
  ),
  "papvin-bedst-i-test": papvinBlock(
    ["papvin-bedst-i-test"],
    "Ingen fake lab-vinder — se rød, hvid, tilbud og pilaren.",
  ),
  "bedste-rod-papvin": papvinBlock(
    ["bedste-rod-papvin"],
    "Rød 3 L til hverdag og fest — plus test-metode, tilbud og gløgg.",
  ),
  "bedste-hvid-papvin": papvinBlock(
    ["bedste-hvid-papvin"],
    "Tør hvid i karton — reception, temperatur og rød/rosé ved siden af.",
  ),
  "papvin-tilbud": papvinBlock(
    ["papvin-tilbud"],
    "Live kampagner vs. før-pris — budget, grænse og literpris.",
  ),
  "papvin-5-liter": papvinBlock(
    ["papvin-5-liter"],
    "Den store boks til volume — 3 L-omregning, fest og små formater.",
  ),
  "hvor-laenge-holder-uaabnet-vin": videnBlock(
    ["hvor-laenge-holder-uaabnet-vin"],
    "Vin-viden — uåbnet og lagring",
    "Hverdagsvin vs. lagringsvine — se også rødvin, boks og om vin kan blive dårlig.",
    [VIN_VIDEN_PILLAR],
    VIDEN_HOLD.filter((l) => l.slug !== "hvor-laenge-holder-uaabnet-vin").slice(0, 5),
    [{ slug: "hvor-laenge-kan-vin-lagres", label: "Hvor længe kan vin lagres" }],
  ),
  "hvor-laenge-holder-aabnet-vin": videnBlock(
    ["hvor-laenge-holder-aabnet-vin"],
    "Vin-viden — åbnet vin",
    "Køleskab og prop forlænger glasset — se rødvin, hvidvin og bobler hver for sig.",
    [VIN_VIDEN_PILLAR],
    [
      { slug: "aabnet-vin-holdbarhed-og-snydetricks", label: "Teskeer, pumper og snydetricks" },
      { slug: "hvor-laenge-holder-rodvin", label: "Hvor længe holder rødvin" },
      { slug: "hvor-laenge-holder-hvidvin", label: "Hvor længe holder hvidvin" },
      { slug: "hvor-laenge-holder-boks-vin", label: "Hvor længe holder papvin" },
      { slug: "hvor-laenge-holder-vin-i-karaffel", label: "Holdbarhed i karaffel" },
    ],
  ),
  "aabnet-vin-holdbarhed-og-snydetricks": videnBlock(
    ["aabnet-vin-holdbarhed-og-snydetricks"],
    "Åbnet vin — holdbarhed og gear",
    "Myter vs. metoder: køl, vakuum, Coravin og champagneprop.",
    [VIN_VIDEN_PILLAR],
    [
      { slug: "hvor-laenge-holder-aabnet-vin", label: "Hvor længe holder åbnet vin" },
      { slug: "sadan-holder-du-aabnet-vin-frisk", label: "Sådan holder du åbnet vin frisk" },
      { slug: "hvor-laenge-holder-rodvin", label: "Hvor længe holder rødvin" },
      { slug: "hvor-laenge-holder-bobler-og-champagne", label: "Hvor længe holder bobler" },
      { slug: "kan-vin-blive-daarlig", label: "Kan vin blive dårlig" },
    ],
  ),
  "glas-guiden": videnBlock(
    ["glas-guiden"],
    "Vinglas og servering",
    "Universalglas vs. specialglas — se også den tekniske glas-guide og begynder-gear.",
    [VIN_VIDEN_PILLAR],
    [
      { slug: "sadan-vaelger-du-vinglas", label: "Sådan vælger du vinglas" },
      { slug: "sadan-serverer-du-vin", label: "Sådan serverer du vin" },
      { slug: "vintilbehor-til-begyndere", label: "Vintilbehør til begyndere" },
      { slug: "sadan-vaelger-du-vinkaraffel", label: "Sådan vælger du vinkaraffel" },
      { slug: "isspand-og-flaskekoeler-vin", label: "Isspand og flaskekøler" },
    ],
  ),
  "chillable-reds": videnBlock(
    ["chillable-reds"],
    "Afkølet rødvin / chillable reds",
    "Trenden med let rød serveret køligt — praktisk guide og sommer-mad.",
    [VIN_VIDEN_PILLAR],
    [
      { slug: "afkoelt-roedvin", label: "Afkølet rødvin (fuld guide)" },
      { slug: "gamay-druen", label: "Gamay-druen" },
      { slug: "pinot-noir-druen", label: "Pinot noir-druen" },
      { slug: "vin-til-sommer", label: "Vin til sommer" },
      { slug: "opbevaring-af-vin-temperatur-og-aabnet-flaske", label: "Temperatur i °C" },
    ],
  ),
  "pet-nat-for-begyndere": videnBlock(
    ["pet-nat-for-begyndere"],
    "Pét-nat og naturvin-bobler",
    "Begynder-guide til ancestrale bobler — se også den tekniske pét-nat-artikel.",
    [
      { slug: "hvad-er-pet-nat", label: "Hvad er pét-nat?" },
      { slug: "naturvin-hvad-er-det", label: "Hvad er naturvin?" },
      { slug: "bobler-champagne-cava-prosecco-og-cremant", label: "Bobler: champagne, cava, crémant" },
      { slug: "cremant-vs-champagne", label: "Crémant vs. champagne" },
      { slug: "hvad-er-orange-vin", label: "Hvad er orangevin?" },
    ],
  ),
  "italiensk-vin-jungle": videnBlock(
    ["italiensk-vin-jungle"],
    "Italiensk rødvin — lynkursus",
    "Barolo til Amarone: dyk videre i Ripasso-sammenligning og regioner.",
    [
      { slug: "amarone-vs-ripasso", label: "Amarone vs. Ripasso" },
      { slug: "nebbiolo-fra-barolo", label: "Nebbiolo fra Barolo" },
      { slug: "bedste-italiensk-rodvin", label: "Bedste italiensk rødvin" },
      { slug: "vinregion-italien", label: "Vinregion Italien" },
      { slug: "vin-til-italiensk-mad", label: "Vin til italiensk mad" },
      { slug: "vin-begreber-i-praksis", label: "Vinbegreber i praksis" },
    ],
  ),
  "hvor-laenge-holder-rodvin": videnBlock(
    ["hvor-laenge-holder-rodvin"],
    "Vin-viden — rødvin holdbarhed",
    "Åbnet og uåbnet rødvin — temperatur, lagring og tegn på dårlig flaske.",
    [VIN_VIDEN_PILLAR],
    VIDEN_HOLD.filter((l) => l.slug !== "hvor-laenge-holder-rodvin").slice(0, 4),
    VIDEN_MAENGDER.slice(0, 2),
  ),
  "hvor-laenge-kan-vin-lagres": videnBlock(
    ["hvor-laenge-kan-vin-lagres"],
    "Vin-viden — lagring",
    "Hvornår hverdagsvin skal drikkes — og hvornår lagring giver mening.",
    [VIN_VIDEN_PILLAR],
    [
      { slug: "hvor-laenge-holder-uaabnet-vin", label: "Hvor længe holder uåbnet vin" },
      { slug: "kan-roedvin-blive-for-gammel", label: "Kan rødvin blive for gammel" },
      { slug: "kan-vin-blive-daarlig", label: "Kan vin blive dårlig" },
    ],
  ),
  "kan-vin-blive-daarlig": videnBlock(
    ["kan-vin-blive-daarlig"],
    "Vin-viden — fejl og holdbarhed",
    "Kork, oxidation og opbevaring — se også temperatur og lagring.",
    [VIN_VIDEN_PILLAR],
    VIDEN_HOLD.filter((l) => l.slug !== "kan-vin-blive-daarlig").slice(0, 4),
  ),
  "hvor-mange-kalorier-i-vin": [
    alkoholfriBlock(
      [],
      "Færre kalorier i glasset",
      "Alkoholfri vin har typisk færre kalorier end fuld styrke — se overblikket.",
      [HUB],
      [{ slug: "bedste-alkoholfri-hvidvin", label: "Alkoholfri hvidvin" }],
      [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
    ),
    videnBlock(
      ["hvor-mange-kalorier-i-vin"],
      "Vin-viden — kalorier og alkohol",
      "Kalorier følger alkohol og sukker — se genstande, glas og flaskestørrelser.",
      [VIN_VIDEN_PILLAR],
      VIDEN_MAENGDER.filter((l) => l.slug !== "hvor-mange-kalorier-i-vin"),
    ),
  ],
  "hvor-meget-vin-til-fest": videnBlock(
    ["hvor-meget-vin-til-fest"],
    "Vin-viden — mængder til fest",
    "½–1 flaske per gæst — se bryllup, genstande og glas pr. flaske.",
    [VIN_VIDEN_PILLAR],
    VIDEN_FEST.filter((l) => l.slug !== "hvor-meget-vin-til-fest"),
    VIDEN_MAENGDER.slice(0, 3),
  ),
  "hvor-meget-vin-til-bryllup": [
    alkoholfriBlock(
      [],
      "Alkoholfri til bryllup",
      "Planlæg 0 % bobler og hvid til gæster der ikke drikker — typisk 10–20 % af flaskerne.",
      [{ slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" }],
      [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
      [HUB],
    ),
    videnBlock(
      ["hvor-meget-vin-til-bryllup"],
      "Vin-viden — mængder til fest",
      "Flasker per gæst hænger sammen med genstande og glas — flere praktiske beregninger.",
      [VIN_VIDEN_PILLAR],
      VIDEN_FEST.filter((l) => l.slug !== "hvor-meget-vin-til-bryllup"),
      VIDEN_MAENGDER.slice(0, 3),
    ),
  ],
  "maa-man-aabne-vaertsgaven-vin": videnBlock(
    ["maa-man-aabne-vaertsgaven-vin"],
    "Gæst, vært og gaver",
    "Etikette, crowdpleaser-backup og budget-gaver — praktisk før middagen.",
    [VIN_VIDEN_PILLAR],
    [{ slug: "crowdpleaser-vin-til-gaester", label: "Crowdpleaser til gæster" }],
    [{ slug: "bedste-vaertindegave-vin", label: "Bedste værtindegave" }],
    [{ slug: "gavevin-50-150-500-kr", label: "Gavevin 50 / 150 / 500 kr" }],
    [{ slug: "bedste-vin-til-gave", label: "Bedste vin til gave" }],
  ),
  "crowdpleaser-vin-til-gaester": videnBlock(
    ["crowdpleaser-vin-til-gaester"],
    "Værtens sikre valg",
    "Backup-flasker til blandet selskab — plus etikette og mængde.",
    [VIN_VIDEN_PILLAR],
    [{ slug: "maa-man-aabne-vaertsgaven-vin", label: "Må man åbne værtsgaven?" }],
    [{ slug: "hvor-meget-vin-til-fest", label: "Hvor meget vin til fest" }],
    [{ slug: "gavevin-50-150-500-kr", label: "Gavevin 50 / 150 / 500 kr" }],
    VIDEN_FEST,
  ),
  "gavevin-50-150-500-kr": videnBlock(
    ["gavevin-50-150-500-kr"],
    "Gavevin — budget og anledninger",
    "Fra pakkeleg til stor fødselsdag — og gaver til vinkyndige.",
    [{ slug: "bedste-vin-til-gave", label: "Bedste vin til gave" }],
    [{ slug: "vin-til-vinkyndig-gave", label: "Vin til vinkyndig gave" }],
    [{ slug: "bedste-vaertindegave-vin", label: "Bedste værtindegave" }],
    [{ slug: "vin-til-pakkeleg", label: "Vin til pakkeleg" }],
    [{ slug: "bedste-julegavevin", label: "Bedste julegavevin" }],
  ),
  "vin-og-olie-vaertsgave": videnBlock(
    ["vin-og-olie-vaertsgave"],
    "Gave — flaske, gear og olie",
    "Værtsgave uden fake-pakke: vin ét sted, olie eller gear et andet.",
    OIL_GIFT,
    OIL_LEXIKON.slice(0, 1),
    [{ slug: "bedste-vin-til-gave", label: "Bedste vin til gave" }],
    [{ slug: "bedste-vaertindegave-vin", label: "Bedste værtindegave" }],
    [{ slug: "vin-gave-gear", label: "Vin-gave gear" }],
    [{ slug: "gavevin-50-150-500-kr", label: "Gavevin 50 / 150 / 500 kr" }],
  ),
  "vaertindegave-olivenolie": videnBlock(
    ["vaertindegave-olivenolie"],
    "Olie-gaver og værtinde",
    "Under 250 kr i pæn flaske — eller vin ved siden af, ærligt to shops.",
    OIL_GIFT,
    OIL_LEXIKON.slice(0, 1),
    [{ slug: "bedste-vaertindegave-vin", label: "Bedste værtindegave i vin" }],
    [{ slug: "bedste-vin-til-gave", label: "Bedste vin til gave" }],
    [{ slug: "gavevin-50-150-500-kr", label: "Gavevin 50 / 150 / 500 kr" }],
  ),
  "olivenolie-gave-fars-dag": videnBlock(
    ["olivenolie-gave-fars-dag"],
    "Fars dag — grill, vin og olie",
    "Olie til den madglade far, og vinen til 5. juni.",
    OIL_GIFT,
    OIL_LEXIKON.slice(0, 1),
    [{ slug: "vin-til-fars-dag", label: "Vin til fars dag" }],
    [{ slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" }],
    [{ slug: "vin-gave-gear", label: "Vin-gave gear" }],
  ),
  "olivenolie-gave-mors-dag": videnBlock(
    ["olivenolie-gave-mors-dag"],
    "Mors dag — brunch, vin og olie",
    "Finish-olie til køkkenet, bobler til glasset.",
    OIL_GIFT,
    OIL_LEXIKON.slice(0, 1),
    [{ slug: "vin-til-mors-dag", label: "Vin til mors dag" }],
    [{ slug: "vin-til-brunch", label: "Vin til brunch" }],
    [{ slug: "bedste-vaertindegave-vin", label: "Bedste værtindegave i vin" }],
  ),
  "olivenolie-julegave": videnBlock(
    ["olivenolie-julegave"],
    "Julegave — olie, vin og firmagave",
    "Luksusflaske uden herregård — og julegavevin hvis glasset skal med.",
    OIL_GIFT,
    OIL_LEXIKON.slice(0, 1),
    [{ slug: "bedste-julegavevin", label: "Bedste julegavevin" }],
    [{ slug: "vin-til-julemad-den-store-guide", label: "Vin til julemad" }],
    [{ slug: "bedste-vin-til-gave", label: "Bedste vin til gave" }],
  ),
  "olivenolie-finish": videnBlock(
    ["olivenolie-finish"],
    "Finish-olie og italiensk mad",
    "Én ske olie på tallerkenen — og vinen der passer til tomat, pizza og dessert.",
    OIL_LEXIKON,
    OIL_GIFT,
    [{ slug: "vin-til-mozzarella-og-burrata", label: "Vin til mozzarella og burrata" }],
    [{ slug: "vin-til-pizza", label: "Vin til pizza" }],
    [{ slug: "vin-til-dessert-og-kransekage", label: "Vin til dessert" }],
    [{ slug: "vin-til-italiensk-mad", label: "Vin til italiensk mad" }],
  ),
  "hvad-er-ekstra-jomfru-olivenolie": videnBlock(
    ["hvad-er-ekstra-jomfru-olivenolie"],
    "Olie-Leksikon",
    "Extra virgin, falsk olie og hvorfor kvalitet kradser — plus finish når flasken skal bruges.",
    OIL_LEXIKON,
    OIL_GIFT.slice(0, 3),
  ),
  "falsk-olivenolie": videnBlock(
    ["falsk-olivenolie"],
    "Olie-Leksikon",
    "Spot fake EVOO, lær klassen, og dryp den ægte flaske på maden.",
    OIL_LEXIKON,
    OIL_GIFT.slice(0, 3),
  ),
  "olivenolie-sundhed": videnBlock(
    ["olivenolie-sundhed"],
    "Olie-Leksikon",
    "Polyfenoler og halskrads — og den finish, der gør flasken værd at købe.",
    OIL_LEXIKON,
    OIL_GIFT.slice(0, 3),
  ),
  "vin-til-vinkyndig-gave": videnBlock(
    ["vin-til-vinkyndig-gave"],
    "Gaver til vinkyndige",
    "Niche frem for prestige — se også budget-stige og værtindegave.",
    [{ slug: "gavevin-50-150-500-kr", label: "Gavevin 50 / 150 / 500 kr" }],
    [{ slug: "bedste-vin-til-gave", label: "Bedste vin til gave" }],
    [{ slug: "bedste-vaertindegave-vin", label: "Bedste værtindegave" }],
    [{ slug: "crowdpleaser-vin-til-gaester", label: "Crowdpleaser til gæster" }],
  ),
  "hovedpine-af-roedvin": [
    alkoholfriBlock(
      [],
      "Alternativ til rødvin",
      "Oplever du hovedpine af tung rød? Prøv lavalkohol, rosé afkølet eller alkoholfri bobler.",
      [HUB],
      [{ slug: "bedste-alkoholfri-rodvin", label: "Bedste alkoholfri rødvin" }],
      [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
      [{ slug: "mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no" }],
    ),
    videnBlock(
      [],
      "Vin-viden — temperatur og sulfit",
      "Histamin, temperatur og opbevaring påvirker oplevelsen — praktiske svar.",
      [VIN_VIDEN_PILLAR],
      [{ slug: "vin-og-overgangsalder-histamin", label: "Vin og histamin" }],
      [{ slug: "hvad-er-sulfit-i-vin", label: "Hvad er sulfit i vin" }],
      [{ slug: "afkoelt-roedvin", label: "Afkølet rødvin" }],
    ),
  ],
  "hvad-er-hedvin": hedvinBlock(
    ["hvad-er-hedvin"],
    "Hedvin — hele klyngen",
    "Port, sherry, madeira og vermouth — start med typen eller alkoholprocent.",
    HEDVIN_TYPES,
    HEDVIN_VIDEN,
    HEDVIN_PORT.slice(0, 4),
  ),
  "hedvin-alkoholprocent": hedvinBlock(
    ["hedvin-alkoholprocent"],
    "Hedvin — relaterede guider",
    "15–22 % i kontekst: hvad hedvin er, og hvordan port og sherry adskiller sig.",
    [HEDVIN_PILLAR],
    HEDVIN_TYPES,
    [{ slug: "portvin-alkoholprocent", label: "Portvin alkoholprocent" }],
  ),
  "hvad-er-madeira-vin": hedvinBlock(
    ["hvad-er-madeira-vin"],
    "Hedvin — relaterede guider",
    "Madeira side om side med port, sherry og det generelle hedvin-overblik.",
    [HEDVIN_PILLAR],
    HEDVIN_TYPES.filter((l) => l.slug !== "hvad-er-madeira-vin"),
    HEDVIN_VIDEN,
  ),
  "hvad-er-vermouth": hedvinBlock(
    ["hvad-er-vermouth"],
    "Hedvin — relaterede guider",
    "Vermouth som aromatiseret hedvin — se også sherry til aperitif og cocktails.",
    [HEDVIN_PILLAR],
    HEDVIN_TYPES.filter((l) => l.slug !== "hvad-er-vermouth"),
    [{ slug: "hedvin-alkoholprocent", label: "Hedvin alkoholprocent" }],
  ),
  "hvad-er-portvin": hedvinBlock(
    ["hvad-er-portvin"],
    "Hedvin & portvin",
    "Port i hedvin-familien — typer, servering og køb.",
    [HEDVIN_PILLAR],
    HEDVIN_PORT,
    HEDVIN_TYPES.filter((l) => l.slug !== "hvad-er-portvin").slice(0, 3),
  ),
  "hvad-er-sherry-vin": hedvinBlock(
    ["hvad-er-sherry-vin"],
    "Hedvin & sherry",
    "Sherry i hedvin-familien — sammenlign med port, madeira og vermouth.",
    [HEDVIN_PILLAR],
    HEDVIN_TYPES.filter((l) => l.slug !== "hvad-er-sherry-vin"),
    HEDVIN_VIDEN,
  ),
  "bedste-portvin": hedvinBlock(
    ["bedste-portvin"],
    "Portvin-klyngen",
    "Køb, typer og mad — plus det bredere hedvin-overblik.",
    [HEDVIN_PILLAR],
    HEDVIN_PORT.filter((l) => l.slug !== "bedste-portvin"),
    [{ slug: "hvad-er-portvin", label: "Hvad er portvin?" }],
  ),
  "hvad-er-isvin": videnBlock(
    ["hvad-er-isvin"],
    "Isvin & dessertvin",
    "Eiswein og Icewine i kontekst — dessertvin, riesling, Mosel og Canada.",
    [{ slug: "bedste-dessertvin", label: "Bedste dessertvin" }],
    [{ slug: "riesling-druen", label: "Riesling-druen" }],
    [{ slug: "vinregion-mosel", label: "Vinregion Mosel" }],
    [{ slug: "vin-til-dessert-og-kransekage", label: "Vin til dessert" }],
    [{ slug: "hvad-er-syre-i-vin", label: "Hvad er syre i vin" }],
    [{ slug: "hvad-er-restsukker-i-vin", label: "Hvad er restsukker" }],
  ),
  "sadan-vaelger-du-vinglas": videnBlock(
    ["sadan-vaelger-du-vinglas"],
    "Vinglas-klyngen",
    "Form, rød, hvid, bobler og mærker — plus karaffel og servering.",
    VIDEN_GLAS.filter((l) => l.slug !== "sadan-vaelger-du-vinglas"),
  ),
  "sadan-vaelger-du-roedvinsglas": videnBlock(
    ["sadan-vaelger-du-roedvinsglas"],
    "Rødvinsglas & vinglas",
    "Bourgogne, Bordeaux og mærker — se også hvid og champagne.",
    VIDEN_GLAS.filter((l) => l.slug !== "sadan-vaelger-du-roedvinsglas"),
  ),
  "sadan-vaelger-du-hvidvinsglas": videnBlock(
    ["sadan-vaelger-du-hvidvinsglas"],
    "Hvidvinsglas & vinglas",
    "Volumen, stilk og aroma — plus rød, bobler og mærker.",
    VIDEN_GLAS.filter((l) => l.slug !== "sadan-vaelger-du-hvidvinsglas"),
  ),
  "sadan-vaelger-du-champagneglas": videnBlock(
    ["sadan-vaelger-du-champagneglas"],
    "Champagneglas & vinglas",
    "Flute, tulip og hvidvinsglas til bobler — plus resten af glas-klyngen.",
    VIDEN_GLAS.filter((l) => l.slug !== "sadan-vaelger-du-champagneglas"),
  ),
  "riedel-vs-zalto-vs-spiegelau-vinglas": videnBlock(
    ["riedel-vs-zalto-vs-spiegelau-vinglas"],
    "Vinglas-mærker",
    "Riedel, Zalto, Spiegelau og Holmegaard i kontekst med form-guides.",
    VIDEN_GLAS.filter((l) => l.slug !== "riedel-vs-zalto-vs-spiegelau-vinglas"),
  ),
};
