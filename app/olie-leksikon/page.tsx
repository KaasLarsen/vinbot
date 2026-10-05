import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { KitchenOneOilGrid } from "@/components/kitchenone-oil-grid";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listOlieLeksikonHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Olie-Leksikon: ekstra jomfru olivenolie, falsk olie og sundhed";
const PAGE_DESCRIPTION =
  "Ekstra jomfru olivenolie forklaret: EU-klasse, koldpresning, falsk EVOO og hvorfor kvalitet kradser i halsen. Se flasker med billede og pris hos KitchenOne.";
const PAGE_URL = `${siteUrl}/olie-leksikon`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function OlieLeksikonHubPage() {
  const guides = listOlieLeksikonHubGuides();
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
    { name: "Olie-Leksikon", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/olie-leksikon", label: "Olie-Leksikon" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Olie-Leksikon</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Korte, konkrete svar på det, folk googler om olivenolie:{" "}
        <strong className="font-medium text-stone-800">hvad ekstra jomfru egentlig betyder</strong>,{" "}
        <strong className="font-medium text-stone-800">hvordan du spotter falsk olie</strong> og{" "}
        <strong className="font-medium text-stone-800">hvorfor kvalitet kradser i halsen</strong> — polyfenoler,
        koldpresning og hjertesundhed uden mirakelkur.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Start her:{" "}
        <Link href="/guides/hvad-er-ekstra-jomfru-olivenolie" className="text-rose-900 hover:underline">
          ekstra jomfru
        </Link>
        ,{" "}
        <Link href="/guides/falsk-olivenolie" className="text-rose-900 hover:underline">
          falsk olivenolie
        </Link>
        ,{" "}
        <Link href="/guides/olivenolie-sundhed" className="text-rose-900 hover:underline">
          sundhed og halskrads
        </Link>
        . Bruge flasken:{" "}
        <Link href="/guides/olivenolie-finish" className="text-rose-900 hover:underline">
          olie som finish
        </Link>
        . Giv den væk:{" "}
        <Link href="/guides/vaertindegave-olivenolie" className="text-rose-900 hover:underline">
          værtindegave
        </Link>
        .
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Ekstra jomfru</h2>
          <p className="mt-2 text-sm text-stone-700">
            Extra virgin er en <strong>EU-kvalitetsklasse</strong> — syre, smag og mekanisk pres — ikke et pænt
            italiensk ord på etiketten.{" "}
            <Link href="/guides/hvad-er-ekstra-jomfru-olivenolie" className="text-rose-900 hover:underline">
              Læs hvad EVOO betyder
            </Link>
            .
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Falsk olie</h2>
          <p className="mt-2 text-sm text-stone-700">
            Mix med raffineret olie, «packed in» uden oprindelse, og dunk til 39 kr.{" "}
            <Link href="/guides/falsk-olivenolie" className="text-rose-900 hover:underline">
              Sådan spotter du den
            </Link>
            .
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Sundhed og bid</h2>
          <p className="mt-2 text-sm text-stone-700">
            Antioxidanter, koldpres og oleocanthal: den peber, der kradser i halsen, er ofte et kvalitetssignal.{" "}
            <Link href="/guides/olivenolie-sundhed" className="text-rose-900 hover:underline">
              Læs sundhedsguiden
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Olivenolie hos KitchenOne</h2>
        <p className="mt-3 max-w-3xl text-stone-700">
          Extra virgin til finish, plus urte-, chili-, hvidløg- og trøffelolie til tallerkenen. Extra virgin her er
          EU-kvalitetsklassen — ikke et laboratorie-stempel eller DOP.
        </p>
        <KitchenOneOilGrid slug="olie-leksikon-hub" hub="olie-leksikon" />
        <p className="mt-4 max-w-3xl text-xs text-stone-500">
          Annoncelink via partner — du handler hos KitchenOne. Pris og lager kan have ændret sig.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Artiklerne</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips={false} />
      </section>

      <GuideTopicHubExtras
        hub="olie-leksikon"
        slug="olie-leksikon-hub"
        products={[]}
        seoHeading="Ekstra jomfru olivenolie: klasse, finish og hvad du køber"
        faq={[
          {
            question: "Hvad betyder ekstra jomfru olivenolie?",
            answer:
              "Extra virgin / ekstra jomfru er EU’s højeste kvalitetsklasse for olivenolie: mekanisk udvundet, lav frie fedtsyrer og ingen raffinering. Det er et kemisk og sensorisk krav — ikke et marketingord.",
          },
          {
            question: "Hvad betyder koldpresset olivenolie?",
            answer:
              "Koldpresset betyder, at olivenmassen holdes under en temperaturgrænse, så aroma ikke koges væk. Uden «ekstra jomfru» på etiketten er ordet reklame. Raffineret olie kan også have været kold et sted i processen.",
          },
          {
            question: "Hvorfor kradser god olivenolie i halsen?",
            answer:
              "Bidet kommer ofte fra oleocanthal, et polyfenol. Det er et kvalitetssignal i frisk extra virgin — ikke en fejl. Raffineret olie kradser sjældent.",
          },
          {
            question: "Kan olivenolie være falsk?",
            answer:
              "Ja. Typisk mix med billigere planteolie, gammel eller raffineret olie solgt som extra virgin, eller uklar oprindelse («packed in»). Køb navngiven extra virgin og brug den som finish.",
          },
          {
            question: "Skal ekstra jomfru olivenolie bruges til stegning?",
            answer:
              "Nej. Varme slår aromaen ihjel. Brug ekstra jomfru som finish ved bordet — caprese, grønt, fisk, ost og pizza efter ovnen. Stegepanden får en billigere olie.",
          },
        ]}
      >
        <h3 className="text-xl font-semibold text-stone-900">Ekstra jomfru er en klasse</h3>
        <p>
          <strong>Ekstra jomfru olivenolie</strong> (extra virgin) er EU’s højeste klasse: mekanisk pres, lav syre og
          ingen raffinering. Det er ikke et pænt italiensk ord på etiketten.{" "}
          <Link href="/guides/hvad-er-ekstra-jomfru-olivenolie" className="text-rose-900 hover:underline">
            Læs hvad ekstra jomfru betyder
          </Link>
          .
        </p>
        <h3 className="text-xl font-semibold text-stone-900">Koldpresset er ikke nok</h3>
        <p>
          <strong>Koldpresset</strong> uden «ekstra jomfru» er reklame. Jomfru ligger under extra virgin. «Olivenolie»,
          «pure» og «light» er som regel raffineret — fint til panden, tyndt som finish.
        </p>
        <h3 className="text-xl font-semibold text-stone-900">Sådan spotter du svag olie</h3>
        <p>
          «Packed in» uden oprindelse, ingen høstdato og en dunk til discountpris er de typiske signaler.{" "}
          <Link href="/guides/falsk-olivenolie" className="text-rose-900 hover:underline">
            Sådan spotter du falsk olivenolie
          </Link>
          .
        </p>
        <h3 className="text-xl font-semibold text-stone-900">Halskrads er ofte kvalitet</h3>
        <p>
          Bidet i halsen kommer fra <strong>polyfenoler</strong> (oleocanthal). Frisk extra virgin kradser. Raffineret
          olie gør det sjældent.{" "}
          <Link href="/guides/olivenolie-sundhed" className="text-rose-900 hover:underline">
            Olivenolie og sundhed
          </Link>
          .
        </p>
        <h3 className="text-xl font-semibold text-stone-900">Finish ved bordet</h3>
        <p>
          Den dyre flaske dryppes over caprese, grønt, fisk og pizza efter ovnen. Stegepanden får en billigere olie.{" "}
          <Link href="/guides/olivenolie-finish" className="text-rose-900 hover:underline">
            Olivenolie som finish
          </Link>
          . Opbevar den mørkt og køligt, og brug den mens den er frisk.
        </p>
        <h3 className="text-xl font-semibold text-stone-900">Gaver</h3>
        <p>
          <Link href="/guides/vin-og-olie-vaertsgave" className="text-rose-900 hover:underline">
            Vin og olie som værtsgave
          </Link>
          {" og "}
          <Link href="/guides/vaertindegave-olivenolie" className="text-rose-900 hover:underline">
            værtindegave med olivenolie
          </Link>
          . Til glasset:{" "}
          <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </Link>
          .
        </p>
      </GuideTopicHubExtras>

      <PartnerAdsLeaderboard className="mt-12" hub="olie-leksikon" slug="olie-leksikon-hub" />
    </PageShell>
  );
}
