import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

const REGIONER = [
  { navn: "Bordeaux", q: "bordeaux", note: "Struktur og klassisk cabernet-merlot — okse og langtidsgryder." },
  { navn: "Bourgogne", q: "bourgogne", note: "Pinot og chardonnay i høj klasse — fjerkræ, svampe og fisk." },
  { navn: "Champagne", q: "champagne", note: "Bobler til fest, salt og fed ost." },
  { navn: "Loire / Sancerre", q: "sancerre sauvignon", note: "Frisk sauvignon og mineralsk hvid — fisk, ged og salater." },
  { navn: "Mosel", q: "mosel riesling trocken", note: "Tysk riesling med syre — asiatisk, fisk og lettere kød." },
  { navn: "Wachau", q: "wachau gruner veltliner", note: "Østrig: grüner og riesling på terrasser — alsidig hvid." },
  { navn: "Rioja", q: "rioja", note: "Tempranillo og fad — tapas, grill og simremad." },
  { navn: "Priorat", q: "priorat garnacha", note: "Kraft og mineral fra skifer — lammekød og gryde." },
  { navn: "Toscana / Chianti", q: "chianti", note: "Sangiovese og tomat — italiensk hverdag og weekend." },
  { navn: "Piemonte", q: "barolo", note: "Nebbiolo — kraftige retter og tålmodighed i glasset." },
  { navn: "Rhône", q: "cotes du rhone", note: "Grenache/syrah — krydret mad og gryderetter." },
  { navn: "Alsace", q: "riesling", note: "Aromatiske hvide — ost, svinekød og asiatisk." },
  { navn: "Douro", q: "douro touriga nacional", note: "Struktureret rød og portvinens hjemstavn." },
  { navn: "Vinho Verde", q: "vinho verde alvarinho", note: "Frisk, lav alkohol — fisk, salat og frokost." },
  { navn: "Willamette Valley", q: "willamette valley pinot noir", note: "Oregon pinot — laks, svampe og fjerkræ." },
  { navn: "Napa Valley", q: "napa valley cabernet", note: "Kraftig cabernet — grill, okse og fest." },
  { navn: "Mendoza", q: "malbec mendoza", note: "Argentinsk malbec — BBQ, okse og simreret." },
  { navn: "Barossa", q: "barossa shiraz", note: "Koncentreret shiraz — røget kød og kraftige saucer." },
  { navn: "Margaret River", q: "margaret river cabernet", note: "Elegant cabernet og chardonnay — kyst og grill." },
  { navn: "Marlborough", q: "marlborough sauvignon blanc", note: "Intens sauvignon — grønt, fisk og sommer." },
  { navn: "Central Otago", q: "central otago pinot noir", note: "Nyzealandsk pinot — lyst kød og ost." },
  { navn: "Stellenbosch", q: "stellenbosch cabernet", note: "Sydafrikansk struktur — grill og gryde." },
  { navn: "Swartland", q: "swartland chenin blanc", note: "Chenin og naturven — grønt, fisk og ost." },
];

const LAND_GUIDES: { title: string; slug: string; teaser: string }[] = [
  {
    title: "Frankrig",
    slug: "vinregion-frankrig",
    teaser: "Champagne til Roussillon: Loire, Bordeaux, Bourgogne, Alsace, Rhône, Provence og mere.",
  },
  {
    title: "Italien",
    slug: "vinregion-italien",
    teaser: "Piemonte, Toscana, Veneto, Syditalien, Sicilien — nebbiolo, sangiovese, aglianico, etna.",
  },
  {
    title: "Spanien",
    slug: "vinregion-spanien",
    teaser: "Rioja, Ribera, Priorat, Galicien, sherry og cava — tempranillo, garnacha, albariño.",
  },
  {
    title: "Tyskland",
    slug: "vinregion-tyskland",
    teaser: "Mosel, Rheingau, Pfalz, Franken — riesling og spätburgunder, Prädikat og trocken.",
  },
  {
    title: "Portugal",
    slug: "vinregion-portugal",
    teaser: "Douro, vinho verde, Dão, Bairrada, Alentejo — touriga, baga, portvin.",
  },
  {
    title: "USA",
    slug: "vinregion-usa",
    teaser: "Napa, Sonoma, Willamette, Washington — cabernet, pinot, zinfandel.",
  },
  {
    title: "Chile & Argentina",
    slug: "vinregion-chile-argentina",
    teaser: "Andes, kølig kyst, Mendoza og malbec — carménère, cabernet, torrontés.",
  },
  {
    title: "Australien & New Zealand",
    slug: "vinregion-australien-new-zealand",
    teaser: "Barossa, Margaret River, Marlborough, Central Otago — shiraz, riesling, sauvignon, pinot.",
  },
  {
    title: "Sydafrika",
    slug: "vinregion-sydafrika",
    teaser: "Stellenbosch, Swartland, Hemel-en-Aarde — chenin, pinotage, cabernet.",
  },
  {
    title: "Central- & Østeuropa + Georgien",
    slug: "vinregion-europa-central-og-oest",
    teaser: "Østrig, Ungarn, Schweiz, Balkan, qvevri og saperavi.",
  },
];

export const metadata: Metadata = {
  title: "Vinregioner — klassiske områder og inspiration",
  description:
    "Vinregioner og vinlande: dybdegående guides til Frankrig, Italien, Spanien, Tyskland, Portugal, USA, Sydamerika, Oceanien, Sydafrika og Central-/Østeuropa — plus hurtige søg til klassiske navne.",
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
          vin &amp; mad-guiden
        </Link>
        .
      </p>

      <section id="lande-guides" className="mt-12 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Lande og vinområder — dybdeguides</h2>
        <p className="mt-3 text-stone-700">
          Ti lange artikler med historie, underregioner, typiske druer og praktiske søgeord — suppler{" "}
          <Link href="/druesorter" className="text-rose-900 hover:underline">
            druesorter
          </Link>{" "}
          og{" "}
          <Link href="/guides" className="text-rose-900 hover:underline">
            alle guides
          </Link>
          .
        </p>
        <ul className="mt-6 space-y-4">
          {LAND_GUIDES.map((g) => (
            <li key={g.slug} className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-stone-900">
                <Link href={`/guides/${g.slug}`} className="text-rose-950 hover:underline">
                  {g.title}
                </Link>
              </h3>
              <p className="mt-2 text-stone-600">{g.teaser}</p>
              <Link href={`/guides/${g.slug}`} className="mt-3 inline-block text-rose-900 hover:underline">
                Læs guiden →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Hurtige søg — Europa og resten af verden</h2>
        <p className="mt-3 text-stone-700">
          Spring direkte til Vinbot-søgning. Listen dækker klassiske franske og italienske navne samt Tyskland, Portugal, USA, Sydamerika, Oceanien og Sydafrika — suppler de korte kort med{" "}
          <Link href="#lande-guides" className="text-rose-900 hover:underline">
            lande-guidesne ovenfor
          </Link>
          .
        </p>
        <ul className="mt-6 space-y-4">
          {REGIONER.map((r) => (
            <li key={r.q} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="text-xl font-semibold text-stone-900">{r.navn}</h3>
              <p className="mt-2 text-stone-600">{r.note}</p>
              <Link href={`/?q=${encodeURIComponent(r.q)}`} className="mt-3 inline-block text-rose-900 hover:underline">
                Søg {r.navn} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

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
