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

export type RecipeHubFilterState = {
  q: string;
  role: RecipeRoleFilter;
  wine: RecipeWineFilter;
  cuisine: RecipeCuisineFilter;
  time: RecipeTimeFilter;
  tag: string | null;
};

export const EMPTY_RECIPE_HUB_FILTERS: RecipeHubFilterState = {
  q: "",
  role: "alle",
  wine: "alle",
  cuisine: "alle",
  time: "alle",
  tag: null,
};

const ROLE_VALUES = new Set<RecipeRoleFilter>(["alle", "cooking", "pairing"]);
const WINE_VALUES = new Set<RecipeWineFilter>(["alle", "rod", "hvid", "port"]);
const CUISINE_VALUES = new Set<RecipeCuisineFilter>([
  "alle",
  "dansk",
  "fransk",
  "italiensk",
  "spansk",
  "schweizisk",
  "andet",
]);
const TIME_VALUES = new Set<RecipeTimeFilter>(["alle", "hurtig", "mellem", "lang"]);

function pickFilter<T extends string>(raw: string | undefined | null, allowed: Set<T>, fallback: T): T {
  const v = (raw ?? "").trim().toLowerCase();
  return allowed.has(v as T) ? (v as T) : fallback;
}

export function parseRecipeHubSearchParams(params: {
  q?: string;
  role?: string;
  wine?: string;
  cuisine?: string;
  time?: string;
  tag?: string;
}): RecipeHubFilterState {
  const tag = (params.tag ?? "").trim().toLowerCase();
  return {
    q: (params.q ?? "").trim(),
    role: pickFilter(params.role, ROLE_VALUES, "alle"),
    wine: pickFilter(params.wine, WINE_VALUES, "alle"),
    cuisine: pickFilter(params.cuisine, CUISINE_VALUES, "alle"),
    time: pickFilter(params.time, TIME_VALUES, "alle"),
    tag: tag || null,
  };
}

export function buildRecipeHubHref(state: Partial<RecipeHubFilterState>, pathname = "/opskrifter"): string {
  const params = new URLSearchParams();
  const q = state.q?.trim() ?? "";
  if (q) params.set("q", q);
  if (state.role && state.role !== "alle") params.set("role", state.role);
  if (state.wine && state.wine !== "alle") params.set("wine", state.wine);
  if (state.cuisine && state.cuisine !== "alle") params.set("cuisine", state.cuisine);
  if (state.time && state.time !== "alle") params.set("time", state.time);
  if (state.tag) params.set("tag", state.tag);
  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export type RecipeHubIntent = {
  id: string;
  label: string;
  hint: string;
  filters: Partial<RecipeHubFilterState>;
};

export const RECIPE_HUB_INTENTS: RecipeHubIntent[] = [
  { id: "cooking", label: "Vin i gryden", hint: "Madlavning med vin", filters: { role: "cooking" } },
  { id: "pairing", label: "Vin til glasset", hint: "Opskrift + parring", filters: { role: "pairing" } },
  { id: "hurtig", label: "Hurtig hverdag", hint: "Under 1 time", filters: { time: "hurtig" } },
  { id: "dansk", label: "Dansk", hint: "Klassikere hjemmefra", filters: { cuisine: "dansk" } },
  { id: "fransk", label: "Fransk", hint: "Sauce og simreretter", filters: { cuisine: "fransk" } },
  { id: "italiensk", label: "Italiensk", hint: "Pasta, risotto, pizza", filters: { cuisine: "italiensk" } },
  { id: "fisk", label: "Fisk og skaldyr", hint: "Lettere retter", filters: { tag: "fisk" } },
  { id: "gryde", label: "Kødgryde", hint: "Simremad med vin", filters: { tag: "gryderet" } },
];

export function recipeHubIntentHref(intent: RecipeHubIntent): string {
  return buildRecipeHubHref(intent.filters);
}

export function recipeHubIntentIsActive(intent: RecipeHubIntent, state: RecipeHubFilterState): boolean {
  const f = intent.filters;
  if (f.role && f.role !== "alle" && state.role !== f.role) return false;
  if (f.wine && f.wine !== "alle" && state.wine !== f.wine) return false;
  if (f.cuisine && f.cuisine !== "alle" && state.cuisine !== f.cuisine) return false;
  if (f.time && f.time !== "alle" && state.time !== f.time) return false;
  if (f.tag && state.tag !== f.tag) return false;
  if (f.q && state.q.trim().toLowerCase() !== f.q.trim().toLowerCase()) return false;
  return Boolean(f.role || f.wine || f.cuisine || f.time || f.tag || f.q);
}

export const RECIPE_HUB_CLASSICS: { href: string; label: string }[] = [
  { href: "/opskrifter/flaesketesteg-med-rodvin-i-brun-sovs", label: "Flæskesteg med rødvin" },
  { href: "/opskrifter/juleand", label: "Juleand" },
  { href: "/opskrifter/coq-au-vin", label: "Coq au vin" },
  { href: "/opskrifter/boeuf-bourguignon", label: "Boeuf bourguignon" },
  { href: "/opskrifter/pizza-margherita", label: "Pizza margherita" },
  { href: "/opskrifter/klassisk-burger", label: "Klassisk burger" },
  { href: "/opskrifter/risotto-med-hvidvin", label: "Risotto med hvidvin" },
  { href: "/opskrifter/roedvinssauce-til-boef", label: "Rødvinssauce til bøf" },
  { href: "/opskrifter/roedkaal-med-rodvin", label: "Rødkål med rødvin" },
  { href: "/opskrifter/sauerbraten-med-rodvin", label: "Sauerbraten" },
  { href: "/opskrifter/chorizo-i-rodvin", label: "Chorizo i rødvin" },
  { href: "/opskrifter/bagt-camembert-med-hvidvin", label: "Bagt camembert" },
  { href: "/opskrifter/frikadeller-i-hvidvinsauce", label: "Frikadeller i hvidvinsauce" },
];

export { recipeRoleLabel };
