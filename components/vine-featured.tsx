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
    <section className="mt-12" aria-labelledby="vine-featured-heading">
      <div className="rounded-2xl border border-stone-200/90 bg-gradient-to-b from-stone-50/80 to-white px-5 py-8 shadow-sm ring-1 ring-stone-100 sm:px-8">
        <h2 id="vine-featured-heading" className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
          Udvalgte vine
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {wines.map((w) => (
            <li key={w.slug} className="flex min-h-0">
              <Link
                href={`/vine/${w.slug}`}
                className="group flex min-h-[280px] w-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm ring-1 ring-stone-100 transition hover:border-stone-300 hover:shadow-md"
              >
                <div className="relative flex h-44 w-full shrink-0 items-center justify-center bg-white sm:h-48">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-100/90 via-white to-white" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proxyImg(w.image)}
                    alt=""
                    width={320}
                    height={320}
                    className="relative z-[1] h-[85%] w-[85%] object-contain transition duration-200 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex min-h-0 flex-1 flex-col border-t border-stone-100 px-3 pb-3 pt-3 sm:px-4">
                  <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-stone-900">{w.displayTitle}</p>
                  {w.brand ? <p className="mt-1 truncate text-xs text-stone-500">{w.brand}</p> : null}
                  <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
                    {w.catalogStyle ? (
                      <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-stone-600">
                        {STYLE_BADGE[w.catalogStyle]}
                      </span>
                    ) : null}
                    <span className="text-xs tabular-nums text-stone-600">
                      {w.merchantCount === 1 ? "1 butik" : `${w.merchantCount} butikker`}
                      {typeof w.lowestPrice === "number" ? ` · fra ${w.lowestPrice.toLocaleString("da-DK")} kr` : ""}
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
