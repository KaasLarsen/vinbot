import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

const REGIONER = [
  { navn: "Bordeaux", q: "bordeaux", note: "Struktur og klassisk cabernet-merlot — okse og langtidsgryder." },
  { navn: "Bourgogne", q: "bourgogne", note: "Pinot og chardonnay i høj klasse — fjerkræ, svampe og fisk." },
  { navn: "Champagne", q: "champagne", note: "Bobler til fest, salt og fed ost." },
  { navn: "Rioja", q: "rioja", note: "Tempranillo og fad — tapas, grill og simremad." },
  { navn: "Toscana / Chianti", q: "chianti", note: "Sangiovese og tomat — italiensk hverdag og weekend." },
  { navn: "Piemonte", q: "barolo", note: "Nebbiolo — kraftige retter og tålmodighed i glasset." },
  { navn: "Rhône", q: "cotes du rhone", note: "Grenache/syrah — krydret mad og gryderetter." },
  { navn: "Alsace", q: "riesling", note: "Aromatiske hvide — ost, svinekød og asiatisk." },
];

export const metadata: Metadata = {
  title: "Vinregioner — hub med søgning og guides",
  description: "Klassiske vinregioner forklaret kort med links til Vinbot-søgning og dybdegående guides om mad og vin.",
  alternates: { canonical: `${siteUrl}/regioner` },
};

export default function RegionerHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/regioner", label: "Regioner" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vinregioner</h1>
      <p className="mt-4 text-lg text-stone-700">
        Region giver ofte en stilforventning — men husk at moderne vinmageri også skaber fantastiske vine uden for de klassiske navne. Brug søgningen til at finde flasker, og læs{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          vin & mad-guiden
        </Link>
        .
      </p>
      <ul className="mt-10 space-y-4">
        {REGIONER.map((r) => (
          <li key={r.q} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">{r.navn}</h2>
            <p className="mt-2 text-stone-600">{r.note}</p>
            <Link href={`/?q=${encodeURIComponent(r.q)}`} className="mt-3 inline-block text-rose-900 hover:underline">
              Søg {r.navn} →
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-stone-700">
        Udforsk også{" "}
        <Link href="/druesorter" className="text-rose-900 hover:underline">
          druesorter
        </Link>{" "}
        og{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson
        </Link>
        .
      </p>
    </div>
  );
}
