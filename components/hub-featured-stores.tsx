"use client";

import Image from "next/image";
import Link from "next/link";
import { trackAffiliateClick } from "@/lib/affiliate-track";
import { hubRotationPool, type HubRotationMerchant } from "@/lib/partner-ads-hub-rotations";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

const linkRel = "nofollow sponsored noopener noreferrer";

type StoreCard = {
  id: HubRotationMerchant;
  name: string;
  blurb: string;
  href: string;
  logoSrc: string;
  logoW: number;
  logoH: number;
  readMoreHref?: string;
  readMoreLabel?: string;
};

const STORES: Record<HubRotationMerchant, StoreCard> = {
  lauridsen: {
    id: "lauridsen",
    name: "Lauridsen Vine",
    blurb: "Stort europæisk sortiment — særligt stærkt til regioner og klassikere.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/"),
    logoSrc: "/images/merchants/lauridsen-vine.png",
    logoW: 400,
    logoH: 120,
    readMoreHref: "/lauridsen-vine",
    readMoreLabel: "Læs om Vinbot × Lauridsen",
  },
  winther: {
    id: "winther",
    name: "Winther Vin",
    blurb: "Bland selv, mange kampagner — godt til pris og fest.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.wintherVin, "https://winthervin.dk/"),
    logoSrc: "/images/merchants/winther-vin.jpg",
    logoW: 270,
    logoH: 90,
    readMoreHref: "/winther-vin",
    readMoreLabel: "Læs om Vinbot × Winther Vin",
  },
  dh: {
    id: "dh",
    name: "DH Wines",
    blurb: "Håndplukket udvalg til mad og hverdag.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.dhWines, "https://dhwines.dk/"),
    logoSrc: "/images/merchants/dh-wines.png",
    logoW: 400,
    logoH: 120,
    readMoreHref: "/dh-wines",
    readMoreLabel: "Læs om Vinbot × DH Wines",
  },
  johnsen: {
    id: "johnsen",
    name: "Johnsen Wine",
    blurb: "Kurateret sortiment når du vil dykke dybere.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.johnsenWine, "https://www.johnsenwine.dk/"),
    logoSrc: "/images/merchants/johnsen-wine.png",
    logoW: 320,
    logoH: 80,
    readMoreHref: "/johnsen-wine",
    readMoreLabel: "Læs om Vinbot × Johnsen Wine",
  },
  dsf: {
    id: "dsf",
    name: "Den Sidste Flaske",
    blurb: "Online vinhandel med bredt udvalg og faste kampagner.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.denSidsteFlaske, "https://densidsteflaske.dk/"),
    logoSrc: "/images/merchants/den-sidste-flaske.png",
    logoW: 225,
    logoH: 225,
    readMoreHref: "/den-sidste-flaske",
    readMoreLabel: "Læs om Vinbot × Den Sidste Flaske",
  },
};

export function HubFeaturedStores({ hub, slug }: { hub: string; slug: string }) {
  const stores = hubRotationPool(hub)
    .map((id) => STORES[id])
    .filter(Boolean)
    .slice(0, 3);

  if (stores.length === 0) return null;

  return (
    <section
      className="mt-12 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-rose-50/50 p-6 shadow-sm ring-1 ring-stone-200/70 sm:p-8"
      aria-labelledby="hub-featured-stores-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">Affiliate · støtter Vinbot</p>
      <h2 id="hub-featured-stores-heading" className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
        Udvalgte forhandlere
      </h2>
      <p className="mt-2 max-w-3xl text-xs text-stone-600">
        Shop-links er markeret som <span className="font-medium text-stone-700">affiliate</span>. Se{" "}
        <Link href="/privatliv" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
          privatliv
        </Link>
        .
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {stores.map((s) => (
          <li
            key={s.id}
            className="flex flex-col rounded-xl border border-stone-200/90 bg-white/90 p-4 shadow-sm transition hover:border-rose-200/80 hover:shadow"
          >
            <div className="flex min-h-[3.25rem] items-center justify-start border-b border-stone-100 pb-3">
              <Image
                src={s.logoSrc}
                alt={`${s.name} logo`}
                width={s.logoW}
                height={s.logoH}
                className="h-10 w-auto max-w-[200px] object-contain object-left"
                sizes="200px"
              />
            </div>
            <p className="mt-3 text-base font-semibold text-stone-900">{s.name}</p>
            <p className="mt-2 flex-1 text-sm text-stone-600">{s.blurb}</p>
            <a
              href={s.href}
              target="_blank"
              rel={linkRel}
              onClick={() =>
                trackAffiliateClick({
                  merchant: s.name,
                  placement: `hub-featured-store-${s.id}`,
                  slug,
                  hub,
                  url: s.href,
                })
              }
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-rose-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-rose-950"
            >
              Gå til shop
            </a>
            {s.readMoreHref ? (
              <Link
                href={s.readMoreHref}
                className="mt-2 text-center text-xs font-medium text-rose-900 underline decoration-rose-200 underline-offset-2"
              >
                {s.readMoreLabel ?? "Læs mere"}
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
