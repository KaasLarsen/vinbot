import type { Metadata } from "next";
import Link from "next/link";
import { WineCoolerSearch } from "@/components/wine-cooler-search";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { ADTRACTION_VINKOELSKABET_SHOP } from "@/lib/adtraction-links";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vinkøleskabe — den ultimative guide til køb og valg";
const PAGE_DESCRIPTION =
  "Find det rigtige vinkøleskab: integrerbart eller fritstående, størrelse, zoner og pris. Søg live i udvalget hos Vinkøleskabet.dk med billede og pris — plus købsguide til køkken, kælder og samling.";
const PAGE_URL = `${siteUrl}/vinkoleskabe`;

const FAQ = [
  {
    question: "Hvor mange flasker har jeg brug for?",
    answer:
      "Køb gerne 20–30 % større end din nuværende samling. Angivne flasketal er typisk Bordeaux-størrelse — magnum og høje flasker fylder mere. En kompakt model til 15–30 flasker dækker weekendforbruget; 50+ flasker giver mening, når du begynder at lagre.",
  },
  {
    question: "Integrerbar eller fritstående vinkøleskab?",
    answer:
      "Integrerbare skabe bygges ind i køkkenet og kræver korrekt niche, ventilation og ofte præcise mål. Fritstående modeller er nemmere at placere og flytte — gode til stue, kælder eller bryggers, hvis du har plads til luft omkring skabet.",
  },
  {
    question: "Skal jeg vælge én eller to temperaturzoner?",
    answer:
      "Én zone er enkelt og ofte billigere — fint, hvis du primært drikker én type vin. To zoner er populært: kølig hvid/rosé og lidt varmere rød til servering. Flere zoner giver mening til større samlinger eller når både lagring og servering skal dækkes.",
  },
  {
    question: "Hvor finder jeg vinkøleskabe med pris og billede?",
    answer:
      "På denne side søger du direkte i Vinkøleskabet.dks sortiment via vores produktfeed. Du klikker videre til forhandleren for endelig pris, mål, levering og garanti.",
  },
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

export default function VinkoleskabePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vinkøleskabe", url: PAGE_URL },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vinkoleskabe", label: "Vinkøleskabe" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">Opbevaring &amp; udstyr</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-[2.65rem] sm:leading-tight">
          Vinkøleskabe — find den rigtige model
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Et dedikeret <strong className="font-medium text-stone-800">vinkøleskab</strong> giver stabil temperatur, beskyttelse mod lys og
          kontrol over zoner — langt bedre end et almindeligt køkkenkøleskab til både lagring og servering. Her samler vi{" "}
          <strong className="font-medium text-stone-800">søgning, inspiration og købsguide</strong>, så du kan sammenligne modeller og gå
          videre til køb, når du er klar.
        </p>
        <p className="mt-3 text-stone-700">
          Sortimentet kommer fra <strong className="font-medium text-stone-800">Vinkøleskabet.dk</strong> — fra kompakte fritstående skabe til
          integrerbare WineKeeper- og WineCave-modeller og store vinlagringsskabe.
        </p>
        <p className="mt-3 text-sm text-stone-700">
          <a
            href={ADTRACTION_VINKOELSKABET_SHOP}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
          >
            Gå direkte til Vinkøleskabet.dk →
          </a>
        </p>
      </header>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Integrerbart",
            body: "Til køkkenet med køkkenlåge. Tjek niche, dybde, ventilation og om døren skal være push/pull.",
            href: "#integrerbare",
          },
          {
            title: "Fritstående",
            body: "Nemmere at placere i stue, kælder eller bryggers. Godt til 15–50 flasker uden renovering.",
            href: "#fritstaende",
          },
          {
            title: "Stor lagring",
            body: "Vinlagringsskabe til 100+ flasker — til seriøs samling, kælder eller dedikeret vinrum.",
            href: "#stor-lagring",
          },
        ].map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ring-1 ring-stone-100 transition hover:border-rose-200 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-stone-900">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.body}</p>
            <span className="mt-3 inline-block text-sm font-medium text-rose-900">Se modeller ↓</span>
          </a>
        ))}
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-8">
        <h2 className="text-2xl font-semibold text-stone-900">Søg vinkøleskab</h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Kun <strong className="font-medium text-stone-800">vinkøleskabe og vinlagringsskabe</strong> — ikke glas, proptrækkere eller
          tilbehør. Resultaterne kommer fra Vinkøleskabet.dks feed; klik videre for mål, levering og aktuel pris.
        </p>
        <div className="mt-4">
          <AffiliateDisclosure compact />
        </div>
        <div className="mt-6">
          <WineCoolerSearch initialQuery="vinkøleskab" />
        </div>
      </section>

      <section className="mt-14 space-y-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-stone-900">Sådan vælger du — kort og konkret</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-stone-700 leading-relaxed">
            <li>
              <strong className="font-medium text-stone-900">Mål pladsen først.</strong> Især integrerede skabe: bredde, dybde, højde og
              døråbning. Tjek trapper og fri højde ved levering.
            </li>
            <li>
              <strong className="font-medium text-stone-900">Vælg zoner efter det, du drikker.</strong> Én zone til ensartet brug; to zoner
              hvis både hvid/rosé og rød skal ligge rigtigt.
            </li>
            <li>
              <strong className="font-medium text-stone-900">Støj betyder noget i åbne køkkener.</strong> Sammenlign dB og kompressortype,
              hvis skabet står i stuen.
            </li>
            <li>
              <strong className="font-medium text-stone-900">Energi over tid.</strong> Et skab der kører døgnet rundt — energimærke og
              årligt forbrug er værd at sammenligne.
            </li>
            <li>
              <strong className="font-medium text-stone-900">UV og glas.</strong> Mørkt eller røgfarvet glas beskytter bedre mod lys, hvis
              du lagrer længere end et par uger.
            </li>
          </ul>
          <p className="mt-4 text-sm text-stone-600">
            Den fulde guide:{" "}
            <Link href="/guides/vinkoleskabe-sadan-vaelger-du" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
              sådan vælger du vinkøleskab
            </Link>
            . Temperatur og opbevaring:{" "}
            <Link href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
              vintemperatur og opbevaring
            </Link>
            .
          </p>
        </div>

        <div id="integrerbare">
          <ProductFeedPreview
            searchScope="wine-cooler"
            emptyLabel="vinkøleskabe"
            query="integrerbar winekeeper winecave indbygning"
            title="Integrerbare vinkøleskabe"
            placement="vinkoleskabe-integrerbar"
          />
        </div>

        <div id="fritstaende">
          <ProductFeedPreview
            searchScope="wine-cooler"
            emptyLabel="vinkøleskabe"
            queries={["fritstående vinkøleskab 15 flasker", "fritstående vinkøleskab 30 flasker", "wineexpert fritstående"]}
            title="Fritstående — kompakt til hverdagsbrug"
            placement="vinkoleskabe-fritstaende"
          />
        </div>

        <div>
          <ProductFeedPreview
            searchScope="wine-cooler"
            emptyLabel="vinkøleskabe"
            query="winekeeper push pull exclusive"
            title="WineKeeper — integreret med push/pull"
            placement="vinkoleskabe-winekeeper"
          />
        </div>

        <div id="stor-lagring">
          <ProductFeedPreview
            searchScope="wine-cooler"
            emptyLabel="vinlagringsskabe"
            queries={["vinlagring 150 flasker", "vinlagring velvet", "winestore 180"]}
            title="Stor lagring — 100+ flasker"
            placement="vinkoleskabe-lagring"
          />
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 text-stone-800 sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">Før du bestiller — tjekliste</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed sm:text-base">
          <li>Mål niche eller plads — især ved integrerede skabe (ventilation, dybde, højde).</li>
          <li>Tjek antal flasker og om du vil have én eller flere temperaturzoner.</li>
          <li>Støj og energimærke betyder noget, hvis skabet står i åbent køkken.</li>
          <li>Bekræft garanti, levering og om der er hjemmelevering til din adresse.</li>
        </ul>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
        <dl className="mt-5 space-y-5">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700 sm:text-base">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
