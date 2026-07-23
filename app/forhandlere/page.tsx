import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { RetailerSignupCta } from "@/components/retailer-signup-cta";
import { PageShell } from "@/components/page-shell";
import { contactEmail, siteName, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Bliv forhandler på Vinbot";
const PAGE_DESCRIPTION =
  "Få din vinbutik listet på Vinbot — gratis via produktfeed, via affiliate-netværk, eller med en CPC-aftale. Se muligheder og fordele.";
const PAGE_URL = `${siteUrl}/forhandlere`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function ForhandlerePage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Forhandlere", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/forhandlere", label: "Forhandlere" },
        ]}
      />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">{PAGE_TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        {siteName} viser vine fra danske forhandlere i vores søgning og på produktsider. Vi lister{" "}
        <strong>alle</strong> butikker, der sender et produktfeed — også uden betaling. Herunder kan du
        se de tre muligheder og vælge den, der passer jer.
      </p>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">1. Gratis listing</h2>
        <p className="leading-relaxed">
          Send os et produktfeed, så bliver jeres butik inkluderet som <strong>gratis butik</strong>. Det
          kræver ingen aftale og ingen betaling.
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>I indgår i vinsøgningen på lige fod med andre forhandlere.</li>
          <li>
            Det er synligt, at I ikke er samarbejdspartner — I bliver ikke prioriteret på guides,
            hub-sider og andre redaktionelle overflader.
          </li>
          <li>God start, hvis I bare vil være synlige i prissammenligningen.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">2. Affiliate via netværk</h2>
        <p className="leading-relaxed">
          Hvis I allerede samarbejder via et affiliate-netværk (fx Awin, Adtraction eller Partner-Ads),
          så nævn netværket i ansøgningen. Vi tilmelder os jeres program gennem netværket og lister jer
          som samarbejdspartner.
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>I får alle partnerfordele og prioritering på siden.</li>
          <li>Synlighed som samarbejdspartner — ikke markeret som gratis butik.</li>
          <li>Tilmelding sker via det netværk, I allerede bruger.</li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">3. CPC-aftale direkte med Vinbot</h2>
        <p className="leading-relaxed">
          Arbejder I ikke med CPA/affiliate, men ønsker I at blive listet som betalende partner? Så kan
          I vælge en <strong>CPC-aftale</strong> direkte med vinbot.dk. Marker det i ansøgningen — så
          kontakter vi jer på den e-mail, I angiver.
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Samme type partnerfordele og prioritering som via affiliate.</li>
          <li>Aftale og setup sker direkte mellem jer og Vinbot.</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-900/90">Ansøg her</h2>
        <p className="mt-3 text-stone-700">
          Udfyld formularen med butiksnavn, produktfeed-URL og e-mail. Angiv også, om I samarbejder via
          affiliate — eller om I ønsker en CPC-aftale.
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

      <p className="mt-10 text-sm text-stone-600">
        Læs mere om Vinbot på{" "}
        <Link href="/om-os" className="text-rose-900 hover:underline">
          Om os
        </Link>{" "}
        eller gå til{" "}
        <Link href="/kontakt" className="text-rose-900 hover:underline">
          Kontakt
        </Link>
        .
      </p>
    </PageShell>
  );
}
