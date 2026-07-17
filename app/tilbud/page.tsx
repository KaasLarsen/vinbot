import Link from "next/link";
import type { Metadata } from "next";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { TilbudHubBrowser } from "@/components/tilbud-hub-browser";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listDealMerchants, listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard } from "@/lib/deals/types";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vin tilbud — overblik over nedsatte vine og prisforskelle";
const PAGE_DESCRIPTION =
  "Se aktuelle vin-tilbud fra danske netbutikker og find flasker, hvor én forhandler er markant billigere end andre. Automatisk opdateret fra affiliate-feeds — tjek altid endelig pris hos butikken.";
const PAGE_URL = `${siteUrl}/tilbud`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export const revalidate = 21600;
export const maxDuration = 60;

const MERCHANT_DEAL_LINKS = [
  { href: "/den-sidste-flaske", label: "Den Sidste Flaske" },
  { href: "/winther-vin", label: "Winther Vin" },
  { href: "/lauridsen-vine", label: "Lauridsen Vine" },
  { href: "/dh-wines", label: "DH Wines" },
  { href: "/johnsen-wine", label: "Johnsen Wine" },
  { href: "/havnens-vin", label: "Havnens Vin" },
] as const;

export default async function TilbudHubPage() {
  const [feedDealsRaw, crossDealsRaw, merchants] = await Promise.all([
    listFeedDeals({ limit: 48, minDiscount: 10 }),
    listCrossMerchantDeals({ limit: 48, minSavingsPercent: 15 }),
    listDealMerchants(),
  ]);

  const feedDeals = feedDealsRaw.map(feedDealToCard);
  const crossDeals = crossDealsRaw.map(crossMerchantDealToCard);
  const allMerchants = [...new Set([...merchants, ...crossDeals.map((d) => d.merchant)])].sort((a, b) =>
    a.localeCompare(b, "da"),
  );

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin tilbud", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={[
          ...feedDeals.slice(0, 12).map((d) => ({ name: d.title, url: d.url })),
          ...crossDeals.slice(0, 12).map((d) => ({
            name: d.title,
            url: d.catalogSlug ? `${siteUrl}/vine/${d.catalogSlug}` : d.url,
          })),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/tilbud", label: "Vin tilbud" }]} />

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin tilbud</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Et samlet overblik over <strong className="font-medium text-stone-800">nedsatte vine</strong> fra Vinbots
        forhandlere og flasker, hvor prisen varierer markant mellem butikker. Data kommer automatisk fra feeds og
        opdateres ca. hver 6. time — brug det som udgangspunkt, og tjek altid endelig pris hos forhandleren.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Læs også{" "}
        <Link href="/guides/vin-tilbud-og-foer-pris" className="text-rose-900 hover:underline">
          guiden til tilbud og før-pris
        </Link>
        ,{" "}
        <Link href="/rabatkoder" className="text-rose-900 hover:underline">
          rabatkoder
        </Link>{" "}
        og{" "}
        <Link href="/vine" className="text-rose-900 hover:underline">
          vin-kataloget
        </Link>
        .
      </p>

      <PartnerAdsLeaderboard className="mt-8" />

      <section className="mt-10" aria-labelledby="tilbud-browser-heading">
        <h2 id="tilbud-browser-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
          Aktuelle tilbud
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          «Nedsatte i shop» viser varer med før-pris i feedet. «Billigst på tværs» sammenligner samme flaske hos
          flere forhandlere i Vinbots katalog.
        </p>
        <div className="mt-6">
          <TilbudHubBrowser feedDeals={feedDeals} crossDeals={crossDeals} merchants={allMerchants} />
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50/80 p-6" aria-labelledby="tilbud-shops-heading">
        <h2 id="tilbud-shops-heading" className="text-lg font-semibold text-stone-900">
          Forhandlere med tilbud og kampagner
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {MERCHANT_DEAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-rose-900 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/rabatkoder" className="text-rose-900 hover:underline">
              Rabatkoder
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 text-sm text-stone-700">
        <p>
          <strong className="font-medium text-stone-900">Forbehold:</strong> Tilbud kan udløbe mellem opdateringer.
          «Før-pris» i feeds følger butikkens egne regler — sammenlign altid den konkrete slutpris. Vinbot sælger
          ikke vin; links er affiliate.
        </p>
      </section>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>
    </div>
  );
}
