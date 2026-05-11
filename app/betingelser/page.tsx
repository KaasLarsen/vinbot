import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { contactEmail, contactPhoneDisplay, contactPhoneTelHref, legalPagesUpdatedDisplay, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Betingelser";
const PAGE_DESCRIPTION =
  "Brugerbetingelser for Vinbot: hobbyprojekt, indhold, ansvar, alkohol og køb hos partnere, annoncer og affiliate.";
const PAGE_URL = `${siteUrl}/betingelser`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function BetingelserPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Betingelser", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/betingelser", label: "Betingelser" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Betingelser</h1>
      <p className="mt-2 text-sm text-stone-500">Sidst opdateret: {legalPagesUpdatedDisplay}</p>

      <section className="mt-8 space-y-6 text-stone-700">
        <p>
          <strong>Kort fortalt:</strong> Vinbot er et <strong>hobbyprojekt uden CVR</strong> og <strong>sælger ikke vin</strong>. Indhold er til inspiration. Priser og lagerstatus kan variere. Vi viser annoncer (Google AdSense) og bruger affiliate-links og kan modtage kommission — uden ekstra omkostning for dig.
        </p>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">1. Anvendelse af sitet</h2>
          <p className="mt-2">Ved at bruge Vinbot accepterer du disse betingelser.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">2. Indhold og nøjagtighed</h2>
          <p className="mt-2">Vi tilstræber korrekte oplysninger, men kan ikke garantere fuldstændighed. Tjek altid hos forhandleren.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">3. Alkohol, alder og handel hos partnere</h2>
          <p className="mt-2">
            I Danmark gælder der <strong>aldersgrænser for køb af alkohol</strong> efter gældende regler (fx forskellige grænser for svag og stærk alkohol). Vinbot <strong>sælger eller leverer ikke alkohol</strong>; vi viser inspiration, priser fra tredjepart og links til <strong>forhandlere</strong>, hvor køb, betaling, levering og alderskontrol sker på{" "}
            <strong>forhandlerens vilkår og ansvar</strong>. Brug ikke indholdet på Vinbot som erstatning for rådgivning om sundhed eller alkohol.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">4. Annoncering og affiliate</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>Annoncer kan leveres via Google AdSense.</li>
            <li>
              Affiliate-links kan udløse kommission ved køb og kan formidles via tredjeparts affiliate-netværk, herunder{" "}
              <strong>Partner-Ads</strong>, <strong>Adtraction</strong> og <strong>Daisycon</strong>.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">5. Ansvar</h2>
          <p className="mt-2">Vinbot kan ikke gøres ansvarlig for tab ved brug af sitet eller køb hos tredjepart.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">6. Kontakt</h2>
          <p className="mt-2">
            <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
              {contactEmail}
            </a>
            {" · "}
            <a href={contactPhoneTelHref} className="text-rose-900 hover:underline">
              {contactPhoneDisplay}
            </a>
          </p>
        </div>
        <p className="flex flex-wrap gap-x-3 gap-y-1">
          <Link href="/privatliv" className="text-rose-900 hover:underline">
            Privatliv
          </Link>
          <span className="text-stone-400">·</span>
          <Link href="/cookiepolitik" className="text-rose-900 hover:underline">
            Cookiepolitik
          </Link>
        </p>
      </section>
    </div>
  );
}
