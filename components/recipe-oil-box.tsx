import { OilAffiliateCard } from "@/components/oil-affiliate-card";
import { getOilForRecipe } from "@/lib/oils/catalog";

type Props = {
  recipeSlug: string;
};

/** Kun på opskrifter med kurateret olie — ingredienslisten forbliver almindelig tekst. */
export function RecipeOilBox({ recipeSlug }: Props) {
  const oil = getOilForRecipe(recipeSlug);
  if (!oil) return null;

  return (
    <div className="not-prose mt-6">
      <OilAffiliateCard
        oil={oil}
        heading="Anbefalet olie til denne opskrift"
        placement="recipe-oil"
        slug={recipeSlug}
        hub="mad-og-vin"
      />
    </div>
  );
}
