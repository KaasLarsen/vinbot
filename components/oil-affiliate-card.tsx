"use client";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";
import { formatOilPrice, oilAffiliateHref, type OilPick } from "@/lib/oils/catalog";

const PROFILE_LABEL: Record<OilPick["profile"], string> = {
  mild: "Mild / grøn",
  kraftig: "Kraftig EVOO",
  urte: "Urte / finish",
  citrus: "Citrus",
  troffel: "Trøffel",
};

const IMAGE_FRAME =
  "flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white sm:size-36";

type Props = {
  oil: OilPick;
  heading: string;
  placement: string;
  slug?: string;
  hub?: string;
  className?: string;
};

/** Kompakt olie-anbefaling hos KitchenOne (ikke vinsøgning). */
export function OilAffiliateCard({
  oil,
  heading,
  placement,
  slug = "",
  hub = "",
  className = "",
}: Props) {
  const href = oilAffiliateHref(oil);

  return (
    <aside className={`overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <AffiliateTrackedLink
          href={href}
          merchant="KitchenOne"
          placement={placement}
          slug={slug}
          hub={hub}
          className={IMAGE_FRAME}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={oil.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
        </AffiliateTrackedLink>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800/90">{heading}</p>
          <p className="mt-1 text-xs font-medium text-emerald-900/80">
            {PROFILE_LABEL[oil.profile]}
            {!oil.inStock ? " · ikke på lager" : ""}
          </p>
          <p className="mt-2 text-lg font-semibold text-stone-900">{oil.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-700">{oil.pairingNote}</p>
          <p className="mt-2 text-base font-semibold text-stone-800">{formatOilPrice(oil.listPrice)}</p>
          <AffiliateTrackedLink
            href={href}
            merchant="KitchenOne"
            placement={placement}
            slug={slug}
            hub={hub}
            className="mt-4 inline-flex rounded-lg bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
          >
            Se hos KitchenOne
          </AffiliateTrackedLink>
          <p className="mt-3 text-xs text-stone-500">
            Annoncelink via partner — du handler hos KitchenOne. Pris og lager kan have ændret sig. Vin købes separat.
          </p>
        </div>
      </div>
    </aside>
  );
}
