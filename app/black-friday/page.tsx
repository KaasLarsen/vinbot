import type { Metadata } from "next";
import Link from "next/link";

import { BlackFridayDealTabs } from "@/components/black-friday-deal-tabs";
import { BlackFridayStoreGrid } from "@/components/black-friday-store-grid";
import { SeasonWineCalculator } from "@/components/season-wine-calculator";
import { BlackFridayPriceCheck } from "@/components/black-friday-price-check";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { BreadcrumbJsonLd, CollectionPageJsonLd, FaqJsonLd } from "@/components/json-ld";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
import { PageShell } from "@/components/page-shell";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import {
  blackFridayHeroCopy,
  getBlackFridayPhase,
  nextBlackFridayYear,
} from "@/lib/black-friday/phase";
import { wineMerchantFeedCount } from "@/lib/black-friday/merchant-count";
import { isBubblesDeal, isJulevinDeal, pickTopByDiscount } from "@/lib/black-friday/filters";
import { listBlackFridayHubGuides } from "@/lib/content/guides";
import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard } from "@/lib/deals/types";
import { copenhagenParts } from "@/lib/home-moment";
import { listBlackFridayStoreTeaser } from "@/lib/black-friday/store-directory";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Black Friday vin tilbud 2026 — sammenlign ægte vintilbud";
const PAGE_DESCRIPTION =
  "Spar penge på vin Black Friday: vi scanner danske vinforhandlere, viser nedsættelser og prisforskelle, og hjælper dig med billig julevin og bobler til nytår. Opdateres løbende.";
const PAGE_URL = `${siteUrl}/black-friday`;

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

export const revalidate = 3600;
export const maxDuration = 60;

const BF_FAQ = [
  {
    question: "Hvordan finder Vinbot Black Friday vin-tilbud?",
    answer:
      "Vi henter priser fra danske vinforhandleres affiliate-feeds og viser både nedsættelser med før-pris i shop og prisforskelle på samme flaske på tværs. Vi sælger ikke selv vinen.",
  },
  {
    question: "Er rabatprocenten en ægte historisk besparelse?",
    answer:
      "Ikke nødvendigvis. «Nedsat i shop» bygger på butikkens egen før-pris i feedet. «Billigst på tværs» betyder, at en anden forhandler har samme vin dyrere lige nu. Vi påstår ikke laveste pris i 6 måneder, før vi har nok pris-historik.",
  },
  {
    question: "Hvor ofte opdateres Black Friday-hubben?",
    answer:
      "Siden caches typisk hver time. Under Black Week revaliderer vi feeds oftere. Tilbud og lager kan skifte mellem to opdateringer — tjek altid hos forhandleren.",
  },
] as const;

