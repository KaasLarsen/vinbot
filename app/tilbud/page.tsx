import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { TilbudPageSections } from "@/components/tilbud-page-sections";
import { BreadcrumbJsonLd, CollectionPageJsonLd, FaqJsonLd } from "@/components/json-ld";
import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listDealMerchants, listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard, type TilbudCardItem } from "@/lib/deals/types";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vin tilbud — overblik over nedsatte vine og prisforskelle";
const PAGE_DESCRIPTION =
  "Find vin på tilbud fra danske netbutikker: nedsatte flasker med før-pris og vine hvor én forhandler er markant billigere. Opdateres automatisk — sammenlign altid slutpris hos butikken.";
const PAGE_URL = `${siteUrl}/tilbud`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    locale: "da_DK",
    type: "website",
  },
};

/** Feed-/katalog-build er for tung til SSG inden for Vercels page-timeout — render on request. */
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MERCHANT_DEAL_LINKS = [
  { href: "/den-sidste-flaske", label: "Den Sidste Flaske" },
  { href: "/winther-vin", label: "Winther Vin" },
  { href: "/lauridsen-vine", label: "Lauridsen Vine" },
  { href: "/dh-wines", label: "DH Wines" },
  { href: "/johnsen-wine", label: "Johnsen Wine" },
  { href: "/havnens-vin", label: "Havnens Vin" },
] as const;

const TILBUD_FAQ = [
  {
    question: "Hvor ofte opdateres vin-tilbud på Vinbot?",
    answer:
      "Tilbud hentes fra forhandlernes affiliate-feeds og opdateres typisk hver 6. time. Kampagner kan starte eller stoppe mellem to opdateringer — tjek altid endelig pris hos butikken.",
  },
  {
    question: "Hvad er forskellen på «nedsat i shop» og «billigst på tværs»?",
    answer:
      "Nedsat i shop viser varer med før-pris og kampagnepris hos én forhandler. Billigst på tværs sammenligner samme flaske hos flere butikker i Vinbots katalog og fremhæver den største prisforskel.",
  },
  {
    question: "Er rabatprocenten altid reel?",
    answer:
      "Procenten bygger på før-pris og salgspris i feedet. Før-pris følger butikkens egne regler — sammenlign derfor altid den konkrete slutpris med andre steder. Læs guiden om tilbud og før-pris for flere tips.",
  },
] as const;

function pickFeatured(feedDeals: TilbudCardItem[]): TilbudCardItem[] {
  return feedDeals
    .filter((d) => d.image && d.discountPercent >= 20)
    .sort((a, b) => b.discountPercent - a.discountPercent || a.salePrice - b.salePrice)
    .slice(0, 4);
}

function pickTopFeed(feedDeals: TilbudCardItem[]): TilbudCardItem[] {
  return [...feedDeals]
    .filter((d) => d.discountPercent >= 15)
    .sort((a, b) => b.discountPercent - a.discountPercent)
    .slice(0, 24);
}

function pickBudget(feedDeals: TilbudCardItem[]): TilbudCardItem[] {
  return [...feedDeals]
    .filter((d) => d.salePrice <= 150 && d.discountPercent >= 10)
    .sort((a, b) => b.discountPercent - a.discountPercent || a.salePrice - b.salePrice)
    .slice(0, 24);
}

