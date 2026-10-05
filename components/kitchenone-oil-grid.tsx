"use client";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";
import { formatOilPrice, listHubOilPicks, oilAffiliateHref } from "@/lib/oils/catalog";

const IMAGE_FRAME =
  "mx-auto mt-3 flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-40";

type Props = {
  slug: string;
  hub: string;
};

/** Kuraterede KitchenOne-olier med billede og pris. Hele køkkenfeedet indgår ikke. */
export function KitchenOneOilGrid({ slug, hub }: Props) {
  const oils = listHubOilPicks();

  return (
    <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {oils.map((oil) => {
        const href = oilAffiliateHref(oil);
        return (
          <li key={oil.id}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md">
              <div className="relative">
                {!oil.inStock ? (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-stone-700 px-2 py-0.5 text-[11px] font-semibold text-white">
                    Ikke på lager
                  </span>
                ) : null}
                <AffiliateTrackedLink
                  href={href}
                  merchant="KitchenOne"
                  placement="olie-leksikon-grid"
                  slug={slug}
                  hub={hub}
                  className={IMAGE_FRAME}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={oil.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
                </AffiliateTrackedLink>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">KitchenOne</p>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug text-stone-900">
                  <AffiliateTrackedLink
                    href={href}
                    merchant="KitchenOne"
                    placement="olie-leksikon-grid"
                    slug={slug}
                    hub={hub}
                    className="hover:underline"
                  >
                    {oil.title}
                  </AffiliateTrackedLink>
                </h3>
                <p className="line-clamp-3 text-sm text-stone-600">{oil.pairingNote}</p>
                <p className="text-lg font-semibold text-stone-800">{formatOilPrice(oil.listPrice)}</p>
                <AffiliateTrackedLink
                  href={href}
                  merchant="KitchenOne"
                  placement="olie-leksikon-grid-cta"
                  slug={slug}
                  hub={hub}
                  className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
                >
                  Se hos KitchenOne
                </AffiliateTrackedLink>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
