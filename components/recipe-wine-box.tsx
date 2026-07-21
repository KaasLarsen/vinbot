import Link from "next/link";
import { GuideSearchCta } from "@/components/guide-search-cta";
import type { RecipeWineInRecipe, RecipeWineToDrink } from "@/lib/content/recipe-types";

function buildSearchHref(query: string, max?: number): string {
  const params = new URLSearchParams({ q: query });
  if (max != null) params.set("max", String(max));
  return `/?${params.toString()}`;
}

type Props = {
  wineInRecipe?: RecipeWineInRecipe;
  wineToDrink: RecipeWineToDrink;
  /** pairing = løft vin-til-maden; cooking = begge bokse når wineInRecipe findes */
  variant?: "cooking" | "pairing";
};

export function RecipeWineBox({ wineInRecipe, wineToDrink, variant = "cooking" }: Props) {
  const searchHref = buildSearchHref(wineToDrink.searchQuery, wineToDrink.searchMax);
  const showCookingBox = variant === "cooking" && wineInRecipe != null;
  const isPairing = variant === "pairing";

  return (
    <div className="not-prose space-y-4">
      {showCookingBox ? (
        <aside className="overflow-hidden rounded-2xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-amber-800/90">Vin i retten</p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{wineInRecipe.style}</p>
          <p className="mt-1 text-sm font-medium text-amber-900">{wineInRecipe.amount}</p>
          {wineInRecipe.note ? (
            <p className="mt-2 text-sm text-stone-700">{wineInRecipe.note}</p>
          ) : null}
        </aside>
      ) : null}

      <aside
        className={
          isPairing
            ? "overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm"
            : "overflow-hidden rounded-2xl border border-stone-200 bg-stone-50/80 p-5 shadow-sm"
        }
      >
        <p
          className={
            isPairing
              ? "text-xs font-semibold uppercase tracking-wider text-emerald-800/90"
              : "text-xs font-semibold uppercase tracking-wider text-stone-600"
          }
        >
          {isPairing ? "Anbefalet vin til retten" : "Vin i glasset"}
        </p>
        {isPairing ? (
          <>
            <p className="mt-2 text-lg font-semibold text-stone-900">
              3–5 vine der passer til maden
            </p>
            <p className="mt-2 text-base text-stone-800">
              {wineToDrink.guideSlug ? (
                <>
                  Se forslag nedenfor — eller læs vores{" "}
                  <Link
                    href={`/guides/${wineToDrink.guideSlug}`}
                    className="font-semibold text-rose-900 hover:underline"
                  >
                    parrings-guide
                  </Link>{" "}
                  for mere dybde.
                </>
              ) : (
                <>Find flasker der matcher retten — se forslag nedenfor.</>
              )}
            </p>
          </>
        ) : (
          <p className="mt-2 text-base text-stone-800">
            {wineToDrink.guideSlug ? (
              <>
                Læs vores{" "}
                <Link
                  href={`/guides/${wineToDrink.guideSlug}`}
                  className="font-semibold text-rose-900 hover:underline"
                >
                  parrings-guide
                </Link>{" "}
                — eller søg direkte efter flasker nedenfor.
              </>
            ) : (
              <>Find en flaske der matcher retten — se forslag nedenfor.</>
            )}
          </p>
        )}
      </aside>

      <GuideSearchCta label={wineToDrink.label} searchHref={searchHref} />
    </div>
  );
}
