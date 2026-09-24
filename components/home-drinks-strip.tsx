import { HomeDrinksStripClient, type HomeDrinkCard } from "@/components/home-drinks-strip-client";
import { getDrinkBySlug } from "@/lib/content/drinks";
import { allHomeMomentDrinkSlugs } from "@/lib/home-moment";

export function HomeDrinksStrip() {
  const catalog: HomeDrinkCard[] = allHomeMomentDrinkSlugs()
    .map((slug) => getDrinkBySlug(slug))
    .filter((d): d is NonNullable<typeof d> => d != null)
    .map((d) => ({
      slug: d.slug,
      title: d.title,
      tags: d.tags,
    }));

  if (catalog.length === 0) return null;

  return <HomeDrinksStripClient catalog={catalog} />;
}
