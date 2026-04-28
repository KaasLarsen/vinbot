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
        <Link href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske" className="text-rose-900 hover:underline">
          vintemperatur og servering (°C)
        </Link>
        ,{" "}
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
        </Link>
        ,{" "}
        <Link href="/guides/bedste-alkoholfri-vin" className="text-rose-900 hover:underline">
          alkoholfri vin — oversigt
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

      <section className="mt-8 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Hvad er vin-viden?</h2>
        <p>
          Vin er et af de mest studerede og mest samtalte produkter i verden — og samtidig et felt omgivet af myter, forvirring og pseudo-autoritet. Den almindelige dansker har måske lært at skelne rød fra hvid, men for de fleste stopper det der. Hvor længe kan man egentlig opbevare en åbnet flaske? Hvor mange glas får man ud af en flaske ved en middag? Hvad er forskellen på tanniner og syre? Hvorfor skal nogle vine dekanteres, og andre drikkes direkte?
        </p>
        <p>
          Denne hub samler <strong>korte, konkrete, redaktionelt gennemarbejdede svar</strong> på de spørgsmål som faktisk googles i Danmark. Vi laver ikke opslagsbogs-svar der kopierer Wikipedia, og vi undgår de hule "afhænger af mange faktorer"-tekster. I stedet får du: typiske tal, konkrete eksempler, praktiske anbefalinger og de undtagelser der virkelig betyder noget. Alle guider er skrevet på dansk med danske vinhandlere, danske priser og dansk madkultur som udgangspunkt.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Hvor længe holder vinen?</h3>
          <p className="mt-2 text-sm text-stone-700">
            Åbnet og uåbnet, på flaske og i karaffel, i boks og på magnum. Læs om{" "}
            <Link href="/guides/hvor-laenge-holder-rodvin" className="text-rose-900 hover:underline">rødvin</Link>,{" "}
            <Link href="/guides/hvor-laenge-holder-uaabnet-vin" className="text-rose-900 hover:underline">uåbnet vin</Link>,{" "}
            <Link href="/guides/hvor-laenge-holder-vin-i-karaffel" className="text-rose-900 hover:underline">karaffel</Link> og{" "}
            <Link href="/guides/hvor-laenge-holder-boks-vin" className="text-rose-900 hover:underline">bag-in-box</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Mængder og størrelser</h3>
          <p className="mt-2 text-sm text-stone-700">
            Glas pr. flaske, genstande pr. glas, magnum, double-magnum og større. Læs om{" "}
            <Link href="/guides/hvor-mange-glas-i-en-flaske-vin" className="text-rose-900 hover:underline">glas i en flaske</Link>,{" "}
            <Link href="/guides/hvor-mange-enheder-alkohol-i-et-glas-vin" className="text-rose-900 hover:underline">genstande pr. glas</Link>,{" "}
            <Link href="/guides/hvor-meget-alkohol-i-vin" className="text-rose-900 hover:underline">alkoholprocent</Link> og{" "}
            <Link href="/guides/hvor-meget-fylder-en-flaske-vin" className="text-rose-900 hover:underline">flaskestørrelser</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Smagskomponenter og begreber</h3>
          <p className="mt-2 text-sm text-stone-700">
            Tanniner, syre, sulfit, fadlagring, malolaktisk gæring, ædelråd og appellationer. Læs om{" "}
            <Link href="/guides/hvad-er-tanniner" className="text-rose-900 hover:underline">tanniner</Link>,{" "}
            <Link href="/guides/hvad-er-sulfit-i-vin" className="text-rose-900 hover:underline">sulfit</Link>,{" "}
            <Link href="/guides/hvad-er-fadlagring" className="text-rose-900 hover:underline">fadlagring</Link> og{" "}
            <Link href="/guides/hvad-er-malolaktisk-gaering" className="text-rose-900 hover:underline">malolaktisk gæring</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Praktik i glasset</h3>
          <p className="mt-2 text-sm text-stone-700">
            Dekantering, vinglas, servering-temperatur, åbning af champagne. Læs om{" "}
            <Link href="/guides/sadan-dekanterer-du-vin" className="text-rose-900 hover:underline">dekantering</Link>,{" "}
            <Link href="/guides/sadan-vaelger-du-vinglas" className="text-rose-900 hover:underline">vinglas</Link>,{" "}
            <Link href="/guides/hvordan-aabner-du-champagne" className="text-rose-900 hover:underline">åbning af champagne</Link> og{" "}
            <Link href="/guides/kan-vin-blive-daarlig" className="text-rose-900 hover:underline">forkert vin</Link>.
          </p>
        </div>
      </section>

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
      <section className="mt-12 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan læser vi vin-viden</h2>
        <p>
          Vi deler vin-viden op i fire praktiske kategorier: <strong>holdbarhed</strong> (hvor længe holder åbnet og uåbnet vin), <strong>mængder</strong> (hvor mange glas, hvor meget alkohol, hvor meget skal købes til en fest), <strong>smag og begreber</strong> (tanniner, syre, sulfit, fadlagring, malolaktisk gæring, appellationer) og <strong>praktik</strong> (dekantering, glasvalg, temperatur, åbning af champagne). De fleste danske googlespørgsmål falder ind under én af disse fire — og for hver af dem har vi et konkret, kort svar med de tal og eksempler der rent faktisk er brug for.
        </p>
        <p>
          Bag hver guide ligger redaktionelt arbejde: vi henter tal fra etablerede kilder (sommelier-håndbøger, producentdata, Fødevarestyrelsen for alkoholenheder), sammenholder med hvad der faktisk er på hylderne hos danske vinhandlere, og skriver med udgangspunkt i danske spise- og drikkevaner. Vi forsøger at være den guide du selv ville have ønsket dig første gang du stod ved vinhylden — hurtig at læse, konkret i sine anbefalinger, og ærlig om hvor reglerne kan brydes.
        </p>
      </section>

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
