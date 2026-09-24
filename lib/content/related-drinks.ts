import { getDrinkMetaList } from "@/lib/content/drinks";
import type { DrinkMeta } from "@/lib/content/drink-types";
import { classifyDrinkStyle, classifyDrinkWine } from "@/lib/drink-browse";

const NOISE_TAGS = new Set(["drink", "cocktail", "drik"]);

export type RelatedDrinkCard = {
  slug: string;
  title: string;
  description: string;
};

function meaningfulTags(tags: string[] = []): string[] {
  return tags.map((t) => t.toLowerCase()).filter((t) => !NOISE_TAGS.has(t));
}

function resolveBySlugs(slugs: string[], excludeSlug: string): RelatedDrinkCard[] {
  const bySlug = new Map(getDrinkMetaList().map((d) => [d.slug, d]));
  const out: RelatedDrinkCard[] = [];
  for (const slug of slugs) {
    if (slug === excludeSlug) continue;
    const d = bySlug.get(slug);
    if (!d) continue;
    out.push({ slug: d.slug, title: d.title, description: d.description });
  }
  return out;
}

function scoreDrink(
  candidate: DrinkMeta,
  tagSet: Set<string>,
  sourceWine: ReturnType<typeof classifyDrinkWine>,
  sourceStyle: ReturnType<typeof classifyDrinkStyle>,
): number {
  const candTags = meaningfulTags(candidate.tags);
  let score = candTags.filter((t) => tagSet.has(t)).length;
  if (classifyDrinkWine(candidate.tags) === sourceWine) score += 1;
  if (classifyDrinkStyle(candidate.tags) === sourceStyle) score += 1;
  return score;
}

/**
 * Relaterede drinks til “Flere drinks”-blok.
 * Curated `relatedDrinks` vinder; ellers tag-overlap + wine/style-boost.
 */
export function getRelatedDrinks({
  excludeSlug,
  tags = [],
  relatedDrinks,
  limit = 5,
}: {
  excludeSlug: string;
  tags?: string[];
  relatedDrinks?: string[];
  limit?: number;
}): RelatedDrinkCard[] {
  if (relatedDrinks?.length) {
    return resolveBySlugs(relatedDrinks, excludeSlug).slice(0, limit);
  }

  const all = getDrinkMetaList().filter((d) => d.slug !== excludeSlug);
  const tagSet = new Set(meaningfulTags(tags));
  const sourceWine = classifyDrinkWine(tags);
  const sourceStyle = classifyDrinkStyle(tags);

  const scored = all
    .map((d) => ({
      d,
      score: scoreDrink(d, tagSet, sourceWine, sourceStyle),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.d.title.localeCompare(b.d.title, "da"))
    .slice(0, limit)
    .map((x) => ({
      slug: x.d.slug,
      title: x.d.title,
      description: x.d.description,
    }));

  if (scored.length) return scored;

  return all.slice(0, limit).map((d) => ({
    slug: d.slug,
    title: d.title,
    description: d.description,
  }));
}
