"use client";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_PARTNER_ID, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import type { MerchantHubDisplayBanner } from "@/lib/merchant-hubs/types";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";

const linkRel = "nofollow sponsored noopener noreferrer";

function bannerSrc(bannerId: string) {
  return `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ADS_PARTNER_ID}&bannerid=${bannerId}`;
}

function DisplayBannerLink({
  banner,
  merchant,
  slug,
}: {
  banner: MerchantHubDisplayBanner;
  merchant: string;
  slug: string;
}) {
  const href = usePartnerAdsHref(partnerAdsKlikUrl(banner.bannerId));
  const isSky = banner.variant === "skyscraper";

  return (
    <a
      href={href}
      target="_blank"
      rel={linkRel}
      onClick={() =>
        trackAffiliateClick({
          merchant,
          placement: `merchant-hub-display-${banner.bannerId}`,
          slug,
        })
      }
      className="inline-block overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-sm ring-1 ring-stone-100 transition hover:border-rose-200/80 hover:shadow-md"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Partner-Ads visbanner er dynamisk GIF/JPEG */}
      <img
        src={bannerSrc(banner.bannerId)}
        alt={banner.alt}
        width={isSky ? 160 : 320}
        height={isSky ? 600 : 160}
        className={isSky ? "h-auto w-28 sm:w-40" : "h-auto w-full max-w-[320px]"}
        loading="lazy"
      />
    </a>
  );
}

/** Partner-Ads display-kreativer på merchant-hub (fx Løvegården). */
export function MerchantHubDisplayBanners({
  banners,
  merchant,
  slug,
}: {
  banners: MerchantHubDisplayBanner[];
  merchant: string;
  slug: string;
}) {
  if (banners.length === 0) return null;

  return (
    <section className="mt-10" aria-label={`Annoncer fra ${merchant}`}>
      <div className="flex flex-wrap items-start justify-center gap-6 sm:justify-start">
        {banners.map((banner) => (
          <DisplayBannerLink key={banner.bannerId} banner={banner} merchant={merchant} slug={slug} />
        ))}
      </div>
    </section>
  );
}
