"use client";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";

type Props = {
  beerMeHref: string;
};

export function FooterAffiliatePromos({ beerMeHref }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-3">
      <div className="rounded-xl border border-stone-200/90 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Anbefaling · affiliate</p>
        <p className="mt-2 leading-relaxed text-stone-700">
          <AffiliateTrackedLink
            href={beerMeHref}
            merchant="Beer Me"
            placement="footer-affiliate"
            slug="footer"
            className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
          >
            Specialøl på abonnement hos Beer Me
          </AffiliateTrackedLink>{" "}
          — kuraterede månedskasser fra danske og udenlandske mikrobryggerier, når du vil udforske øl uden for Vinbots vinunivers.
        </p>
      </div>
    </div>
  );
}
