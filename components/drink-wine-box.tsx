import Link from "next/link";
import { GuideSearchCta } from "@/components/guide-search-cta";
import type { DrinkWineInRecipe, DrinkWineToDrink } from "@/lib/content/drink-types";

function buildSearchHref(query: string, max?: number): string {
  const params = new URLSearchParams({ q: query });
  if (max != null) params.set("max", String(max));
  return `/?${params.toString()}`;
}

type Props = {
  wineInRecipe: DrinkWineInRecipe;
  wineToDrink: DrinkWineToDrink;
};

export function DrinkWineBox({ wineInRecipe, wineToDrink }: Props) {
  const searchHref = buildSearchHref(wineToDrink.searchQuery, wineToDrink.searchMax);

  return (
    <div className="not-prose space-y-4">
      <aside className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/90">Vin i drinken</p>
        <p className="mt-2 text-lg font-semibold text-stone-900">{wineInRecipe.style}</p>
        <p className="mt-1 text-sm font-medium text-amber-900">{wineInRecipe.amount}</p>
        {wineInRecipe.note ? <p className="mt-2 text-sm text-stone-700">{wineInRecipe.note}</p> : null}
      </aside>

      <aside className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/80 p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">Køb vinen</p>
        <p className="mt-2 text-base text-stone-800">
          {wineToDrink.guideSlug ? (
            <>
              Læs vores{" "}
              <Link
                href={`/guides/${wineToDrink.guideSlug}`}
                className="font-semibold text-rose-900 hover:underline"
              >
                guide
              </Link>{" "}
              — eller find flasker nedenfor.
            </>
          ) : (
            <>Find flasker der matcher drinken — se forslag nedenfor.</>
          )}
        </p>
        <GuideSearchCta searchHref={searchHref} label={`Søg ${wineToDrink.label}`} />
      </aside>
    </div>
  );
}
