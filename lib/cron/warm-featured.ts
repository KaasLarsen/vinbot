import { FEATURED_WINE_SLUGS } from "@/lib/vine/featured-slugs";

/**
 * In-process featured warm — undgår HTTP self-fetch der dobbelt-fakurerer Function Duration.
 * Lazy-importerer katalog, så unit tests kan køre empty-list uden next/cache.
 */
export async function warmFeaturedWineSlugs(
  slugs: readonly string[] = FEATURED_WINE_SLUGS,
): Promise<{ warmed: string[]; failed: string[] }> {
  if (slugs.length === 0) return { warmed: [], failed: [] };

  const { getWineBySlug } = await import("@/lib/vine/catalog");
  const warmed: string[] = [];
  const failed: string[] = [];
  for (const slug of slugs) {
    try {
      const wine = await getWineBySlug(slug);
      if (wine) warmed.push(slug);
      else failed.push(slug);
    } catch {
      failed.push(slug);
    }
  }
  return { warmed, failed };
}
