import Link from "next/link";
import { InlineProductPicks } from "@/components/inline-product-picks";
import { RecipeCuratedWineLinks } from "@/components/recipe-curated-wine-links";
import type { RecipeWineToDrink } from "@/lib/content/recipe-types";

function buildSearchHref(query: string, max?: number): string {
  const params = new URLSearchParams({ q: query });
  if (max != null) params.set("max", String(max));
  return `/?${params.toString()}`;
}

type Props = {
  recipeSlug: string;
  tags?: string[];
  relatedGuides?: string[];
  wineToDrink: RecipeWineToDrink;
};

/** Produkt-picks + kuraterede enkeltvin under opskriftens vinforslag. */
export function RecipeShopSection({ recipeSlug, tags = [], relatedGuides, wineToDrink }: Props) {
  const searchHref = buildSearchHref(wineToDrink.searchQuery, wineToDrink.searchMax);

  return (
    <div className="not-prose mt-6 space-y-6">
      <InlineProductPicks
        q={wineToDrink.searchQuery}
        max={wineToDrink.searchMax ?? null}
        slug={recipeSlug}
        hub="mad-og-vin"
        placement="recipe-picks"
        label={wineToDrink.label}
        searchHref={searchHref}
        heading="Køb vin til retten — direkte fra forhandlere"
        max_items={3}
      />
      <RecipeCuratedWineLinks recipeSlug={recipeSlug} tags={tags} relatedGuides={relatedGuides} />
      <p className="text-center text-sm text-stone-600">
        <Link
          href={searchHref}
          className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
        >
          Sammenlign flere i vinsøgningen →
        </Link>
      </p>
    </div>
  );
}
