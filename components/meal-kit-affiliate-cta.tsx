"use client";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";
import { pickMealKitPartner } from "@/lib/meal-kit-partners";

type Props = {
  /** Stabil nøgle til partner-rotation (fx hub-slug). */
  slug: string;
  hub: string;
  className?: string;
};

/**
 * Blød affiliate-CTA til madkasse-partnere uden produktfeed.
 * Roterer HelloFresh / BetterFeast / Factor ud fra slug.
 */
export function MealKitAffiliateCta({ slug, hub, className = "" }: Props) {
  const partner = pickMealKitPartner(slug);

  return (
    <aside
      className={`rounded-xl border border-stone-200/90 bg-white px-4 py-4 shadow-sm sm:px-5 ${className}`.trim()}
      aria-label={`Affiliate-anbefaling: ${partner.name}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Anbefaling · affiliate</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-700">
        <strong className="font-semibold text-stone-900">{partner.name}</strong> — {partner.body}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <AffiliateTrackedLink
          href={partner.href}
          merchant={partner.name}
          placement="meal-kit-cta"
          slug={slug}
          hub={hub}
          className="inline-flex rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          {partner.ctaLabel}
        </AffiliateTrackedLink>
        <span className="text-xs text-stone-500">Åbner i nyt vindue · provision til Vinbot mulig</span>
      </div>
    </aside>
  );
}
