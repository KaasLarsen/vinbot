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
  { slug: "alkoholfri-vin-til-jul", label: "Alkoholfri vin til jul" },
  { slug: "alkoholfri-vin-til-brunch", label: "Alkoholfri vin til brunch" },
  { slug: "alkoholfri-vin-til-dry-january", label: "Alkoholfri vin til Dry January" },
  { slug: "alkoholfri-vin-til-graviditet", label: "Alkoholfri vin under graviditet" },
];

const VIDEN: GuideClusterLink[] = [
  { slug: "hvordan-fremstilles-alkoholfri-vin", label: "Hvordan fremstilles alkoholfri vin" },
  { slug: "alkoholsvag-og-alkoholfri-vin", label: "Alkoholsvag og alkoholfri vin" },
  {
    slug: "hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin",
    label: "Alkoholfri vs. alkoholsvag vin",
  },
  { slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" },
  { slug: "mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no" },
];

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

const MAD_HUB: GuideClusterLink = {
  slug: "komplet-guide-til-vin-og-mad",
  label: "Komplet guide til vin og mad",
};

const MAD_FISK: GuideClusterLink[] = [
  { slug: "vin-til-fisk-og-skaldyr", label: "Vin til fisk og skaldyr" },
  { slug: "vin-til-laks", label: "Vin til laks" },
  { slug: "vin-til-sushi", label: "Vin til sushi" },
  { slug: "vin-til-rejer", label: "Vin til rejer" },
];

const MAD_KOED: GuideClusterLink[] = [
  { slug: "vin-til-boeff", label: "Vin til bøf og oksekød" },
  { slug: "vin-til-kylling-og-lyst-koed", label: "Vin til kylling" },
  { slug: "vin-til-grill-og-bbq", label: "Vin til grill og BBQ" },
  { slug: "rodvin-til-pizza", label: "Rødvin til pizza" },
];

const MAD_DANSK: GuideClusterLink[] = [
  { slug: "vin-til-stegt-flaesk", label: "Vin til stegt flæsk" },
  { slug: "vin-til-smorrebrod", label: "Vin til smørrebrød" },
  { slug: "vin-til-tarteletter", label: "Vin til tarteletter" },
];

const MAD_SAESON: GuideClusterLink[] = [
  { slug: "vin-til-julemad-den-store-guide", label: "Vin til julemad" },
  { slug: "vin-til-nytaar-og-nytaarsmenu", label: "Vin til nytår" },
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
  { slug: "hvor-meget-alkohol-i-vin", label: "Alkoholprocent i vin" },
  { slug: "hvor-mange-kalorier-i-vin", label: "Kalorier i vin" },
];

const VIDEN_FEST: GuideClusterLink[] = [
  { slug: "hvor-meget-vin-til-bryllup", label: "Hvor meget vin til bryllup" },
  { slug: "hvor-meget-vin-til-fest", label: "Hvor meget vin til fest" },
];

function videnBlock(
  exclude: string[],
  title: string,
  intro: string,
  ...groups: GuideClusterLink[][]
): GuideClusterBlock {
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups), tone: "amber" };
}

/** Synlige klynge-links på guide-sider — styrker intern linking. */
export const GUIDE_CLUSTER_LINKS: Record<string, GuideClusterBlock | GuideClusterBlock[]> = {
  "bedste-alkoholfri-vin": alkoholfriBlock(
    ["bedste-alkoholfri-vin"],
    "Alkoholfri vin — hele klyngen",
    "Vælg efter type, anledning eller baggrund — alle guider hænger sammen om 0 % og lavalkohol.",
    BY_TYPE,
    OCCASION,
    VIDEN,
  ),
  "bedste-alkoholfri-hvidvin": alkoholfriBlock(
    ["bedste-alkoholfri-hvidvin"],
    "Alkoholfri vin — relaterede guider",
    "Hvidvin er stærkest i 0 %-klassen. Se også bobler, rosé og overblikket.",
    [HUB],
    BY_TYPE,
    OCCASION.slice(0, 3),
    VIDEN.slice(0, 3),
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
    "Rød uden alkohol er sværest — sammenlign med rosé og bobler før du køber.",
    [HUB],
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
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
    [{ slug: "bedste-alkoholfri-hvidvin", label: "Bedste alkoholfri hvidvin" }],
    [{ slug: "bobler-til-brunch", label: "Bobler til brunch (med alkohol)" }],
    [{ slug: "vin-til-brunch", label: "Vin til brunch" }],
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
  "vin-til-dessert-og-kransekage": alkoholfriBlock(
    [],
    "Alkoholfri til dessert og kransekage",
    "Demi-sec og mousserende 0 % til kage — match sødmen i glasset.",
    [{ slug: "bedste-alkoholfri-bobler", label: "Alkoholfri bobler til kransekage" }],
    [{ slug: "bedste-alkoholfri-champagne", label: "Alkoholfri sparkling til fest" }],
    [HUB],
  ),
  "bobler-til-brunch": alkoholfriBlock(
    [],
    "Alkoholfri bobler til brunch",
    "Mimosa og velkomstbobler uden alkohol — samme fest i glasset.",
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
    [{ slug: "vin-til-ost-og-ostebord", label: "Vin til ostebord" }],
    [{ slug: "vin-til-asiatisk-mad", label: "Vin til asiatisk mad" }],
  ),
  "vin-til-fisk-og-skaldyr": madBlock(
    ["vin-til-fisk-og-skaldyr"],
    "Fisk og skaldyr — relaterede guider",
    "Syre og mineralitet bærer fisk — se også sushi, laks og skaldyr-retter.",
    [MAD_HUB],
    MAD_FISK,
    [{ slug: "bedste-hvidvin", label: "Bedste hvidvin" }],
  ),
  "vin-til-grill-og-bbq": madBlock(
    ["vin-til-grill-og-bbq"],
    "Grill og BBQ — relaterede guider",
    "Kraftig rød, rosé og afkølet rød til grill — plus pizza og burger.",
    [MAD_HUB],
    MAD_KOED,
    [{ slug: "afkoelt-roedvin", label: "Afkølet rødvin" }],
    [{ slug: "vin-til-burger", label: "Vin til burger" }],
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
    [{ slug: "vin-til-dessert-og-kransekage", label: "Vin til dessert og kransekage" }],
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
  "hvor-laenge-holder-boks-vin": videnBlock(
    ["hvor-laenge-holder-boks-vin"],
    "Vin-viden — holdbarhed",
    "Papvin holder længere åbnet — sammenlign med flaske, karaffel og lagring.",
    [VIN_VIDEN_PILLAR],
    VIDEN_HOLD.filter((l) => l.slug !== "hvor-laenge-holder-boks-vin").slice(0, 5),
    VIDEN_MAENGDER.slice(0, 2),
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
      { slug: "hvor-laenge-holder-rodvin", label: "Hvor længe holder rødvin" },
      { slug: "hvor-laenge-holder-hvidvin", label: "Hvor længe holder hvidvin" },
      { slug: "hvor-laenge-holder-boks-vin", label: "Hvor længe holder papvin" },
      { slug: "hvor-laenge-holder-vin-i-karaffel", label: "Holdbarhed i karaffel" },
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
};
