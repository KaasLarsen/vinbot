import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { filterIndexableGuides, listFestOgVinHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vin til fest og selskab — mængde, bryllup og konfirmation";
const PAGE_DESCRIPTION =
  "Hvor meget vin til fest og bryllup? Guides til konfirmation, studenterfest, bobler, gaver, alkoholfri og genstande — planlæg indkøb efter gæster og budget.";
const PAGE_URL = `${siteUrl}/fest-og-vin`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function FestOgVinHubPage() {
  const guides = filterIndexableGuides(listFestOgVinHubGuides());
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
    { name: "Fest og selskab", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} items={collectionItems} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/fest-og-vin", label: "Fest og selskab" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin til fest og selskab</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Når du inviterer mange gæster — konfirmation, studenterfest, bryllup, firmafest eller runde fødselsdage — handler det ofte om{" "}
        <strong className="font-medium text-stone-800">mængde</strong>,{" "}
        <strong className="font-medium text-stone-800">buffere</strong> og{" "}
        <strong className="font-medium text-stone-800">praktiske valg</strong> (bobler til velkomst, hvid og rød til menuen, dessertvin). Her samler vi de guides der typisk åbnes i den situation — plus gave og alkoholfri, så alle ved bordet er med.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Årstid og mad finder du også under{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson og højtider
        </Link>
        ; stemning og hygge under{" "}
        <Link href="/humoer-og-vin" className="text-rose-900 hover:underline">
          humør og stemning
        </Link>
        . Søg i listen nedenfor, eller gå til{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Mængde og planlægning</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/hvor-meget-vin-til-fest" className="text-rose-900 hover:underline">
                Hvor meget vin til fest
              </Link>{" "}
              — flasker per gæst, buffet og cocktail
            </li>
            <li>
              <Link href="/guides/hvor-meget-vin-til-bryllup" className="text-rose-900 hover:underline">
                Hvor meget vin til bryllup
              </Link>{" "}
              — skål, taler og aften
            </li>
            <li>
              <Link href="/guides/hvor-mange-glas-i-en-flaske-vin" className="text-rose-900 hover:underline">
                Glas i en flaske
              </Link>
              ,{" "}
              <Link href="/guides/hvor-mange-enheder-alkohol-i-et-glas-vin" className="text-rose-900 hover:underline">
                genstande pr. glas
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Konfirmation, studenterfest og bryllup</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
                Vin til konfirmation
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-studenterfest" className="text-rose-900 hover:underline">
                Vin til studenterfest
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-sommerbryllup" className="text-rose-900 hover:underline">
                Sommerbryllup
              </Link>
              ,{" "}
              <Link href="/guides/vin-til-haveselskab" className="text-rose-900 hover:underline">
                haveselskab
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Bobler og champagne</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/hverdags-bobler" className="text-rose-900 hover:underline">
                Hverdags-bobler (tirsdag & takeaway)
              </Link>
              ,{" "}
              <Link href="/guides/bobler-champagne-cava-prosecco-og-cremant" className="text-rose-900 hover:underline">
                Bobler: champagne, cava, crémant, prosecco
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-pakkeleg" className="text-rose-900 hover:underline">
                Vin til pakkeleg (ca. 50 kr)
              </Link>
            </li>
            <li>
              <Link href="/guides/bobler-til-takeaway-og-fastfood" className="text-rose-900 hover:underline">
                Bobler til takeaway
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-bobler" className="text-rose-900 hover:underline">
                Bedste bobler
              </Link>
              ,{" "}
              <Link href="/guides/bedste-bobler-under-200-kr" className="text-rose-900 hover:underline">
                bobler under 200 kr
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-champagne-under-300-kr" className="text-rose-900 hover:underline">
                Champagne under 300 kr
              </Link>
              ,{" "}
              <Link href="/guides/bobler-til-brunch" className="text-rose-900 hover:underline">
                bobler til brunch
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Gaver og værtsgaver</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/bedste-vin-til-gave" className="text-rose-900 hover:underline">
                Bedste vin til gave
              </Link>
            </li>
            <li>
              <Link href="/guides/gavevin-sadan-vaelger-du-den-rigtige-flaske" className="text-rose-900 hover:underline">
                Sådan vælger du gavevin
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-vaertindegave-vin" className="text-rose-900 hover:underline">
                Værtsgave med vin
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Alkoholfri og blandet selskab</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/alkoholfri-vin-til-fest" className="text-rose-900 hover:underline">
                Alkoholfri vin til fest
              </Link>
            </li>
            <li>
              <Link href="/guides/humoer-stemning-og-vin" className="text-rose-900 hover:underline">
                Humør, stemning og vin
              </Link>
            </li>
            <li>
              <Link href="/guides/sadan-serverer-du-vin" className="text-rose-900 hover:underline">
                Sådan serverer du vin
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Dessert, nytår og videre</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/vin-til-dessert-og-kransekage" className="text-rose-900 hover:underline">
                Vin til dessert og kransekage
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="text-rose-900 hover:underline">
                Nytår og nytårsmenu
              </Link>
            </li>
            <li>
              <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
                Komplet guide til vin og mad
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan bruger du hubben</h2>
        <p>
          Start med{" "}
          <Link href="/guides/hvor-meget-vin-til-fest" className="text-rose-900 hover:underline">
            mængde-guiden
          </Link>{" "}
          hvis du bare skal have et tal på flasker — tilpas derefter med{" "}
          <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
            konfirmation
          </Link>{" "}
          eller{" "}
          <Link href="/guides/hvor-meget-vin-til-bryllup" className="text-rose-900 hover:underline">
            bryllup
          </Link>{" "}
          når menu og varighed er kendt. Køber du ind til mange, er{" "}
          <Link href="/bedste-vine" className="text-rose-900 hover:underline">
            bedste vine
          </Link>{" "}
          og bobler-listerne gode til at holde budget og kvalitet i balance.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Guides til fest og selskab</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" hub="fest-og-vin" slug="fest-og-vin-hub" />

      <p className="mt-10 text-sm text-stone-700">
        Se også{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson og højtider
        </Link>
        ,{" "}
        <Link href="/vin-viden" className="text-rose-900 hover:underline">
          vin-viden
        </Link>
        ,{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad og vin
        </Link>{" "}
        og{" "}
        <Link href="/rabatkoder" className="text-rose-900 hover:underline">
          rabatkoder
        </Link>
        .
      </p>
    </div>
  );
}
