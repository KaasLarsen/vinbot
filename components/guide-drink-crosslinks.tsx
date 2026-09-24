import Image from "next/image";
import Link from "next/link";

import { GUIDE_DRINK_LINKS } from "@/lib/growth/guide-drink-links";
import { getDrinkImageAlt, getDrinkImagePath } from "@/lib/drink-images";

export function GuideDrinkCrosslinks({ guideSlug }: { guideSlug: string }) {
  const drinks = GUIDE_DRINK_LINKS[guideSlug];
  if (!drinks?.length) return null;

  return (
    <section
      className="not-prose mt-10 border-t border-stone-200 pt-8"
      aria-labelledby="guide-drinks-heading"
    >
      <h2 id="guide-drinks-heading" className="text-xl font-semibold text-stone-900">
        Drinks med vin
      </h2>
      <p className="mt-2 text-sm text-stone-600">
        Cocktails, spritz og bowle der matcher guiden — med ratio, tip og flaskeforslag.
      </p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {drinks.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/drinks/${d.slug}`}
              className="group flex gap-3 overflow-hidden rounded-xl border border-stone-200 bg-stone-50/50 p-3 transition hover:border-rose-200 hover:bg-white hover:shadow-sm"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100 ring-1 ring-stone-200/80">
                <Image
                  src={getDrinkImagePath(d.slug)}
                  alt={getDrinkImageAlt(d.label)}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover object-center transition group-hover:scale-105"
                />
              </div>
              <span className="self-center font-medium text-rose-900 group-hover:text-rose-950">
                {d.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-stone-600">
        <Link href="/drinks" className="font-medium text-rose-900 hover:underline">
          Alle drinks med vin
        </Link>
      </p>
    </section>
  );
}
