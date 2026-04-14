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

      <section className="mt-12">
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
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Hurtige søg — klassiske navne</h2>
        <p className="mt-3 text-stone-700">Spring direkte til Vinbot-søgning med et enkelt klik.</p>
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
