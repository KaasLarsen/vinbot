"use client";

import Link from "next/link";

import { MerchantAffiliateOutboundLink } from "@/components/merchant-affiliate-outbound-link";
import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig, merchantPartnerAdsClickUrl } from "@/lib/wine-detail-pages/merchants";
import { wineDetailSlugForProductUrl } from "@/lib/wine-detail-pages/registry";
import type { MerchantFeaturedPick } from "@/lib/merchant-featured-picks";
import { trackAffiliateClick } from "@/lib/affiliate-track";

const linkRel = "nofollow sponsored noopener noreferrer";

const IMAGE_FRAME =
  "mx-auto mt-3 flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-40";

export type MerchantFeaturedPicksVariant = "hub" | "home";

export function MerchantFeaturedPicks({
  merchantId,
  picks,
  variant = "hub",
}: {
  merchantId: MerchantWineId;
  picks: MerchantFeaturedPick[];
  variant?: MerchantFeaturedPicksVariant;
}) {
  if (picks.length === 0) return null;

  const cfg = getMerchantWineConfig(merchantId);
  const headingId = variant === "home" ? `home-${merchantId}-featured-heading` : `${merchantId}-featured-heading`;
  const gridClass =
    variant === "home" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4" : "grid gap-6 sm:grid-cols-2";

  return (
    <section className="mt-14 space-y-6" aria-labelledby={headingId}>
      <div>
        <h2 id={headingId} className="text-2xl font-semibold text-stone-900">
          {variant === "home"
            ? `Udvalgte flasker hos ${cfg.displayName}`
            : `Udvalgte favoritter hos ${cfg.displayName}`}
        </h2>
        <p className="mt-2 text-stone-700">
          {variant === "home" ? (
            <>
              Et kort redaktionelt udpluk — du handler på deres site. Links er affiliate.{" "}
              <Link href={cfg.hubPath} className="text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Mere om butikken
              </Link>
              .
            </>
          ) : (
            "Et lille udpluk vi gerne fremhæver — du handler altid på deres site. Links er affiliate."
          )}
        </p>
      </div>
      <ul className={gridClass}>
        {picks.map((pick) => {
          const clean = cfg.sanitizeProductUrl(pick.productUrl);
          const href = pick.directLink ? clean : merchantPartnerAdsClickUrl(merchantId, clean);
          const onClick = () =>
            trackAffiliateClick({
              merchant: cfg.displayName,
              placement: variant === "home" ? `home-${merchantId}-featured` : `hub-${merchantId}-featured`,
              url: href,
            });
          const detailSlug = pick.directLink ? undefined : wineDetailSlugForProductUrl(merchantId, pick.productUrl);
          return (
            <li key={pick.productUrl}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md">
                <a href={href} target="_blank" rel={linkRel} onClick={onClick} className={IMAGE_FRAME}>
                  {pick.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pick.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
                  ) : (
                    <div className="px-2 text-center text-xs text-stone-400">{cfg.displayName}</div>
                  )}
                </a>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">{cfg.displayName}</p>
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug text-stone-900">
                    <a href={href} target="_blank" rel={linkRel} onClick={onClick} className="hover:underline">
                      {pick.title}
                    </a>
                  </h3>
                  {pick.blurb ? <p className="line-clamp-3 text-sm text-stone-600">{pick.blurb}</p> : null}
                  {detailSlug ? (
                    <p className="text-sm">
                      <Link
                        href={`${cfg.hubPath}/vin/${detailSlug}`}
                        className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                      >
                        Læs Vinbots side om vinen →
                      </Link>
                    </p>
                  ) : null}
                  <MerchantAffiliateOutboundLink
                    merchantId={merchantId}
                    productUrl={pick.productUrl}
                    placement={`${merchantId}-featured-cta`}
                    className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
                  >
                    Se hos {cfg.displayName}
                  </MerchantAffiliateOutboundLink>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** @deprecated Brug MerchantFeaturedPicks med merchantId="den-sidste-flaske". */
export function DsfFeaturedPicks({
  picks,
  variant = "hub",
}: {
  picks: Omit<MerchantFeaturedPick, "merchantId">[];
  variant?: MerchantFeaturedPicksVariant;
}) {
  const withMerchant = picks.map((p) => ({ ...p, merchantId: "den-sidste-flaske" as const }));
  return <MerchantFeaturedPicks merchantId="den-sidste-flaske" picks={withMerchant} variant={variant} />;
}