export default async function TilbudHubPage() {
  const [feedDealsRaw, crossDealsRaw, merchants] = await Promise.all([
    listFeedDeals({ limit: 64, minDiscount: 10 }),
    listCrossMerchantDeals({ limit: 64, minSavingsPercent: 12 }),
    listDealMerchants(),
  ]);

  const feedDeals = feedDealsRaw.map(feedDealToCard);
  const crossDeals = crossDealsRaw.map(crossMerchantDealToCard);
  const allMerchants = [...new Set([...merchants, ...crossDeals.map((d) => d.merchant)])].sort((a, b) =>
    a.localeCompare(b, "da"),
  );

  const featured = pickFeatured(feedDeals);
  const topFeedDeals = pickTopFeed(feedDeals);
  const budgetDeals = pickBudget(feedDeals);
  const crossCarousel = [...crossDeals].sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 24);

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin tilbud", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
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
      <FaqJsonLd items={[...TILBUD_FAQ]} />

      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/tilbud", label: "Vin tilbud" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-800/90">Opdateres ca. hver 6. time</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">Vin tilbud</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Overblik over <strong className="font-medium text-stone-800">vin på tilbud</strong> fra danske netbutikker —
          både nedsatte flasker med før-pris og vine, hvor prisen varierer markant mellem forhandlere.
        </p>
      </header>

      <PartnerAdsLeaderboard className="mt-8" />

      <TilbudPageSections
        featured={featured}
        topFeedDeals={topFeedDeals}
        crossDealsCarousel={crossCarousel}
        budgetDeals={budgetDeals}
        feedDeals={feedDeals}
        crossDeals={crossDeals}
        merchants={allMerchants}
      />

      <section className="mt-16 prose prose-stone max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-rose-900">
        <h2 className="text-2xl text-stone-900">Sådan finder du de bedste vin-tilbud online</h2>
        <p className="text-stone-700 leading-relaxed">
          Danske vin-shops kører løbende kampagner med procent-rabat, kassepriser og tidsbegrænsede tilbud. Problemet er
          sjældent mangel på tilbud — det er at finde ud af, om prisen faktisk er god. Vinbot samler data fra
          forhandlernes produktfeeds, så du kan se både <strong>nedsættelser hos én butik</strong> og{" "}
          <strong>prisforskelle på samme flaske</strong> hos flere shops i ét overblik.
        </p>
        <h3 className="text-xl text-stone-900">To typer tilbud på denne side</h3>
        <ul className="text-stone-700">
          <li>
            <strong>Nedsat i shop</strong> — flasker med både salgspris og før-pris i feedet (typisk «nypris» og
            «glpris» hos Partner-Ads-forhandlere).
          </li>
          <li>
            <strong>Billigst på tværs</strong> — samme vin grupperet i{" "}
            <Link href="/vine">vin-kataloget</Link>, hvor én forhandler er markant billigere end andre lige nu.
          </li>
        </ul>
        <p className="text-stone-700 leading-relaxed">
          Brug sektionerne ovenfor til at browse hurtigt, eller scroll ned til søgning og filtrering. Vil du forstå
          før-pris og procenter bedre, læs{" "}
          <Link href="/guides/vin-tilbud-og-foer-pris">guiden til tilbud og før-pris</Link>. Rabatkoder og
          nyhedsbreve findes på <Link href="/rabatkoder">rabatkoder</Link>.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8" aria-labelledby="tilbud-faq-heading">
        <h2 id="tilbud-faq-heading" className="text-xl font-semibold text-stone-900">
          Ofte stillede spørgsmål om vin-tilbud
        </h2>
        <dl className="mt-5 space-y-6">
          {TILBUD_FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-stone-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6" aria-labelledby="tilbud-shops-heading">
        <h2 id="tilbud-shops-heading" className="text-lg font-semibold text-stone-900">
          Forhandlere med tilbud og kampagner
        </h2>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {MERCHANT_DEAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-medium text-rose-900 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/rabatkoder" className="font-medium text-rose-900 hover:underline">
              Rabatkoder
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 text-sm leading-relaxed text-stone-700">
        <p>
          <strong className="font-medium text-stone-900">Forbehold:</strong> Tilbud kan udløbe mellem opdateringer.
          Før-pris i feeds følger butikkens egne regler — sammenlign altid den konkrete slutpris inkl. fragt. Vinbot
          sælger ikke vin; links kan være affiliate.
        </p>
      </section>

    </PageShell>
  );
}
