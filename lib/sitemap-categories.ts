import { isOlieLeksikonGuide, listGuides, type GuideFrontmatter } from "@/lib/content/guides";
import { matchDrueRegionSlug } from "@/lib/guide-intent";

export type GuideCategory = "mad" | "druer" | "regioner" | "bedste" | "viden" | "andre";

const VIDEN_PREFIXES = [
  "hvor-laenge-",
  "hvor-mange-",
  "hvor-meget-",
  "hvad-er-",
  "hvordan-",
  "sadan-",
] as const;
const VIDEN_SLUGS = new Set<string>([
  "afkoelt-roedvin",
  "kan-vin-blive-daarlig",
  "vin-gode-koeb-regioner",
  "vin-swap-underdog-regioner",
  "mindful-drikke-low-no-alkohol",
  "smager-alkoholfri-vin-godt",
  "kalorier-i-alkoholfri-vin",
  "kalorier-i-alkoholfri-hvidvin",
  "vin-tiktok-trends-spicy-sauvy-og-vineddike",
  "orangevin-for-begyndere",
  "vin-marketing-tricks-forbruger-guide",
  "hurtig-koeling-vin-is-salt-10-minutter",
  "isspand-og-flaskekoeler-vin",
  "hvordan-aabner-du-vin-uden-proptreakker",
  "kan-roedvin-blive-for-gammel",
  "vivino-app-til-vin-anmeldelser",
  "hvilken-vin-til-madlavning-sovs",
  "temperatur-guide-papvin",
  "hvorfor-har-papvin-udloebsdato",
  "papvin-co2-og-klima",
  "papvin-vs-flaske-pris",
  "papvin-myter-hovedpine",
  "hvorfor-smager-papvin-anderledes",
  "kan-man-fryse-papvin",
  "papvin-5-liter",
  "tor-alkoholfri-hvidvin",
  "halvtor-og-soed-alkoholfri-hvidvin",
  "alkoholfri-frizzante-hvidvin",
  "alkoholfri-hvidvin-med-fadlagring",
  "okologisk-og-biodynamisk-alkoholfri-hvidvin",
  "holdbarhed-aabnet-alkoholfri-hvidvin",
  "serveringstemperatur-alkoholfri-hvidvin",
  "alkoholfri-hvidvin-til-gravide",
  "alkoholfri-riesling",
  "alkoholfri-sauvignon-blanc",
  "alkoholfri-chardonnay",
  "alkoholfri-pinot-grigio",
  "alkoholfri-gewurztraminer-og-muscat",
  "alkoholfri-pinot-noir",
  "ma-man-kore-efter-alkoholfri-vin",
  "alkoholfri-vin-sukker-og-diabetes",
]);

/** Slugs som bevist hører til mad-hubben selvom de ikke starter med "vin-til-". */
const MAD_EXTRA_SLUGS = new Set<string>([
  "komplet-guide-til-vin-og-mad",
  "rosevin-til-mad-og-sommer",
  "hverdags-bobler",
  "vin-til-asiatisk-takeaway-dumplings-sushi-ramen",
  "alkoholfri-bobler-til-nytaar",
  "alkoholfri-hvidvin-i-madlavning",
  "alkoholfri-gin-tonic-og-aperitif",
  "hvorfor-smager-rodvin-grimt-til-ost",
]);

/** Region-guides uden vinregion-*-prefix (fx Etna-dybde). */
const REGIONER_EXTRA_SLUGS = new Set<string>(["etna-vin-vulkanvin-sicilien"]);

/** Prefixer der markerer drue/stil × mad-intersections (Spor E). */
const MAD_EXTRA_PREFIXES: readonly string[] = [
  "rodvin-til-",
  "hvidvin-til-",
  "rosevin-til-",
  "bobler-til-",
  "champagne-til-",
  "prosecco-til-",
  "cava-til-",
  "pinot-noir-til-",
  "chardonnay-til-",
  "sauvignon-blanc-til-",
  "riesling-til-",
  "malbec-til-",
  "sangiovese-til-",
  "syrah-til-",
  "alkoholfri-vin-til-",
  "alkoholfri-hvidvin-til-",
];

/** Slugs som bevist hører til "andre" (vin i praksis, opbevaring, stemning etc.). */
const ANDRE_EXTRA_SLUGS = new Set<string>([
  "saesonvin-i-danmark",
  "humoer-stemning-og-vin",
  "vin-i-cocktails-spritz-og-drikke",
  "opbevaring-af-vin-temperatur-og-aabnet-flaske",
  "sadan-laeser-du-vinflaskens-etiket",
  "vin-begreber-i-praksis",
  "koeb-vin-online-sadan-holder-du-styr-paa-det",
  "vin-graensehandel-for-danskere",
  "gavevin-sadan-vaelger-du-den-rigtige-flaske",
  "alkoholsvag-og-alkoholfri-vin",
  "leitz-eins-zwei-zero",
  "torres-natureo",
  "noughty-alkoholfri-vin",
  "oddbird-alkoholfri-vin",
  "french-bloom-alkoholfri-vin",
  "alkoholfri-vin-i-netto-foetex",
  "bobler-champagne-cava-prosecco-og-cremant",
  "naturvin-hvad-er-det",
  "vinkoleskabe-sadan-vaelger-du",
]);

export function classifyGuide(slug: string): GuideCategory {
  if (isOlieLeksikonGuide(slug)) return "andre";
  if (slug.endsWith("-druen")) return "druer";
  if (matchDrueRegionSlug(slug)) return "druer";
  if (slug.startsWith("vinregion-") || REGIONER_EXTRA_SLUGS.has(slug)) return "regioner";
  if (slug.startsWith("bedste-")) return "bedste";
  if (ANDRE_EXTRA_SLUGS.has(slug)) return "andre";
  if (VIDEN_SLUGS.has(slug) || VIDEN_PREFIXES.some((p) => slug.startsWith(p))) return "viden";
  if (
    slug.startsWith("vin-til-") ||
    MAD_EXTRA_SLUGS.has(slug) ||
    MAD_EXTRA_PREFIXES.some((p) => slug.startsWith(p))
  ) {
    return "mad";
  }
  return "andre";
}

export function guidesByCategory(cat: GuideCategory): GuideFrontmatter[] {
  return listGuides().filter((g) => classifyGuide(g.slug) === cat);
}

/** Guides i en kategori. Brugt af sitemap-routerne. */
export function indexableGuidesByCategory(cat: GuideCategory): GuideFrontmatter[] {
  return guidesByCategory(cat);
}
