import type { Metadata } from "next";
import Link from "next/link";
import { WineSearch } from "@/components/wine-search";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { CampaignBanner } from "@/components/campaign-banner";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteName} – find vin til mad og stemning`,
  description: siteDescription,
};

type HomeProps = { searchParams?: Promise<{ q?: string }> };

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
          <p className="text-sm font-semibold text-stone-800">Populære emner lige nu</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-rose-900">
            <li>
              <Link href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vintemperatur og servering
              </Link>
            </li>
            <li>
              <Link href="/guides/naturvin-hvad-er-det" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Naturvin
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-dessert-og-kransekage" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Dessert og kransekage
              </Link>
            </li>
            <li>
              <Link href="/guides/bobler-champagne-cava-prosecco-og-cremant" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Bobler og champagne
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Nytår og nytårsmenu
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-begreber-i-praksis" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vinbegreber
              </Link>
            </li>
            <li>
              <Link href="/druesorter" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Druesorter
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-grill-og-bbq" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Grill og BBQ
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-lasagne" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til lasagne
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-laks" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til laks
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-vegetar" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til vegetar
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-flaesketesteg" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til flæskesteg
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-boeff" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til bøf
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-tacos" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til tacos
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-and" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til and
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-lam" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til lam
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-torsk" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til torsk
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-frikadeller" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til frikadeller
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-wok" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til wok
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-couscous" className="underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
                Vin til couscous
              </Link>
            </li>
          </ul>
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
    </div>
  );
}
