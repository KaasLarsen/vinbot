import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { contactEmail, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Redaktionel proces og kvalitetspolitik";
const PAGE_DESCRIPTION =
  "Sådan research, skriver, redigerer og opdaterer Vinbot sine vinguides: kilder, faktatjek, interessekonflikter og håndtering af rettelser.";
const PAGE_URL = `${siteUrl}/redaktionel-proces`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function RedaktionelProcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Redaktionel proces", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/redaktionel-proces", label: "Redaktionel proces" },
        ]}
      />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">
        Redaktionel proces og kvalitetspolitik
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Vinbots guides bliver skrevet, redigeret og opdateret efter en fast proces. Her kan du se, hvordan vi
        arbejder — fra første research til opdatering af en publiceret artikel — og hvordan vi håndterer
        interessekonflikter, faktatjek og rettelser.
      </p>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">1. Research og kilder</h2>
        <p className="leading-relaxed">
          Vi bruger en blanding af etablerede opslagsværker (fx <em>The Oxford Companion to Wine</em>,{" "}
          <em>Wine Grapes</em> af Jancis Robinson, <em>The World Atlas of Wine</em>), officielle
          region-/appellation-sider (CIVC, Consorzio Chianti Classico, Bureau Interprofessionnel des Vins de
          Bourgogne m.fl.) og aktuelle branche-medier (Decanter, Wine Enthusiast, Meininger&apos;s,{" "}
          <em>Berlingske Vin</em>). Priseksempler og forhandleroplysninger kontrolleres mod danske netbutikker
          som Den Sidste Flaske, Winther Wines, Lauridsen Vin, Skjold Burne m.fl.
        </p>
        <p className="leading-relaxed">
          Vi skelner tydeligt mellem <strong>fakta</strong> (fx appellations-regler, druens modningsperiode,
          klassifikationer) og <strong>vurderinger</strong> (fx &quot;passer godt til&quot; eller &quot;bedre
          value end&quot;). Vurderinger bygger på samlet produktkundskab og læsning af uafhængige
          anmeldelser/ratings — ikke på et enkelt parti eller et enkelt producent-pressemateriale.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">2. Skrivning og struktur</h2>
        <p className="leading-relaxed">
          Hver guide følger en tjekliste før publicering:
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Intent:</strong> Hvilken søge- og beslutningssituation taler artiklen til? (fx &quot;hvad
            skal jeg drikke til pho?&quot; eller &quot;hvordan finder jeg en god riesling under 150 kr?&quot;)
          </li>
          <li>
            <strong>Indledning:</strong> Hurtig tommelfingerregel og en kort forklaring af <em>hvorfor</em>.
          </li>
          <li>
            <strong>Konkrete anbefalinger:</strong> Druer, regioner, stile eller producenter — med
            priseksempler hvor relevant.
          </li>
          <li>
            <strong>Faldgruber:</strong> Hvad du skal undgå, og hvorfor gængse &quot;råd&quot; ofte er
            forenklede.
          </li>
          <li>
            <strong>Videre læsning:</strong> Krydshenvisninger til dybere emner (drue-guider, regions-guider,
            madparringsguider).
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">3. Redigering og faktatjek</h2>
        <p className="leading-relaxed">
          Alle guides gennemlæses for faktuel præcision (appellations-regler, klassifikationer, vinifikation)
          og for dansk sprogbrug. Ved tvivl konsulterer vi primærkilder (appellations-websites, vingårdens egne
          tekniske beskrivelser) frem for sekundære sammendrag.
        </p>
        <p className="leading-relaxed">
          Priser, udvalg og årgange ændrer sig hurtigt. Konkrete priseksempler i guides er <em>vejledende</em>{" "}
          og indikerer et niveau (fx &quot;seriøs Chablis starter omkring 140–180 kr&quot;), ikke en garanti.
          For aktuelle priser bruger vi altid Vinbots egen søgning på tværs af forhandlere — eller linker
          direkte til butikken.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">4. Opdateringer og datoer</h2>
        <p className="leading-relaxed">
          Hver guide har en synlig <strong>opdateret-dato</strong>. Ved væsentlige ændringer (ændrede
          klassifikationer, nye priseksempler, ny producent-information eller rettelse af fejl) opdaterer vi
          artiklen og flytter datoen. Mindre sproglige rettelser udløser ikke en opdatering af datoen.
        </p>
        <p className="leading-relaxed">
          Vi gennemgår de mest trafikerede guides mindst én gang om året og emne-kritiske guides (fx
          rabatkoder, aktuelle årgange) oftere.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">5. Affiliate, annoncer og interessekonflikter</h2>
        <p className="leading-relaxed">
          Vinbot finansieres delvist via affiliate-samarbejder (fx Partner-Ads og Adtraction) og annoncer (fx
          Google AdSense). Hvis du klikker på et affiliate-link og køber, kan vi modtage provision — uden at
          det ændrer din pris hos forhandleren.
        </p>
        <p className="leading-relaxed">Det betyder konkret:</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Redaktionel uafhængighed:</strong> Anbefalinger er ikke betalt placering. Forhandlere kan
            ikke betale sig til omtale eller bedre rangering.
          </li>
          <li>
            <strong>Tydelig disclosure:</strong> Sider med affiliate-links har en kort markering øverst, og
            vores{" "}
            <Link href="/privatliv" className="text-rose-900 hover:underline">
              privatlivs-side
            </Link>{" "}
            beskriver, hvordan data håndteres.
          </li>
          <li>
            <strong>Ingen skjulte sponsorater:</strong> Hvis en guide eller sektion er betalt indhold (fx
            produktzone eller sponseret redaktion), fremgår det klart.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">6. Rettelser og feedback</h2>
        <p className="leading-relaxed">
          Ser du en faktuel fejl, en død link eller en misvisende pris? Skriv til os på{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium text-rose-900 hover:underline">
            {contactEmail}
          </a>{" "}
          — vi svarer normalt inden for et par hverdage og retter så hurtigt som muligt. Væsentlige rettelser
          markeres nederst i den pågældende guide.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">7. AI-brug</h2>
        <p className="leading-relaxed">
          Vi bruger AI-værktøjer som skriveassistance og til at strukturere tekster, men alt indhold
          gennemlæses og kvalitetssikres af menneskelig redaktør før publicering. Faktuelle påstande tjekkes
          mod primærkilder — vi publicerer ikke AI-output ukritisk.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-700">
        <h2 className="text-lg font-semibold text-stone-900">Kort sagt</h2>
        <p className="mt-3 leading-relaxed">
          Vinbot er en <em>redaktionel</em> vin-side med affiliate-links og annoncer — ikke en butik. Vi
          prioriterer <strong>substans over volumen</strong> og <strong>uafhængige vurderinger over
          producent-marketing</strong>. Læs mere om os under{" "}
          <Link href="/om-os" className="text-rose-900 hover:underline">
            Om os
          </Link>{" "}
          eller find en guide via{" "}
          <Link href="/guides" className="text-rose-900 hover:underline">
            alle guides
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
