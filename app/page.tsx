import type { Metadata } from "next";
import Link from "next/link";
import { HomeHeroSearchSection } from "@/components/home-hero-search-section";
import { HomeRecipesStrip } from "@/components/home-recipes-strip";
import { HomeWinesStrip } from "@/components/home-wines-strip";
import { HomeWineSearch } from "@/components/home-wine-search";
import { HomeFeedStripsGate } from "@/components/home-feed-strips-gate";
import { CampaignBanner } from "@/components/campaign-banner";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { FeaturedAffiliateStores } from "@/components/featured-affiliate-stores";
import { LauridsenHomeFeedHighlight } from "@/components/lauridsen-home-feed-highlight";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { HomeDealsStrip } from "@/components/home-deals-strip";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { DsfFeaturedProductsJsonLd } from "@/components/json-ld";
import { siteName } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

/** Samme interval som feed-cache — HTML caches på CDN, data opdateres i baggrunden. */
export const revalidate = 21600;
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: `${siteName} – vinguides til mad, druer og sæson`,
  description:
    "Hundredvis af redaktionelle vinguides på dansk — madparring, druer, regioner og praktisk vin-viden. Plus vinsøgning på tværs af danske forhandlere.",
};

const HOME_QUERY_BOOTSTRAP = `(function(){try{var q=new URLSearchParams(location.search).get("q");if(q&&q.trim())document.documentElement.setAttribute("data-vinbot-home-q","")}catch(e){}})();`;

export default function HomePage() {
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

        <div className="mt-5 sm:mt-6">
          <HomeWineSearch
            controlsClassName="max-w-lg rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/50 backdrop-blur-sm sm:max-w-2xl sm:p-5"
            resultsClassName="rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/50 backdrop-blur-sm sm:p-6"
          />
        </div>
      </HomeHeroSearchSection>

      <script dangerouslySetInnerHTML={{ __html: HOME_QUERY_BOOTSTRAP }} />

      <HomeFeedStripsGate>
        <div data-home-feed-strips>
          <HomeWinesStrip />
          <HomeRecipesStrip />
          <DsfFeaturedPicks picks={dsfFeaturedPicks} variant="home" />
          <HomeDealsStrip />
        </div>
      </HomeFeedStripsGate>

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
          href="/alkoholfri-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Alkoholfri vin</h3>
          <p className="mt-2 text-stone-600">
            0 % bobler, hvid, rosé og rød — mærker, under 100 kr, Netto/Føtex, fest og ærlige smagsguides.
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
        </div>
      </section>

      <CampaignBanner />

      <FeaturedAffiliateStores />

      <LauridsenHomeFeedHighlight />

      <PartnerAdsLeaderboard className="mt-16" hub="bedste-vine" slug="home" />
    </PageShell>
  );
}
