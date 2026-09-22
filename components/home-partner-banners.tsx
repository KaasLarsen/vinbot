"use client";

import Link from "next/link";
import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_PARTNER_ID, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";

const BANNERS = [
  {
    id: "108308",
    placement: "home-partner-banner-a",
    merchant: "DH Wines",
    blurb: "Håndplukket vin og spiritus til fest og hverdag.",
    hubHref: "/dh-wines",
  },
  {
    id: "94900",
    placement: "home-partner-banner-b",
    merchant: "Den Sidste Flaske",
    blurb: "Stort online-udvalg med stærke anmeldelser.",
    hubHref: "/den-sidste-flaske",
  },
] as const;

const linkRel = "nofollow sponsored noopener noreferrer";

function bannerSrc(bannerId: string) {
  return `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ADS_PARTNER_ID}&bannerid=${bannerId}`;
}

function PartnerBannerTile({
  bannerId,
  placement,
  merchant,
  blurb,
  hubHref,
}: {
  bannerId: string;
  placement: string;
  merchant: string;
  blurb: string;
  hubHref: string;
}) {
  const href = usePartnerAdsHref(partnerAdsKlikUrl(bannerId));
  const src = bannerSrc(bannerId);

  return (
    <li className="flex flex-col">
      <div className="mb-3">
        <p className="text-base font-semibold text-stone-900">{merchant}</p>
        <p className="mt-1 text-sm text-stone-600">{blurb}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel={linkRel}
        onClick={() =>
          trackAffiliateClick({
            merchant,
            placement,
            slug: "home",
            url: href,
          })
        }
        className="group relative mx-auto block w-fit overflow-hidden rounded-xl bg-stone-100/80 ring-1 ring-stone-200/90 transition duration-300 hover:-translate-y-0.5 hover:ring-rose-300/80 hover:shadow-md"
        aria-label={`Besøg ${merchant} (annonceret)`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Partner-Ads leverer banner dynamisk */}
        <img
          src={src}
          alt=""
          className="h-auto w-[10rem] object-contain transition duration-300 group-hover:opacity-95 sm:w-[11rem]"
          width={160}
          height={600}
        />
      </a>
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <a
          href={href}
          target="_blank"
          rel={linkRel}
          onClick={() =>
            trackAffiliateClick({
              merchant,
              placement: `${placement}-cta`,
              slug: "home",
              url: href,
            })
          }
          className="font-semibold text-rose-900 hover:underline"
        >
          Gå til shop →
        </a>
        <Link href={hubHref} className="text-stone-600 underline decoration-stone-300 underline-offset-2 hover:text-stone-900">
          Læs mere på Vinbot
        </Link>
      </div>
    </li>
  );
}

/** Partner-Ads-bannere som en del af forsideindholdet (ikke floating side-rails). */
export function HomePartnerBanners() {
  return (
    <section className="mt-14" aria-labelledby="home-partner-banners-heading">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">
          Affiliate · støtter Vinbot
        </p>
        <h2
          id="home-partner-banners-heading"
          className="mt-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
        >
          Udvalgte partnere
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Aktuelle tilbud fra partnerbutikker — samme type indhold som resten af forsiden, bare med shop-link.
        </p>
      </div>

      <ul className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:max-w-3xl">
        {BANNERS.map((banner) => (
          <PartnerBannerTile
            key={banner.id}
            bannerId={banner.id}
            placement={banner.placement}
            merchant={banner.merchant}
            blurb={banner.blurb}
            hubHref={banner.hubHref}
          />
        ))}
      </ul>
    </section>
  );
}
