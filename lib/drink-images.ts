import { recipeTotalMinutes } from "@/lib/recipe-format";

const DRINK_IMAGE_DIR = "/images/drinks";

/** Offentlig sti til drink-billede (konvention: slug.jpg). */
export function getDrinkImagePath(slug: string): string {
  return `${DRINK_IMAGE_DIR}/${slug}.jpg`;
}

export function getDrinkImageAbsoluteUrl(slug: string, siteUrl: string): string {
  return `${siteUrl}${getDrinkImagePath(slug)}`;
}

/** Alt-tekst til hero og kort. */
export function getDrinkImageAlt(title: string): string {
  const drink = title.split(" — ")[0]?.trim() || title;
  return `${drink} — cocktail med vin`;
}

/** Schema.org recipeCategory for drinks. */
export function drinkCategoryForSchema(tags: string[] = []): string {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  if (t.has("gløgg") || t.has("gloegg") || t.has("varm")) return "Varm drink";
  if (t.has("spritz") || t.has("aperitif")) return "Aperitif";
  if (t.has("sangria") || t.has("bowle")) return "Bowle";
  return "Cocktail";
}

/** Samlet tilberedningstid som ISO 8601 duration. */
export function drinkTotalTimeIso(prep?: string, cook?: string): string | undefined {
  const mins = recipeTotalMinutes(prep, cook);
  if (mins == null) return undefined;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h > 0 && m > 0) return `PT${h}H${m}M`;
  if (h > 0) return `PT${h}H`;
  return `PT${m}M`;
}

const PHOTO_STYLE =
  "Professional cocktail photography, appetizing drink in glass, natural side lighting, shallow depth of field, bar or marble surface, condensation on glass, no text, no watermark, no people, photorealistic, 4:3 aspect ratio";

/** Prompt til generering af unikt drink-billede. */
export function drinkImagePrompt(title: string): string {
  const drink = title.split(" — ")[0]?.trim() || title;
  return `${drink}, ${PHOTO_STYLE}`;
}
