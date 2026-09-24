import type { DrinkDifficulty } from "@/lib/content/drink-types";
import { recipeTotalMinutes } from "@/lib/recipe-format";

export type DrinkCardData = {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  tags?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  difficulty?: DrinkDifficulty;
};

export type DrinkWineFilter =
  | "alle"
  | "bobler"
  | "rod"
  | "hvid"
  | "rose"
  | "port"
  | "sherry";

export type DrinkStyleFilter = "alle" | "spritz" | "cocktail" | "bowle" | "varm" | "aperitif";

export type DrinkHubFilterState = {
  q: string;
  wine: DrinkWineFilter;
  style: DrinkStyleFilter;
};

export const EMPTY_DRINK_HUB_FILTERS: DrinkHubFilterState = {
  q: "",
  wine: "alle",
  style: "alle",
};

export const DRINK_HUB_CLASSICS: { href: string; label: string }[] = [
  { href: "/drinks/aperol-spritz", label: "Aperol Spritz" },
  { href: "/drinks/hugo-spritz", label: "Hugo Spritz" },
  { href: "/drinks/portvin-tonic", label: "Port & Tonic" },
  { href: "/drinks/tinto-de-verano", label: "Tinto de Verano" },
  { href: "/drinks/kalimotxo", label: "Kalimotxo" },
  { href: "/drinks/sangria-med-rodvin", label: "Sangria" },
  { href: "/drinks/negroni-sbagliato", label: "Negroni Sbagliato" },
  { href: "/drinks/tawny-sour", label: "Tawny Sour" },
];

export type DrinkHubIntent = {
  id: string;
  label: string;
  hint: string;
  filters: Partial<DrinkHubFilterState>;
};

export const DRINK_HUB_INTENTS: DrinkHubIntent[] = [
  { id: "spritz", label: "Spritz", hint: "Bobler, bitter og sodavand", filters: { style: "spritz" } },
  { id: "cocktail", label: "Cocktail", hint: "Klassikere med vin", filters: { style: "cocktail" } },
  { id: "bowle", label: "Bowle", hint: "Sangria og fest", filters: { style: "bowle" } },
  { id: "varm", label: "Varm", hint: "Gløgg og varme drikke", filters: { style: "varm" } },
  { id: "aperitif", label: "Aperitif", hint: "Let før maden", filters: { style: "aperitif" } },
];

export function drinkHubIntentIsActive(intent: DrinkHubIntent, state: DrinkHubFilterState): boolean {
  const f = intent.filters;
  if (f.style && f.style !== "alle" && state.style !== f.style) return false;
  if (f.wine && f.wine !== "alle" && state.wine !== f.wine) return false;
  if (f.q && state.q.trim().toLowerCase() !== f.q.trim().toLowerCase()) return false;
  return Boolean(f.style || f.wine || f.q);
}

export function drinkStyleBadgeClass(style: Exclude<DrinkStyleFilter, "alle">): string {
  switch (style) {
    case "spritz":
      return "rounded-md bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-900";
    case "bowle":
      return "rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900";
    case "varm":
      return "rounded-md bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-950";
    case "aperitif":
      return "rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-900";
    default:
      return "rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-800";
  }
}

const WINE_LABELS: Record<DrinkWineFilter, string> = {
  alle: "Alle vintyper",
  bobler: "Bobler",
  rod: "Rødvin",
  hvid: "Hvidvin",
  rose: "Rosé",
  port: "Portvin",
  sherry: "Sherry",
};

const STYLE_LABELS: Record<DrinkStyleFilter, string> = {
  alle: "Alle stilarter",
  spritz: "Spritz",
  cocktail: "Cocktail",
  bowle: "Bowle",
  varm: "Varm",
  aperitif: "Aperitif",
};

export function wineFilterLabel(w: DrinkWineFilter): string {
  return WINE_LABELS[w];
}

export function styleFilterLabel(s: DrinkStyleFilter): string {
  return STYLE_LABELS[s];
}

export function classifyDrinkWine(tags: string[] = []): Exclude<DrinkWineFilter, "alle"> {
  const t = tags.map((x) => x.toLowerCase());
  if (t.some((x) => x.includes("port"))) return "port";
  if (t.some((x) => x.includes("sherry") || x.includes("fino"))) return "sherry";
  if (t.some((x) => x.includes("rosé") || x.includes("rose") || x.includes("frosé") || x.includes("frose")))
    return "rose";
  if (
    t.some(
      (x) =>
        x.includes("bobler") ||
        x.includes("prosecco") ||
        x.includes("champagne") ||
        x.includes("cava") ||
        x.includes("spritz") ||
        x.includes("mousserende"),
    )
  )
    return "bobler";
  if (t.some((x) => x.includes("rød") || x.includes("rod") || x.includes("sangria"))) return "rod";
  return "hvid";
}

export function classifyDrinkStyle(tags: string[] = []): Exclude<DrinkStyleFilter, "alle"> {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  if (t.has("gløgg") || t.has("gloegg") || t.has("varm")) return "varm";
  if (t.has("sangria") || t.has("bowle") || t.has("drikke")) return "bowle";
  if (t.has("spritz")) return "spritz";
  if (t.has("aperitif")) return "aperitif";
  return "cocktail";
}

export function drinkMatchesSearch(d: DrinkCardData, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  const hay = `${d.title} ${d.description} ${d.slug} ${(d.tags || []).join(" ")}`.toLowerCase();
  return hay.includes(s);
}

export function drinkMatchesFilters(d: DrinkCardData, f: DrinkHubFilterState): boolean {
  if (!drinkMatchesSearch(d, f.q)) return false;
  if (f.wine !== "alle" && classifyDrinkWine(d.tags) !== f.wine) return false;
  if (f.style !== "alle" && classifyDrinkStyle(d.tags) !== f.style) return false;
  return true;
}

export function parseDrinkHubSearchParams(sp: {
  q?: string;
  wine?: string;
  style?: string;
}): DrinkHubFilterState {
  const wine = (["alle", "bobler", "rod", "hvid", "rose", "port", "sherry"] as const).includes(
    sp.wine as DrinkWineFilter,
  )
    ? (sp.wine as DrinkWineFilter)
    : "alle";
  const style = (["alle", "spritz", "cocktail", "bowle", "varm", "aperitif"] as const).includes(
    sp.style as DrinkStyleFilter,
  )
    ? (sp.style as DrinkStyleFilter)
    : "alle";
  return {
    q: typeof sp.q === "string" ? sp.q : "",
    wine,
    style,
  };
}

export function buildDrinkHubHref(f: Partial<DrinkHubFilterState>): string {
  const params = new URLSearchParams();
  if (f.q?.trim()) params.set("q", f.q.trim());
  if (f.wine && f.wine !== "alle") params.set("wine", f.wine);
  if (f.style && f.style !== "alle") params.set("style", f.style);
  const qs = params.toString();
  return qs ? `/drinks?${qs}` : "/drinks";
}

export function formatDrinkTotalTime(prep?: string, cook?: string): string | null {
  const mins = recipeTotalMinutes(prep, cook);
  if (mins == null) return null;
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m ? `${h} t ${m} min` : `${h} t`;
}
