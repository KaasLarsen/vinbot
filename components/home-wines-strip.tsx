import Link from "next/link";

import { proxyImg } from "@/lib/search/helpers";
import { vineCatalogStyleFromBlob, type VineWineStyleGuess } from "@/lib/vine/catalog-style";
import { resolveFeaturedHomeWines, wineLooksAlcoholFree } from "@/lib/vine/featured-slugs";
import type { CanonicalWine } from "@/lib/vine/types";

const STYLE_BADGE: Record<NonNullable<VineWineStyleGuess>, string> = {
  bobler: "Bobler",
  rose: "Rosé",
  hvid: "Hvid",
  rod: "Rød",
};

function lowestPrice(wine: CanonicalWine): number | null {
  const prices = wine.offers.map((o) => o.price).filter((p): p is number => typeof p === "number");
  return prices.length ? Math.min(...prices) : null;
}

export async function HomeWinesStrip() {
  const wines = await resolveFeaturedHomeWines();

  if (wines.length === 0) return null;

  return (
    <section className="mt-12" aria-labelledby="home-wines-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="home-wines-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Udvalgte vine
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Gode flasker, vi har udvalgt fra stærke danske forhandlere.
          </p>
        </div>
        <Link href="/vine" className="text-sm font-medium text-rose-900 hover:underline">
          Se alle vine →
        </Link>
      </div>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {wines.map((w) => {
          const blob = [w.displayTitle, w.brand, w.category].filter(Boolean).join(" ");
          const catalogStyle = vineCatalogStyleFromBlob(blob);
          const alcoholFree = wineLooksAlcoholFree(w);
          const price = lowestPrice(w);
          return (
            <li key={w.slug}>
              <Link
                href={`/vine/${w.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-stone-50">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-100/90 via-stone-50 to-stone-50" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={proxyImg(w.image)}
                    alt=""
                    width={320}
                    height={320}
                    className="relative z-[1] h-[85%] w-[85%] object-contain transition duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex flex-wrap gap-1">
                    {alcoholFree ? (
                      <span className="w-fit rounded-md bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-900">
                        Alkoholfri
                      </span>
                    ) : catalogStyle ? (
                      <span className="w-fit rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700">
                        {STYLE_BADGE[catalogStyle]}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-stone-900">
                    {w.displayTitle}
                  </h3>
                  {w.brand ? <p className="mt-1 truncate text-xs text-stone-500">{w.brand}</p> : null}
                  <p className="mt-auto pt-3 text-xs tabular-nums text-stone-600">
                    {w.offers.length === 1 ? "1 butik" : `${w.offers.length} butikker`}
                    {typeof price === "number" ? ` · fra ${price.toLocaleString("da-DK")} kr` : ""}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
