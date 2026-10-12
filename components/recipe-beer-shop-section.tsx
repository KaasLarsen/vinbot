import Link from "next/link";
import { InlineProductPicks } from "@/components/inline-product-picks";
import type { RecipeBeerToDrink } from "@/lib/content/recipe-types";

type Props = {
  recipeSlug: string;
  beerToDrink: RecipeBeerToDrink;
  maxItems?: number;
};

/** Øl-picks under vin — kun når opskriften har beerToDrink. */
export function RecipeBeerShopSection({ recipeSlug, beerToDrink, maxItems = 2 }: Props) {
  const hubHref = "/beer-me";

  return (
    <div className="not-prose mt-8 space-y-4">
      <aside className="overflow-hidden rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">
          Alternativ til glasset
        </p>
        <p className="mt-2 text-lg font-semibold text-stone-900">Foretrækker du øl til retten?</p>
        <p className="mt-1 text-sm text-stone-700">
          Her er 1–2 specialøl fra Beer Me, der kan matche maden — Vinbot er stadig vin-first.
        </p>
      </aside>

      <InlineProductPicks
        q={beerToDrink.searchQuery}
        max={beerToDrink.searchMax ?? null}
        slug={recipeSlug}
        hub="ol-og-mad"
        placement="recipe-beer-picks"
        label={beerToDrink.label}
        searchHref={hubHref}
        heading="Øl til retten — fra Beer Me"
        max_items={maxItems}
        searchScope="beer"
        ariaLabel="Anbefalet øl"
        emptyHint="— se mere hos Beer Me."
      />

      <p className="text-center text-sm text-stone-600">
        <Link
          href={hubHref}
          className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
        >
          Se flere øl hos Beer Me →
        </Link>
      </p>
    </div>
  );
}
