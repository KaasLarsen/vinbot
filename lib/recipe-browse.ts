import type { RecipeDifficulty, RecipeRole } from "@/lib/content/recipe-types";
import { recipeRoleLabel } from "@/lib/content/recipe-types";
import { recipeTotalMinutes } from "@/lib/recipe-format";

export type RecipeCardData = {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  tags?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: RecipeDifficulty;
  recipeRole: RecipeRole;
};

export type RecipeRoleFilter = "alle" | RecipeRole;
export type RecipeWineFilter = "alle" | "rod" | "hvid" | "port";
export type RecipeCuisineFilter = "alle" | "dansk" | "fransk" | "italiensk" | "spansk" | "schweizisk" | "andet";
export type RecipeDifficultyFilter = "alle" | RecipeDifficulty;
export type RecipeTimeFilter = "alle" | "hurtig" | "mellem" | "lang";

const ROLE_LABELS: Record<RecipeRoleFilter, string> = {
  alle: "Alle",
  cooking: recipeRoleLabel("cooking"),
  pairing: recipeRoleLabel("pairing"),
};

const WINE_LABELS: Record<RecipeWineFilter, string> = {
  alle: "Alle vintyper",
  rod: "Rødvin",
  hvid: "Hvidvin",
  port: "Port",
};

const WINE_CHIP_LABELS: Record<RecipeWineFilter, string> = {
  alle: "Alle",
  rod: "Rødvin",
  hvid: "Hvidvin",
  port: "Port",
};

const CUISINE_LABELS: Record<RecipeCuisineFilter, string> = {
  alle: "Alle køkkener",
  dansk: "Dansk",
  fransk: "Fransk",
  italiensk: "Italiensk",
  spansk: "Spansk",
  schweizisk: "Schweizisk",
  andet: "Andet",
};

const TIME_LABELS: Record<RecipeTimeFilter, string> = {
  alle: "Al tid",
  hurtig: "Under 1 time",
  mellem: "1–2 timer",
  lang: "Over 2 timer",
};

const DIFFICULTY_LABELS: Record<RecipeDifficultyFilter, string> = {
  alle: "Al sværhed",
  easy: "Let",
  medium: "Mellem",
  hard: "Svær",
};

export function roleFilterLabel(r: RecipeRoleFilter): string {
  return ROLE_LABELS[r];
}

export function wineFilterLabel(w: RecipeWineFilter): string {
  return WINE_LABELS[w];
}

export function wineChipLabel(w: RecipeWineFilter): string {
  return WINE_CHIP_LABELS[w];
}

export function cuisineFilterLabel(c: RecipeCuisineFilter): string {
  return CUISINE_LABELS[c];
}

export function timeFilterLabel(t: RecipeTimeFilter): string {
  return TIME_LABELS[t];
}

export function difficultyFilterLabel(d: RecipeDifficultyFilter): string {
  return DIFFICULTY_LABELS[d];
}

export function classifyRecipeWine(tags: string[] = []): Exclude<RecipeWineFilter, "alle"> {
  const t = tags.map((x) => x.toLowerCase());
  if (t.includes("portvin")) return "port";
  if (t.includes("rødvin")) return "rod";
  return "hvid";
}

export function classifyRecipeCuisine(tags: string[] = []): Exclude<RecipeCuisineFilter, "alle"> {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  if (t.has("dansk")) return "dansk";
  if (t.has("fransk")) return "fransk";
  if (t.has("italiensk")) return "italiensk";
  if (t.has("spansk")) return "spansk";
  if (t.has("schweizisk")) return "schweizisk";
  return "andet";
}

export function classifyRecipeTime(prep?: string, cook?: string): Exclude<RecipeTimeFilter, "alle"> {
  const total = recipeTotalMinutes(prep, cook);
  if (total == null) return "mellem";
  if (total <= 60) return "hurtig";
  if (total <= 120) return "mellem";
  return "lang";
}

export function recipeMatchesSearch(r: RecipeCardData, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const hay = `${r.title} ${r.description} ${r.slug} ${(r.tags || []).join(" ")}`.toLowerCase();
  return hay.includes(s);
}

/** Emne-tags til chips — springer generiske meta-tags over. */
export function topTagsForRecipes(recipes: RecipeCardData[], minCount = 2, max = 14): { tag: string; count: number }[] {
  const skip = new Set([
    "opskrift",
    "rødvin",
    "hvidvin",
    "portvin",
    "dansk",
    "fransk",
    "italiensk",
    "spansk",
    "schweizisk",
    "parring",
    "vin-til-maden",
  ]);
  const counts = new Map<string, number>();
  for (const r of recipes) {
    for (const raw of r.tags || []) {
      const t = raw.trim().toLowerCase();
      if (t.length < 2 || skip.has(t)) continue;
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .filter(([, n]) => n >= minCount)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "da"))
    .slice(0, max)
    .map(([tag, count]) => ({ tag, count }));
}

export function countRecipesByRole(recipes: RecipeCardData[]): Record<RecipeRoleFilter, number> {
  const c: Record<RecipeRoleFilter, number> = { alle: recipes.length, cooking: 0, pairing: 0 };
  for (const r of recipes) {
    c[r.recipeRole]++;
  }
  return c;
}

export function countRecipesByWine(recipes: RecipeCardData[]): Record<RecipeWineFilter, number> {
  const c: Record<RecipeWineFilter, number> = { alle: recipes.length, rod: 0, hvid: 0, port: 0 };
  for (const r of recipes) {
    c[classifyRecipeWine(r.tags)]++;
  }
  return c;
}

export function countRecipesByCuisine(recipes: RecipeCardData[]): Record<RecipeCuisineFilter, number> {
  const c: Record<RecipeCuisineFilter, number> = {
    alle: recipes.length,
    dansk: 0,
    fransk: 0,
    italiensk: 0,
    spansk: 0,
    schweizisk: 0,
    andet: 0,
  };
  for (const r of recipes) {
    c[classifyRecipeCuisine(r.tags)]++;
  }
  return c;
}

export function wineBadgeLabel(wine: Exclude<RecipeWineFilter, "alle">): string {
  const map = { rod: "Rødvin", hvid: "Hvidvin", port: "Port" } as const;
  return map[wine];
}

export { recipeRoleLabel };
