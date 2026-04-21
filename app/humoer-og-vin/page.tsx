import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listHumoerHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Humør og stemning — vælg vin efter lejlighed";
const PAGE_DESCRIPTION =
  "Hygge, romantik, fest, bobler, brunch, sommer og gavevin: søg i guider til stemning og lejlighed — kombinér med mad & vin når menuen er klar.";
const PAGE_URL = `${siteUrl}/humoer-og-vin`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function HumoerHubPage() {
  const guides = listHumoerHubGuides();
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
    { name: "Humør & vin", url: PAGE_URL },
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
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/humoer-og-vin", label: "Humør & vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Humør og stemning</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Vin er socialt — samme flaske kan føles festlig, rolig eller romantisk afhængigt af kontekst. Her samler vi guider om{" "}
        <strong className="font-medium text-stone-800">hygge</strong>,{" "}
        <strong className="font-medium text-stone-800">fest og bobler</strong>,{" "}
        <strong className="font-medium text-stone-800">sommer og terrasse</strong>,{" "}
        <strong className="font-medium text-stone-800">gave</strong> og mere. Søg i listen, eller gå til{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Når retten er bestemt, er{" "}
        <Link href="/mad-og-vin" className="font-medium text-rose-900 hover:underline">
          mad &amp; vin
        </Link>{" "}
        og{" "}
        <Link href="/saeson" className="font-medium text-rose-900 hover:underline">
          sæson
        </Link>{" "}
        ofte hurtigere vej — men du kan sagtens starte med stemningen her og søge derefter.
      </p>

      <section className="mt-8 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Vin er mere end mad-matching</h2>
        <p>
          Vin bliver sjældent valgt rationelt ud fra kun én faktor. Vi vælger også efter <strong>hvad vi har lyst til</strong>, <strong>hvem vi er sammen med</strong>, og <strong>hvilken stemning vi er i</strong>. En flaske crémant føles fornem til en god nyhed; en kraftig Amarone passer til en rolig vinteraften med bog og pejs; en let kølig rosé signalerer sommer og afslapning. Denne hub handler om at vælge vin efter <em>humør og lejlighed</em>, før du bekymrer dig om præcis mad-matching.
        </p>
        <p>
          Du finder guider til hyggestemning (fredagsvin, serier-vin, hjemme-aften), romantik (dater-vin, valentins-dag, jubilæum), fest (konfirmation, bryllup, runde fødselsdage, nytår), sommer-og-terrasse (haveselskab, Sankt Hans, grill, picnic) og gave (værtindegave, mandeldgave, fødselsdag, mors dag, fars dag). For hver kategori har vi konkrete prisklasser og flasketyper i tankerne — fra en hurtig 80-kroners hverdagsvin til en 400-kroners gaveflaske.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Hygge og ro</h3>
          <p className="mt-2 text-sm text-stone-700">
            Fredagsvin, serier-vin, bog og pejs. Moden rødvin, let crémant, enkel tør hvidvin. Læs om{" "}
            <Link href="/guides/bedste-vin-til-hverdag" className="text-rose-900 hover:underline">bedste hverdagsvin</Link>,{" "}
            <Link href="/guides/bedste-rodvin-under-100-kr" className="text-rose-900 hover:underline">rødvin under 100 kr</Link> og{" "}
            <Link href="/guides/bedste-weekendvin" className="text-rose-900 hover:underline">weekendvin</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Fest og bobler</h3>
          <p className="mt-2 text-sm text-stone-700">
            Nytår, runde fødselsdage, bryllup, jubilæum. Champagne, crémant, prosecco, cava. Læs om{" "}
            <Link href="/guides/bobler-champagne-cava-prosecco-og-cremant" className="text-rose-900 hover:underline">bobler</Link>,{" "}
            <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="text-rose-900 hover:underline">nytår</Link> og{" "}
            <Link href="/guides/hvor-meget-vin-til-fest" className="text-rose-900 hover:underline">vin til fest</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Sommer og terrasse</h3>
          <p className="mt-2 text-sm text-stone-700">
            Haveselskab, grill, picnic, afslappet sommer. Rosé, let hvid, kølet rødvin. Læs om{" "}
            <Link href="/guides/rosevin-til-mad-og-sommer" className="text-rose-900 hover:underline">rosévin</Link>,{" "}
            <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">bedste sommervin</Link> og{" "}
            <Link href="/guides/vin-til-haveselskab" className="text-rose-900 hover:underline">haveselskab</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Gave og gæstfrihed</h3>
          <p className="mt-2 text-sm text-stone-700">
            Værtindegave, jubilæum, runde gaver. Sikker vin med pakning der ser ud som fest. Læs om{" "}
            <Link href="/guides/bedste-vin-til-gave" className="text-rose-900 hover:underline">gavevin</Link>,{" "}
            <Link href="/guides/bedste-vaertindegave-vin" className="text-rose-900 hover:underline">værtindegave</Link> og{" "}
            <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">konfirmation</Link>.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Sæson og fest — maj/juni</h2>
        <p className="mt-3 text-stone-700">
          Konkrete lejligheder lige nu:{" "}
          <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
            konfirmation
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-studenterfest" className="text-rose-900 hover:underline">
            studenterfest
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-haveselskab" className="text-rose-900 hover:underline">
            haveselskab
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-sommerbryllup" className="text-rose-900 hover:underline">
            sommerbryllup
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-mors-dag" className="text-rose-900 hover:underline">
            mors dag
          </Link>
          {" "}og{" "}
          <Link href="/guides/vin-til-fars-dag" className="text-rose-900 hover:underline">
            fars dag
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Guides efter stemning</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <p className="mt-10 text-stone-700">
        Skal du købe en bestemt flaske? Se{" "}
        <Link href="/bedste-vine" className="text-rose-900 hover:underline">
          bedste vine
        </Link>{" "}
        for top-lister efter pris og lejlighed —{" "}
        <Link href="/guides/bedste-vin-til-gave" className="text-rose-900 hover:underline">
          gavevin
        </Link>
        ,{" "}
        <Link href="/guides/bedste-vaertindegave-vin" className="text-rose-900 hover:underline">
          værtindegave
        </Link>{" "}
        og{" "}
        <Link href="/guides/bedste-weekendvin" className="text-rose-900 hover:underline">
          weekendvin
        </Link>{" "}
        rammer mange humør-lejligheder direkte.
      </p>
      <p className="mt-6 text-stone-700">
        Kombinér med{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad og vin
        </Link>
        ,{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          den komplette parringsguide
        </Link>{" "}
        og{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          vinregioner
        </Link>
        .
      </p>
    </div>
  );
}
