import type { Metadata } from "next";
import Link from "next/link";

import { BlackFridayStoreGrid } from "@/components/black-friday-store-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd, FaqJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { listBlackFridayStores } from "@/lib/black-friday/store-directory";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Black Friday vinbutikker 2026 — danske shops i ét overblik";
const PAGE_DESCRIPTION =
  "Se danske vinbutikker til Black Friday: partnere med verificerede tilbud, kæder og importører samlet ét sted. Sammenlign priser på Vinbot — undgå oppustede førpriser.";
const PAGE_URL = `${siteUrl}/black-friday/butikker`;

const STORES_FAQ = [
  {
    question: "Hvem har de bedste Black Friday vintilbud?",
    answer:
      "Det afhænger af, hvad du leder efter. Nogle butikker — som Den Sidste Flaske — er stærke til hverdags-kup og restpartier. Andre, især eksklusive importører som Philipson Wine, rydder ofte lageret for topklassificerede vine. Vinbot viser verificerede tilbud fra betalende partnere, så du kan sammenligne nedsættelser i stedet for at gætte på, hvilken shop der «vinder» Black Friday.",
  },
  {
    question: "Hvordan gennemskuer jeg førpriser på vin til Black Friday?",
    answer:
      "Mange kampagner bygger på butikkens egen før-pris, som kan være oppustet. Vinbot scanner feeds og sammenligner priser på tværs af forhandlere, så du kan se, om et «50 %»-skilt faktisk er billigere end hos en anden shop. Tjek altid checkout hos forhandleren, og brug Black Friday-hubben til at se nedsættelser og prisforskelle — ikke kun den største procent.",
  },
] as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    locale: "da_DK",
    type: "website",
  },
};

function InternalLinkBox() {
  return (
    <aside className="rounded-2xl border border-rose-200/80 bg-rose-50/50 p-5 sm:p-6">
      <p className="text-sm font-medium text-stone-800">Skal du bruge vinen til juleaften?</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        Brug vores{" "}
        <Link href="/julevin-beregner" className="font-semibold text-rose-900 hover:underline">
          Julevin-beregner
        </Link>{" "}
        og find de rigtige mængder — og de butikker, der matcher.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        Vil du hellere se specifikke flasker på tilbud? Se vores{" "}
        <Link href="/black-friday" className="font-semibold text-rose-900 hover:underline">
          Black Friday vin-hub
        </Link>
        .
      </p>
    </aside>
  );
}

export default function BlackFridayStoresPage() {
  const stores = listBlackFridayStores();
  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Black Friday vin", url: `${siteUrl}/black-friday` },
    { name: "Butikker", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={stores
          .filter((s) => s.partner)
          .map((s) => ({ name: s.displayName, url: s.href ?? PAGE_URL }))}
      />
      <FaqJsonLd items={[...STORES_FAQ]} />

      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/black-friday", label: "Black Friday" },
          { href: "/black-friday/butikker", label: "Butikker" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-800/90">Black Friday 2026</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Danske vinbutikker til Black Friday
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Overblik over kæder, online-specialister og importører — med verificerede tilbud hos vores partnere og et
          samlet sted at holde øje med resten af markedet.
        </p>
      </header>

      <div className="mt-8 max-w-3xl">
        <InternalLinkBox />
      </div>

      <div className="mt-12">
        <BlackFridayStoreGrid stores={stores} variant="directory" />
      </div>

      <section className="mt-16 max-w-3xl" aria-labelledby="bf-stores-guide-heading">
        <h2 id="bf-stores-guide-heading" className="text-2xl font-semibold tracking-tight text-stone-900">
          Forbrugerguide: Black Friday vin i danske butikker
        </h2>
        <div className="mt-4 space-y-4 text-stone-700">
          <p className="leading-relaxed">
            Hvert år i november søger tusindvis af danskere efter Black Friday vintilbud, billig julevin og de bedste
            vinbutikker online. Markedet er fragmenteret: store kæder som Skjold Burne, Holte Vinlager, Vinoble,
            Supervin og VildMedVin har kendte navne og brede hylder, mens netbutikker som Den Sidste Flaske og Winefamly
            er bygget til restpartier og hurtige kup. Importører som Philipson Wine, Erik Sørensen Vin, Kjær &
            Sommerfeldt og Laudrup Vin spiller en anden rolle — her handler Black Friday ofte om at rydde lageret for
            flasker, du ellers ville vente på til en smagning.
          </p>
          <p className="leading-relaxed">
            Det bedste tilbud er sjældent den største procent på et banner. En «førpris» kan være sat op, lige før
            kampagnen går i luften. Derfor scanner Vinbot priser fra affiliate-feeds og viser både nedsættelser i shoppen
            og prisforskelle på samme vin på tværs af forhandlere. Vi sælger ikke vinen: du handler altid hos butikken.
            Vores partnere har en tydelig knap til deres Black Friday-udvalg; butikker uden partnerskab vises stadig, så
            du kan se markedet — men uden at vi kan verificere deres kampagnepriser.
          </p>
          <p className="leading-relaxed">
            Hvis du køber ind til juleaften, starter du bedst med mængden — ikke med den første rabat, du ser.{" "}
            <Link href="/julevin-beregner" className="font-medium text-rose-900 hover:underline">
              Julevin-beregneren
            </Link>{" "}
            hjælper med at estimere flasker til gæster, og{" "}
            <Link href="/black-friday" className="font-medium text-rose-900 hover:underline">
              Black Friday vin-hubben
            </Link>{" "}
            samler konkrete flasker på tilbud, bobler til nytår og en prischeck, så du kan spotte, når en kampagne ikke
            holder. Brug denne butiksoversigt til at vælge, hvor du vil kigge — og hubben til at se, hvad der faktisk er
            nedsat.
          </p>
          <p className="leading-relaxed">
            Husk fragt, minimumskøb og retur. En skarp flaskepris hos en online-specialist kan ædes op af levering, mens
            en kæde med butik kan vinde, hvis du alligevel henter selv. Sammenlign den pris, du betaler i kassen, med det
            Vinbot viser på tværs — og gå videre til partnerbutikkerne, når du er klar til at handle.
          </p>
        </div>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="bf-stores-faq-heading">
        <h2 id="bf-stores-faq-heading" className="text-xl font-semibold text-stone-900">
          Ofte stillede spørgsmål
        </h2>
        <div className="mt-5 space-y-3">
          {STORES_FAQ.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none">
                <h3 className="text-base font-semibold text-stone-900">{item.question}</h3>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 max-w-3xl">
        <InternalLinkBox />
      </div>
    </PageShell>
  );
}
