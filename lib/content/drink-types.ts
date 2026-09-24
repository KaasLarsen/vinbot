export type DrinkDifficulty = "easy" | "medium" | "hard";

export type DrinkWineInRecipe = {
  style: string;
  amount: string;
  note?: string;
};

export type DrinkWineToDrink = {
  guideSlug?: string;
  searchQuery: string;
  searchMax?: number;
  label: string;
};

export type DrinkFaqItem = {
  question: string;
  answer: string;
};

export type DrinkFrontmatter = {
  title: string;
  description: string;
  slug: string;
  updated?: string;
  published?: string;
  tags?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: DrinkDifficulty;
  /** Vin der indgår i drinken. */
  wineInRecipe: DrinkWineInRecipe;
  wineToDrink: DrinkWineToDrink;
  relatedGuides?: string[];
  /** Valgfri curated drink-slugs; ellers auto via tag-overlap. */
  relatedDrinks?: string[];
  ingredients: string[];
  instructions: string[];
  /** Struktureret FAQ til FAQPage JSON-LD. */
  faq?: DrinkFaqItem[];
};

export type DrinkMeta = DrinkFrontmatter & {
  fallbackDate: string;
};

export type DrinkDoc = DrinkMeta & {
  content: string;
};
