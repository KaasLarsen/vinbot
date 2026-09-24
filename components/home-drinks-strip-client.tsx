"use client";

import Image from "next/image";
import Link from "next/link";
import { classifyDrinkStyle, drinkStyleBadgeClass, styleFilterLabel } from "@/lib/drink-browse";
import { getDrinkImageAlt, getDrinkImagePath } from "@/lib/drink-images";
import { getHomeMoment } from "@/lib/home-moment";

export type HomeDrinkCard = {
  slug: string;
  title: string;
  tags?: string[];
};

export function HomeDrinksStripClient({
  catalog,
  heading = "Udvalgte drinks",
  intro = "Cocktails og spritz hvor vin er hovedrollen — samme opskrift-format.",
  allHref = "/drinks",
  allLabel = "Se alle drinks →",
  headingId = "home-drinks-heading",
  className = "mt-12",
}: {
  catalog: HomeDrinkCard[];
  heading?: string;
  intro?: string;
  allHref?: string;
  allLabel?: string;
  headingId?: string;
  className?: string;
}) {
  const bySlug = new Map(catalog.map((d) => [d.slug, d]));
  const drinks = getHomeMoment()
    .drinkSlugs.map((slug) => bySlug.get(slug))
    .filter((d): d is HomeDrinkCard => Boolean(d))
    .slice(0, 4);

  if (drinks.length === 0) return null;

  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id={headingId} className="text-xl font-semibold tracking-tight text-stone-900">
            {heading}
          </h2>
          <p className="mt-1 text-sm text-stone-600">{intro}</p>
        </div>
        <Link href={allHref} className="text-sm font-medium text-rose-900 hover:underline">
          {allLabel}
        </Link>
      </div>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {drinks.map((d) => {
          const style = classifyDrinkStyle(d.tags);
          return (
            <li key={d.slug}>
              <Link
                href={`/drinks/${d.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={getDrinkImagePath(d.slug)}
                    alt={getDrinkImageAlt(d.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <span className={drinkStyleBadgeClass(style)}>{styleFilterLabel(style)}</span>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-stone-900">
                    {d.title.split(" — ")[0] || d.title}
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
