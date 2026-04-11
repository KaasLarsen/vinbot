import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

const DRUER = [
  { navn: "Pinot Noir", q: "pinot noir", note: "Let til mellem fyldig rød — alsidig til fjerkræ og svampe." },
  { navn: "Riesling", q: "riesling", note: "Syre og aroma — fisk, asiatisk og mange oste." },
  { navn: "Sauvignon Blanc", q: "sauvignon blanc", note: "Urtet og frisk — grøntsager, fisk og lette saucer." },
  { navn: "Chardonnay", q: "chardonnay", note: "Fad og krop — kylling, skaldyr og cremede saucer." },
  { navn: "Cabernet Sauvignon", q: "cabernet sauvignon", note: "Struktur og tanniner — okse og kraftige retter." },
  { navn: "Syrah / Shiraz", q: "syrah", note: "Krydderi og mørke bær — grill, lam og gryde." },
  { navn: "Tempranillo / Rioja", q: "rioja", note: "Bær og krydderi — tapas, pølser og simremad." },
  { navn: "Sangiovese / Chianti", q: "chianti", note: "Syre og tomatven — pizza, pasta og italiensk." },
  { navn: "Nebbiolo / Barolo", q: "barolo", note: "Tanniner og parfume — langtidssteg og vildt." },
  { navn: "Grenache / Garnacha", q: "garnacha", note: "Moden frugt — grill og middelhavsmad." },
];

export const metadata: Metadata = {
  title: "Druesorter — hub med søgelinks og guides",
  description: "Udforsk druesorter: pinot noir, riesling, chardonnay og flere. Hver drue linker til søgning i Vinbots feeds og relaterede guides.",
  alternates: { canonical: `${siteUrl}/druesorter` },
};

export default function DruesorterHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/druesorter", label: "Druesorter" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Druesorter</h1>
      <p className="mt-4 text-lg text-stone-700">
        Brug listen til hurtigt at hoppe til en søgning i vores feeds — du får vist flasker med billede og pris fra forskellige forhandlere. Læs den{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          komplette guide til vin og mad
        </Link>{" "}
        for at forstå parring i dybden.
      </p>
      <ul className="mt-10 space-y-4">
        {DRUER.map((d) => (
          <li key={d.q} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">{d.navn}</h2>
            <p className="mt-2 text-stone-600">{d.note}</p>
            <Link href={`/?q=${encodeURIComponent(d.q)}`} className="mt-3 inline-block text-rose-900 hover:underline">
              Søg efter {d.navn} i feeds →
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-stone-500">
        Tip: åbn forsiden og indsæt søgeordet direkte — URL-parameteren ovenfor er en hjælp; hovedsøgningen ligger på forsiden.
      </p>
    </div>
  );
}