export default async function BlackFridayHubPage() {
  const now = new Date();
  const parts = copenhagenParts(now);
  const phase = getBlackFridayPhase(now);
  const merchantCount = wineMerchantFeedCount();
  const copyYear = phase === "offseason" ? nextBlackFridayYear(parts) : parts.year;
  const copy = blackFridayHeroCopy(phase, copyYear, merchantCount);

  const [feedDealsRaw, crossDealsRaw] = await Promise.all([
    listFeedDeals({ limit: 120, minDiscount: 10 }),
    listCrossMerchantDeals({ limit: 80, minSavingsPercent: 12 }),
  ]);

  const feedDeals = feedDealsRaw.map(feedDealToCard);
  const crossDeals = crossDealsRaw.map(crossMerchantDealToCard);
  const shopDeals = pickTopByDiscount(feedDeals, 24);
  const crossTop = pickTopByDiscount(crossDeals, 24);
  const julevinDeals = pickTopByDiscount([...feedDeals, ...crossDeals].filter(isJulevinDeal), 18);
  const bubblesDeals = pickTopByDiscount([...feedDeals, ...crossDeals].filter(isBubblesDeal), 18);

  const guides = listBlackFridayHubGuides();
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Black Friday vin", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={[
          ...shopDeals.slice(0, 8).map((d) => ({ name: d.title, url: d.url })),
          ...guides.map((g) => ({ name: g.title, url: `${siteUrl}/guides/${g.slug}` })),
        ]}
      />
      <FaqJsonLd items={[...BF_FAQ]} />

      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/black-friday", label: "Black Friday" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-800/90">{copy.kicker}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">{copy.h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">{copy.lead}</p>
      </header>

      <div className="mt-8 max-w-xl rounded-2xl border border-rose-200/80 bg-rose-50/60 p-5 sm:p-6">
        <NewsletterSignupForm
          variant="section"
          source="black-friday"
          heading={copy.ctaTitle}
          hint={copy.ctaHint}
        />
      </div>

      <PartnerAdsLeaderboard className="mt-8" hub="black-friday" slug="black-friday-hub" />

      <section className="mt-14" aria-labelledby="bf-stores-heading">
        <h2 id="bf-stores-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
          Vinbutikker
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-stone-600">
          Et samlet overblik over danske vinbutikker — så du hurtigt kan finde rundt, når Black Friday nærmer sig.
        </p>
        <div className="mt-8">
          <BlackFridayStoreGrid stores={listBlackFridayStoreTeaser(12)} teaserHref="/black-friday/butikker" />
        </div>
      </section>

      <div className="mt-14">
        <SeasonWineCalculator
          heading="Julevin- og nytårsvins-beregner"
          intro="Hvor meget skal I købe, og hvilke aktuelle flasker passer? Tre klik — så matcher vi gæster og budget med vine til salg nu."
        />
      </div>

      <div className="mt-14">
        <BlackFridayDealTabs
          shopDeals={shopDeals}
          crossDeals={crossTop}
          julevinDeals={julevinDeals}
          bubblesDeals={bubblesDeals}
        />
      </div>

      <div className="mt-16">
        <BlackFridayPriceCheck />
      </div>

      <section className="mt-16 max-w-3xl space-y-10 text-stone-700" aria-labelledby="bf-guide-heading">
        <h2 id="bf-guide-heading" className="text-2xl font-semibold text-stone-900">
          Forbrugerguide: Black Friday vin tilbud 2026
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-stone-900">Sådan spotter du falske vintilbud på Black Friday</h3>
          <p className="leading-relaxed">
            En høj procent er ikke det samme som en god pris. Butikkens «før-pris» kan være sat op kort før kampagnen.
            Sammenlign slutprisen på tværs — og kig på den grønne pil, når samme flaske er billigere et andet sted. Læs
            også{" "}
            <Link href="/guides/vin-tilbud-og-foer-pris" className="font-medium text-rose-900 hover:underline">
              guiden om vin-tilbud og før-pris
            </Link>
            .
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-stone-900">Hvor meget vin skal du købe ind til juleaften?</h3>
          <p className="leading-relaxed">
            En tommelfingerregel er omkring en halv flaske vin pr. voksen til et langt julemåltid, plus dessertvin. Brug{" "}
            <Link href="/julevin-beregner" className="font-medium text-rose-900 hover:underline">
              julevin-beregneren
            </Link>{" "}
            til antal flasker og konkrete tilbud, eller se{" "}
            <Link href="/guides/vin-til-juleaften" className="font-medium text-rose-900 hover:underline">
              vin til juleaften
            </Link>
            . Til and og flæskesteg rammer du ofte rigtigt med saftig rød med syre (pinot, gamay, chianti) — kraftig julevin er et tilvalg.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-stone-900">Hvilke vintyper trender i år?</h3>
          <p className="leading-relaxed">
            Til jul ser vi fortsat Amarone, Rioja reserva, Ribera del Duero og Rhône. Til nytår er det champagne, cava og
            crémant, der fylder indkøbskurven. Brug pris-tjekkeren, hvis du har set et «kun hos os»-tilbud — og se{" "}
            <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="font-medium text-rose-900 hover:underline">
              vin til nytår
            </Link>
            .
          </p>
        </div>
      </section>

      {cards.length > 0 ? (
        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-stone-900">Guides til jul, nytår og tilbud</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Dybdegående læsning, hvis du vil planlægge indkøb — ikke kun jagte procenten.
          </p>
          <GuideHubBrowser guides={cards} />
        </div>
      ) : null}

      <GuideTopicHubExtras
        hub="black-friday"
        slug="black-friday-hub"
        products={[
          { productKey: "faustino-1-gran-reserva", heading: "Rioja — Faustino I Gran Reserva (sammenlign priser)" },
          { productKey: "duc-de-foix-cava-brut", heading: "Bobler — Duc de Foix Cava Brut" },
        ]}
        seoHeading="Black Friday på Vinbot — uvildigt overblik"
      >
        <p>
          Vinbot er en prissammenligning og aggregator. Du handler hos forhandleren via affiliate-links. Se også{" "}
          <Link href="/tilbud" className="text-rose-900 hover:underline">
            alle vintilbud
          </Link>{" "}
          og{" "}
          <Link href="/saeson" className="text-rose-900 hover:underline">
            sæson-hubben
          </Link>
          .
        </p>
      </GuideTopicHubExtras>
    </PageShell>
  );
}
