import Image from "next/image";
import Link from "next/link";

import { GUIDE_RECIPE_LINKS } from "@/lib/growth/guide-recipe-links";
import { getRecipeImageAlt, getRecipeImagePath } from "@/lib/recipe-images";

export function GuideRecipeCrosslinks({ guideSlug }: { guideSlug: string }) {
  const recipes = GUIDE_RECIPE_LINKS[guideSlug];
  if (!recipes?.length) return null;

  return (
    <section
      className="not-prose mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      aria-labelledby="guide-recipes-heading"
    >
      <h2 id="guide-recipes-heading" className="text-xl font-semibold text-stone-900">
        Opskrifter med vin i gryden
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Konkrete retter der matcher guiden — med ingredienser, trin og vinforslag.
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {recipes.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/opskrifter/${r.slug}`}
              className="group flex gap-3 overflow-hidden rounded-xl border border-stone-200 bg-stone-50/50 p-3 transition hover:border-rose-200 hover:bg-white hover:shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100 ring-1 ring-stone-200/80">
                <Image
                  src={getRecipeImagePath(r.slug)}
                  alt={getRecipeImageAlt(r.label)}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover object-center transition group-hover:scale-105"
                />
              </div>
              <span className="self-center font-medium text-rose-900 group-hover:text-rose-950">
                {r.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-stone-600">
        <Link href="/opskrifter" className="font-medium text-rose-900 hover:underline">
          Alle opskrifter med vin
        </Link>
      </p>
    </section>
  );
}
