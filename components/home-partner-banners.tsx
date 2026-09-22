"use client";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_PARTNER_ID, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";

const BANNERS = [
  { id: "108308", placement: "home-partner-banner-a" },
  { id: "94900", placement: "home-partner-banner-b" },
] as const;

const linkRel = "nofollow sponsored noopener noreferrer";

function bannerSrc(bannerId: string) {
  return `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ADS_PARTNER_ID}&bannerid=${bannerId}`;
}

function PartnerBannerTile({
  bannerId,
  placement,
}: {
  bannerId: string;
  placement: string;
}) {
  const href = usePartnerAdsHref(partnerAdsKlikUrl(bannerId));
  const src = bannerSrc(bannerId);

  return (
    <a
      href={href}
      target="_blank"
      rel={linkRel}
      onClick={() =>
        trackAffiliateClick({
          merchant: "Partner-Ads",
          placement,
          slug: "home",
          url: href,
        })
      }
      className="group block overflow-hidden rounded-2xl bg-white/90 shadow-sm ring-1 ring-stone-200/80 transition hover:shadow-md hover:ring-rose-200/70"
      aria-label="Sponsoreret partnerbanner"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Partner-Ads leverer banner dynamisk */}
      <img
        src={src}
        alt=""
        className="mx-auto h-auto w-full max-w-[10rem] object-contain transition duration-300 group-hover:opacity-95 sm:max-w-[11rem]"
        width={160}
        height={600}
      />
    </a>
  );
}

/** Partner-Ads-bannere som en del af forsideindholdet (ikke floating side-rails). */
export function HomePartnerBanners() {
  return (
    <section
      className="mt-14 overflow-hidden rounded-2xl border border-stone-200/80 bg-gradient-to-br from-stone-50 via-white to-rose-50/40 px-5 py-8 sm:px-8 sm:py-10"
      aria-labelledby="home-partner-banners-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Sponsoreret · støtter Vinbot
        </p>
        <h2
          id="home-partner-banners-heading"
          className="mt-2 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
        >
          Udvalgte partnere
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Annoncer fra vores affiliate-partnere — indgår i forsiden på lige fod med resten af indholdet.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-center gap-5 sm:gap-8">
        {BANNERS.map((banner) => (
          <PartnerBannerTile key={banner.id} bannerId={banner.id} placement={banner.placement} />
        ))}
      </div>
    </section>
  );
}
