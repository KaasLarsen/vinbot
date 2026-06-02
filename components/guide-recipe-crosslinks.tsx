import Link from "next/link";

import { GUIDE_RECIPE_LINKS } from "@/lib/growth/guide-recipe-links";

export function GuideRecipeCrosslinks({ guideSlug }: { guideSlug: string }) {
  const recipes = GUIDE_RECIPE_LINKS[guideSlug];
  if (!recipes?.length) return null;

  return (
    <section className="not-prose mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm" aria-labelledby="guide-recipes-heading">
      <h2 id="guide-recipes-heading" className="text-xl font-semibold text-stone-900">
        Opskrifter med vin i gryden
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Konkrete retter der matcher guiden — med ingredienser, trin og vinforslag.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {recipes.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/opskrifter/${r.slug}`}
              className="font-medium text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950"
            >
              {r.label}
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
