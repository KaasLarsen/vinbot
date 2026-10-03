import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { RetailerSignupCta } from "@/components/retailer-signup-cta";
import { PageShell } from "@/components/page-shell";
import { contactEmail, siteName, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Produktfeed-krav";
const PAGE_DESCRIPTION =
  "Krav til produktfeed for Vinbot: påkrævede og anbefalede felter, XML/CSV-formater, Google Merchant-tags og hvordan I sender feedet.";
const PAGE_URL = `${siteUrl}/produktfeed`;

const XML_EXAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <title>Château Eksempel Bordeaux 2020</title>
    <link>https://www.eksempel.dk/vin/chateau-eksempel-2020</link>
    <image_link>https://www.eksempel.dk/images/chateau-eksempel.jpg</image_link>
    <price>179.00 DKK</price>
    <sale_price>149.00 DKK</sale_price>
    <gtin>5701234567890</gtin>
    <brand>Château Eksempel</brand>
    <description>Klassisk Bordeaux med mørke bær og blød tannin.</description>
    <product_type>Vin &gt; Rødvin &gt; Bordeaux</product_type>
  </product>
</products>`;

const CSV_EXAMPLE = `title;link;image_link;price;sale_price;gtin;brand;description;product_type
"Château Eksempel Bordeaux 2020";"https://www.eksempel.dk/vin/chateau-eksempel-2020";"https://www.eksempel.dk/images/chateau-eksempel.jpg";"179.00";"149.00";"5701234567890";"Château Eksempel";"Klassisk Bordeaux med mørke bær og blød tannin.";"Vin > Rødvin > Bordeaux"`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function ProduktfeedPage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Forhandlere", url: `${siteUrl}/forhandlere` },
          { name: "Produktfeed", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/forhandlere", label: "Forhandlere" },
          { href: "/produktfeed", label: "Produktfeed" },
        ]}
      />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">{PAGE_TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Send denne side til jeres udvikler eller webshop-leverandør. {siteName} henter jeres sortiment via
        et offentligt XML- eller CSV-feed (HTTPS). Jo mere komplet feedet er, desto bedre matcher flaskerne
        i søgning,{" "}
        <Link href="/vine" className="text-rose-900 hover:underline">
          vin-kataloget
        </Link>{" "}
        og stregkodesøgning.
      </p>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Påkrævede felter</h2>
        <p className="leading-relaxed">
          Uden disse fire felter kommer produktet ikke med i vinsøgningen:
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Produktnavn</strong> — fx <code className="text-stone-800">title</code>,{" "}
            <code className="text-stone-800">name</code> eller <code className="text-stone-800">g_title</code>
          </li>
          <li>
            <strong>Pris</strong> — aktuel salgspris i DKK (tal; valuta-suffix er OK)
          </li>
          <li>
            <strong>Produkt-URL</strong> — absolut HTTPS-link til produktsiden (
            <code className="text-stone-800">link</code>, <code className="text-stone-800">url</code>,{" "}
            <code className="text-stone-800">g_link</code> eller deeplink)
          </li>
          <li>
            <strong>Billede</strong> — absolut HTTPS-URL til produktbillede (
            <code className="text-stone-800">image_link</code>,{" "}
            <code className="text-stone-800">g_image_link</code> m.fl.)
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Anbefalede felter</h2>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>EAN/GTIN</strong> — nødvendigt for stregkodesøgning og stærkere match i
            vin-kataloget (<code className="text-stone-800">gtin</code>,{" "}
            <code className="text-stone-800">ean</code>, <code className="text-stone-800">g_gtin</code>)
          </li>
          <li>
            <strong>Beskrivelse</strong> — hjælper match i fri tekst-søgning
          </li>
          <li>
            <strong>Brand / producent</strong>
          </li>
          <li>
            <strong>Kategori</strong> — fx <code className="text-stone-800">product_type</code> eller{" "}
            <code className="text-stone-800">g_product_type</code>
          </li>
          <li>
            <strong>Førpris + salgspris</strong> — så produktet kan indgå i «nedsat i shop» på{" "}
            <Link href="/tilbud" className="text-rose-900 hover:underline">
              /tilbud
            </Link>
            . Brug fx <code className="text-stone-800">price</code> /{" "}
            <code className="text-stone-800">g_price</code> som listepris og{" "}
            <code className="text-stone-800">sale_price</code> /{" "}
            <code className="text-stone-800">g_sale_price</code> som aktuel pris.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Formater</h2>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>XML</strong> — produkter som <code className="text-stone-800">&lt;product&gt;</code>{" "}
            eller <code className="text-stone-800">&lt;item&gt;</code>-blokke. Google Merchant / Shopping-feeds
            med <code className="text-stone-800">g_*</code>-felter understøttes.
          </li>
          <li>
            <strong>CSV</strong> — første række er header med feltnavne; semikolon eller komma som separator.
          </li>
        </ul>
        <p className="leading-relaxed">
          Feedet skal være tilgængeligt via en stabil HTTPS-URL uden login. Vi henter det periodisk.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Kanaler</h2>
        <p className="leading-relaxed">I kan levere feedet via:</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Partner-Ads</li>
          <li>Adtraction</li>
          <li>Daisycon</li>
          <li>Direkte feed-URL fra jeres webshop (angives i ansøgningen)</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Eksempel — XML</h2>
        <pre className="overflow-x-auto rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-800">
          {XML_EXAMPLE}
        </pre>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Eksempel — CSV</h2>
        <pre className="overflow-x-auto rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-800">
          {CSV_EXAMPLE}
        </pre>
        <p className="text-sm leading-relaxed text-stone-600">
          Feltnavne behøver ikke være præcis som i eksemplet — vi genkender almindelige synonymer og Google
          Merchant-tags. Det vigtige er, at de fire påkrævede felter er til stede.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-900/90">Klar til at ansøge?</h2>
        <p className="mt-3 text-stone-700">
          Har I feed-URL’en klar, kan I ansøge direkte. Læs også om gratis listing, affiliate og CPC på{" "}
          <Link href="/forhandlere" className="font-medium text-rose-900 hover:underline">
            forhandlersiden
          </Link>
          .
        </p>
        <div className="mt-5">
          <RetailerSignupCta />
        </div>
        <p className="mt-4 text-sm text-stone-600">
          Spørgsmål? Skriv til{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium text-rose-900 hover:underline">
            {contactEmail}
          </a>
          .
        </p>
      </section>
    </PageShell>
  );
}
