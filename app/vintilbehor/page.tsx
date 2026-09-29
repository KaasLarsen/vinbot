import type { Metadata } from "next";
import Link from "next/link";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vintilbehør — glas, proptrækker, prop og køler";
const PAGE_DESCRIPTION =
  "Sammenlign priser på vintilbehør via PriceRunner: vinglas, waiter’s friend, vakuumprop, champagneprop og flaskekøler. Købsguides til udstyr — ikke flasker.";
const PAGE_URL = `${siteUrl}/vintilbehor`;

const FAQ = [
  {
    question: "Sælger Vinbot selv glas og proptrækkere?",
    answer:
      "Nej. Du sammenligner priser hos danske butikker via PriceRunner-widgets. Klik går til PriceRunner eller forhandleren. Din pris ændres ikke.",
  },
  {
    question: "Hvad er det første vintilbehør, man skal købe?",
    answer:
      "En waiter’s friend (proptrækker med folieskærer) og to fornuftige glas. Vakuumprop og flaskekøler kommer bagefter, når du ofte har restvin eller gæster.",
  },
  {
    question: "Er det det samme som vinkøleskabe?",
    answer:
      "Nej. Vinkøleskabe har deres egen side. Vinglas har også sin egen hub under /vinglas. Her samler vi mindre gear: glas, åbning, prop og køling ved bordet.",
  },
  {
    question: "Coravin eller vakuumprop?",
    answer:
      "Vakuumprop (plus køleskab) er nok til hverdagsvin over 1–3 dage. Coravin betaler sig først, når du skænker dyre flasker over flere dage eller uger uden at trække proppen — systemet og gaspatronerne er dyre.",
  },
  {
    question: "Karaffel eller vinaerator?",
    answer:
      "Aerator er hurtig luftning direkte i glasset — godt til ung, stram rød midt i ugen. Karaffel giver mere kontrol og er bedre, når hele flasken skal stå fremme, eller du skal skille bundfald. Delikat pinot og gammel vin: spring aeratoren over.",
  },
  {
    question: "Hvor hører glas hjemme — her eller på /vinglas?",
    answer:
      "Korte links og prissammenligning findes her. Dedikerede købsguides, formforklaring og glass-feeds ligger på /vinglas. Brug den hub, når du vælger rød-, hvid- eller champagneglas.",
  },
  {
    question: "Hvornår skal man købe vinreol eller vinkøleskab?",
    answer:
      "Vinreol når flaskerne flyder i køkkenet, og du vil have overblik. Vinkøleskab når du køler eller lagrer ofte, og stuetemperaturen er ustabil. Isspand og flaskekøler dækker gæster midt i ugen uden at købe et skab.",
  },
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

export default function VintilbehorPage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vintilbehør", url: PAGE_URL },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vintilbehor", label: "Vintilbehør" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">Udstyr &amp; prissammenligning</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-[2.65rem] sm:leading-tight">
          Vintilbehør — glas, prop og køler
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Flasken er halve oplevelsen. Her samler vi <strong className="font-medium text-stone-800">prissammenligning</strong> på
          konkret vintilbehør via <strong className="font-medium text-stone-800">PriceRunner</strong> — markeret som annonce — plus
          købsguides til åbning, prop, køling og karaffel. Dedikeret hub til glas:{" "}
          <Link href="/vinglas" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            /vinglas
          </Link>
          . Flasker søger du på forsiden; vinkøleskabe ligger på{" "}
          <Link href="/vinkoleskabe" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            /vinkoleskabe
          </Link>
          .
        </p>
      </header>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/vinglas", title: "Vinglas-hub", body: "Rød, hvid, bobler og mærker — fuld glas-guide." },
          { href: "/guides/vintilbehor-til-begyndere", title: "Startkit", body: "Hvad du skal købe først." },
          { href: "/guides/vin-gave-gear", title: "Gave-gear", body: "Glas, proptrækker og karaffel." },
          { href: "/guides/sadan-vaelger-du-proptrekker", title: "Proptrækker", body: "Waiter’s friend vs vinge." },
          { href: "/guides/sadan-vaelger-du-vinkaraffel", title: "Vinkaraffel", body: "Bred bund vs. bordkaraffel." },
          { href: "/guides/sadan-vaelger-du-vinreol", title: "Vinreol", body: "Størrelse, placering og format." },
          { href: "/guides/sadan-holder-du-aabnet-vin-frisk", title: "Prop & vakuum", body: "Åbnet vin og champagneprop." },
          { href: "/guides/isspand-og-flaskekoeler-vin", title: "Køling", body: "Isspand og flaskekøler." },
          { href: "/guides/sadan-bruger-du-vintermometer", title: "Vintermometer", body: "Servering i °C uden gætteri." },
          { href: "/guides/sadan-vaelger-du-vinaerator", title: "Vinaerator", body: "Hurtig luftning vs. karaffel." },
          { href: "/guides/sadan-vaelger-du-vinge-proptrekker", title: "Vinge-proptrækker", body: "Nem åbning for begyndere." },
          { href: "/guides/sadan-virker-coravin", title: "Coravin", body: "Glas uden at tømme flasken." },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-stone-200 bg-white p-4 text-stone-800 shadow-sm transition hover:border-rose-200 hover:shadow"
          >
            <p className="font-semibold text-stone-900">{c.title}</p>
            <p className="mt-1 text-sm text-stone-600">{c.body}</p>
          </Link>
        ))}
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Hvad du egentlig behøver</h2>
        <p className="mt-3 text-stone-700 leading-relaxed">
          Det meste «vintilbehør» er nice-to-have. Det, der faktisk ændrer hverdagen, er{" "}
          <strong className="font-medium text-stone-800">åbning</strong> og{" "}
          <strong className="font-medium text-stone-800">glas</strong>: en waiter’s friend med folieskærer, plus et sæt
          tynde, ens glas. Uden det ender aftenen i smulderpropper og tykke pub-glas, der fladerter aromaen.
        </p>
        <p className="mt-3 text-stone-700 leading-relaxed">
          Dernæst kommer <strong className="font-medium text-stone-800">prop og køling</strong>. De fleste begyndere
          spilder mere vin på ilt og varme end på «forkert drue». En vakuumprop eller almindelig prop plus køleskab
          giver ekstra dage på hverdagsvin; isspand eller flaskekøler redder hvidvin og bobler, når gæsterne ringer
          fra gadedøren. Karaffel, aerator, termometer og Coravin er{" "}
          <strong className="font-medium text-stone-800">næste lag</strong> — køb dem, når behovet dukker op, ikke som
          startpakke.
        </p>
        <p className="mt-3 text-stone-700 leading-relaxed">
          Glas har sin egen hub med feeds og form-guides:{" "}
          <Link
            href="/vinglas"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
          >
            /vinglas
          </Link>
          . Her fokuserer vi på resten af gear’et — og på at undgå gadget-sæt med sløv spiral og tykke rande. Start med{" "}
          <Link
            href="/guides/vintilbehor-til-begyndere"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
          >
            vintilbehør til begyndere
          </Link>
          .
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan bygger du et startkit</h2>
        <ol className="mt-4 list-decimal space-y-4 pl-5 text-stone-700 leading-relaxed">
          <li>
            <strong className="font-medium text-stone-900">Åbning først.</strong> En waiter’s friend (eller vinge, hvis
            hænderne skal have to store greb). Se{" "}
            <Link
              href="/guides/sadan-vaelger-du-proptrekker"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              proptrækker-guiden
            </Link>{" "}
            og{" "}
            <Link
              href="/guides/sadan-vaelger-du-vinge-proptrekker"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              vinge-proptrækker
            </Link>
            .
          </li>
          <li>
            <strong className="font-medium text-stone-900">Derefter glas.</strong> Fire ens tulipanformede glas dækker
            det meste. Form, rød/hvid/bobler og mærker ligger på{" "}
            <Link
              href="/vinglas"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              vinglas-hubben
            </Link>
            — ikke her.
          </li>
          <li>
            <strong className="font-medium text-stone-900">Prop og køler, når du har restvin eller gæster.</strong>{" "}
            <Link
              href="/guides/sadan-holder-du-aabnet-vin-frisk"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              Vakuum og champagneprop
            </Link>
            , plus{" "}
            <Link
              href="/guides/isspand-og-flaskekoeler-vin"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              isspand og flaskekøler
            </Link>
            .
          </li>
          <li>
            <strong className="font-medium text-stone-900">Karaffel, reol og specialgear til sidst.</strong>{" "}
            <Link
              href="/guides/sadan-vaelger-du-vinkaraffel"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              Karaffel
            </Link>{" "}
            når ung rød er lukket;{" "}
            <Link
              href="/guides/sadan-vaelger-du-vinreol"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              vinreol
            </Link>{" "}
            når flaskerne flyder;{" "}
            <Link
              href="/guides/sadan-virker-coravin"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              Coravin
            </Link>{" "}
            kun til dyre flasker over tid.
          </li>
        </ol>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Sammenlign priser</h2>
        <p className="mt-2 text-stone-700 leading-relaxed">
          Udvalgte modeller med lager hos flere danske butikker. Du klikker videre til PriceRunner — det er{" "}
          <strong className="font-medium text-stone-800">annoncer</strong>.
        </p>
        <PriceRunnerProductWidget
          productKey="spiegelau-definition-hvidvinsglas"
          heading="Hvidvinsglas — Spiegelau Definition"
          className="mt-6"
        />
        <PriceRunnerProductWidget
          productKey="le-creuset-waiters-friend-classic"
          heading="Proptrækker — Le Creuset Waiter's Friend"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="vacu-vin-wine-saver-gift-pack"
          heading="Vakuum — Vacu Vin Wine Saver"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="vacu-vin-champagne-prop"
          heading="Champagneprop — Vacu Vin"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="vacu-vin-active-flaskekoeler"
          heading="Flaskekøler — Vacu Vin Active"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="holmegaard-cabernet-vinkaraffel"
          heading="Karaffel — Holmegaard Cabernet"
          className="mt-8"
        />
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

      <p className="mt-12 max-w-3xl text-stone-700">
        Mere om lagring og skabe:{" "}
        <Link href="/guides/vinkoleskabe-sadan-vaelger-du" className="font-medium text-rose-900 underline">
          vælg vinkøleskab
        </Link>{" "}
        og{" "}
        <Link href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske" className="font-medium text-rose-900 underline">
          temperatur og åbnet flaske
        </Link>
        .
      </p>
    </PageShell>
  );
}
