export type GuideClusterLink = { slug: string; label: string };

export type GuideClusterBlock = {
  clusterTitle: string;
  intro?: string;
  links: GuideClusterLink[];
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
  return { clusterTitle: title, intro, links: cluster(exclude, ...groups) };
}

/** Synlige klynge-links på guide-sider — styrker intern linking til alkoholfri-cluster. */
export const GUIDE_CLUSTER_LINKS: Record<string, GuideClusterBlock> = {
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
  "hovedpine-af-roedvin": alkoholfriBlock(
    [],
    "Alternativ til rødvin",
    "Oplever du hovedpine af tung rød? Prøv lavalkohol, rosé afkølet eller alkoholfri bobler.",
    [HUB],
    [{ slug: "bedste-alkoholfri-rodvin", label: "Bedste alkoholfri rødvin" }],
    [{ slug: "bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" }],
    [{ slug: "mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no" }],
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
  "hvor-mange-kalorier-i-vin": alkoholfriBlock(
    [],
    "Færre kalorier i glasset",
    "Alkoholfri vin har typisk færre kalorier end fuld styrke — se overblikket.",
    [HUB],
    [{ slug: "bedste-alkoholfri-hvidvin", label: "Alkoholfri hvidvin" }],
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
  "hvor-meget-vin-til-bryllup": alkoholfriBlock(
    [],
    "Alkoholfri til bryllup",
    "Planlæg 0 % bobler og hvid til gæster der ikke drikker — typisk 10–20 % af flaskerne.",
    [{ slug: "alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" }],
    [{ slug: "bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" }],
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
};
