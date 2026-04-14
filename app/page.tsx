import type { Metadata } from "next";
import Link from "next/link";
import { WineSearch } from "@/components/wine-search";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { CampaignBanner } from "@/components/campaign-banner";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteName} – find vin til mad og stemning`,
  description: siteDescription,
};

type HomeProps = { searchParams?: Promise<{ q?: string }> };

const popularTopicLinkClass =
  "underline decoration-rose-300 underline-offset-4 hover:text-rose-950";

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
      <section className="rounded-3xl bg-gradient-to-br from-rose-50 via-white to-amber-50/60 px-6 py-12 shadow-sm ring-1 ring-stone-200/80 sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/80">Danmarks vinguide</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Find vin til mad, humør og stemning
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Søg efter julemad, grill, romantisk aften, hygge eller en bestemt drue — og få konkrete forslag med billede og pris fra danske
          forhandlere, du kan klikke videre til.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Læs den store mad- og vinguide
          </Link>
          <Link href="/den-sidste-flaske" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Den Sidste Flaske — inspiration og gode køb
          </Link>
        </div>
        <div className="mt-10 border-t border-rose-200/60 pt-8">
          <h2 className="text-sm font-semibold text-stone-800">Populære emner lige nu</h2>
          <p className="mt-1 max-w-2xl text-sm text-stone-600">
            Udvalgte emner grupperet efter type — vi udvider løbende med flere vin-til-mad-sider.
          </p>
          <div className="mt-6 space-y-7">
            {popularTopicGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-900/70">{group.title}</h3>
                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-rose-900">
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
        </div>
      </section>

      <CampaignBanner />

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold text-stone-900">Søg efter vin</h2>
        <AffiliateDisclosure compact />
        <WineSearch initialQuery={q} />
      </section>

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
