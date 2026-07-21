import Image from "next/image";
import Link from "next/link";
import { getRecipeBySlug } from "@/lib/content/recipes";
import { recipeRoleLabel } from "@/lib/content/recipe-types";
import { getRecipeImageAlt, getRecipeImagePath } from "@/lib/recipe-images";

/** Kurateret mix: 2 cooking + 2 pairing. */
const FEATURED_SLUGS = [
  "coq-au-vin",
  "risotto-med-hvidvin",
  "pizza-margherita",
  "klassisk-burger",
] as const;

export function HomeRecipesStrip() {
  const recipes = FEATURED_SLUGS.map((slug) => getRecipeBySlug(slug)).filter(
    (r): r is NonNullable<typeof r> => r != null,
  );

  if (recipes.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="home-recipes-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="home-recipes-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Udvalgte opskrifter
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Vin i retten eller vin til glasset — samme opskrift-univers.
          </p>
        </div>
        <Link href="/opskrifter" className="text-sm font-medium text-rose-900 hover:underline">
          Se alle opskrifter →
        </Link>
      </div>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recipes.map((r) => {
          const isPairing = r.recipeRole === "pairing";
          return (
            <li key={r.slug}>
              <Link
                href={`/opskrifter/${r.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={getRecipeImagePath(r.slug)}
                    alt={getRecipeImageAlt(r.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <span
                    className={
                      isPairing
                        ? "rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-900"
                        : "rounded-md bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-900"
                    }
                  >
                    {recipeRoleLabel(r.recipeRole)}
                  </span>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-stone-900">
                    {r.title.split(" — ")[0] || r.title}
                  </h3>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
