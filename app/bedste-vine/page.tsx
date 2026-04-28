import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listBedsteVineHubGuides, listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Bedste vine — top-lister, pris og lejlighed";
const PAGE_DESCRIPTION =
  "Find den bedste vin: top-lister efter pris, lejlighed, stil og region. Bedste rødvin, hvidvin, rosé, bobler og champagne — plus gaveguider og begyndervin.";
const PAGE_URL = `${siteUrl}/bedste-vine`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function BedsteVineHubPage() {
  const raw = listBedsteVineHubGuides();
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
    { name: "Bedste vine", url: PAGE_URL },
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
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/bedste-vine", label: "Bedste vine" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Bedste vine</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Hvilken vin er den <strong className="font-medium text-stone-800">bedste</strong> lige nu? Det afhænger af pris,
        stil og lejlighed — ikke en enkelt flaske. Her er Vinbots top-lister, så du hurtigt kan zoome ind på det
        rigtige valg. Brug også søgningen på forsiden til at sammenligne priser på tværs af danske forhandlere.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Startklassikere:{" "}
        <Link href="/guides/bedste-rodvin" className="text-rose-900 hover:underline">
          bedste rødvin
        </Link>
        ,{" "}
        <Link href="/guides/bedste-hvidvin" className="text-rose-900 hover:underline">
          hvidvin
        </Link>
        ,{" "}
        <Link href="/guides/bedste-bobler" className="text-rose-900 hover:underline">
          bobler
        </Link>
        ,{" "}
        <Link href="/guides/bedste-vin-til-gave" className="text-rose-900 hover:underline">
          gavevin
        </Link>{" "}
        og{" "}
        <Link href="/guides/bedste-vin-til-begynder" className="text-rose-900 hover:underline">
          begyndervin
        </Link>
        . Budget?{" "}
        <Link href="/guides/bedste-rodvin-under-100-kr" className="text-rose-900 hover:underline">
          Rødvin under 100 kr
        </Link>{" "}
        eller{" "}
        <Link href="/guides/bedste-hvidvin-under-150-kr" className="text-rose-900 hover:underline">
          hvidvin under 150 kr
        </Link>
        . Sæson?{" "}
        <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">
          Bedste sommervin
        </Link>
        . Hele oversigten:{" "}
        <Link href="/guides" className="font-medium text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-10 rounded-2xl border border-rose-200 bg-rose-50/60 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Nye pris-kategorier — find hver prisklasse</h2>
        <p className="mt-2 text-sm text-stone-700">
          Vi har lavet dybdeguider til alle de mest søgte prisklasser — rød, hvid, rosé og bobler — fra 75 kr til 500 kr.
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/bedste-rodvin-under-75-kr" className="hover:underline">Rødvin under 75 kr</Link>
          <Link href="/guides/bedste-rodvin-under-100-kr" className="hover:underline">Rødvin under 100 kr</Link>
          <Link href="/guides/bedste-rodvin-under-150-kr" className="hover:underline">Rødvin under 150 kr</Link>
          <Link href="/guides/bedste-rodvin-under-200-kr" className="hover:underline">Rødvin under 200 kr</Link>
          <Link href="/guides/bedste-rodvin-under-300-kr" className="hover:underline">Rødvin under 300 kr</Link>
          <Link href="/guides/bedste-hvidvin-under-75-kr" className="hover:underline">Hvidvin under 75 kr</Link>
          <Link href="/guides/bedste-hvidvin-under-100-kr" className="hover:underline">Hvidvin under 100 kr</Link>
          <Link href="/guides/bedste-hvidvin-under-150-kr" className="hover:underline">Hvidvin under 150 kr</Link>
          <Link href="/guides/bedste-hvidvin-under-200-kr" className="hover:underline">Hvidvin under 200 kr</Link>
          <Link href="/guides/bedste-rosevin-under-100-kr" className="hover:underline">Rosévin under 100 kr</Link>
          <Link href="/guides/bedste-rosevin-under-150-kr" className="hover:underline">Rosévin under 150 kr</Link>
          <Link href="/guides/bedste-rosevin-under-200-kr" className="hover:underline">Rosévin under 200 kr</Link>
          <Link href="/guides/bedste-bobler-under-100-kr" className="hover:underline">Bobler under 100 kr</Link>
          <Link href="/guides/bedste-bobler-under-150-kr" className="hover:underline">Bobler under 150 kr</Link>
          <Link href="/guides/bedste-cava-under-150-kr" className="hover:underline">Cava under 150 kr</Link>
          <Link href="/guides/bedste-bobler-under-200-kr" className="hover:underline">Bobler under 200 kr</Link>
          <Link href="/guides/bedste-champagne-under-300-kr" className="hover:underline">Champagne under 300 kr</Link>
          <Link href="/guides/bedste-champagne-under-500-kr" className="hover:underline">Champagne under 500 kr</Link>
          <Link href="/guides/bedste-vin-under-100-kr" className="hover:underline">Al vin under 100 kr</Link>
          <Link href="/guides/bedste-vin-under-150-kr" className="hover:underline">Al vin under 150 kr</Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Efter drue × prisklasse — find bedste pris pr. druesort</h2>
        <p className="mt-2 text-sm text-stone-700">
          Vil du indsnævre direkte på drue? Her er prisklasseguider til de mest populære druer — med regioner, producenter og faldgruber i hver prisklasse.
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-amber-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/bedste-chardonnay-under-100-kr" className="hover:underline">Chardonnay under 100 kr</Link>
          <Link href="/guides/bedste-chardonnay-under-150-kr" className="hover:underline">Chardonnay under 150 kr</Link>
          <Link href="/guides/bedste-sauvignon-blanc-under-100-kr" className="hover:underline">Sauvignon blanc under 100 kr</Link>
          <Link href="/guides/bedste-sauvignon-blanc-under-150-kr" className="hover:underline">Sauvignon blanc under 150 kr</Link>
          <Link href="/guides/bedste-riesling-under-100-kr" className="hover:underline">Riesling under 100 kr</Link>
          <Link href="/guides/bedste-riesling-under-150-kr" className="hover:underline">Riesling under 150 kr</Link>
          <Link href="/guides/bedste-pinot-grigio-under-100-kr" className="hover:underline">Pinot grigio under 100 kr</Link>
          <Link href="/guides/bedste-pinot-grigio-under-150-kr" className="hover:underline">Pinot grigio under 150 kr</Link>
          <Link href="/guides/bedste-albarino-under-150-kr" className="hover:underline">Albariño under 150 kr</Link>
          <Link href="/guides/bedste-chenin-blanc-under-150-kr" className="hover:underline">Chenin blanc under 150 kr</Link>
          <Link href="/guides/bedste-cabernet-sauvignon-under-100-kr" className="hover:underline">Cabernet sauvignon under 100 kr</Link>
          <Link href="/guides/bedste-cabernet-sauvignon-under-150-kr" className="hover:underline">Cabernet sauvignon under 150 kr</Link>
          <Link href="/guides/bedste-cabernet-sauvignon-under-200-kr" className="hover:underline">Cabernet sauvignon under 200 kr</Link>
          <Link href="/guides/bedste-merlot-under-100-kr" className="hover:underline">Merlot under 100 kr</Link>
          <Link href="/guides/bedste-merlot-under-150-kr" className="hover:underline">Merlot under 150 kr</Link>
          <Link href="/guides/bedste-syrah-under-100-kr" className="hover:underline">Syrah / shiraz under 100 kr</Link>
          <Link href="/guides/bedste-syrah-under-150-kr" className="hover:underline">Syrah / shiraz under 150 kr</Link>
          <Link href="/guides/bedste-malbec-under-100-kr" className="hover:underline">Malbec under 100 kr</Link>
          <Link href="/guides/bedste-malbec-under-150-kr" className="hover:underline">Malbec under 150 kr</Link>
          <Link href="/guides/bedste-tempranillo-under-100-kr" className="hover:underline">Tempranillo under 100 kr</Link>
          <Link href="/guides/bedste-tempranillo-under-150-kr" className="hover:underline">Tempranillo under 150 kr</Link>
          <Link href="/guides/bedste-sangiovese-under-100-kr" className="hover:underline">Sangiovese under 100 kr</Link>
          <Link href="/guides/bedste-sangiovese-under-150-kr" className="hover:underline">Sangiovese under 150 kr</Link>
          <Link href="/guides/bedste-pinot-noir-under-150-kr" className="hover:underline">Pinot noir under 150 kr</Link>
          <Link href="/guides/bedste-pinot-noir-under-250-kr" className="hover:underline">Pinot noir under 250 kr</Link>
          <Link href="/guides/bedste-grenache-under-100-kr" className="hover:underline">Grenache under 100 kr</Link>
          <Link href="/guides/bedste-grenache-under-150-kr" className="hover:underline">Grenache under 150 kr</Link>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Alkoholfri & lavalkohol — voksent valg uden alkohol</h2>
        <p className="mt-2 text-sm text-stone-700">
          Graviditet, Dry January, køreture eller bare et bevidst valg. Kategorien er modnet kraftigt de sidste 5 år — særligt bobler og hvidvin leverer.
        </p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-emerald-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/bedste-alkoholfri-vin" className="hover:underline">Bedste alkoholfri vin (hub)</Link>
          <Link href="/guides/bedste-alkoholfri-bobler" className="hover:underline">Bedste alkoholfri bobler</Link>
          <Link href="/guides/bedste-alkoholfri-rodvin" className="hover:underline">Bedste alkoholfri rødvin</Link>
          <Link href="/guides/bedste-alkoholfri-hvidvin" className="hover:underline">Bedste alkoholfri hvidvin</Link>
          <Link href="/guides/bedste-alkoholfri-rose" className="hover:underline">Bedste alkoholfri rosé</Link>
          <Link href="/guides/bedste-lavalkohol-vin" className="hover:underline">Bedste lavalkohol-vin</Link>
          <Link href="/guides/alkoholfri-vin-til-jul" className="hover:underline">Alkoholfri vin til jul</Link>
          <Link href="/guides/alkoholfri-vin-til-fest" className="hover:underline">Alkoholfri vin til fest</Link>
          <Link href="/guides/alkoholfri-vin-til-brunch" className="hover:underline">Alkoholfri vin til brunch</Link>
          <Link href="/guides/alkoholfri-vin-til-dry-january" className="hover:underline">Alkoholfri vin til Dry January</Link>
          <Link href="/guides/alkoholfri-vin-til-graviditet" className="hover:underline">Alkoholfri under graviditet</Link>
          <Link href="/guides/hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin" className="hover:underline">Alkoholfri vs alkoholsvag</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Find den rigtige top-liste</h2>
        <GuideHubBrowser guides={cards} showKindTabs showTagChips tagMinCount={2} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <section className="mt-12 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Relaterede emner</h2>
        <p className="mt-4">
          Skal vinen parres med en ret? Gå til{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          . Ledt efter en bestemt druesort eller region? Se{" "}
          <Link href="/druesorter" className="text-rose-900 hover:underline">
            druesorter
          </Link>{" "}
          og{" "}
          <Link href="/regioner" className="text-rose-900 hover:underline">
            regioner
          </Link>
          . Kort om at købe vin online:{" "}
          <Link href="/guides/koeb-vin-online-sadan-holder-du-styr-paa-det" className="text-rose-900 hover:underline">
            sådan holder du styr på det
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
