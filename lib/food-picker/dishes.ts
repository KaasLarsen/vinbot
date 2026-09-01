export type FoodPickerDish = {
  id: string;
  label: string;
  emoji: string;
  searchQuery: string;
  fallbackStyle: string;
  guideSlug: string;
  matchSlugs: string[];
};

export type FoodPickerBudgetId = "hverdag" | "weekend" | "gaester";

export type FoodPickerBudget = {
  id: FoodPickerBudgetId;
  label: string;
  hint: string;
  min: number | null;
  max: number | null;
};

export const FOOD_PICKER_BUDGETS: FoodPickerBudget[] = [
  { id: "hverdag", label: "Hverdag", hint: "Under 100 kr.", min: null, max: 99.99 },
  { id: "weekend", label: "Weekend", hint: "100–200 kr.", min: 100, max: 200 },
  { id: "gaester", label: "Gæster", hint: "Over 200 kr.", min: 200.01, max: null },
];

export const FOOD_PICKER_DISHES: FoodPickerDish[] = [
  {
    id: "pizza",
    label: "Pizza",
    emoji: "🍕",
    searchQuery: "vin til pizza",
    fallbackStyle: "saftig Grenache/Garnacha eller Barbera",
    guideSlug: "vin-til-pizza",
    matchSlugs: ["vin-til-pizza", "vin-til-pizza-og-pasta"],
  },
  {
    id: "pasta-tomat",
    label: "Pasta med tomat",
    emoji: "🍝",
    searchQuery: "vin til pasta bolognese",
    fallbackStyle: "Chianti, Sangiovese eller Barbera",
    guideSlug: "vin-til-bolognese",
    matchSlugs: ["vin-til-bolognese"],
  },
  {
    id: "pasta-floede",
    label: "Pasta med flødesovs",
    emoji: "🫕",
    searchQuery: "vin til pasta flødesovs carbonara",
    fallbackStyle: "Chardonnay, Soave eller Pinot Noir",
    guideSlug: "vin-til-carbonara",
    matchSlugs: ["vin-til-carbonara"],
  },
  {
    id: "burger",
    label: "Burger",
    emoji: "🍔",
    searchQuery: "vin til burger",
    fallbackStyle: "saftig Zinfandel, Malbec eller Syrah",
    guideSlug: "vin-til-burger",
    matchSlugs: ["vin-til-burger"],
  },
  {
    id: "sushi",
    label: "Sushi",
    emoji: "🍣",
    searchQuery: "vin til sushi",
    fallbackStyle: "tør Riesling, Pinot Gris eller Champagne",
    guideSlug: "vin-til-sushi",
    matchSlugs: ["vin-til-sushi"],
  },
  {
    id: "flaeskesteg",
    label: "Flæskesteg",
    emoji: "🐖",
    searchQuery: "vin til flæskesteg",
    fallbackStyle: "Pinot Noir, Bourgogne eller Côtes du Rhône",
    guideSlug: "vin-til-flaesketesteg",
    matchSlugs: ["vin-til-flaesketesteg"],
  },
  {
    id: "grill",
    label: "Grill",
    emoji: "🔥",
    searchQuery: "vin til grill bbq",
    fallbackStyle: "Shiraz, Malbec eller Zinfandel",
    guideSlug: "vin-til-grill-og-bbq",
    matchSlugs: ["vin-til-grill-og-bbq"],
  },
  {
    id: "fisk",
    label: "Fisk",
    emoji: "🐟",
    searchQuery: "vin til fisk",
    fallbackStyle: "Sauvignon Blanc, Riesling eller Albariño",
    guideSlug: "vin-til-fisk-og-skaldyr",
    matchSlugs: ["vin-til-fisk-og-skaldyr", "vin-til-laks", "vin-til-torsk"],
  },
  {
    id: "kylling",
    label: "Kylling",
    emoji: "🍗",
    searchQuery: "vin til kylling",
    fallbackStyle: "Chardonnay, Pinot Noir eller Riesling",
    guideSlug: "vin-til-kylling-og-lyst-koed",
    matchSlugs: ["vin-til-kylling-og-lyst-koed"],
  },
  {
    id: "boef",
    label: "Bøf",
    emoji: "🥩",
    searchQuery: "vin til bøf oksekød",
    fallbackStyle: "Cabernet Sauvignon, Malbec eller Bordeaux",
    guideSlug: "vin-til-oksekoed",
    matchSlugs: ["vin-til-oksekoed", "vin-til-oksefilet", "vin-til-ribeye", "vin-til-peberboef"],
  },
  {
    id: "tapas",
    label: "Tapas",
    emoji: "🫒",
    searchQuery: "vin til tapas",
    fallbackStyle: "Cava, Rioja eller Garnacha",
    guideSlug: "vin-til-tapas",
    matchSlugs: ["vin-til-tapas"],
  },
  {
    id: "vegetar",
    label: "Vegetar",
    emoji: "🥗",
    searchQuery: "vin til vegetar",
    fallbackStyle: "Rosé, Sauvignon Blanc eller Pinot Grigio",
    guideSlug: "vin-til-vegetar",
    matchSlugs: ["vin-til-vegetar", "vin-til-vegetar-og-gront"],
  },
];

export function getFoodPickerDish(id: string | null | undefined): FoodPickerDish | null {
  if (!id) return null;
  return FOOD_PICKER_DISHES.find((d) => d.id === id) ?? null;
}

export function getFoodPickerBudget(id: string | null | undefined): FoodPickerBudget | null {
  if (!id) return null;
  return FOOD_PICKER_BUDGETS.find((b) => b.id === id) ?? null;
}

export function dishIdForGuideSlug(slug: string): string | null {
  const exact = FOOD_PICKER_DISHES.find((d) => d.matchSlugs.includes(slug) || d.guideSlug === slug);
  return exact?.id ?? null;
}

export function foodPickerSearchHref(dish: FoodPickerDish, budget: FoodPickerBudget): string {
  const params = new URLSearchParams({ q: dish.searchQuery });
  if (budget.max != null) params.set("max", String(Math.round(budget.max)));
  if (budget.min != null) params.set("min", String(Math.ceil(budget.min)));
  return `/?${params.toString()}`;
}
