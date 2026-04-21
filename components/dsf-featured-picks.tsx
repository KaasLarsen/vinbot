"use client";

import Link from "next/link";
import { partnerAdsDsfClickUrl } from "@/lib/site";
import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { trackAffiliateClick } from "@/lib/affiliate-track";

const IMAGE_FRAME =
  "mx-auto mt-3 flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-40";

const linkRel = "nofollow sponsored noopener noreferrer";

export type DsfFeaturedPicksVariant = "hub" | "home";

export function DsfFeaturedPicks({
  picks,
  variant = "hub",
}: {
  picks: DsfFeaturedPick[];
  variant?: DsfFeaturedPicksVariant;
}) {
  if (picks.length === 0) return null;

  const headingId = variant === "home" ? "home-dsf-featured-heading" : "dsf-featured-heading";
  const gridClass =
    variant === "home" ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4" : "grid gap-6 sm:grid-cols-2";

  return (
    <section className="mt-14 space-y-6" aria-labelledby={headingId}>
      <div>
        <h2 id={headingId} className="text-2xl font-semibold text-stone-900">
          {variant === "home" ? "Udvalgte flasker hos Den Sidste Flaske" : "Udvalgte favoritter hos Den Sidste Flaske"}
        </h2>
        <p className="mt-2 text-stone-700">
          {variant === "home" ? (
            <>
              Et kort redaktionelt udpluk — du handler på deres site. Links er affiliate.{" "}
              <Link href="/den-sidste-flaske" className="text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
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
          const href = pick.directLink ? pick.productUrl : partnerAdsDsfClickUrl(pick.productUrl);
          const onClick = () =>
            trackAffiliateClick({
              merchant: "Den Sidste Flaske",
              placement: variant === "home" ? "home-dsf-featured" : "hub-dsf-featured",
              url: href,
            });
          return (
            <li key={pick.productUrl}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md">
                <a href={href} target="_blank" rel={linkRel} onClick={onClick} className={IMAGE_FRAME}>
                  {pick.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pick.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
                  ) : (
                    <div className="px-2 text-center text-xs text-stone-400">Den Sidste Flaske</div>
                  )}
                </a>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">Den Sidste Flaske</p>
                  <h3 className="line-clamp-2 text-base font-semibold leading-snug text-stone-900">
                    <a href={href} target="_blank" rel={linkRel} onClick={onClick} className="hover:underline">
                      {pick.title}
                    </a>
                  </h3>
                  {pick.blurb ? <p className="line-clamp-3 text-sm text-stone-600">{pick.blurb}</p> : null}
                  <a
                    href={href}
                    target="_blank"
                    rel={linkRel}
                    onClick={onClick}
                    className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
                  >
                    Se hos Den Sidste Flaske
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
