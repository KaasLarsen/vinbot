import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Sådan bruger du Vinbot";
const PAGE_DESCRIPTION =
  "Kort guide til Vinbot: søg efter mad eller drue, scan stregkode, sammenlign tilbud, brug vin-kataloget, guides, opskrifter, vinkøleskabe og rabatkoder.";
const PAGE_URL = `${siteUrl}/saadan-bruger-du-vinbot`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function SaadanBrugerDuVinbotPage() {
  return (
    <PageShell variant="article" className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Sådan bruger du Vinbot", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/saadan-bruger-du-vinbot", label: "Sådan bruger du Vinbot" },
        ]}
      />

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900">{PAGE_TITLE}</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Vinbot hjælper dig med at finde den rigtige flaske — og se prisen hos flere danske netbutikker. Vi
        sælger ikke vin selv; når du er klar, klikker du videre til forhandleren.
      </p>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Søg efter mad, drue eller budget</h2>
        <p className="leading-relaxed">
          Brug søgefeltet på{" "}
          <Link href="/" className="font-medium text-rose-900 hover:underline">
            forsiden
          </Link>
          . Du kan skrive en ret («fisk», «julemad»), en drue, et land eller et budget. Vinbot forstår mange
          hverdagsord og foreslår flasker, der passer — ikke kun titler der matcher bogstav for bogstav.
        </p>
        <p className="leading-relaxed">
          Når resultaterne kommer, kan du filtrere på stil og forhandler, før du klikker videre til butikken.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Scan stregkode eller indtast EAN</h2>
        <p className="leading-relaxed">
          I søgningen kan du åbne stregkodelæseren og pege kameraet mod flaskens EAN — eller skrive nummeret
          manuelt. Match kræver, at forhandlerens produktfeed indeholder GTIN/EAN. Finder vi ikke flasken,
          prøv navn + årgang i stedet, eller en anden butik i filteret.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">To typer tilbud</h2>
        <p className="leading-relaxed">
          På{" "}
          <Link href="/tilbud" className="font-medium text-rose-900 hover:underline">
            /tilbud
          </Link>{" "}
          skelner vi mellem:
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Nedsat i shop</strong> — butikken viser før- og salgspris i sit feed (klassisk tilbud).
          </li>
          <li>
            <strong>Billigst på tværs</strong> — samme flaske findes hos flere forhandlere, og én er
            markant billigere end de andre.
          </li>
        </ul>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Vin-katalog</h2>
        <p className="leading-relaxed">
          I{" "}
          <Link href="/vine" className="font-medium text-rose-900 hover:underline">
            vin-kataloget
          </Link>{" "}
          samler vi den samme flaske på tværs af butikker (via stregkode eller stabil titel-match), så du
          kan sammenligne aktuelle priser på én side.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Guides og opskrifter</h2>
        <p className="leading-relaxed">
          Til madparring og inspiration:{" "}
          <Link href="/mad-og-vin" className="font-medium text-rose-900 hover:underline">
            mad &amp; vin
          </Link>
          ,{" "}
          <Link href="/opskrifter" className="font-medium text-rose-900 hover:underline">
            opskrifter
          </Link>
          ,{" "}
          <Link href="/saeson" className="font-medium text-rose-900 hover:underline">
            sæson
          </Link>{" "}
          og{" "}
          <Link href="/vin-viden" className="font-medium text-rose-900 hover:underline">
            vin-viden
          </Link>
          . Guides forklarer; søgningen viser, hvor du kan købe.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Vinkøleskabe</h2>
        <p className="leading-relaxed">
          Vinkøleskabe har deres egen søgning under{" "}
          <Link href="/vinkoleskabe" className="font-medium text-rose-900 hover:underline">
            /vinkoleskabe
          </Link>{" "}
          — separat fra flaskesøgningen, med modeller fra specialiserede feeds.
        </p>
      </section>

      <section className="mt-10 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900">Rabatkoder</h2>
        <p className="leading-relaxed">
          Aktuelle koder og kampagner samler vi på{" "}
          <Link href="/rabatkoder" className="font-medium text-rose-900 hover:underline">
            /rabatkoder
          </Link>
          . Tjek altid vilkår hos forhandleren, før du handler.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-700">
        <h2 className="text-lg font-semibold text-stone-900">Vil du vide mere?</h2>
        <ul className="mt-3 ml-5 list-disc space-y-1.5 leading-relaxed">
          <li>
            <Link href="/om-os" className="text-rose-900 hover:underline">
              Om Vinbot
            </Link>{" "}
            — hvem vi er, og hvordan vi skelner redaktion fra annoncer
          </li>
          <li>
            <Link href="/forhandlere" className="text-rose-900 hover:underline">
              Bliv forhandler
            </Link>{" "}
            — hvis du driver en vinbutik
          </li>
          <li>
            <Link href="/kontakt" className="text-rose-900 hover:underline">
              Kontakt
            </Link>
          </li>
        </ul>
      </section>
    </PageShell>
  );
}
