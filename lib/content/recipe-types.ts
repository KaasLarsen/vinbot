export type RecipeDifficulty = "easy" | "medium" | "hard";

/** Cooking = vin i retten; pairing = kun vin til glasset. */
export type RecipeRole = "cooking" | "pairing";

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
  /**
   * Eksplicit rolle. Hvis mangler: `cooking` når `wineInRecipe` findes, ellers `pairing`.
   */
  recipeRole?: RecipeRole;
  /** Vin der bruges i opskriften — påkrævet for cooking, udelades for pairing-only. */
  wineInRecipe?: RecipeWineInRecipe;
  wineToDrink: RecipeWineToDrink;
  relatedGuides?: string[];
  ingredients: string[];
  instructions: string[];
};

export type RecipeMeta = RecipeFrontmatter & {
  /** ISO-dato fra filens mtime hvis `updated` mangler */
  fallbackDate: string;
  /** Altid sat efter normalisering i loader */
  recipeRole: RecipeRole;
};

export type RecipeDoc = RecipeMeta & {
  content: string;
};

/** Afled rolle: eksplicit felt har forrang, ellers presence af wineInRecipe. */
export function resolveRecipeRole(fm: Pick<RecipeFrontmatter, "recipeRole" | "wineInRecipe">): RecipeRole {
  if (fm.recipeRole === "cooking" || fm.recipeRole === "pairing") return fm.recipeRole;
  return fm.wineInRecipe ? "cooking" : "pairing";
}

export function recipeRoleLabel(role: RecipeRole): string {
  return role === "cooking" ? "Vin i retten" : "Vin til maden";
}
