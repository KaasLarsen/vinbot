import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listVinVidenHubGuides, listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vin-viden — hvor længe, hvor mange, hvad er og sådan";
const PAGE_DESCRIPTION =
  "Korte svar på de spørgsmål folk googler om vin: hvor længe holder rødvin, hvor mange glas i en flaske, hvad er tanniner, sådan dekanterer du — samlet på ét sted.";
const PAGE_URL = `${siteUrl}/vin-viden`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function VinVidenHubPage() {
  const raw = listVinVidenHubGuides();
  const guides = raw.length ? raw : listGuides().slice(0, 8);
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  const collectionItems = guides.map((g) => ({
    name: g.title,
    url: `${siteUrl}/guides/${g.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin-viden", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vin-viden", label: "Vin-viden" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin-viden</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Korte, konkrete svar på de spørgsmål folk typisk googler om vin: <strong className="font-medium text-stone-800">hvor længe holder</strong> åbnet og uåbnet vin, <strong className="font-medium text-stone-800">hvor mange glas</strong> i en flaske, <strong className="font-medium text-stone-800">hvad er</strong> tanniner, syre og terroir — og <strong className="font-medium text-stone-800">sådan gør du</strong> det praktiske (dekantering, servering, smagning).
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Start et sted:{" "}
        <Link href="/guides/hvor-laenge-holder-rodvin" className="text-rose-900 hover:underline">
          hvor længe holder rødvin
        </Link>
        ,{" "}
        <Link href="/guides/hvor-mange-glas-i-en-flaske-vin" className="text-rose-900 hover:underline">
          glas i en flaske
        </Link>
        ,{" "}
        <Link href="/guides/hvad-er-tanniner" className="text-rose-900 hover:underline">
          hvad er tanniner
        </Link>
        ,{" "}
        <Link href="/guides/sadan-dekanterer-du-vin" className="text-rose-900 hover:underline">
          sådan dekanterer du
        </Link>{" "}
        og{" "}
        <Link href="/guides/kan-vin-blive-daarlig" className="text-rose-900 hover:underline">
          kan vin blive dårlig
        </Link>
        . Hele samlingen:{" "}
        <Link href="/guides" className="font-medium text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Nye long-tail svar og forklaringer</h2>
        <p className="mt-3 text-stone-700">
          Kort og konkret — de nyeste ofte-googlede spørgsmål:
        </p>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/hvor-laenge-holder-uaabnet-vin" className="text-rose-900 hover:underline">Hvor længe holder uåbnet vin</Link>
          <Link href="/guides/hvor-laenge-holder-vin-i-karaffel" className="text-rose-900 hover:underline">Holdbarhed i karaffel</Link>
          <Link href="/guides/hvor-laenge-holder-boks-vin" className="text-rose-900 hover:underline">Bag-in-box — holdbarhed</Link>
          <Link href="/guides/hvor-laenge-kan-vin-lagres" className="text-rose-900 hover:underline">Hvor længe kan vin lagres</Link>
          <Link href="/guides/hvor-meget-alkohol-i-vin" className="text-rose-900 hover:underline">Alkoholprocent i vin</Link>
          <Link href="/guides/hvor-mange-enheder-alkohol-i-et-glas-vin" className="text-rose-900 hover:underline">Genstande pr. glas vin</Link>
          <Link href="/guides/hvor-meget-fylder-en-flaske-vin" className="text-rose-900 hover:underline">Flaskestørrelser</Link>
          <Link href="/guides/hvad-er-sulfit-i-vin" className="text-rose-900 hover:underline">Sulfit i vin</Link>
          <Link href="/guides/hvad-er-fadlagring" className="text-rose-900 hover:underline">Fadlagring</Link>
          <Link href="/guides/hvad-er-malolaktisk-gaering" className="text-rose-900 hover:underline">Malolaktisk gæring</Link>
          <Link href="/guides/hvad-er-botrytis-aedelraad" className="text-rose-900 hover:underline">Botrytis (ædelråd)</Link>
          <Link href="/guides/hvad-er-appellation-og-kvalitetsmaerker" className="text-rose-900 hover:underline">Appellation & kvalitetsmærker</Link>
          <Link href="/guides/hvad-er-pet-nat" className="text-rose-900 hover:underline">Pét-nat</Link>
          <Link href="/guides/sadan-vaelger-du-vinglas" className="text-rose-900 hover:underline">Sådan vælger du vinglas</Link>
          <Link href="/guides/hvordan-aabner-du-champagne" className="text-rose-900 hover:underline">Hvordan åbner du champagne</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Søg i vinviden-guiderne</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={2} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <section className="mt-12 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Relaterede emner</h2>
        <p className="mt-4">
          Skal vinen matches til en ret? Se{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          . Leder du efter en konkret flaske? Gå til{" "}
          <Link href="/bedste-vine" className="text-rose-900 hover:underline">
            bedste vine
          </Link>
          . For dybdegående opslag og terminologi, se{" "}
          <Link href="/guides/vin-begreber-i-praksis" className="text-rose-900 hover:underline">
            vinbegreber i praksis
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
