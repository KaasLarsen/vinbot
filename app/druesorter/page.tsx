import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

type Drue = { navn: string; q: string; note: string; guide?: string };

const DRUER: Drue[] = [
  { navn: "Pinot Noir", q: "pinot noir", note: "Let til mellem fyldig rød — alsidig til fjerkræ, svampe og lyst kød.", guide: "pinot-noir-druen" },
  { navn: "Riesling", q: "riesling", note: "Syre og aroma — fisk, asiatisk, brunch og mange oste.", guide: "riesling-druen" },
  { navn: "Sauvignon Blanc", q: "sauvignon blanc", note: "Urtet og frisk — grøntsager, fisk og lette saucer.", guide: "sauvignon-blanc-druen" },
  { navn: "Chardonnay", q: "chardonnay", note: "Fad og krop — kylling, skaldyr og cremede saucer.", guide: "chardonnay-druen" },
  {
    navn: "Cabernet Sauvignon",
    q: "cabernet sauvignon",
    note: "Struktur og tanniner — okse, grill og kraftige retter.",
    guide: "cabernet-sauvignon-druen",
  },
  { navn: "Merlot", q: "merlot", note: "Blødere frugt og rundere mundfuld — pizza, lyst kød og hverdags simreretter.", guide: "merlot-druen" },
  { navn: "Malbec", q: "malbec", note: "Mørke bær og blid struktur — burger, grill og argentinsk-inspireret kød.", guide: "malbec-druen" },
  { navn: "Syrah / Shiraz", q: "syrah", note: "Krydderi og mørke bær — grill, lam og gryde.", guide: "syrah-druen" },
  { navn: "Gamay / Beaujolais", q: "gamay", note: "Saft og lav tannin — charcuteri, lettere kød og kølig servering.", guide: "gamay-druen" },
  { navn: "Albariño", q: "albariño", note: "Citrus og salt — skaldyr, tapas og let fisk.", guide: "albarino-druen" },
  { navn: "Chenin Blanc", q: "chenin blanc", note: "Syre og alsidighed — ost, gris og både tør og halvtør stil.", guide: "chenin-blanc-druen" },
  {
    navn: "Grüner Veltliner",
    q: "grüner veltliner",
    note: "Hvid peber og friskhed — grønt, brunch og asiatisk-inspireret.",
    guide: "gruener-veltliner-druen",
  },
  { navn: "Pinot Gris / Grigio", q: "pinot grigio", note: "Neutral til aromatisk — salat, let pasta og som rosé-alternativ.", guide: "pinot-gris-druen" },
  { navn: "Tempranillo / Rioja", q: "rioja", note: "Bær og krydderi — tapas, pølser og simremad.", guide: "tempranillo-druen" },
  { navn: "Sangiovese / Chianti", q: "chianti", note: "Syre og tomatven — pizza, pasta og italiensk.", guide: "sangiovese-druen" },
  { navn: "Nebbiolo / Barolo", q: "barolo", note: "Tanniner og parfume — langtidssteg og kraftigere retter.", guide: "nebbiolo-druen" },
  { navn: "Barbera", q: "barbera", note: "Syre og mørke bær uden tung tannin — tomat, pizza og piemonte.", guide: "barbera-druen" },
  { navn: "Grenache / Garnacha", q: "garnacha", note: "Moden frugt — grill, middelhavsmad og BBQ.", guide: "grenache-druen" },
];

export const metadata: Metadata = {
  title: "Druesorter — oversigt og vinsøgning",
  description:
    "Druesorter med dansk guide til hver: gamay, albariño, chenin, grüner, pinot gris, tempranillo, sangiovese, nebbiolo, barbera, grenache m.fl. — plus søgning og madparring.",
  alternates: { canonical: `${siteUrl}/druesorter` },
};

export default function DruesorterHubPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/druesorter", label: "Druesorter" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Druesorter</h1>
      <p className="mt-4 text-lg text-stone-700">
        Brug listen til hurtigt at hoppe til en søgning — du får forslag fra flere forhandlere. Hver drue i listen har sin egen korte guide. Læs den{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          komplette guide til vin og mad
        </Link>
        ,{" "}
        <Link href="/guides/vin-begreber-i-praksis" className="text-rose-900 hover:underline">
          vinbegreber
        </Link>{" "}
        (tanniner, syre, fad) og de mange madguider under{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad &amp; vin
        </Link>
        .
      </p>
      <ul className="mt-10 space-y-4">
        {DRUER.map((d) => (
          <li key={d.q} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-stone-900">{d.navn}</h2>
            <p className="mt-2 text-stone-600">{d.note}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {d.guide ? (
                <Link href={`/guides/${d.guide}`} className="text-rose-900 hover:underline">
                  Læs guiden om {d.navn.split("/")[0].trim()} →
                </Link>
              ) : null}
              <Link href={`/?q=${encodeURIComponent(d.q)}`} className="text-rose-900 hover:underline">
                Søg efter {d.navn.split("/")[0].trim()} →
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-sm text-stone-500">
        Tip: åbn forsiden og indsæt søgeordet direkte — URL-parameteren ovenfor er en hjælp; hovedsøgningen ligger på forsiden.
      </p>
    </div>
  );
}
