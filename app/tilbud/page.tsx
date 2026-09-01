import Link from "next/link";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { OlVinFacebookCarousel } from "@/components/ol-vin-facebook-carousel";
import { TilbudPageSections } from "@/components/tilbud-page-sections";
import { BreadcrumbJsonLd, CollectionPageJsonLd, FaqJsonLd } from "@/components/json-ld";
import { listCrossMerchantDeals } from "@/lib/deals/cross-merchant";
import { listDealMerchants, listFeedDeals } from "@/lib/deals/engine";
import { crossMerchantDealToCard, feedDealToCard, type TilbudCardItem } from "@/lib/deals/types";
import { OL_VIN_FACEBOOK_POSTS } from "@/lib/social/ol-vin-posts";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vin tilbud — overblik over nedsatte vine og prisforskelle";
const PAGE_DESCRIPTION =
  "Sammenlign vin på tilbud fra danske netbutikker: nedsatte vine med før-pris, rødvin tilbud og prisforskelle på tværs. Opdateres ca. hver 6. time — tjek altid slutpris hos butikken.";
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

/** Feed-/katalog-build er for tung til SSG inden for Vercels page-timeout — cache HTML i 6 timer. */
export const revalidate = 21600;
export const maxDuration = 60;

const MERCHANT_DEAL_LINKS = [
  { href: "/den-sidste-flaske", label: "Den Sidste Flaske" },
  { href: "/winther-vin", label: "Winther Vin" },
  { href: "/lauridsen-vine", label: "Lauridsen Vine" },
  { href: "/dh-wines", label: "DH Wines" },
  { href: "/johnsen-wine", label: "Johnsen Wine" },
  { href: "/havnens-vin", label: "Havnens Vin" },
  { href: "/sps-wine", label: "SPS Wine" },
  { href: "/vinforhandlere", label: "Alle vinforhandlere" },
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
  {
    question: "Hvor kan jeg finde rødvin på tilbud?",
    answer:
      "Rødvin på tilbud dukker ofte op både som nedsættelse i shop og som prisforskel på tværs af forhandlere. Brug søgningen på denne side til at filtrere på producent eller butik, eller browse i vin-kataloget for at sammenligne samme flaske hos flere shops.",
  },
  {
    question: "Hvad er forskellen på vin-tilbud og rabatkoder?",
    answer:
      "Vin-tilbud er nedsatte priser på konkrete flasker i butikkens feed — ofte med før-pris og kampagnepris. Rabatkoder giver en ekstra procent eller fordel i kassen på hele eller dele af sortimentet. Begge kan kombineres, men det afhænger af butikkens regler — tjek altid vilkår hos forhandleren.",
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
    .slice(0, 12);
}

function pickBudget(feedDeals: TilbudCardItem[]): TilbudCardItem[] {
  return [...feedDeals]
    .filter((d) => d.salePrice <= 150 && d.discountPercent >= 10)
    .sort((a, b) => b.discountPercent - a.discountPercent || a.salePrice - b.salePrice)
    .slice(0, 12);
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
  const crossCarousel = [...crossDeals].sort((a, b) => b.discountPercent - a.discountPercent).slice(0, 12);

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

      <section className="mt-6 max-w-md" aria-label="Tilmeld nyhedsbrev">
        <NewsletterSignupForm variant="section" />
      </section>

      <PartnerAdsLeaderboard className="mt-8" />

      <OlVinFacebookCarousel posts={OL_VIN_FACEBOOK_POSTS} />

      <div className="mt-14">
        <TilbudPageSections
          featured={featured}
          topFeedDeals={topFeedDeals}
          crossDealsCarousel={crossCarousel}
          budgetDeals={budgetDeals}
          feedDeals={feedDeals}
          crossDeals={crossDeals}
          merchants={allMerchants}
        />
      </div>

      <section
        className="mt-16 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8"
        aria-labelledby="tilbud-seo-heading"
      >
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-3">
            <h2 id="tilbud-seo-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
              Sådan finder du de bedste vin-tilbud online
            </h2>
            <p className="text-base leading-relaxed text-stone-700">
              Danske vin-shops kører løbende kampagner med procent-rabat, kassepriser og tidsbegrænsede tilbud. Vinbot
              samler priser fra danske netbutikker, så du kan se både <strong className="font-medium">nedsættelser hos én butik</strong>{" "}
              og <strong className="font-medium">prisforskelle på samme flaske</strong> hos flere shops i ét overblik.
            </p>
          </div>

          <div className="space-y-3 border-t border-stone-200/80 pt-8">
            <h3 className="text-lg font-semibold text-stone-900">To typer tilbud på denne side</h3>
            <ul className="space-y-3 text-base leading-relaxed text-stone-700">
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-800/70" aria-hidden />
                <span>
                  <strong className="font-medium text-stone-900">Nedsat i shop</strong> — flasker med både salgspris og
                  før-pris hos butikken (typisk kampagnepris og «før»-pris hos Partner-Ads-forhandlere).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rose-800/70" aria-hidden />
                <span>
                  <strong className="font-medium text-stone-900">Billigst på tværs</strong> — samme vin grupperet i{" "}
                  <Link href="/vine" className="font-medium text-rose-900 hover:underline">
                    vin-kataloget
                  </Link>
                  , hvor én forhandler er markant billigere end andre lige nu.
                </span>
              </li>
            </ul>
          </div>

          <details className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <summary className="cursor-pointer list-none text-base font-semibold text-stone-900 marker:content-none [&::-webkit-details-marker]:hidden">
            Læs mere om vin-tilbud, butikker og tips
            <span className="mt-1 block text-sm font-normal text-stone-600">
              Guide til at vurdere rabatter, populære vin-typer og links til guider.
            </span>
          </summary>
          <div className="mt-6 space-y-8 border-t border-stone-100 pt-6 text-base leading-relaxed text-stone-700">
            <p className="leading-relaxed">
              Når du søger efter <strong>vin på tilbud</strong>, møder du hurtigt mange forskellige tilbudstyper: alt fra
              «30 % på udvalgte vine» til kassepriser, medlemsrabatter og nyhedsbreve med ekstra fordele. Problemet er
              sjældent mangel på tilbud — det er at finde ud af, om prisen faktisk er god.
            </p>
            <p className="leading-relaxed">
              I stedet for at hoppe mellem ti forskellige hjemmesider kan du starte her, filtrere på pris og forhandler,
              og derefter tjekke den endelige slutpris — inklusive fragt og eventuelle rabatkoder — hos den butik, du
              vælger.
            </p>

            <h3 className="text-lg font-semibold text-stone-900">Hvorfor det er svært at finde gode vin-tilbud</h3>
            <p className="leading-relaxed">
              Vinmarkedet online er fragmenteret. Hver butik har sit eget sortiment, sine egne kampagner og sin egen måde
              at vise før-pris på. En flaske kan være «nedsat» hos én shop, mens den sælges til normalpris hos en anden
              — eller omvendt. Tidsbegrænsede tilbud og kassepriser skifter ofte, og nyhedsbreve kan give ekstra rabat,
              som ikke altid fremgår tydeligt i et produktfeed.
            </p>
            <p className="leading-relaxed">
              Derudover varierer kvaliteten af tilbud. En høj rabatprocent betyder ikke automatisk, at flasken er billigere
              end et andet sted — før-prisen kan være sat højt i en kort periode, eller kampagnen kan gælde en ældre
              årgang. Derfor er det værd at <strong>sammenligne vinpriser</strong> på tværs, ikke kun kigge på procenten i
              én butik.
            </p>

            <h3 className="text-lg font-semibold text-stone-900">Sådan vurderer du om rabatten er reel</h3>
            <p className="leading-relaxed">
              Start med at se på slutprisen for den flaske, du vil købe — ikke kun rabatprocenten. Tjek om før-prisen i
              feedet virker rimelig i forhold til, hvad du ellers har set for samme vin. Sammenlign med andre forhandlere
              i <Link href="/vine">vin-kataloget</Link>, og husk fragt: en lav flaskepris kan ædes op af
              leveringsomkostninger, især ved små ordrer.
            </p>
            <p className="leading-relaxed">
              Vinbots procent bygger på de priser, forhandleren sender i sit feed. Reglerne for før-pris følger butikkens
              egne vilkår — vi kan ikke garantere, at en «før-pris» har været gældende i en bestemt periode. Læs mere i{" "}
              <Link href="/guides/vin-tilbud-og-foer-pris">guiden til tilbud og før-pris</Link>, og brug altid butikkens
              checkout som den endelige sandhed, før du bestiller.
            </p>

            <h3 className="text-lg font-semibold text-stone-900">Populære vin-typer på tilbud</h3>
            <p className="leading-relaxed">
              Tilbud skifter med sæson og lager, men visse kategorier dukker ofte op.{" "}
              <strong>Rødvin på tilbud</strong> er hyppigt i kampagner — især populære regioner og hverdagsvine til mad.
              Hvidvin og rosé ses ofte i sommer- og grillkampagner. Bobler og champagne kan være på tilbud omkring
              højtider og weekend — se også guiden om{" "}
              <Link href="/guides/bobler-champagne-cava-prosecco-og-cremant">bobler, champagne og alternativer</Link>.
            </p>
            <p className="leading-relaxed">
              Gavevine og flasker til selskab kan også være nedsat, men her gælder det ekstra meget at sammenligne
              kvalitet og pris — ikke kun rabatten. Guider som{" "}
              <Link href="/guides/gavevin-sadan-vaelger-du-den-rigtige-flaske">
                gavevin — sådan vælger du den rigtige flaske
              </Link>{" "}
              og <Link href="/guides/koeb-vin-online-sadan-holder-du-styr-paa-det">køb vin online</Link> kan hjælpe med
              at sætte pris og tilbud i perspektiv, før du klikker videre til butikken.
            </p>

            <h3 className="text-lg font-semibold text-stone-900">Danske vinbutikker med tilbud</h3>
            <p className="leading-relaxed">
              Vinbot henter tilbud fra en række danske netbutikker via affiliate-feeds. Blandt de forhandlere, vi ofte
              ser kampagner fra, er fx <Link href="/den-sidste-flaske">Den Sidste Flaske</Link>,{" "}
              <Link href="/winther-vin">Winther Vin</Link>, <Link href="/lauridsen-vine">Lauridsen Vine</Link> og{" "}
              <Link href="/dh-wines">DH Wines</Link>. Hver shop har sit eget fokus — fra dagstilbud og restpartier til
              bredere sortimenter med løbende nedsættelser.
            </p>
            <p className="leading-relaxed">
              Du kan filtrere tilbud på denne side efter forhandler, eller gå til{" "}
              <Link href="/vinforhandlere">oversigten over vinforhandlere</Link> for at se alle shops, Vinbot dækker.
            </p>

            <h3 className="text-lg font-semibold text-stone-900">Rabatkoder og nyhedsbreve</h3>
            <p className="leading-relaxed">
              Mange vinbutikker tilbyder rabatkoder til nye kunder, medlemmer eller nyhedsbrevstilmeldinger. På{" "}
              <Link href="/rabatkoder">rabatkoder-siden</Link> samler vi koder og tips til udvalgte forhandlere. Husk: et
              godt vin-tilbud handler om den pris, du reelt betaler — ikke kun om den største procent i feedet.
            </p>
          </div>
        </details>
        </div>
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
          Før-pris følger butikkens egne regler — sammenlign altid den konkrete slutpris inkl. fragt. Vinbot sælger ikke
          vin.
        </p>
      </section>

    </PageShell>
  );
}
