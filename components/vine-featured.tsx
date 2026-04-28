import Link from "next/link";

import { proxyImg } from "@/lib/search/helpers";
import type { VineWineStyleGuess } from "@/lib/vine/catalog-style";

const STYLE_BADGE: Record<NonNullable<VineWineStyleGuess>, string> = {
  bobler: "Bobler",
  rose: "Rosé",
  hvid: "Hvid",
  rod: "Rød",
};

export type VineFeaturedWine = {
  slug: string;
  displayTitle: string;
  brand: string;
  merchantCount: number;
  lowestPrice: number | null;
  image: string;
  catalogStyle: VineWineStyleGuess;
};

export function VineFeaturedStrip({ wines }: { wines: VineFeaturedWine[] }) {
  if (wines.length === 0) return null;

  return (
    <section className="mt-12 border-t border-stone-200 pt-10" aria-labelledby="vine-featured-heading">
      <h2 id="vine-featured-heading" className="text-xl font-semibold tracking-tight text-stone-900">
        Udvalgte med billede
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-stone-600">
        Et udsnit med produktbillede fra feed; her prioriteres vine der findes hos flere forhandlere, så listen giver mest
        mening til prissammenligning.
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {wines.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/vine/${w.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
            >
              <div className="relative flex aspect-square items-center justify-center bg-stone-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proxyImg(w.image)}
                  alt=""
                  className="max-h-full max-w-full object-contain p-3 transition group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="line-clamp-2 text-sm font-medium leading-snug text-stone-900">{w.displayTitle}</p>
                {w.brand ? <p className="truncate text-xs text-stone-500">{w.brand}</p> : null}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
                  {w.catalogStyle ? (
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-stone-600">
                      {STYLE_BADGE[w.catalogStyle]}
                    </span>
                  ) : null}
                  <span className="text-xs text-stone-500">
                    {w.merchantCount} forhandler{w.merchantCount === 1 ? "" : "e"}
                    {typeof w.lowestPrice === "number" ? ` · fra ${w.lowestPrice} kr` : ""}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
