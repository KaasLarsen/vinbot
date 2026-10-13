import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Øl & mad — specialøl til retten | Vinbot";
const PAGE_DESCRIPTION =
  "Vinbot er vin-first, men her finder du specialøl til maden: øl-parring på udvalgte opskrifter, AI-chip og forhandlere som Beer Me, Fantombryg og Herslev Bryghus.";
const PAGE_URL = `${siteUrl}/ol-og-mad`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

const MERCHANT_LINKS = [
  {
    href: "/beer-me",
    label: "Beer Me",
    blurb: "Specialøl og abonnement — bredt craft-udvalg.",
  },
  {
    href: "/fantombryg",
    label: "Fantombryg",
    blurb: "Økologisk specialøl og ølgaver fra dansk bryghus.",
  },
  {
    href: "/herslev-bryghus",
    label: "Herslev Bryghus",
    blurb: "Økologisk lager, saison og sæsonbryg fra Sjælland.",
  },
] as const;

const RECIPE_LINKS = [
  { href: "/opskrifter/andesteg", label: "Andesteg", blurb: "Stout eller porter til juleanden." },
  {
    href: "/opskrifter/braiseret-oksekaebe-med-rodvin",
    label: "Braiseret oksekæbe",
    blurb: "Kraftigt øl til langsimret kød.",
  },
  {
    href: "/opskrifter/burger-med-rodvinsglace",
    label: "Gourmet-burger",
    blurb: "IPA til burger og glace.",
  },
  {
    href: "/opskrifter/bife-de-chorizo-med-malbec",
    label: "Grillbøf",
    blurb: "Pale ale / IPA til steak.",
  },
  {
    href: "/opskrifter/grillpoelser-med-kold-zweigelt",
    label: "Grillpølser",
    blurb: "Lager eller pilsner til pølsen.",
  },
  {
    href: "/opskrifter/svinekaeber-i-rodvin-og-moerkt-oel",
    label: "Svinekæber i øl",
    blurb: "Stout i gryden — og i glasset.",
  },
] as const;

export default function OlOgMadPage() {
  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Øl & mad", url: PAGE_URL },
  ];

  const collectionItems = RECIPE_LINKS.map((r) => ({
    name: r.label,
    url: `${siteUrl}${r.href}`,
  }));

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/ol-og-mad", label: "Øl & mad" },
        ]}
      />

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Øl & mad</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Vinbot er <strong className="font-medium text-stone-800">vin-first</strong> — men nogle retter
        kalder også på specialøl. Her samler vi øl som alternativ til glasset: på udvalgte opskrifter,
        via chat-chippen «Specialøl til maden», og hos{" "}
        <Link href="/beer-me" className="font-medium text-rose-900 hover:underline">
          Beer Me
        </Link>
        ,{" "}
        <Link href="/fantombryg" className="font-medium text-rose-900 hover:underline">
          Fantombryg
        </Link>{" "}
        og{" "}
        <Link href="/herslev-bryghus" className="font-medium text-rose-900 hover:underline">
          Herslev Bryghus
        </Link>
        .
      </p>

      <section className="mt-10" aria-labelledby="ol-merchants-heading">
        <h2 id="ol-merchants-heading" className="text-2xl font-semibold text-stone-900">
          Ølforhandlere
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Tre danske Partner-Ads-partnere i vores øl-søgning — du handler altid hos dem.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {MERCHANT_LINKS.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-stone-900">{m.label}</h3>
                <p className="mt-2 text-sm text-stone-600">{m.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="ol-recipes-heading">
        <h2 id="ol-recipes-heading" className="text-2xl font-semibold text-stone-900">
          Opskrifter med øl-forslag
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Under vinanbefalingen viser vi 1–2 øl, når det giver mening — uden at erstatte vinen.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECIPE_LINKS.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-stone-900">{r.label}</h3>
                <p className="mt-2 text-sm text-stone-600">{r.blurb}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14" aria-labelledby="ol-shop-heading">
        <h2 id="ol-shop-heading" className="text-2xl font-semibold text-stone-900">
          Specialøl på tværs af forhandlere
        </h2>
        <p className="mt-2 max-w-2xl text-stone-600">
          Udvalg fra vores øl-søgning (Beer Me, Fantombryg og Herslev Bryghus).
        </p>
        <div className="mt-6">
          <ProductFeedPreview
            queries={["ipa", "stout", "lager", "saison"]}
            placement="ol-og-mad-feed"
            searchScope="beer"
            emptyLabel="øl"
            maxItems={9}
            gridClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </section>

      <section className="mt-14 max-w-2xl rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Spørg AI om øl</h2>
        <p className="mt-2 text-stone-700">
          På forsiden under søgefeltet finder du chippen «Specialøl til maden» — så foreslår Vinbot øl
          i stedet for vin.
        </p>
        <p className="mt-4">
          <Link
            href="/#home-ask-heading"
            className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
          >
            Gå til chatten på forsiden →
          </Link>
        </p>
      </section>

      <PartnerAdsLeaderboard className="mt-12" hub="ol-og-mad" slug="hub" />
    </PageShell>
  );
}
