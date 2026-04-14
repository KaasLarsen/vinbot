import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Rabatkoder til vin — partnertilbud",
  description:
    "Aktuelle rabatkoder og tilbud hos udvalgte vinforhandlere: Lauridsen Vine, DH Wines, SPS Wine m.fl. Tjek altid vilkår hos butikken før køb.",
  alternates: { canonical: `${siteUrl}/rabatkoder` },
};

type RabatEntry = {
  title: string;
  body: string;
  /** Vises i monospace så koden er nem at kopiere */
  code?: string;
};

type RabatPartner = {
  name: string;
  shopUrl: string;
  entries: RabatEntry[];
  footnote?: string;
};

const PARTNERE: RabatPartner[] = [
  {
    name: "Lauridsen Vine",
    shopUrl: "https://lauridsenvine.dk/",
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Lauridsen Vine. Tilmelding og vilkår foregår på deres webshop.",
      },
    ],
  },
  {
    name: "DH Wines",
    shopUrl: "https://dhwines.dk/",
    entries: [
      {
        title: "100 kr. rabat",
        code: "PA10024",
        body: "Angiv koden i kurven på **hele shoppen** — tjek eventuelle undtagelser på dhwines.dk.",
      },
      {
        title: "5% rabat",
        code: "PA524",
        body: "Angiv koden i kurven — **5% rabat** på hele shoppen.",
      },
    ],
  },
  {
    name: "SPS Wine",
    shopUrl: "https://www.spswine.dk/",
    entries: [
      {
        title: "12% rabat",
        code: "YTAK9M8B",
        body: "**12% rabat på produkterne** hos SPS Wine. **Rabatkoden kan ikke kombineres** med andre rabatkoder — se fulde vilkår på spswine.dk.",
      },
    ],
  },
];

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="mt-2 text-stone-700 leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-stone-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

export default function RabatkoderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/rabatkoder", label: "Rabatkoder" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Rabatkoder og partnertilbud</h1>
      <p className="mt-4 text-lg text-stone-700">
        Her samler vi <strong className="font-semibold text-stone-900">rabatkoder</strong>,{" "}
        <strong className="font-semibold text-stone-900">kampagnekoder</strong> og{" "}
        <strong className="font-semibold text-stone-900">nyhedsbreve med rabat</strong> fra vinforhandlere, vi samarbejder med. Listen
        udvides løbende — kom tilbage eller bookmark siden.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        <strong className="font-medium text-stone-800">Vigtigt:</strong> Tilbud og koder kan ændre sig eller udløbe. Læs altid de aktuelle betingelser på forhandlerens egen side før du betaler.
      </p>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <ul className="mt-10 space-y-6">
        {PARTNERE.map((p) => (
          <li key={p.name} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-xl font-semibold text-stone-900">{p.name}</h2>
              <a
                href={p.shopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
              >
                Gå til shop →
              </a>
            </div>
            <div className="mt-4 space-y-5 border-t border-stone-100 pt-4">
              {p.entries.map((e, idx) => (
                <div key={`${p.name}-${e.title}-${e.code ?? idx}`}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">{e.title}</h3>
                  {e.code ? (
                    <p className="mt-2">
                      <code className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 font-mono text-base font-semibold tracking-wide text-stone-900">
                        {e.code}
                      </code>
                    </p>
                  ) : null}
                  <RichLine text={e.body} />
                </div>
              ))}
            </div>
            {p.footnote ? <p className="mt-3 text-sm text-stone-500">{p.footnote}</p> : null}
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Sådan får du mest ud af koderne</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          <li>Kopier koden præcis — store og små bogstaver kan betyde noget.</li>
          <li>Tjek om koden gælder hele shoppen eller undtagelser (fx allerede nedsatte varer).</li>
          <li>Sammenlign med fri fragt: nogle gange er en anden kode + fragt billigere.</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          Flere tips til netkøb:{" "}
          <Link href="/guides/koeb-vin-online-sadan-holder-du-styr-paa-det" className="font-medium text-rose-900 hover:underline">
            køb vin online
          </Link>
          . Søg priser på tværs på{" "}
          <Link href="/" className="font-medium text-rose-900 hover:underline">
            forsiden
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
