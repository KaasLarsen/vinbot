import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listHedvinHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Hedvin — port, sherry, madeira og vermouth";
const PAGE_DESCRIPTION =
  "Hedvin-hub: hvad er forstærket vin, alkoholprocent 15–22 %, portvin, sherry, madeira og vermouth. Guides til køb, servering og mad i DK.";
const PAGE_URL = `${siteUrl}/hedvin`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function HedvinHubPage() {
  const guides = listHedvinHubGuides();
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
    { name: "Hedvin", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} items={collectionItems} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/hedvin", label: "Hedvin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Hedvin</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Alt om <strong className="font-medium text-stone-800">forstærket vin</strong> — port, sherry, madeira og
        vermouth: hvordan den laves, hvorfor alkoholen er højere, og hvad du skal købe første gang. Start med{" "}
        <Link href="/guides/hvad-er-hedvin" className="text-rose-900 hover:underline">
          hvad er hedvin
        </Link>{" "}
        eller hop direkte til{" "}
        <Link href="/guides/bedste-portvin" className="text-rose-900 hover:underline">
          bedste portvin
        </Link>
        .
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Sammenlign priser med{" "}
        <Link href="/?q=hedvin%20portvin%20sherry" className="text-rose-900 hover:underline">
          søgning på hedvin, port og sherry
        </Link>
        . Relateret:{" "}
        <Link href="/vin-viden" className="text-rose-900 hover:underline">
          vin-viden
        </Link>
        ,{" "}
        <Link href="/bedste-vine" className="text-rose-900 hover:underline">
          bedste vine
        </Link>{" "}
        og{" "}
        <Link href="/lande/portugal" className="text-rose-900 hover:underline">
          Portugal
        </Link>
        .
      </p>

      <section className="mt-8 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Start her</h2>
        <p className="mt-3 text-sm text-stone-700">
          Overblik, alkoholprocent og de fire klassikere:
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/hvad-er-hedvin" className="font-medium hover:underline">
            Hvad er hedvin?
          </Link>
          <Link href="/guides/hedvin-alkoholprocent" className="font-medium hover:underline">
            Hedvin alkoholprocent (15–22 %)
          </Link>
          <Link href="/guides/hvad-er-portvin" className="hover:underline">
            Hvad er portvin?
          </Link>
          <Link href="/guides/hvad-er-sherry-vin" className="hover:underline">
            Hvad er sherry?
          </Link>
          <Link href="/guides/hvad-er-madeira-vin" className="hover:underline">
            Hvad er madeira?
          </Link>
          <Link href="/guides/hvad-er-vermouth" className="hover:underline">
            Hvad er vermouth?
          </Link>
          <Link href="/guides/bedste-portvin" className="hover:underline">
            Bedste portvin
          </Link>
          <Link href="/guides/bedste-dessertvin" className="hover:underline">
            Bedste dessertvin
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Typer</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/hvad-er-portvin" className="text-rose-900 hover:underline">
                Portvin
              </Link>{" "}
              —{" "}
              <Link href="/guides/ruby-portvin" className="text-rose-900 hover:underline">
                ruby
              </Link>
              ,{" "}
              <Link href="/guides/tawny-portvin" className="text-rose-900 hover:underline">
                tawny
              </Link>
            </li>
            <li>
              <Link href="/guides/hvad-er-sherry-vin" className="text-rose-900 hover:underline">
                Sherry
              </Link>{" "}
              — fino til Pedro Ximénez
            </li>
            <li>
              <Link href="/guides/hvad-er-madeira-vin" className="text-rose-900 hover:underline">
                Madeira
              </Link>{" "}
              — opvarmet hedvin
            </li>
            <li>
              <Link href="/guides/hvad-er-vermouth" className="text-rose-900 hover:underline">
                Vermouth
              </Link>{" "}
              — aromatiseret, cocktails
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Køb &amp; servering</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/bedste-portvin" className="text-rose-900 hover:underline">
                Bedste portvin
              </Link>
            </li>
            <li>
              <Link href="/guides/sadan-serverer-du-portvin" className="text-rose-900 hover:underline">
                Sådan serverer du portvin
              </Link>
            </li>
            <li>
              <Link href="/guides/hvor-laenge-holder-portvin" className="text-rose-900 hover:underline">
                Hvor længe holder portvin
              </Link>
            </li>
            <li>
              <Link href="/guides/portvin-alkoholprocent" className="text-rose-900 hover:underline">
                Portvin alkoholprocent
              </Link>
              ,{" "}
              <Link href="/guides/hedvin-alkoholprocent" className="text-rose-900 hover:underline">
                hedvin %
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5 md:col-span-2">
          <h2 className="text-lg font-semibold text-stone-900">Mad</h2>
          <ul className="mt-3 grid list-disc gap-x-6 gap-y-1.5 pl-5 text-sm text-stone-700 sm:grid-cols-2">
            <li>
              <Link href="/guides/portvin-til-ost" className="text-rose-900 hover:underline">
                Portvin til ost
              </Link>
            </li>
            <li>
              <Link href="/guides/portvin-til-chokolade" className="text-rose-900 hover:underline">
                Portvin til chokolade
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-dessertvin" className="text-rose-900 hover:underline">
                Bedste dessertvin
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-portugisisk-mad" className="text-rose-900 hover:underline">
                Vin til portugisisk mad
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan bruger du hubben</h2>
        <p>
          Ny i kategorien? Start med{" "}
          <Link href="/guides/hvad-er-hedvin" className="text-rose-900 hover:underline">
            hvad er hedvin
          </Link>{" "}
          og{" "}
          <Link href="/guides/hedvin-alkoholprocent" className="text-rose-900 hover:underline">
            alkoholprocent
          </Link>
          . Vil du have den mest kendte flaske herhjemme:{" "}
          <Link href="/guides/bedste-portvin" className="text-rose-900 hover:underline">
            bedste portvin
          </Link>
          . Til tapas og tør aperitif:{" "}
          <Link href="/guides/hvad-er-sherry-vin" className="text-rose-900 hover:underline">
            sherry
          </Link>
          . Til cocktails:{" "}
          <Link href="/guides/hvad-er-vermouth" className="text-rose-900 hover:underline">
            vermouth
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Alle hedvin-guides</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <GuideTopicHubExtras
        hub="hedvin"
        slug="hedvin-hub"
        products={[
          { productKey: "grahams-10-tawny", heading: "Tawny 10 år — Graham's (sammenlign priser)" },
          {
            productKey: "spiegelau-definition-roedvinsglas",
            heading: "Mindre tulipan-glas til port og sherry — Spiegelau Definition",
          },
        ]}
        seoHeading="Hedvin i Danmark: port, sherry, madeira og vermouth"
        faq={[
          {
            question: "Hvad er hedvin?",
            answer:
              "Vin med tilsat destillat (typisk brandy), så gæringen stopper og alkoholen lander ofte på 15–22 %. Port, sherry, madeira og marsala er de kendte familier.",
          },
          {
            question: "Hvilken portvin skal man købe først?",
            answer:
              "Tawny 10 år er det mest alsidige danske startpunkt: nødder, tørret frugt, god til ost og chokolade. Ruby er frugtigere og billigere; vintage er til lagring.",
          },
          {
            question: "Skal hedvin i køleskab?",
            answer:
              "Tawny og hvid port serveres let køligt. Åbnet tawny holder uger i køleskab; vintage ruby kortere. Sherry fino skal drikkes hurtigt efter åbning.",
          },
        ]}
      >
        <p>
          Hedvin er forstærket vin: destillat tilsættes, gæringen stopper, og du får højere alkohol, sødme eller tør
          oxidativ karakter. I Danmark er{" "}
          <Link href="/guides/bedste-portvin" className="text-rose-900 hover:underline">
            portvin
          </Link>{" "}
          den mest købte — tawny til ost og dessert, ruby til chokolade, vintage når du vil lagre. Læs definitionen i{" "}
          <Link href="/guides/hvad-er-hedvin" className="text-rose-900 hover:underline">
            hvad er hedvin
          </Link>{" "}
          og tallene i{" "}
          <Link href="/guides/hedvin-alkoholprocent" className="text-rose-900 hover:underline">
            alkoholprocent
          </Link>
          .
        </p>
        <p>
          Sherry er den tørre (eller søde) spanske slægtning: fino og manzanilla til tapas og mandler, oloroso og PX til
          dessert. Start med{" "}
          <Link href="/guides/hvad-er-sherry-vin" className="text-rose-900 hover:underline">
            hvad er sherry
          </Link>
          . Vermouth er krydret, forstærket vin til drinks — se{" "}
          <Link href="/guides/hvad-er-vermouth" className="text-rose-900 hover:underline">
            vermouth
          </Link>
          . Madeira og marsala dukker op i køkkenet og til ost.
        </p>
        <p>
          Servering: små glas (ikke store rødvinsbægre), korrekt temperatur, og husk at åbnet flaske opfører sig
          forskelligt efter type. Graham’s 10 Year Tawny (widget) er et konkret, let tilgængeligt eksempel på den
          danske “første port”. Glas-widgeten er tilbehør — port smager bedre i et mindre glas.
        </p>
        <p>
          Relateret geografi:{" "}
          <Link href="/lande/portugal" className="text-rose-900 hover:underline">
            Portugal
          </Link>{" "}
          og{" "}
          <Link href="/lande/spanien" className="text-rose-900 hover:underline">
            Spanien
          </Link>
          . Til ostebord og tapas krydser hedvin over i{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          .
        </p>
      </GuideTopicHubExtras>

      <PartnerAdsLeaderboard className="mt-12" hub="hedvin" slug="hedvin-hub" />

      <p className="mt-10 text-sm text-stone-700">
        Se også{" "}
        <Link href="/vin-viden" className="text-rose-900 hover:underline">
          vin-viden
        </Link>
        ,{" "}
        <Link href="/lande/portugal" className="text-rose-900 hover:underline">
          Portugal
        </Link>
        ,{" "}
        <Link href="/lande/spanien" className="text-rose-900 hover:underline">
          Spanien
        </Link>{" "}
        og{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>
    </PageShell>
  );
}
