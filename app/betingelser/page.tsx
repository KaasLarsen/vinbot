import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { contactEmail, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Betingelser",
  description: "Brugerbetingelser for Vinbot: indhold, ansvar, annoncer og affiliate.",
  alternates: { canonical: `${siteUrl}/betingelser` },
};

export default function BetingelserPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/betingelser", label: "Betingelser" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Betingelser</h1>
      <p className="mt-2 text-sm text-stone-500">Sidst opdateret: 11. april 2026</p>

      <section className="mt-8 space-y-6 text-stone-700">
        <p>
          <strong>Kort fortalt:</strong> Vinbot sælger ikke vin. Indhold er til inspiration. Priser og lagerstatus kan variere. Vi viser annoncer (Google AdSense) og bruger affiliate-links og kan modtage kommission — uden ekstra omkostning for dig.
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
          <h2 className="text-xl font-semibold text-stone-900">3. Annoncering og affiliate</h2>
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>Annoncer kan leveres via Google AdSense.</li>
            <li>Affiliate-links kan udløse kommission ved køb.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">4. Ansvar</h2>
          <p className="mt-2">Vinbot kan ikke gøres ansvarlig for tab ved brug af sitet eller køb hos tredjepart.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">5. Kontakt</h2>
          <p className="mt-2">
            <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
              {contactEmail}
            </a>
          </p>
        </div>
        <p>
          <Link href="/privatliv" className="text-rose-900 hover:underline">
            Privatlivspolitik
          </Link>
        </p>
      </section>
    </div>
  );
}
