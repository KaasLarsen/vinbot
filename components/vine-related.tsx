import Link from "next/link";

import { proxyImg } from "@/lib/search/helpers";
import type { CanonicalWine } from "@/lib/vine/types";
import { lowestShelfPrice } from "@/lib/vine/related-wines";

export function VineRelatedWines({ wines }: { wines: CanonicalWine[] }) {
  if (wines.length === 0) return null;

  return (
    <section className="mt-10" aria-labelledby="vine-related-heading">
      <h2 id="vine-related-heading" className="text-xl font-semibold text-stone-900">
        Relaterede vine
      </h2>
      <p className="mt-1 text-sm text-stone-600">
        Udvalgt ud fra lignende type, kategori i forhandlernes sortimenter og omtrent samme prisleje som denne vin.
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
        {wines.map((w) => {
          const from = lowestShelfPrice(w);
          return (
            <li key={w.id}>
              <Link
                href={`/vine/${w.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white p-3 shadow-sm ring-1 ring-stone-100 transition hover:border-stone-300 hover:shadow-md"
              >
                <div className="relative mx-auto mb-2 flex h-28 w-full items-center justify-center overflow-hidden rounded-lg bg-stone-50">
                  {w.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={proxyImg(w.image)}
                      alt=""
                      width={224}
                      height={224}
                      className="max-h-[90%] max-w-[90%] object-contain transition duration-200 group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  ) : (
                    <span className="px-2 text-center text-[11px] text-stone-400">Intet billede</span>
                  )}
                </div>
                <p className="line-clamp-2 text-sm font-medium leading-snug text-stone-900">{w.displayTitle}</p>
                {w.brand ? <p className="mt-0.5 truncate text-xs text-stone-500">{w.brand}</p> : null}
                <p className="mt-auto pt-2 text-xs tabular-nums text-stone-600">
                  {typeof from === "number" ? `fra ${from.toLocaleString("da-DK")} kr` : "Pris varierer"}
                  {w.offers.length === 1 ? " · 1 butik" : ` · ${w.offers.length} butikker`}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
