export const RECIPE_RATING_KINDS = ["recipe", "drink"] as const;

export type RecipeRatingKind = (typeof RECIPE_RATING_KINDS)[number];

export type RecipeRatingSummary = {
  average: number | null;
  count: number;
};

export const EMPTY_RECIPE_RATING: RecipeRatingSummary = { average: null, count: 0 };

export function isRecipeRatingKind(value: unknown): value is RecipeRatingKind {
  return value === "recipe" || value === "drink";
}

export function recipeRatingPath(kind: RecipeRatingKind, slug: string): string {
  return kind === "drink" ? `/drinks/${slug}` : `/opskrifter/${slug}`;
}

export function recipeRatingCacheTag(kind: RecipeRatingKind, slug: string): string {
  return `recipe-rating:${kind}:${slug}`;
}

export function roundRating(average: number): number {
  return Math.round(average * 10) / 10;
}

export function summarizeRatings(ratings: number[]): RecipeRatingSummary {
  if (ratings.length === 0) return EMPTY_RECIPE_RATING;
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return { average: roundRating(sum / ratings.length), count: ratings.length };
}

/** Synlig tekst, samme tal som i Recipe-markup. */
export function formatRatingLabel(summary: RecipeRatingSummary): string {
  if (summary.count <= 0 || summary.average == null) return "Ingen anmeldelser";
  const value = summary.average.toFixed(1).replace(".", ",");
  const votes = summary.count === 1 ? "stemme" : "stemmer";
  return `${value} fra ${summary.count} ${votes}`;
}
