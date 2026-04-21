import { listGuides, getGuideWordCount, type GuideFrontmatter } from "@/lib/content/guides";
import { matchDrueRegionSlug } from "@/lib/guide-intent";
import { MIN_INDEXABLE_WORDS } from "@/lib/content/thresholds";

export type GuideCategory = "mad" | "druer" | "regioner" | "bedste" | "viden" | "andre";

const VIDEN_PREFIXES = [
  "hvor-laenge-",
  "hvor-mange-",
  "hvor-meget-",
  "hvad-er-",
  "hvordan-",
  "sadan-",
] as const;
const VIDEN_SLUGS = new Set<string>(["kan-vin-blive-daarlig"]);

/** Slugs som bevist hører til mad-hubben selvom de ikke starter med "vin-til-". */
const MAD_EXTRA_SLUGS = new Set<string>([
  "komplet-guide-til-vin-og-mad",
  "rosevin-til-mad-og-sommer",
]);

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
  "gavevin-sadan-vaelger-du-den-rigtige-flaske",
  "alkoholsvag-og-alkoholfri-vin",
  "bobler-champagne-cava-prosecco-og-cremant",
  "naturvin-hvad-er-det",
  "vinkoleskabe-sadan-vaelger-du",
]);

export function classifyGuide(slug: string): GuideCategory {
  if (slug.endsWith("-druen")) return "druer";
  if (matchDrueRegionSlug(slug)) return "druer";
  if (slug.startsWith("vinregion-")) return "regioner";
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

/** Returner true, hvis guiden er tynd nok til at blive `noindex` og udeladt af sitemap. */
export function isThinGuide(slug: string): boolean {
  return getGuideWordCount(slug) < MIN_INDEXABLE_WORDS;
}

/** Guides i en kategori som også er indexerbare (ikke tynde). Brugt af sitemap-routerne. */
export function indexableGuidesByCategory(cat: GuideCategory): GuideFrontmatter[] {
  return guidesByCategory(cat).filter((g) => !isThinGuide(g.slug));
}
