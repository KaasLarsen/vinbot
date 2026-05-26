import { classifyRecipeCuisine } from "@/lib/recipe-browse";
import { recipeTotalMinutes } from "@/lib/recipe-format";

const RECIPE_IMAGE_DIR = "/images/recipes";

/** Offentlig sti til opskriftsbillede (konvention: slug.jpg). */
export function getRecipeImagePath(slug: string): string {
  return `${RECIPE_IMAGE_DIR}/${slug}.jpg`;
}

export function getRecipeImageAbsoluteUrl(slug: string, siteUrl: string): string {
  return `${siteUrl}${getRecipeImagePath(slug)}`;
}

/** Alt-tekst til hero og kort — kort og beskrivende. */
export function getRecipeImageAlt(title: string): string {
  const dish = title.split(" — ")[0]?.trim() || title;
  return `${dish} — serveret ret`;
}

const CUISINE_SCHEMA: Record<string, string> = {
  dansk: "Danish",
  fransk: "French",
  italiensk: "Italian",
  spansk: "Spanish",
  schweizisk: "Swiss",
  græsk: "Greek",
  ungarsk: "Hungarian",
  tysk: "German",
};

/** Schema.org recipeCuisine fra tags (kun når køkken er tydeligt). */
export function recipeCuisineForSchema(tags: string[] = []): string | undefined {
  const classified = classifyRecipeCuisine(tags);
  if (classified !== "andet") {
    return CUISINE_SCHEMA[classified];
  }
  const t = new Set(tags.map((x) => x.toLowerCase()));
  for (const [tag, label] of Object.entries(CUISINE_SCHEMA)) {
    if (t.has(tag)) return label;
  }
  return undefined;
}

/** Schema.org recipeCategory ud fra emne-tags. */
export function recipeCategoryForSchema(tags: string[] = []): string {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  if (t.has("dessert")) return "Dessert";
  if (t.has("suppe")) return "Suppe";
  if (t.has("sauce")) return "Sauce";
  if (t.has("tapas") || t.has("tilbehør")) return "Tapas";
  return "Hovedret";
}

/** Samlet tilberedningstid som ISO 8601 duration (prep + cook). */
export function recipeTotalTimeIso(prep?: string, cook?: string): string | undefined {
  const mins = recipeTotalMinutes(prep, cook);
  if (mins == null) return undefined;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0 && m > 0) return `PT${h}H${m}M`;
  if (h > 0) return `PT${h}H`;
  return `PT${m}M`;
}

const PHOTO_STYLE =
  "Professional food photography, appetizing, warm natural side lighting, shallow depth of field, rustic ceramic plate or cast iron pot on wooden table, no text, no watermark, no people, photorealistic, 4:3 aspect ratio";

/** Prompt til generering af unikt opskriftsbillede. */
export function recipeImagePrompt(title: string): string {
  const dish = title.split(" — ")[0]?.trim() || title;
  return `${dish}, ${PHOTO_STYLE}`;
}
