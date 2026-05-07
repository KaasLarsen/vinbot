"use client";

import Link from "next/link";
import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

const linkRel = "nofollow sponsored noopener noreferrer";

type Store = {
  id: string;
  name: string;
  blurb: string;
  href: string;
  readMoreHref?: string;
  readMoreLabel?: string;
};

const STORES: Store[] = [
  {
    id: "lauridsen",
    name: "Lauridsen Vine",
    blurb: "Stort europæisk sortiment — særligt stærkt til regioner og klassikere.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/"),
    readMoreHref: "/lauridsen-vine",
    readMoreLabel: "Læs om Vinbot × Lauridsen",
  },
  {
    id: "winther",
    name: "Winther Vin",
    blurb: "Bland selv, mange kampagner — godt til pris og fest.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.wintherVin, "https://winthervin.dk/"),
  },
  {
    id: "dh",
    name: "DH Wines",
    blurb: "Håndplukket udvalg til mad og hverdag.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.dhWines, "https://dhwines.dk/"),
  },
  {
    id: "johnsen",
    name: "Johnsen Wine",
    blurb: "Kurateret sortiment når du vil dykke dybere.",
    href: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.johnsenWine, "https://www.johnsenwine.dk/"),
  },
];

export function FeaturedAffiliateStores() {
  return (
    <section className="mt-14 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-rose-50/50 p-6 shadow-sm ring-1 ring-stone-200/70 sm:p-8" aria-labelledby="featured-stores-heading">
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">Affiliate · støtter Vinbot</p>
      <h2 id="featured-stores-heading" className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
        Udvalgte forhandlere
      </h2>
      <p className="mt-2 max-w-3xl text-xs text-stone-600">
        Shop-links er markeret som <span className="font-medium text-stone-700">affiliate</span>. Se hvordan det er beskrevet under{" "}
        <Link href="/privatliv" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
          privatliv
        </Link>{" "}
        — rabatter og nyhedsbreve under{" "}
        <Link href="/rabatkoder" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
          rabatkoder
        </Link>
        .
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STORES.map((s) => (
          <li
            key={s.id}
            className="flex flex-col rounded-xl border border-stone-200/90 bg-white/90 p-4 shadow-sm transition hover:border-rose-200/80 hover:shadow"
          >
            <p className="text-base font-semibold text-stone-900">{s.name}</p>
            <p className="mt-2 flex-1 text-sm text-stone-600">{s.blurb}</p>
            <a
              href={s.href}
              target="_blank"
              rel={linkRel}
              onClick={() =>
                trackAffiliateClick({
                  merchant: s.name,
                  placement: `home-featured-store-${s.id}`,
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
