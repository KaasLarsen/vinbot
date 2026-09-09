import { FOOD_PICKER_BUDGETS, type FoodPickerBudgetId } from "../food-picker/dishes.ts";
import type { SeasonDish, SeasonEvent, SeasonRedStyle } from "../wine-quantity/season.ts";

export type SeasonMenuRoleId = "welcome" | "white" | "red" | "dessert";

export type SeasonMenuRole = {
  id: SeasonMenuRoleId;
  label: string;
  courseLabel: string;
  bottles: number;
  hints: string[];
  excludeHints: string[];
  searchQuery: string;
  guideHref: string;
};

export const SEASON_BUDGETS = FOOD_PICKER_BUDGETS.map((b) => ({
  id: b.id,
  label: b.id === "hverdag" ? "Budget-venlig" : b.id === "weekend" ? "Value-for-money" : "Premium / jule-luksus",
  hint: b.hint,
  min: b.min,
  max: b.max,
}));

export function getSeasonBudget(id: string | null | undefined) {
  return SEASON_BUDGETS.find((b) => b.id === id) ?? null;
}

export type SeasonBudgetId = FoodPickerBudgetId;

const BUBBLE_HINTS = [
  "champagne",
  "cremant",
  "crémant",
  "cava",
  "prosecco",
  "bobler",
  "mousserende",
  "sparkling",
  "brut",
];

const CLASSIC_RED_HINTS = [
  "pinot noir",
  "pinot",
  "gamay",
  "beaujolais",
  "morgon",
  "fleurie",
  "chianti",
  "sangiovese",
  "cotes du rhone",
  "côtes du rhône",
  "cote du rhone",
  "rioja",
  "crianza",
];

const KRAFTIG_RED_HINTS = [
  "amarone",
  "ripasso",
  "chateauneuf",
  "châteauneuf",
  "ribera",
  "priorat",
  "primitivo",
  "zinfandel",
  "barolo",
  "brunello",
];

const WHITE_HINTS = [
  "riesling",
  "chardonnay",
  "pinot gris",
  "pinot grigio",
  "sauvignon",
  "gruner",
  "grüner",
  "albarino",
  "albariño",
  "hvidvin",
];

const DESSERT_HINTS = [
  "tawny",
  "portvin",
  "vintage port",
  "lbn",
  "late bottled",
  "recioto",
  "moscato",
  "sauternes",
  "tokaji",
  "senhøst",
  "late harvest",
  "madeira",
];

const MIDNIGHT_HINTS = [...BUBBLE_HINTS, "demi-sec", "halvtør", "demi sec", "dolce", "asti"];

const DESSERT_EXCLUDE_FROM_RED = [
  "portvin",
  "tawny",
  "recioto",
  "moscato",
  "sauternes",
  "madeira",
  "sherry",
];

const STILL_EXCLUDE_FROM_BUBBLES = ["portvin", "tawny", "amarone", "chianti"];

export function rolesForMenu(input: {
  event: SeasonEvent;
  redStyle: SeasonRedStyle;
  dish?: SeasonDish;
  welcomeBubbles: number;
  white: number;
  red: number;
  dessert: number;
}): SeasonMenuRole[] {
  const { event, redStyle, dish, welcomeBubbles, white, red, dessert } = input;
  const dishHints =
    dish === "and" ? ["pinot noir", "pinot", "beaujolais"] : dish === "flaesk" ? ["gamay", "chianti", "sangiovese"] : [];
  const redHints =
    redStyle === "kraftig" ? KRAFTIG_RED_HINTS : [...dishHints, ...CLASSIC_RED_HINTS];
  const redQuery =
    redStyle === "kraftig" ? "amarone ripasso ribera priorat" : "pinot noir beaujolais chianti cotes du rhone rioja";

  const roles: SeasonMenuRole[] = [];

  if (welcomeBubbles > 0) {
    roles.push({
      id: "welcome",
      label: "Velkomst",
      courseLabel: event === "nytaar" ? "Velkomstbobler" : "Velkomst (bobler)",
      bottles: welcomeBubbles,
      hints: BUBBLE_HINTS,
      excludeHints: STILL_EXCLUDE_FROM_BUBBLES,
      searchQuery: "cava cremant champagne brut",
      guideHref:
        event === "nytaar" ? "/guides/bedste-champagne-til-nytaar" : "/guides/bedste-bobler",
    });
  }

  if (white > 0) {
    roles.push({
      id: "white",
      label: "Hvidvin",
      courseLabel: event === "julefrokost" ? "Det salte bord (hvid)" : "Hvidvin til menuen",
      bottles: white,
      hints: WHITE_HINTS,
      excludeHints: ["portvin", "tawny", "amarone"],
      searchQuery: "riesling chardonnay pinot gris hvidvin",
      guideHref: event === "julefrokost" ? "/guides/vin-til-julefrokost" : "/guides/vin-til-nytaar-og-nytaarsmenu",
    });
  }

  if (red > 0) {
    roles.push({
      id: "red",
      label: "Rødvin",
      courseLabel:
        event === "juleaften" ? "Hovedret (and og flæskesteg)" : event === "julefrokost" ? "Det fede (rød)" : "Rødvin til hovedret",
      bottles: red,
      hints: redHints,
      excludeHints: DESSERT_EXCLUDE_FROM_RED,
      searchQuery: redQuery,
      guideHref: event === "juleaften" ? "/guides/vin-til-juleaften" : "/guides/vin-til-julefrokost",
    });
  }

  if (dessert > 0) {
    const isMidnight = event === "nytaar";
    roles.push({
      id: "dessert",
      label: isMidnight ? "Midnat" : "Dessert",
      courseLabel: isMidnight ? "Bobler til kransekage og midnat" : "Dessert (risalamande)",
      bottles: dessert,
      hints: isMidnight ? MIDNIGHT_HINTS : DESSERT_HINTS,
      excludeHints: isMidnight ? ["amarone", "portvin"] : ["brut nature", "extra brut"],
      searchQuery: isMidnight ? "cava champagne cremant" : "portvin tawny moscato recioto",
      guideHref: isMidnight ? "/guides/vin-til-dessert-og-kransekage" : "/guides/vin-til-risalamande",
    });
  }

  return roles;
}
