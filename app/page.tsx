import type { Metadata } from "next";
import Link from "next/link";
import { WineSearch } from "@/components/wine-search";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { AdSlot } from "@/components/ad-slot";
import { CampaignBanner } from "@/components/campaign-banner";
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
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/80">Dansk vin-inspiration</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
          Find vin til mad, humør og stemning — med pris og billede fra rigtige feeds
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-700">
          Søg efter julemad, grill, romantisk aften, hygge eller en bestemt drue. Vi matcher dine ord til vine fra Partner-Ads-forhandlere og
          udvalgte Daisycon-programmer — klar til at klikke videre.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Læs den store mad- og vinguide
          </Link>
          <Link href="/den-sidste-flaske" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Den Sidste Flaske — sådan bruger du os som kunde
          </Link>
        </div>
      </section>

      <CampaignBanner />

      <section className="mt-12 space-y-6">
        <h2 className="text-2xl font-semibold text-stone-900">Søg i vin-feeds</h2>
        <AffiliateDisclosure compact />
        <WineSearch initialQuery={q} />
      </section>

      <div className="mt-12">
        <AdSlot slot="placeholder-home-mid" className="min-h-[120px]" />
      </div>

      <section className="mt-16 grid gap-8 sm:grid-cols-3">
        <Link
          href="/mad-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Mad & vin</h3>
          <p className="mt-2 text-stone-600">Parring til kød, fisk, ost, pasta og meget mere — med dybe guides og interne links.</p>
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
