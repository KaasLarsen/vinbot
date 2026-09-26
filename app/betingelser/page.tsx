import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import {
  companyAddressDisplay,
  companyCvr,
  companyLegalName,
  contactEmail,
  contactPhoneDisplay,
  contactPhoneTelHref,
  legalPagesUpdatedDisplay,
  siteUrl,
} from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Betingelser";
const PAGE_DESCRIPTION =
  "Brugerbetingelser for Vinbot: 18+, indhold, ansvar, alkohol og køb hos partnere, sundhed, annoncer og affiliate.";
const PAGE_URL = `${siteUrl}/betingelser`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function BetingelserPage() {
  return (
    <PageShell variant="article" className="py-10">
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
          <strong>Kort fortalt:</strong> Vinbot drives af <strong>{companyLegalName}</strong> (CVR-nr.{" "}
          {companyCvr}) og <strong>sælger ikke alkohol</strong>. Sitet er for personer, der er fyldt 18. Indhold er til inspiration. Priser og lagerstatus kan variere. Vi viser annoncer (Google AdSense) og bruger affiliate-links og kan modtage kommission — uden ekstra omkostning for dig.
        </p>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">1. Anvendelse af sitet</h2>
          <p className="mt-2">
            Ved at bruge Vinbot accepterer du disse betingelser. Sitet henvender sig til voksne. Første gang du besøger os, beder vi dig bekræfte, at du er fyldt 18.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">2. Indhold og nøjagtighed</h2>
          <p className="mt-2">
            Vi tilstræber korrekte oplysninger om vin, øl, spiritus, mad, udstyr og forhandlere, men kan ikke garantere fuldstændighed. Priser, årgange, lager og rabatkoder er <strong>vejledende</strong> og kan ændre sig, uden at vi når at opdatere siden. Tjek altid hos forhandleren, før du køber.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">3. Alkohol, alder og handel hos partnere</h2>
          <p className="mt-2">
            Vinbot <strong>sælger, leverer og opkræver ikke betaling for alkohol</strong>. Vi viser inspiration, priser fra tredjepart og links til forhandlere. Køb, betaling, levering, fortrydelse og alderskontrol sker på <strong>forhandlerens vilkår og ansvar</strong>.
          </p>
          <p className="mt-2">
            I Danmark kan aldersgrænsen for køb afhænge af drik og salgssted — blandt andet 16 år for øl og vin i detailhandel og 18 år for stærkere alkohol. <strong>På Vinbot er grænsen 18 år</strong>, fordi sitet også dækker spiritus, hedvin, drinks og links til netbutikker, der selv kræver 18 år. Butikkens egen kontrol gælder, når du handler der.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">4. Fest, konfirmation og lignende</h2>
          <p className="mt-2">
            Guider til fest, konfirmation, studenterfest og bryllup er skrevet til de <strong>voksne, der planlægger og køber ind</strong>. De er ikke en opfordring til, at mindreårige drikker alkohol.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">5. Ikke sundhedsrådgivning</h2>
          <p className="mt-2">
            Tekst om alkohol, alkoholfri vin, histamin, graviditet, medicin, olivenolie eller andre sundhedsemner er generel information. Den erstatter ikke råd fra læge eller anden fagperson. Nyd alkohol ansvarligt.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">6. Annoncering og affiliate</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>Annoncer kan leveres via Google AdSense og vises kun, hvis du har accepteret cookies.</li>
            <li>
              Affiliate-links kan udløse kommission ved køb og kan formidles via tredjeparts affiliate-netværk, herunder{" "}
              <strong>Partner-Ads</strong>, <strong>Adtraction</strong>, <strong>Daisycon</strong> og <strong>PriceRunner</strong>.
            </li>
            <li>Annoncelinks ændrer ikke din pris hos forhandleren.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">7. Ophavsret</h2>
          <p className="mt-2">
            Tekst, opskrifter, guider og tilrettelæggelse på Vinbot tilhører {companyLegalName}, medmindre andet er angivet. Du må gerne linke til siderne. Kopi af større dele til eget site eller videresalg kræver aftale.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">8. Ansvar</h2>
          <p className="mt-2">
            Vinbot kan ikke gøres ansvarlig for tab ved brug af sitet, forkerte priser eller køb hos tredjepart. Forhandleren er ansvarlig for det, du køber hos dem.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">9. Lovvalg</h2>
          <p className="mt-2">Betingelserne er underlagt dansk ret. Tvister behandles ved danske domstole.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">10. Kontakt</h2>
          <p className="mt-2">
            {companyLegalName} · CVR-nr. {companyCvr}
            <br />
            {companyAddressDisplay}
            <br />
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
    </PageShell>
  );
}
