"use client";

import Image from "next/image";
import Link from "next/link";
import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

const WINTHER_LOGO = "/images/merchants/winther-vin.jpg";
const WINTHER_SHOP = "https://winthervin.dk/";

/** Fremhævet affiliate-anbefaling på forsiden (Winther erstatter DSF). */
export function CampaignBanner() {
  const shopAffiliateHref = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.wintherVin, WINTHER_SHOP);

  return (
    <section className="mt-10 rounded-2xl border border-rose-200 bg-rose-950 px-6 py-8 text-rose-50 shadow-md sm:px-8">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-200/90">Anbefalet</p>
          <h2 className="mt-2 text-2xl font-semibold">Winther Vin</h2>
          <p className="mt-3 max-w-2xl text-rose-100/95">
            Stort sortiment, kampagner og mulighed for at blande din egen kasse — et stærkt sted at shoppe videre,
            når Vinbot har hjulpet dig med stil, mad eller budget.
          </p>
          <AffiliateTrackedLink
            href={shopAffiliateHref}
            merchant="Winther Vin"
            placement="campaign-banner"
            className="mt-5 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-rose-950 hover:bg-rose-100"
          >
            Gå til Winther Vin
          </AffiliateTrackedLink>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-rose-200/90">
            <Link
              href="/winther-vin"
              className="font-medium text-white underline decoration-rose-300/70 underline-offset-2 hover:decoration-white"
            >
              Inspiration og købstips på Vinbot
            </Link>
            <span className="text-rose-200/75"> · Åbner i nyt vindue.</span>
          </p>
        </div>

        <div className="flex shrink-0 items-center pt-1">
          <Image
            src={WINTHER_LOGO}
            alt="Winther Vin logo"
            width={270}
            height={90}
            className="h-14 w-auto max-w-[160px] object-contain opacity-95 sm:h-16 sm:max-w-[200px] md:h-20 md:max-w-[240px]"
            sizes="(min-width: 768px) 240px, 160px"
          />
        </div>
      </div>
    </section>
  );
}
