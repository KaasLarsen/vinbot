import type { Metadata } from "next";
import Link from "next/link";
import { WineSearch } from "@/components/wine-search";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { ADTRACTION_VINKOELSKABET_SHOP } from "@/lib/adtraction-links";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vinkøleskabe — søg model, størrelse og pris",
  description:
    "Vinkøleskabe til køkkenet og kælderen: integrerbare og fritstående modeller. Søg på tværs hos Vinkøleskabet.dk m.fl. med billede og pris — læs også guiden til valg af størrelse og temperaturzoner.",
  alternates: { canonical: `${siteUrl}/vinkoleskabe` },
  openGraph: { url: `${siteUrl}/vinkoleskabe` },
};

export default function VinkoleskabePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vinkoleskabe", label: "Vinkøleskabe" }]} />
      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">Opbevaring &amp; udstyr</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">Vinkøleskabe</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Når samlingen vokser, gør et ordentligt <strong className="font-medium text-stone-800">vinkøleskab</strong> en kæmpe forskel for temperatur,
          lagring og hverdagsnyde. Her samler vi <strong className="font-medium text-stone-800">søgning</strong> med pris og billede — med stærkt udvalg
          fra blandt andre <strong className="font-medium text-stone-800">Vinkøleskabet.dk</strong> (partner via Adtraction).
        </p>
        <p className="mt-3 text-sm text-stone-700">
          <a
            href={ADTRACTION_VINKOELSKABET_SHOP}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
          >
            Gå til Vinkøleskabet.dk
          </a>
          <span className="text-stone-500"> — affiliate-link via Adtraction; samme link som under </span>
          <Link href="/rabatkoder" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            Rabatkoder
          </Link>
          .
        </p>
        <p className="mt-3 text-stone-700">
          Vil du have overblik over, hvad du skal vælge før du køber? Læs{" "}
          <Link href="/guides/vinkoleskabe-sadan-vaelger-du" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            guiden: sådan vælger du vinkøleskab
          </Link>{" "}
          — og se også{" "}
          <Link href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            temperatur og opbevaring af vin
          </Link>
          .
        </p>
      </header>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">Søg efter vinkøleskab</h2>
        <p className="mt-2 text-sm text-stone-600">
          Prøv fx <strong className="font-medium text-stone-800">integrerbar</strong>, <strong className="font-medium text-stone-800">winekeeper</strong>,{" "}
          <strong className="font-medium text-stone-800">50 flasker</strong> eller et mærke du kender. Klik videre til forhandleren for mål, levering og
          aktuel pris.
        </p>
        <div className="mt-4">
          <AffiliateDisclosure compact />
        </div>
        <div className="mt-4">
          <WineSearch initialQuery="vinkøleskab" />
        </div>
      </section>

      <section className="mt-14 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Udvalgte søgninger</h2>
          <p className="mt-2 max-w-2xl text-stone-600">
            Hurtige indgange til typiske behov — resultaterne kommer fra vores produktfeeds (inkl. Vinkøleskabet.dk).
          </p>
        </div>
        <ProductFeedPreview query="vinkøleskab integrerbar" title="Integrerbare vinkøleskabe" />
        <ProductFeedPreview query="vinkøleskab fritstående" title="Fritstående og bredere modeller" />
        <ProductFeedPreview query="winekeeper vinkøleskab" title="WineKeeper og mQuvée" />
      </section>

      <section className="mt-14 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 text-stone-800 sm:p-8">
        <h2 className="text-lg font-semibold text-stone-900">Før du bestiller</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Mål niche eller plads — især ved integrerede skabe (ventilation, dybde, højde).</li>
          <li>Tjek antal flasker og om du vil have én eller flere temperaturzoner.</li>
          <li>Støj og energimærke betyder noget, hvis skabet står i åbent køkken.</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/guides/vinkoleskabe-sadan-vaelger-du" className="font-medium text-rose-900 hover:underline">
            Åbn den fulde guide til valg af vinkøleskab →
          </Link>
        </p>
      </section>

      <PartnerAdsLeaderboard className="mt-14" />
    </div>
  );
}
