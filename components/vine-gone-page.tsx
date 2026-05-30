import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { VineRelatedWines } from "@/components/vine-related";
import type { CanonicalWine } from "@/lib/vine/types";

type Props = {
  slug: string;
  hintLabel: string | null;
  suggestions: CanonicalWine[];
};

export function VineGonePage({ slug, hintLabel, suggestions }: Props) {
  const displayHint = hintLabel?.trim() || slug.replace(/-/g, " ");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/vine", label: "Vin-katalog" },
          { href: `/vine/${slug}`, label: "Ikke længere tilgængelig" },
        ]}
      />

      <div className="mt-8 rounded-2xl border border-amber-200/90 bg-amber-50/80 px-6 py-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-900/80">Udløbet katalog-link</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900">
          Denne vin er ikke længere i kataloget
        </h1>
        <p className="mt-4 max-w-2xl text-stone-700 leading-relaxed">
          Vin-kataloget opdateres løbende fra forhandlernes produktfeeds.{" "}
          <span className="font-medium text-stone-900">{displayHint}</span> findes ikke lige nu under det
          gamle link — vinen kan være udsolgt, skiftet navn eller samlet med en anden listing.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Priser og tilbud kan ændre sig hurtigt. Sammenlign altid hos forhandleren, før du køber.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/vine"
            className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
          >
            Gå til vin-kataloget
          </Link>
          <Link
            href="/mad-og-vin"
            className="inline-flex rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 hover:border-stone-400"
          >
            Mad &amp; vin-guides
          </Link>
        </div>
      </div>

      {suggestions.length > 0 ? (
        <VineRelatedWines
          wines={suggestions}
          heading="Lignende vine i kataloget nu"
          lead="Baseret på producent og navn fra det gamle link — ikke nødvendigvis samme årgang eller butik."
        />
      ) : (
        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">Søg i kataloget</h2>
          <p className="mt-2 text-stone-600">
            Vi fandt ingen tætte matches. Brug søgningen på{" "}
            <Link href="/vine" className="font-medium text-rose-900 hover:underline">
              vin-kataloget
            </Link>{" "}
            for at finde aktuelle vine.
          </p>
        </section>
      )}
    </div>
  );
}
