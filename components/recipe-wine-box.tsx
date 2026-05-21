import Link from "next/link";
import { GuideSearchCta } from "@/components/guide-search-cta";
import type { RecipeWineInRecipe, RecipeWineToDrink } from "@/lib/content/recipe-types";

function buildSearchHref(query: string, max?: number): string {
  const params = new URLSearchParams({ q: query });
  if (max != null) params.set("max", String(max));
  return `/?${params.toString()}`;
}

export function RecipeWineBox({
  wineInRecipe,
  wineToDrink,
}: {
  wineInRecipe: RecipeWineInRecipe;
  wineToDrink: RecipeWineToDrink;
}) {
  const searchHref = buildSearchHref(wineToDrink.searchQuery, wineToDrink.searchMax);

  return (
    <div className="not-prose space-y-4">
      <aside className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/90">Vin i retten</p>
        <p className="mt-2 text-lg font-semibold text-stone-900">{wineInRecipe.style}</p>
        <p className="mt-1 text-sm font-medium text-amber-900">{wineInRecipe.amount}</p>
        {wineInRecipe.note ? (
          <p className="mt-2 text-sm text-stone-700">{wineInRecipe.note}</p>
        ) : null}
      </aside>

      <aside className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/80 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">Vin i glasset</p>
        <p className="mt-2 text-base text-stone-800">
          {wineToDrink.guideSlug ? (
            <>
              Læs vores{" "}
              <Link href={`/guides/${wineToDrink.guideSlug}`} className="font-semibold text-rose-900 hover:underline">
                parrings-guide
              </Link>{" "}
              — eller søg direkte efter flasker nedenfor.
            </>
          ) : (
            <>Find en flaske der matcher retten — se forslag nedenfor.</>
          )}
        </p>
      </aside>

      <GuideSearchCta label={wineToDrink.label} searchHref={searchHref} />
    </div>
  );
}
