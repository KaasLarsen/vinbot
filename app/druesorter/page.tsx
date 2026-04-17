import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { siteUrl } from "@/lib/site";

type Drue = { navn: string; q: string; note: string; guide: string };

type DrueGruppe = { id: string; titel: string; intro: string; punkter: Drue[] };

const DRUE_GRUPPER: DrueGruppe[] = [
  {
    id: "hvide",
    titel: "Hvide druer",
    intro: "Frisk syre, aroma og ofte lavere tannin — oplagt til fisk, skaldyr, salat og mange lettere kødretter.",
    punkter: [
      { navn: "Albariño", q: "albariño", note: "Citrus og salt — skaldyr, tapas og let fisk.", guide: "albarino-druen" },
      { navn: "Chardonnay", q: "chardonnay", note: "Fad og krop — kylling, skaldyr og cremede saucer.", guide: "chardonnay-druen" },
      { navn: "Chenin Blanc", q: "chenin blanc", note: "Syre og alsidighed — ost, gris og både tør og halvtør stil.", guide: "chenin-blanc-druen" },
      {
        navn: "Grüner Veltliner",
        q: "grüner veltliner",
        note: "Hvid peber og friskhed — grønt, brunch og asiatisk-inspireret.",
        guide: "gruener-veltliner-druen",
      },
      { navn: "Pinot Blanc", q: "pinot blanc", note: "Ren hvid fra pinot-familien — fisk, svampe og mild ost.", guide: "pinot-blanc-druen" },
      { navn: "Pinot Gris / Grigio", q: "pinot grigio", note: "Neutral til aromatisk — salat, let pasta og som rosé-alternativ.", guide: "pinot-gris-druen" },
      { navn: "Riesling", q: "riesling", note: "Syre og aroma — fisk, asiatisk, brunch og mange oste.", guide: "riesling-druen" },
      { navn: "Sauvignon Blanc", q: "sauvignon blanc", note: "Urtet og frisk — grøntsager, fisk og lette saucer.", guide: "sauvignon-blanc-druen" },
    ],
  },
  {
    id: "roede",
    titel: "Røde druer",
    intro: "Frugt, tannin og struktur varierer meget — fra let gamay til kraftig cabernet.",
    punkter: [
      { navn: "Barbera", q: "barbera", note: "Syre og mørke bær uden tung tannin — tomat, pizza og Piemonte.", guide: "barbera-druen" },
      {
        navn: "Cabernet Sauvignon",
        q: "cabernet sauvignon",
        note: "Struktur og tanniner — okse, grill og kraftige retter.",
        guide: "cabernet-sauvignon-druen",
      },
      { navn: "Gamay / Beaujolais", q: "gamay", note: "Saft og lav tannin — charcuteri, lettere kød og kølig servering.", guide: "gamay-druen" },
      { navn: "Grenache / Garnacha", q: "garnacha", note: "Moden frugt — grill, middelhavsmad og BBQ.", guide: "grenache-druen" },
      { navn: "Malbec", q: "malbec", note: "Mørke bær og blid struktur — burger, grill og argentinsk-inspireret kød.", guide: "malbec-druen" },
      { navn: "Merlot", q: "merlot", note: "Blødere frugt og rundere mundfuld — pizza, lyst kød og hverdagssimre.", guide: "merlot-druen" },
      { navn: "Nebbiolo / Barolo", q: "barolo", note: "Tanniner og parfume — langtidssteg og kraftigere retter.", guide: "nebbiolo-druen" },
      { navn: "Pinot Noir", q: "pinot noir", note: "Let til mellem fyldig — fjerkræ, svampe og lyst kød.", guide: "pinot-noir-druen" },
      { navn: "Sangiovese / Chianti", q: "chianti", note: "Syre og tomatven — pizza, pasta og italiensk.", guide: "sangiovese-druen" },
      { navn: "Syrah / Shiraz", q: "syrah", note: "Krydderi og mørke bær — grill, lam og gryde.", guide: "syrah-druen" },
      { navn: "Tempranillo / Rioja", q: "rioja", note: "Bær og krydderi — tapas, pølser og simremad.", guide: "tempranillo-druen" },
    ],
  },
];

function DrueCard({ d }: { d: Drue }) {
  const kortNavn = d.navn.split("/")[0].trim();
  return (
    <li className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-stone-900">{d.navn}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{d.note}</p>
      <div className="mt-4 flex flex-col gap-2 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-x-4">
        <Link href={`/guides/${d.guide}`} className="text-rose-900 hover:underline">
          Læs guiden →
        </Link>
        <Link href={`/?q=${encodeURIComponent(d.q)}`} className="text-rose-900 hover:underline">
          Søg {kortNavn} →
        </Link>
      </div>
    </li>
  );
}

export const metadata: Metadata = {
  title: "Druesorter — oversigt og vinsøgning",
  description:
    "Alle Vinbots drueguider: hvide (riesling, chardonnay, sauvignon, chenin, albariño m.fl.) og røde (pinot, cabernet, gamay, nebbiolo, tempranillo m.fl.) — med søgning og madparring.",
  alternates: { canonical: `${siteUrl}/druesorter` },
};

export default function DruesorterHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/druesorter", label: "Druesorter" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Druesorter</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Hver drue har en <strong className="font-medium text-stone-800">kort guide</strong> med smag, typiske områder og madidéer — og et{" "}
        <strong className="font-medium text-stone-800">søgelink</strong> til forsiden, så du ser flasker med pris fra flere forhandlere.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Kombinér med{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="font-medium text-rose-900 hover:underline">
          vin og mad-guiden
        </Link>
        ,{" "}
        <Link href="/guides/vin-begreber-i-praksis" className="font-medium text-rose-900 hover:underline">
          vinbegreber
        </Link>
        ,{" "}
        <Link href="/mad-og-vin" className="font-medium text-rose-900 hover:underline">
          mad &amp; vin
        </Link>{" "}
        og{" "}
        <Link href="/regioner" className="font-medium text-rose-900 hover:underline">
          vinregioner
        </Link>
        .
      </p>

      <nav aria-label="Spring til sektion" className="mt-8 flex flex-wrap gap-3 text-sm">
        {DRUE_GRUPPER.map((g) => (
          <a key={g.id} href={`#${g.id}`} className="rounded-full border border-rose-200 bg-rose-50/80 px-3 py-1.5 font-medium text-rose-950 hover:bg-rose-100">
            {g.titel}
          </a>
        ))}
      </nav>

      <div className="mt-12 space-y-16">
        {DRUE_GRUPPER.map((gruppe) => (
          <section key={gruppe.id} id={gruppe.id} className="scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">{gruppe.titel}</h2>
            <p className="mt-2 max-w-3xl text-stone-700">{gruppe.intro}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gruppe.punkter.map((d) => (
                <DrueCard key={d.guide} d={d} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <PartnerAdsLeaderboard className="mt-16" />

      <p className="mt-10 text-sm text-stone-500">
        Tip: på forsiden kan du også skrive druenavnet direkte i søgefeltet — URL&apos;en her er en genvej til det samme.
      </p>
    </div>
  );
}
