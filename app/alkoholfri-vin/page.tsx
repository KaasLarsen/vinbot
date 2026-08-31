import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { filterIndexableGuides, listAlkoholfriHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Alkoholfri vin — 0 % guides, mærker og køb i DK";
const PAGE_DESCRIPTION =
  "Alkoholfri vin-hub: bedste 0 % bobler, hvid, rosé og rød, mærker som Leitz og Torres, under 100 kr, Netto/Føtex, fest, grill og ærlige smagsguides.";
const PAGE_URL = `${siteUrl}/alkoholfri-vin`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function AlkoholfriVinHubPage() {
  const guides = filterIndexableGuides(listAlkoholfriHubGuides());
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
    { name: "Alkoholfri vin", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} items={collectionItems} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/alkoholfri-vin", label: "Alkoholfri vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Alkoholfri vin</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Alt om <strong className="font-medium text-stone-800">0 % og alkoholfri vin</strong> i Danmark: hvilke
        flasker der smager af vin (ikke saft), hvilke mærker der er værd at købe, og hvad der virker til fest, grill
        og hverdag. Start med typen — eller gå direkte til{" "}
        <Link href="/guides/bedste-alkoholfri-vin" className="text-rose-900 hover:underline">
          bedste alkoholfri vin
        </Link>{" "}
        hvis du vil have top-listen.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Sammenlign priser med{" "}
        <Link href="/?q=alkoholfri%20vin%200%25" className="text-rose-900 hover:underline">
          søgning på alkoholfri 0 %
        </Link>
        . Relateret:{" "}
        <Link href="/bedste-vine" className="text-rose-900 hover:underline">
          bedste vine
        </Link>
        ,{" "}
        <Link href="/fest-og-vin" className="text-rose-900 hover:underline">
          fest og selskab
        </Link>{" "}
        og{" "}
        <Link href="/vin-viden" className="text-rose-900 hover:underline">
          vin-viden
        </Link>
        .
      </p>

      <section className="mt-8 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Mest søgte lige nu</h2>
        <p className="mt-3 text-sm text-stone-700">
          GSC-top i Danmark — start her hvis du vil have 0 % der smager af vin:
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/bedste-alkoholfri-hvidvin" className="font-medium hover:underline">
            Alkoholfri hvidvin bedst i test
          </Link>
          <Link href="/guides/bedste-alkoholfri-vin" className="font-medium hover:underline">
            Bedste alkoholfri vin (top 10)
          </Link>
          <Link href="/guides/bedste-alkoholfri-bobler" className="hover:underline">
            Alkoholfri bobler til fest
          </Link>
          <Link href="/guides/bedste-alkoholfri-rose" className="hover:underline">
            Alkoholfri rosé bedst i test
          </Link>
          <Link href="/guides/bedste-alkoholfri-rodvin" className="hover:underline">
            Alkoholfri rødvin 0 %
          </Link>
          <Link href="/guides/bedste-alkoholfri-vin-under-100-kr" className="hover:underline">
            Alkoholfri vin under 100 kr
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Typer — vælg stil</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/bedste-alkoholfri-vin" className="text-rose-900 hover:underline">
                Bedste alkoholfri vin
              </Link>{" "}
              — top 10 og overblik
            </li>
            <li>
              <Link href="/guides/bedste-alkoholfri-bobler" className="text-rose-900 hover:underline">
                Bobler
              </Link>
              ,{" "}
              <Link href="/guides/bedste-alkoholfri-champagne" className="text-rose-900 hover:underline">
                champagne / premium sparkling
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-alkoholfri-hvidvin" className="text-rose-900 hover:underline">
                Hvidvin
              </Link>
              ,{" "}
              <Link href="/guides/bedste-alkoholfri-rose" className="text-rose-900 hover:underline">
                rosé
              </Link>
              ,{" "}
              <Link href="/guides/bedste-alkoholfri-rodvin" className="text-rose-900 hover:underline">
                rødvin
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Mærker</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/bedste-alkoholfri-maerker-2026" className="text-rose-900 hover:underline">
                Bedste alkoholfri mærker 2026
              </Link>
            </li>
            <li>
              <Link href="/guides/leitz-eins-zwei-zero" className="text-rose-900 hover:underline">
                Leitz Eins-Zwei-Zero
              </Link>
              ,{" "}
              <Link href="/guides/torres-natureo" className="text-rose-900 hover:underline">
                Torres Natureo
              </Link>
              ,{" "}
              <Link href="/guides/noughty-alkoholfri-vin" className="text-rose-900 hover:underline">
                Noughty
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Hvor køber man?</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/bedste-alkoholfri-vin-under-100-kr" className="text-rose-900 hover:underline">
                Alkoholfri under 100 kr
              </Link>
            </li>
            <li>
              <Link href="/guides/alkoholfri-vin-i-netto-foetex" className="text-rose-900 hover:underline">
                Netto, Føtex og Bilka
              </Link>
            </li>
            <li>
              <Link href="/?q=alkoholfri%20leitz%20torres%200%25" className="text-rose-900 hover:underline">
                Sammenlign priser online
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Anledning</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/alkoholfri-vin-til-fest" className="text-rose-900 hover:underline">
                Fest
              </Link>
              ,{" "}
              <Link href="/guides/alkoholfri-vin-til-konfirmation" className="text-rose-900 hover:underline">
                konfirmation
              </Link>
              ,{" "}
              <Link href="/guides/alkoholfri-vin-til-grill" className="text-rose-900 hover:underline">
                grill
              </Link>
              ,{" "}
              <Link href="/guides/alkoholfri-vin-til-brunch" className="text-rose-900 hover:underline">
                brunch
              </Link>
            </li>
            <li>
              <Link href="/guides/alkoholfri-vin-til-jul" className="text-rose-900 hover:underline">
                Jul
              </Link>
              ,{" "}
              <Link href="/guides/alkoholfri-vin-til-dry-january" className="text-rose-900 hover:underline">
                Dry January
              </Link>
              ,{" "}
              <Link href="/guides/alkoholfri-vin-til-graviditet" className="text-rose-900 hover:underline">
                graviditet
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5 md:col-span-2">
          <h2 className="text-lg font-semibold text-stone-900">Viden — ærlige svar</h2>
          <ul className="mt-3 grid list-disc gap-x-6 gap-y-1.5 pl-5 text-sm text-stone-700 sm:grid-cols-2">
            <li>
              <Link href="/guides/smager-alkoholfri-vin-godt" className="text-rose-900 hover:underline">
                Smager alkoholfri vin godt?
              </Link>
            </li>
            <li>
              <Link href="/guides/kalorier-i-alkoholfri-vin" className="text-rose-900 hover:underline">
                Kalorier i alkoholfri vin
              </Link>
            </li>
            <li>
              <Link href="/guides/hvordan-fremstilles-alkoholfri-vin" className="text-rose-900 hover:underline">
                Hvordan fremstilles alkoholfri vin
              </Link>
            </li>
            <li>
              <Link
                href="/guides/hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin"
                className="text-rose-900 hover:underline"
              >
                Alkoholfri vs alkoholsvag
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-lavalkohol-vin" className="text-rose-900 hover:underline">
                Bedste lavalkohol-vin
              </Link>
              ,{" "}
              <Link href="/guides/mindful-drikke-low-no-alkohol" className="text-rose-900 hover:underline">
                mindful drinking
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan bruger du hubben</h2>
        <p>
          Ny i kategorien? Start med{" "}
          <Link href="/guides/smager-alkoholfri-vin-godt" className="text-rose-900 hover:underline">
            smager det godt
          </Link>{" "}
          og{" "}
          <Link href="/guides/bedste-alkoholfri-bobler" className="text-rose-900 hover:underline">
            bobler
          </Link>{" "}
          — det er det nemmeste sted at lande godt første gang. Skal du købe i butik:{" "}
          <Link href="/guides/alkoholfri-vin-i-netto-foetex" className="text-rose-900 hover:underline">
            Netto/Føtex
          </Link>{" "}
          eller{" "}
          <Link href="/guides/bedste-alkoholfri-vin-under-100-kr" className="text-rose-900 hover:underline">
            under 100 kr
          </Link>
          . Vil du have ét mærke:{" "}
          <Link href="/guides/leitz-eins-zwei-zero" className="text-rose-900 hover:underline">
            Leitz Eins-Zwei-Zero
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Alle alkoholfri-guides</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" hub="alkoholfri-vin" slug="alkoholfri-vin-hub" />

      <p className="mt-10 text-sm text-stone-700">
        Se også{" "}
        <Link href="/bedste-vine" className="text-rose-900 hover:underline">
          bedste vine
        </Link>
        ,{" "}
        <Link href="/fest-og-vin" className="text-rose-900 hover:underline">
          fest og selskab
        </Link>
        ,{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson
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
