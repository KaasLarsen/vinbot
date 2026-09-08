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
      "Nej. Vinkøleskabe har deres egen side med produktfeeds. Her samler vi mindre gear: glas, åbning, prop og køling ved bordet.",
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
          købsguides. Flasker søger du på forsiden; vinkøleskabe ligger på{" "}
          <Link href="/vinkoleskabe" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            /vinkoleskabe
          </Link>
          .
        </p>
      </header>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/guides/vintilbehor-til-begyndere", title: "Startkit", body: "Hvad du skal købe først." },
          { href: "/guides/sadan-vaelger-du-vinglas", title: "Vinglas", body: "Form, rød, hvid og bobler." },
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
