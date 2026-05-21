export type RecipeDifficulty = "easy" | "medium" | "hard";

export type RecipeWineInRecipe = {
  style: string;
  amount: string;
  /** Valgfri kort forklaring på hvorfor denne stil */
  note?: string;
};

export type RecipeWineToDrink = {
  /** Slug til /guides/[slug] parrings-guide */
  guideSlug?: string;
  searchQuery: string;
  searchMax?: number;
  label: string;
};

export type RecipeFrontmatter = {
  title: string;
  description: string;
  slug: string;
  updated?: string;
  published?: string;
  tags?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: RecipeDifficulty;
  wineInRecipe: RecipeWineInRecipe;
  wineToDrink: RecipeWineToDrink;
  relatedGuides?: string[];
  ingredients: string[];
  instructions: string[];
};

export type RecipeMeta = RecipeFrontmatter & {
  /** ISO-dato fra filens mtime hvis `updated` mangler */
  fallbackDate: string;
};

export type RecipeDoc = RecipeMeta & {
  content: string;
};
