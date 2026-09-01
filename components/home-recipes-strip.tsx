import { HomeRecipesStripClient, type HomeRecipeCard } from "@/components/home-recipes-strip-client";
import { getRecipeBySlug } from "@/lib/content/recipes";
import { allHomeMomentRecipeSlugs } from "@/lib/home-moment";

export function HomeRecipesStrip() {
  const catalog: HomeRecipeCard[] = allHomeMomentRecipeSlugs()
    .map((slug) => getRecipeBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => r != null)
    .map((r) => ({
      slug: r.slug,
      title: r.title,
      recipeRole: r.recipeRole,
    }));

  if (catalog.length === 0) return null;

  return <HomeRecipesStripClient catalog={catalog} />;
}
