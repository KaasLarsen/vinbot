import type { Metadata } from "next";
import Link from "next/link";
import { WineSearch } from "@/components/wine-search";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { CampaignBanner } from "@/components/campaign-banner";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { DsfFeaturedProductsJsonLd } from "@/components/json-ld";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteName} – find vin til mad og stemning`,
  description: siteDescription,
};

type HomeProps = { searchParams?: Promise<{ q?: string }> };

const popularTopicLinkClass =
  "underline decoration-rose-300 underline-offset-4 hover:text-rose-950";

/** Kompakt udvalg — den fulde liste ligger i <details> nedenunder. */
const featuredPopularLinks: { href: string; label: string }[] = [
  { href: "/mad-og-vin", label: "Mad & vin" },
  { href: "/guides", label: "Alle guides — søg og filtrér" },
  { href: "/guides/komplet-guide-til-vin-og-mad", label: "Den store mad-guide" },
  { href: "/guides/bobler-champagne-cava-prosecco-og-cremant", label: "Bobler" },
  { href: "/guides/vin-til-grill-og-bbq", label: "Grill" },
  { href: "/guides/vin-til-sommer", label: "Sommer" },
  { href: "/guides/rosevin-til-mad-og-sommer", label: "Rosé" },
  { href: "/guides/vin-i-cocktails-spritz-og-drikke", label: "Vin i drinks" },
];

const popularTopicGroups: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Vin & viden",
    links: [
      { href: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske", label: "Vintemperatur og servering" },
      { href: "/guides/naturvin-hvad-er-det", label: "Naturvin" },
      { href: "/guides/vin-begreber-i-praksis", label: "Vinbegreber" },
      { href: "/druesorter", label: "Druesorter" },
    ],
  },
  {
    title: "Fest, bobler & dessert",
    links: [
      { href: "/guides/bobler-champagne-cava-prosecco-og-cremant", label: "Bobler og champagne" },
      { href: "/guides/vin-til-nytaar-og-nytaarsmenu", label: "Nytår og nytårsmenu" },
      { href: "/guides/vin-til-dessert-og-kransekage", label: "Dessert og kransekage" },
    ],
  },
  {
    title: "Sommer, rosé & drinks",
    links: [
      { href: "/guides/vin-til-sommer", label: "Vin til sommer" },
      { href: "/guides/rosevin-til-mad-og-sommer", label: "Rosévin til mad" },
      { href: "/guides/vin-i-cocktails-spritz-og-drikke", label: "Vin i cocktails og spritz" },
      { href: "/guides/saesonvin-i-danmark", label: "Sæsonvin året rundt" },
    ],
  },
  {
    title: "Dansk køkken",
    links: [
      { href: "/guides/vin-til-smorrebrod", label: "Vin til smørrebrød" },
      { href: "/guides/vin-til-julefrokost", label: "Vin til julefrokost" },
      { href: "/guides/vin-til-tarteletter", label: "Vin til tarteletter" },
      { href: "/guides/vin-til-sild", label: "Vin til sild" },
      { href: "/guides/vin-til-frikadeller", label: "Vin til frikadeller" },
      { href: "/guides/vin-til-medister", label: "Vin til medister" },
      { href: "/guides/vin-til-flaesketesteg", label: "Vin til flæskesteg" },
      { href: "/guides/vin-til-stegt-flaesk", label: "Vin til stegt flæsk" },
    ],
  },
  {
    title: "Fisk & skaldyr",
    links: [
      { href: "/guides/vin-til-laks", label: "Vin til laks" },
      { href: "/guides/vin-til-torsk", label: "Vin til torsk" },
      { href: "/guides/vin-til-ceviche", label: "Vin til ceviche" },
      { href: "/guides/vin-til-krebse", label: "Vin til krebse" },
      { href: "/guides/vin-til-rejer", label: "Vin til rejer" },
      { href: "/guides/vin-til-sushi", label: "Vin til sushi" },
    ],
  },
  {
    title: "Kød & grill",
    links: [
      { href: "/guides/vin-til-grill-og-bbq", label: "Grill og BBQ" },
      { href: "/guides/vin-til-boeff", label: "Vin til bøf" },
      { href: "/guides/vin-til-vildt", label: "Vin til vildt" },
      { href: "/guides/vin-til-tatar-og-carpaccio", label: "Vin til tatar" },
      { href: "/guides/vin-til-lam", label: "Vin til lam" },
      { href: "/guides/vin-til-and", label: "Vin til and" },
      { href: "/guides/vin-til-svinekoed", label: "Vin til svinekød" },
    ],
  },
  {
    title: "Internationalt",
    links: [
      { href: "/guides/vin-til-thai-mad", label: "Vin til thai" },
      { href: "/guides/vin-til-vietnamesisk-mad", label: "Vin til vietnamesisk" },
      { href: "/guides/vin-til-indisk-mad", label: "Vin til indisk" },
      { href: "/guides/vin-til-graesk-mad", label: "Vin til græsk" },
      { href: "/guides/vin-til-wok", label: "Vin til wok" },
      { href: "/guides/vin-til-tacos", label: "Vin til tacos" },
      { href: "/guides/vin-til-kebab-og-shawarma", label: "Vin til kebab" },
      { href: "/guides/vin-til-couscous", label: "Vin til couscous" },
      { href: "/guides/vin-til-vegetar", label: "Vin til vegetar" },
    ],
  },
  {
    title: "Gryde, pasta & ris",
    links: [
      { href: "/guides/vin-til-pizza", label: "Vin til pizza" },
      { href: "/guides/vin-til-lasagne", label: "Vin til lasagne" },
      { href: "/guides/vin-til-risotto", label: "Vin til risotto" },
      { href: "/guides/vin-til-gryderet", label: "Vin til gryderet" },
      { href: "/guides/vin-til-suppe", label: "Vin til suppe" },
    ],
  },
];

export default async function HomePage({ searchParams }: HomeProps) {
  const q = (await searchParams)?.q;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <DsfFeaturedProductsJsonLd picks={dsfFeaturedPicks} />
      <section className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50/60 px-6 py-10 shadow-sm ring-1 ring-stone-200/80 sm:px-10 sm:py-11">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/80">Danmarks vinguide</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Find vin til mad, humør og stemning
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          <strong className="font-semibold text-stone-800">Det er søgefeltet herunder, der er hjertet i Vinbot:</strong> skriv julemad, grill, romantisk aften, hygge eller en drue — så får du konkrete forslag med billede og pris fra danske
          forhandlere, du kan klikke videre til.
        </p>
        <div className="mt-8 rounded-2xl border border-rose-200/70 bg-white/75 p-5 shadow-sm ring-1 ring-stone-200/60 sm:p-6">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">Søg efter vin</h2>
          <p className="mt-1 text-sm text-stone-600">Jo mere konkret du er (ret, stemning, budget), jo bedre matcher resultaterne.</p>
          <div className="mt-4">
            <AffiliateDisclosure compact />
          </div>
          <div className="mt-3">
            <WineSearch initialQuery={q} />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
          <span className="w-full text-stone-500 sm:w-auto">Vil du læse først?</span>
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Den store mad- og vinguide
          </Link>
          <Link href="/den-sidste-flaske" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Den Sidste Flaske
          </Link>
        </div>
        <div className="mt-8 border-t border-rose-200/60 pt-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-500">Hurtige emner</h2>
          <p className="mt-2 max-w-2xl text-sm text-stone-600">
            Spring til det mest brugte — eller fold listen ud for alle kategorier og vin-til-mad-sider.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-rose-900">
            {featuredPopularLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={popularTopicLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <details className="group mt-5 rounded-2xl border border-rose-200/50 bg-white/50 px-4 py-3 ring-1 ring-stone-100/80">
            <summary className="cursor-pointer list-none text-sm font-medium text-rose-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="underline decoration-rose-300 decoration-dotted underline-offset-4 group-open:decoration-solid">
                Vis alle emner efter kategori
              </span>
              <span className="ml-1.5 tabular-nums text-stone-400 group-open:hidden" aria-hidden>
                {"\u25BC"}
              </span>
              <span className="ml-1.5 hidden tabular-nums text-stone-400 group-open:inline" aria-hidden>
                {"\u25B2"}
              </span>
            </summary>
            <div className="mt-4 space-y-5 border-t border-rose-100/80 pt-4">
              {popularTopicGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-900/70">{group.title}</h3>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-rose-900">
                    {group.links.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={popularTopicLinkClass}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      <CampaignBanner />

      <DsfFeaturedPicks picks={dsfFeaturedPicks} variant="home" />

      <section className="mt-16 grid gap-8 sm:grid-cols-3">
        <Link
          href="/mad-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Mad & vin</h3>
          <p className="mt-2 text-stone-600">Parring til kød, fisk, ost, pasta og meget mere — med dybe guides og masser af videre læsning.</p>
        </Link>
        <Link
          href="/humoer-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Humør & stemning</h3>
          <p className="mt-2 text-stone-600">Hygge, fest, romantik og hverdag — sådan vælger du stil, bobler og stemning.</p>
        </Link>
        <Link
          href="/saeson"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Sæson</h3>
          <p className="mt-2 text-stone-600">Forår, sommer, efterår og vinter — hvad der smager af årstiden i glasset.</p>
        </Link>
      </section>

      <PartnerAdsLeaderboard className="mt-16" />
    </div>
  );
}
