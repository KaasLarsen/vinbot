import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { contactEmail, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Om Vinbot — dansk vininspiration med uafhængig redaktion";
const PAGE_DESCRIPTION =
  "Vinbot kombinerer dybdegående vinguides med en vinsøgning på tværs af danske forhandlere. Læs om vores redaktion, vores proces, og hvordan vi skelner anbefalinger fra annoncer.";
const PAGE_URL = `${siteUrl}/om-os`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function OmOsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Om os", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/om-os", label: "Om os" }]} />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">Om Vinbot</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Vinbot er en dansk vinguide-side og vinsøgning, som hjælper dig med at finde den rigtige flaske — til
        maden, sæsonen eller lejligheden — og sammenligne pris på tværs af flere danske netbutikker på samme
        tid. Vi sælger ikke vin selv. Vi <em>inspirerer</em>, <em>forklarer</em> og <em>viser vej</em>.
      </p>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Hvad er Vinbot — og hvorfor?</h2>
        <p className="leading-relaxed">
          Ideen til Vinbot voksede ud af den samme frustration mange oplever: man står foran et glas rødvin,
          skal købe en flaske til middagen i weekenden, eller gerne vil forstå hvorfor naboens anbefalede
          chablis smager anderledes end hyldechardonnayen. Der findes hav af vinbutikker og stjerneratings,
          men relativt få steder, hvor man kan slå op som man ville i et leksikon — og samtidigt se, hvor
          flasken rent faktisk kan købes i dag.
        </p>
        <p className="leading-relaxed">
          Derfor bygger Vinbot to ting oven på hinanden: En redaktionel base af <strong>vinguides</strong>{" "}
          (druer, regioner, madparring, sæson, humør) og en <strong>sammenligningssøgning</strong> på tværs
          af danske netbutikker. Guides giver dig kontekst. Søgningen giver dig prisen.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Det korte svar på &quot;hvad bruger jeg Vinbot til?&quot;</h2>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Finde den rigtige flaske til maden:</strong> Slå op i vores{" "}
            <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
              mad &amp; vin-hub
            </Link>{" "}
            — vi har guides til alt fra pho til ribeye.
          </li>
          <li>
            <strong>Forstå en drue eller en region:</strong> Gå til{" "}
            <Link href="/druesorter" className="text-rose-900 hover:underline">
              druesorter
            </Link>{" "}
            eller{" "}
            <Link href="/regioner" className="text-rose-900 hover:underline">
              vinregioner
            </Link>{" "}
            — kort, præcist og uden tung jargon.
          </li>
          <li>
            <strong>Finde bedste pris på tværs af butikker:</strong> Brug søgefeltet på forsiden og filtrér
            efter pris, type eller forhandler.
          </li>
          <li>
            <strong>Få inspiration til sæson og fest:</strong>{" "}
            <Link href="/saeson" className="text-rose-900 hover:underline">
              /saeson
            </Link>{" "}
            og{" "}
            <Link href="/humoer-og-vin" className="text-rose-900 hover:underline">
              /humoer-og-vin
            </Link>{" "}
            — typisk starter vores læsere her i ugen før en fest eller et udvalgt måltid.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Hvem står bag?</h2>
        <p className="leading-relaxed">
          Vinbot drives af en lille dansk redaktion med vinfagligt grundlag (vinkursusbaggrund og mange års
          drikkelæring) og en solid teknisk baggrund (næste-generations web-udvikling, data og søgeteknik).
          Vi arbejder i krydsfeltet mellem <strong>vinglæde</strong> og <strong>gennemsigtigt
          værktøj</strong> — og vi prioriterer kvalitet over volumen, også når det betyder at sider skal
          genskrives, samles eller fjernes.
        </p>
        <p className="leading-relaxed">
          Spørgsmål, rettelser eller presse? Skriv til os på{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium text-rose-900 hover:underline">
            {contactEmail}
          </a>{" "}
          — vi svarer normalt inden for et par hverdage.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Hvordan vi skriver og opdaterer guides</h2>
        <p className="leading-relaxed">
          Vores guides bygger på primærkilder (appellations-regler fra officielle brancheorganer, producenters
          egne tekniske beskrivelser, anerkendte opslagsværker som <em>Oxford Companion to Wine</em> og{" "}
          <em>World Atlas of Wine</em>) og krydsvalideres mod aktuelle branche-medier og uafhængige
          anmeldelser. Prisniveauer tjekkes mod danske netbutikker — men de er <em>vejledende</em>, fordi
          marked og lager skifter.
        </p>
        <p className="leading-relaxed">
          Hver guide har en synlig opdateret-dato, og alle væsentlige ændringer flytter datoen. Læs mere om{" "}
          <Link href="/redaktionel-proces" className="font-medium text-rose-900 hover:underline">
            vores redaktionelle proces og kvalitetspolitik
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Hvad tjener Vinbot penge på?</h2>
        <p className="leading-relaxed">
          Vi finansierer driften via to kilder: <strong>affiliate-samarbejder</strong> (hvor vi modtager
          provision, når du klikker dig videre og handler hos en forhandler, fx via Partner-Ads eller
          Adtraction) og <strong>annoncer</strong> (fx Google AdSense). Din pris ændres ikke, når du bruger
          et affiliate-link.
        </p>
        <p className="leading-relaxed">
          Vi skelner altid tydeligt mellem redaktionelt indhold og annoncering:
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Redaktionelt indhold</strong> (alle vores guides) er ikke betalt placering. Forhandlere
            kan ikke betale sig til omtale eller bedre rangering.
          </li>
          <li>
            <strong>Produktsøgning</strong> viser et repræsentativt udvalg fra de netbutikker, vi samarbejder
            med. Vi kan ikke vise alle danske butikker, og udvalg + rækkefølge er baseret på objektive
            kriterier (relevans, pris, tilgængelighed) — ikke på betaling per flaske.
          </li>
          <li>
            <strong>Annoncer</strong> er tydeligt markeret (leaderboards, produktzoner, Google AdSense).
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Alkohol og ansvar</h2>
        <p className="leading-relaxed">
          Vinbot henvender sig til voksne (18+). Alkohol skal nydes ansvarligt, og vores anbefalinger
          erstatter ikke sundhedsrådgivning. Har du spørgsmål til alkohol i relation til graviditet,
          medicinering eller egen adfærd, så tal med en fagperson eller brug{" "}
          <a href="https://www.sst.dk" className="text-rose-900 hover:underline" rel="noopener">
            Sundhedsstyrelsens retningslinjer
          </a>
          . Vi dækker også bevidst{" "}
          <Link href="/guides/bedste-alkoholfri-vin" className="text-rose-900 hover:underline">
            alkoholfri og lavalkohol-vin
          </Link>
          , fordi voksne alkoholreducerede valg fortjener den samme omhyggelighed som traditionel vin.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-700">
        <h2 className="text-lg font-semibold text-stone-900">Kontakt og det formelle</h2>
        <p className="mt-3 leading-relaxed">
          Spørgsmål, rettelser eller presse? Skriv til{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium text-rose-900 hover:underline">
            {contactEmail}
          </a>
          . Se også:
        </p>
        <ul className="mt-3 ml-5 list-disc space-y-1.5 leading-relaxed">
          <li>
            <Link href="/kontakt" className="text-rose-900 hover:underline">
              Kontakt
            </Link>
          </li>
          <li>
            <Link href="/redaktionel-proces" className="text-rose-900 hover:underline">
              Redaktionel proces og kvalitetspolitik
            </Link>
          </li>
          <li>
            <Link href="/privatliv" className="text-rose-900 hover:underline">
              Privatlivspolitik
            </Link>
          </li>
          <li>
            <Link href="/betingelser" className="text-rose-900 hover:underline">
              Betingelser
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
