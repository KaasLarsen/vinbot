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
    id: "lasagne",
    label: "Lasagne",
    emoji: "🍝",
    searchQuery: "vin til lasagne barbera chianti",
    fallbackStyle: "Barbera, Chianti Classico eller Sangiovese",
    guideSlug: "vin-til-lasagne",
    matchSlugs: ["vin-til-lasagne", "vin-til-bolognese", "vin-til-pizza-og-pasta"],
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
    id: "mac-and-cheese",
    label: "Mac and cheese",
    emoji: "🧀",
    searchQuery: "vin til mac and cheese chardonnay cava",
    fallbackStyle: "fadlagret Chardonnay eller tør cava",
    guideSlug: "vin-til-mac-and-cheese",
    matchSlugs: ["vin-til-mac-and-cheese", "vin-til-amerikansk-comfort-mad", "vin-til-cheddar"],
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
    id: "ceviche",
    label: "Ceviche",
    emoji: "🍋",
    searchQuery: "vin til ceviche sauvignon blanc riesling",
    fallbackStyle: "Sauvignon Blanc, tør Riesling eller Albariño",
    guideSlug: "vin-til-ceviche",
    matchSlugs: ["vin-til-ceviche", "vin-til-fisk-og-skaldyr", "vin-til-peruviansk-mad"],
  },
  {
    id: "stjerneskud",
    label: "Stjerneskud",
    emoji: "🌟",
    searchQuery: "vin til stjerneskud riesling cava",
    fallbackStyle: "tør Riesling, Albariño eller cava",
    guideSlug: "vin-til-stjerneskud",
    matchSlugs: ["vin-til-stjerneskud", "vin-til-rejer", "vin-til-smorrebrod"],
  },
  {
    id: "skipperlabskovs",
    label: "Skipperlabskovs",
    emoji: "🍲",
    searchQuery: "vin til skipperlabskovs cotes du rhone",
    fallbackStyle: "Côtes du Rhône, primitivo eller tør Riesling",
    guideSlug: "vin-til-skipperlabskovs",
    matchSlugs: ["vin-til-skipperlabskovs", "vin-til-gryderet", "vin-til-gule-aerter"],
  },
  {
    id: "gule-aerter",
    label: "Gule ærter",
    emoji: "🟡",
    searchQuery: "vin til gule ærter medister riesling",
    fallbackStyle: "Côtes du Rhône eller tør tysk Riesling",
    guideSlug: "vin-til-gule-aerter",
    matchSlugs: ["vin-til-gule-aerter", "vin-til-medister", "vin-til-skipperlabskovs"],
  },
  {
    id: "okseskank",
    label: "Braiseret okseskank",
    emoji: "🥩",
    searchQuery: "vin til okseskank shiraz amarone",
    fallbackStyle: "Shiraz, Amarone eller lagret Rhône",
    guideSlug: "vin-til-okseskank",
    matchSlugs: ["vin-til-okseskank", "vin-til-oksekoed-i-sauce", "vin-til-gryderet"],
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
  {
    id: "brie",
    label: "Brie",
    emoji: "🧀",
    searchQuery: "cava cremant chablis pinot noir",
    fallbackStyle: "Cava, crémant eller let pinot noir",
    guideSlug: "vin-til-brie-og-camembert",
    matchSlugs: ["vin-til-brie-og-camembert"],
  },
  {
    id: "vesterhavsost",
    label: "Vesterhavsost / Gammel Knas",
    emoji: "🧀",
    searchQuery: "amontillado sherry rioja tawny portvin",
    fallbackStyle: "Amontillado, rioja reserva eller tawny",
    guideSlug: "vin-til-vesterhavsost",
    matchSlugs: ["vin-til-vesterhavsost", "vin-til-gammel-knas", "vin-til-hard-ost"],
  },
  {
    id: "blaaskimmel",
    label: "Blåskimmel",
    emoji: "🧀",
    searchQuery: "tawny portvin LBV sauternes",
    fallbackStyle: "Tawny, LBV-port eller Sauternes",
    guideSlug: "vin-til-blaaskimmelost",
    matchSlugs: ["vin-til-blaaskimmelost", "portvin-til-ost"],
  },
  {
    id: "ostebord",
    label: "Hele ostebordet",
    emoji: "🧀",
    searchQuery: "riesling tawny portvin beaujolais",
    fallbackStyle: "Off-dry riesling, tawny eller cru Beaujolais",
    guideSlug: "vin-til-hele-ostebordet",
    matchSlugs: [
      "vin-til-hele-ostebordet",
      "vin-til-ost-og-ostebord",
      "vin-til-supermarkedets-ostebord",
      "hvorfor-smager-rodvin-grimt-til-ost",
    ],
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

export function foodPickerSearchHref(
  dish: FoodPickerDish,
  budget: FoodPickerBudget,
  alcoholFree = false,
): string {
  const q = alcoholFree ? `${dish.searchQuery} alkoholfri 0%` : dish.searchQuery;
  const params = new URLSearchParams({ q });
  if (budget.max != null) params.set("max", String(Math.round(budget.max)));
  if (budget.min != null) params.set("min", String(Math.ceil(budget.min)));
  return `/?${params.toString()}`;
}
