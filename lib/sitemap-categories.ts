import { listGuides, isThinGuide, type GuideFrontmatter } from "@/lib/content/guides";
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
  "vin-tiktok-trends-spicy-sauvy-og-vineddike",
  "orangevin-for-begyndere",
  "vin-marketing-tricks-forbruger-guide",
  "hurtig-koeling-vin-is-salt-10-minutter",
  "vivino-app-til-vin-anmeldelser",
  "hvilken-vin-til-madlavning-sovs",
]);

/** Slugs som bevist hører til mad-hubben selvom de ikke starter med "vin-til-". */
const MAD_EXTRA_SLUGS = new Set<string>([
  "komplet-guide-til-vin-og-mad",
  "rosevin-til-mad-og-sommer",
  "hverdags-bobler",
  "vin-til-asiatisk-takeaway-dumplings-sushi-ramen",
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
  "bobler-champagne-cava-prosecco-og-cremant",
  "naturvin-hvad-er-det",
  "vinkoleskabe-sadan-vaelger-du",
]);

export function classifyGuide(slug: string): GuideCategory {
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

/** Guides i en kategori som også er indexerbare (ikke tynde). Brugt af sitemap-routerne. */
export function indexableGuidesByCategory(cat: GuideCategory): GuideFrontmatter[] {
  return guidesByCategory(cat).filter((g) => !isThinGuide(g.slug));
}
