import { listGuides, type GuideFrontmatter } from "@/lib/content/guides";

export type GuideCategory = "mad" | "druer" | "regioner" | "andre";

/** Slugs som bevist hører til mad-hubben selvom de ikke starter med "vin-til-". */
const MAD_EXTRA_SLUGS = new Set<string>([
  "komplet-guide-til-vin-og-mad",
  "rosevin-til-mad-og-sommer",
]);

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
  if (slug.startsWith("vinregion-")) return "regioner";
  if (slug.startsWith("vin-til-") || MAD_EXTRA_SLUGS.has(slug)) return "mad";
  return "andre";
}

export function guidesByCategory(cat: GuideCategory): GuideFrontmatter[] {
  return listGuides().filter((g) => classifyGuide(g.slug) === cat);
}
