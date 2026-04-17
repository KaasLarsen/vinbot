import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { contactEmail, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om Vinbot",
  description: "Vinbot er dansk vin-inspiration: dybdegående guides, vinsøgning på tværs af forhandlere og tydelig vej videre, når du vil handle.",
  alternates: { canonical: `${siteUrl}/om-os` },
};

export default function OmOsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/om-os", label: "Om os" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Om Vinbot</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Vinbot er bygget til at være det naturlige sted at starte, når du skal finde vin til mad, humør og årstid. Vi kombinerer grundige guides med en vinsøgning, der samler forslag fra mange danske netbutikker — så du hurtigt kan sammenligne og vælge med ro i maven.
      </p>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Hvad vi laver — og hvad vi ikke gør</h2>
        <p className="leading-relaxed">
          Vi sælger ikke vin. Alt indhold er til inspiration og orientering. Når du bruger vores søgning eller links, lander du hos forhandlere, der sælger produkterne — det er der, du ser gældende pris, levering, årgang og vilkår. Tjek altid butikkens egen side før du handler.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Sådan skriver og opdaterer vi</h2>
        <p className="leading-relaxed">
          Guider skrives og redigeres med fokus på dansk hverdag og fest: tydelige anbefalinger, forklaringer du kan bruge i køkkenet, og links videre til mere dybdegående emner i vores hubber (mad og vin, humør, sæson, druesorter og regioner). Når fakta eller markedet ændrer sig, opdaterer vi teksten og datoen øverst på guiden, så du kan se, hvornår siden sidst er revideret.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Annoncer, affiliate og gennemsigtighed</h2>
        <p className="leading-relaxed">
          Vinbot kan indeholde annoncer (fx Google AdSense) og affiliate-links (fx via Partner-Ads eller Adtraction): hvis du køber via et link, kan vi modtage provision. Det ændrer ikke din pris hos forhandleren. Vi markerer kommercielt indhold tydeligt i teksten — læs mere under{" "}
          <Link href="/privatliv" className="text-rose-900 hover:underline">
            privatliv
          </Link>{" "}
          og{" "}
          <Link href="/betingelser" className="text-rose-900 hover:underline">
            betingelser
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Priser, links og udvalg</h2>
        <p className="leading-relaxed">
          Søgeresultater og produktlinks bygger på data fra forhandlere og opdateres løbende — men pris, lager, årgang og levering kan skifte hurtigt. Vi prioriterer at vise et repræsentativt udvalg og tydelige veje videre; vi “kuraterer” ikke flasker mod betaling i søgeresultatet. Kommercielle samarbejder (fx udvalgte produktzoner eller affiliate) fremgår som tekst på siden, så du kan skelne redaktionelt indhold fra annoncering.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Alkohol og ansvar</h2>
        <p className="leading-relaxed">
          Vinbot henvender sig til voksne (18+). Alkohol skal nydes ansvarligt. Vores guides erstatter ikke sundhedsrådgivning; har du brug for vejledning om alkohol, bør du tale med en fagperson eller bruge de officielle retningslinjer i Danmark.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-700">
        <h2 className="text-lg font-semibold text-stone-900">Kontakt</h2>
        <p className="mt-3 leading-relaxed">
          Spørgsmål, rettelser eller presse? Skriv til os på{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium text-rose-900 hover:underline">
            {contactEmail}
          </a>{" "}
          — se også siden{" "}
          <Link href="/kontakt" className="text-rose-900 hover:underline">
            Kontakt
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
