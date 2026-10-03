import type { Metadata } from "next";
import Link from "next/link";
import { HomeLigeNuStrip } from "@/components/home-lige-nu-strip";
import { HomeRabatkoderStrip } from "@/components/home-rabatkoder-strip";
import { HomeBestDealsSearchSection } from "@/components/home-best-deals-search-section";
import { HomeHeroSearchSection } from "@/components/home-hero-search-section";
import { HomeHeroSecondary } from "@/components/home-hero-secondary";
import { HomeDrinksStrip } from "@/components/home-drinks-strip";
import { HomeRecipesStrip } from "@/components/home-recipes-strip";
import { HomeWinesStrip } from "@/components/home-wines-strip";
import { HomeFeedStripsGate } from "@/components/home-feed-strips-gate";
import { CampaignBanner } from "@/components/campaign-banner";
import { HomeAffiliatePopup } from "@/components/home-affiliate-popup";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { FeaturedAffiliateStores } from "@/components/featured-affiliate-stores";
import { LauridsenHomeFeedHighlight } from "@/components/lauridsen-home-feed-highlight";
import { MerchantFeaturedPicks } from "@/components/merchant-featured-picks";
import { HomeDealsStrip } from "@/components/home-deals-strip";
import { HomePriceRunnerStrip } from "@/components/home-pricerunner-strip";
import { WineQuantityCalculator } from "@/components/wine-quantity-calculator";
import { TasteProfileServer } from "@/components/taste-profile-server";
import { WineFridgeChat } from "@/components/wine-fridge-chat";
import { getFeaturedPicksForMerchant } from "@/lib/merchant-featured-picks";
import { siteName } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const WINTHER_HOME_PICKS = getFeaturedPicksForMerchant("winther-vin").slice(0, 4);

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
      <HomeAffiliatePopup />

      <HomeHeroSearchSection>
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90 sm:text-sm">
          AI-chat · danske forhandlere
        </p>
        <h1
          id="home-ask-heading"
          className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-stone-900 sm:mt-3 sm:max-w-2xl sm:text-4xl"
        >
          Spørg Vinbot om vin
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-700">
          Skriv ret, køleskab, stemning eller budget — vi finder flasker hos danske forhandlere.
        </p>

        <WineFridgeChat className="relative z-10 mt-5 max-w-3xl" />

        <div className="mt-3" id="taste-profile">
          <TasteProfileServer variant="line" />
        </div>

        <HomeHeroSecondary className="relative z-10 mt-4" />
      </HomeHeroSearchSection>

      <div className="mt-6 grid items-start gap-4 md:grid-cols-2 md:gap-5">
        <WineQuantityCalculator
          variant="compact"
          defaultCollapsed
          heading="Hvor mange flasker til festen?"
          intro="Angiv gæster og festtype — få Vinbot-formlen med 15 % buffer."
        />
        <HomeBestDealsSearchSection />
        <HomeLigeNuStrip />
        <HomeRabatkoderStrip />
      </div>

      <script dangerouslySetInnerHTML={{ __html: HOME_QUERY_BOOTSTRAP }} />

      <HomeFeedStripsGate>
        <div data-home-feed-strips>
          <HomeWinesStrip />
          <HomeRecipesStrip />
          <HomeDrinksStrip />
          <MerchantFeaturedPicks merchantId="winther-vin" picks={WINTHER_HOME_PICKS} variant="home" />
          <HomeDealsStrip />
        </div>
      </HomeFeedStripsGate>

      <HomePriceRunnerStrip />

      <section className="mt-16" aria-labelledby="home-topics-heading">
        <div className="max-w-2xl">
          <h2 id="home-topics-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Udforsk emner
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Mad, fest, sæson, vin-viden, vinglas og olivenolie — spring direkte ind i det, der interesserer dig.
          </p>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
          href="/drinks"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Drinks</h3>
          <p className="mt-2 text-stone-600">
            Spritz, sangria, Port &amp; Tonic og klassiske cocktails — hvor vin er hovedrollen.
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
          href="/guides/vin-til-flaesketesteg"
          className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 shadow-sm transition hover:border-rose-300 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vin til flæskesteg</h3>
          <p className="mt-2 text-stone-600">
            Juleaften og søndagssteg: pinot noir, gamay og Chianti til sprød svær, brun sovs og rødkål — med søgning på flasker.
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
          href="/vinglas"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vinglas</h3>
          <p className="mt-2 text-stone-600">
            Rød, hvid, champagne og mærker — Spiegelau, Riedel, Zalto. Guides, produkter og prissammenligning.
          </p>
        </Link>
        <Link
          href="/olie-leksikon"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Olie-Leksikon</h3>
          <p className="mt-2 text-stone-600">
            Extra virgin, falsk olivenolie og hvorfor god olie kradser i halsen — kvalitet og sundhed uden mirakelkur.
          </p>
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
