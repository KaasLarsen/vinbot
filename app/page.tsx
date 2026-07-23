import type { Metadata } from "next";
import Link from "next/link";
import { HomeHeroSearchSection } from "@/components/home-hero-search-section";
import { HomeRecipesStrip } from "@/components/home-recipes-strip";
import { HomeWinesStrip } from "@/components/home-wines-strip";
import { WineSearch } from "@/components/wine-search";
import { CampaignBanner } from "@/components/campaign-banner";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { FeaturedAffiliateStores } from "@/components/featured-affiliate-stores";
import { LauridsenHomeFeedHighlight } from "@/components/lauridsen-home-feed-highlight";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { HomeDealsStrip } from "@/components/home-deals-strip";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { DsfFeaturedProductsJsonLd } from "@/components/json-ld";
import { siteName, siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const homeMetadata: Metadata = {
  title: `${siteName} – vinguides til mad, druer og sæson`,
  description:
    "Hundredvis af redaktionelle vinguides på dansk — madparring, druer, regioner og praktisk vin-viden. Plus vinsøgning på tværs af danske forhandlere.",
};

type HomeProps = { searchParams?: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const q = ((await searchParams)?.q ?? "").trim();
  if (!q) return homeMetadata;

  return {
    ...homeMetadata,
    alternates: { canonical: siteUrl },
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const q = (await searchParams)?.q;

  return (
    <PageShell className="py-10">
      <DsfFeaturedProductsJsonLd picks={dsfFeaturedPicks} />
      <HomeHeroSearchSection>
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90 sm:text-sm">
          Vinsøgning · danske forhandlere
        </p>
        <h1 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-stone-900 sm:mt-3 sm:max-w-2xl sm:text-4xl">
          Find vin på sekunder
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-stone-700 sm:max-w-xl">
          Skriv ret, drue, stemning eller budget — vi finder flasker og priser hos danske forhandlere.
        </p>

        <div className="mt-5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/50 backdrop-blur-sm sm:mt-6 sm:p-6">
          <WineSearch initialQuery={q} />
        </div>
      </HomeHeroSearchSection>


      {!q?.trim() ? <HomeWinesStrip /> : null}
      {!q?.trim() ? <HomeRecipesStrip /> : null}

      {!q?.trim() ? <DsfFeaturedPicks picks={dsfFeaturedPicks} variant="home" /> : null}
      {!q?.trim() ? <HomeDealsStrip /> : null}

      <section className="mt-16" aria-labelledby="home-topics-heading">
        <div>
          <h2 id="home-topics-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Udforsk emner
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Mad, fest, sæson og vin-viden — spring direkte ind i det, der interesserer dig.
          </p>
        </div>
        <div className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          href="/mad-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Mad & vin</h3>
          <p className="mt-2 text-stone-600">Parring til kød, fisk, ost, pasta og meget mere — med dybe guides og masser af videre læsning.</p>
        </Link>
        <Link
          href="/opskrifter"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Opskrifter</h3>
          <p className="mt-2 text-stone-600">
            Vin i gryden eller vin til glasset — fulde opskrifter med anbefalet vin og shop-forslag.
          </p>
        </Link>
        <Link
          href="/bedste-vine"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Bedste vine</h3>
          <p className="mt-2 text-stone-600">Top-lister efter pris, lejlighed og stil — rødvin, hvidvin, bobler, gavevin og budget-guides.</p>
        </Link>
        <Link
          href="/tilbud"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vin tilbud</h3>
          <p className="mt-2 text-stone-600">Nedsatte vine og prisforskelle på tværs af forhandlere — opdateres automatisk fra feeds.</p>
        </Link>
        <Link
          href="/humoer-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Humør & stemning</h3>
          <p className="mt-2 text-stone-600">Hygge, fest, romantik og hverdag — sådan vælger du stil, bobler og stemning.</p>
        </Link>
        <Link
          href="/fest-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Fest &amp; selskab</h3>
          <p className="mt-2 text-stone-600">
            Hvor meget vin per gæst, konfirmation og bryllup, bobler til velkomst, gaver og alkoholfri til blandet selskab.
          </p>
        </Link>
        <Link
          href="/saeson"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Sæson &amp; højtider</h3>
          <p className="mt-2 text-stone-600">
            Jul, påske, nytår, grill, sommer og klassisk dansk mad — vin til årets gang og vejr.
          </p>
        </Link>
        <Link
          href="/vin-viden"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vin-viden</h3>
          <p className="mt-2 text-stone-600">Korte svar: hvor længe holder vin, hvor mange glas i en flaske, hvad er tanniner — og sådan dekanterer, serverer og smager du.</p>
        </Link>
        <Link
          href="/vinkoleskabe"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vinkøleskabe</h3>
          <p className="mt-2 text-stone-600">Søg vinkøleskabe hos Vinkøleskabet.dk med billede og pris — plus købsguide til størrelse, zoner og placering.</p>
        </Link>
        </div>
      </section>

      <CampaignBanner />

      <FeaturedAffiliateStores />

      <LauridsenHomeFeedHighlight />

      <PartnerAdsLeaderboard className="mt-16" hub="bedste-vine" slug="home" />
    </PageShell>
  );
}
