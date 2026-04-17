import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { siteUrl } from "@/lib/site";

type LandGuide = {
  title: string;
  slug: string;
  teaser: string;
};

/** Dybdegående landeartikler — alle findes som `content/guides/vinregion-*.mdx`. */
const LAND_GUIDES_EUROPA: LandGuide[] = [
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
    title: "Central- & Østeuropa + Georgien",
    slug: "vinregion-europa-central-og-oest",
    teaser: "Østrig, Ungarn, Schweiz, Balkan, qvevri og saperavi.",
  },
];

const LAND_GUIDES_AMERIKA: LandGuide[] = [
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
];

const LAND_GUIDES_AFRIKA_OCEANIEN: LandGuide[] = [
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
];

type HurtigRegion = { navn: string; q: string; note: string };

/** Klassiske søgeord på forsiden — grupperet efter land/område. */
const REGION_GRUPPER: { titel: string; intro?: string; punkter: HurtigRegion[] }[] = [
  {
    titel: "Frankrig",
    punkter: [
      { navn: "Bordeaux", q: "bordeaux", note: "Struktur og klassisk cabernet-merlot — okse og langtidsgryder." },
      { navn: "Bourgogne", q: "bourgogne", note: "Pinot og chardonnay i høj klasse — fjerkræ, svampe og fisk." },
      { navn: "Champagne", q: "champagne", note: "Bobler til fest, salt og fed ost." },
      { navn: "Loire / Sancerre", q: "sancerre sauvignon", note: "Frisk sauvignon og mineralsk hvid — fisk, ged og salater." },
      { navn: "Rhône", q: "cotes du rhone", note: "Grenache/syrah — krydret mad og gryderetter." },
      { navn: "Alsace", q: "alsace riesling", note: "Aromatiske hvide — ost, svinekød og asiatisk." },
      { navn: "Provence", q: "provence rosé", note: "Tør, bleg rosé — salat, grill og middelhavsmad." },
    ],
  },
  {
    titel: "Italien",
    punkter: [
      { navn: "Toscana / Chianti", q: "chianti", note: "Sangiovese og tomat — italiensk hverdag og weekend." },
      { navn: "Piemonte", q: "barolo", note: "Nebbiolo — kraftige retter og tålmodighed i glasset." },
      { navn: "Veneto", q: "valpolicella amarone", note: "Amarone, ripasso, soave — kraft og elegance nord for Toscana." },
      { navn: "Sicilien / Etna", q: "etna nerello mascalese", note: "Mineral rød og hvid fra vulkanjord — fisk, grønt og lammekød." },
    ],
  },
  {
    titel: "Spanien & Portugal",
    punkter: [
      { navn: "Rioja", q: "rioja", note: "Tempranillo og fad — tapas, grill og simremad." },
      { navn: "Priorat", q: "priorat garnacha", note: "Kraft og mineral fra skifer — lammekød og gryde." },
      { navn: "Jerez / sherry", q: "sherry jerez", note: "Fin sherry til tapas, suppe og ost — fra tør til sød." },
      { navn: "Douro", q: "douro touriga nacional", note: "Struktureret rød og portvinens hjemstavn." },
      { navn: "Vinho Verde", q: "vinho verde alvarinho", note: "Frisk, lav alkohol — fisk, salat og frokost." },
    ],
  },
  {
    titel: "Tyskland & Østrig",
    punkter: [
      { navn: "Mosel", q: "mosel riesling trocken", note: "Tysk riesling med syre — asiatisk, fisk og lettere kød." },
      { navn: "Rheingau / Pfalz", q: "rheingau riesling", note: "Riesling og spätburgunder — alsidige til både hvid og rød." },
      { navn: "Wachau", q: "wachau gruner veltliner", note: "\u00d8strig: grüner og riesling på terrasser — alsidig hvid." },
    ],
  },
  {
    titel: "Nordamerika",
    punkter: [
      { navn: "Willamette Valley", q: "willamette valley pinot noir", note: "Oregon pinot — laks, svampe og fjerkræ." },
      { navn: "Napa Valley", q: "napa valley cabernet", note: "Kraftig cabernet — grill, okse og fest." },
      { navn: "Canada (Okanagan)", q: "okanagan pinot noir", note: "Kølig klima — pinot, chardonnay og elegant rød." },
    ],
  },
  {
    titel: "Sydamerika",
    punkter: [
      { navn: "Mendoza", q: "malbec mendoza", note: "Argentinsk malbec — BBQ, okse og simreret." },
      { navn: "Chile (Central Valley)", q: "chile carmenere", note: "Carménère, cabernet og kyst-chardonnay — grill og hverdag." },
    ],
  },
  {
    titel: "Australien & New Zealand",
    punkter: [
      { navn: "Barossa", q: "barossa shiraz", note: "Koncentreret shiraz — røget kød og kraftige saucer." },
      { navn: "Margaret River", q: "margaret river cabernet", note: "Elegant cabernet og chardonnay — kyst og grill." },
      { navn: "Marlborough", q: "marlborough sauvignon blanc", note: "Intens sauvignon — grønt, fisk og sommer." },
      { navn: "Central Otago", q: "central otago pinot noir", note: "Nyzealandsk pinot — lyst kød og ost." },
    ],
  },
  {
    titel: "Sydafrika",
    punkter: [
      { navn: "Stellenbosch", q: "stellenbosch cabernet", note: "Sydafrikansk struktur — grill og gryde." },
      { navn: "Swartland", q: "swartland chenin blanc", note: "Chenin og naturven — grønt, fisk og ost." },
    ],
  },
];

/** Vinlande uden egen dybdeguide på Vinbot endnu — start med søgning og læs evt. nabolandes guide. */
const FLERE_VINLANDE: HurtigRegion[] = [
  {
    navn: "England",
    q: "english sparkling wine",
    note: "Køligt klima og mousserende i vækst — god til skaldyr, ost og lette forretter.",
  },
  {
    navn: "Grækenland",
    q: "assyrtiko santorini",
    note: "Assyrtiko, moschofilero og ø-røde — salt fisk, grønt og græsk middagsmad.",
  },
  {
    navn: "Uruguay",
    q: "tannat uruguay",
    note: "Tannat og atlantisk klima — grill, okse og kraftige saucer.",
  },
  {
    navn: "Kroatien",
    q: "plavac mali croatia",
    note: "Dalmatiske kyster — kraftige røde og friske hvide til fisk og lam.",
  },
  {
    navn: "Israel",
    q: "israeli cabernet galilee",
    note: "Middelhavsklima og moderne teknik — strukturerede røde og aromatiske hvide.",
  },
];

function LandCard({ g }: { g: LandGuide }) {
  return (
    <li className="flex flex-col rounded-2xl border border-rose-100 bg-rose-50/50 p-5 shadow-sm ring-1 ring-rose-100/60">
      <h3 className="text-lg font-semibold text-stone-900">
        <Link href={`/guides/${g.slug}`} className="text-rose-950 hover:underline">
          {g.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{g.teaser}</p>
      <Link href={`/guides/${g.slug}`} className="mt-4 text-sm font-medium text-rose-900 hover:underline">
        Læs guiden →
      </Link>
    </li>
  );
}

function RegionMiniCard({ r }: { r: HurtigRegion }) {
  return (
    <li className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <h4 className="font-semibold text-stone-900">{r.navn}</h4>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{r.note}</p>
      <Link href={`/?q=${encodeURIComponent(r.q)}`} className="mt-3 inline-block text-sm font-medium text-rose-900 hover:underline">
        Søg {r.navn} →
      </Link>
    </li>
  );
}

export const metadata: Metadata = {
  title: "Vinregioner — klassiske områder og inspiration",
  description:
    "Vinregioner: dybdegående guides til Frankrig, Italien, Spanien, Tyskland, Portugal, USA, Chile, Argentina, Australien, New Zealand, Sydafrika og Central- og Østeuropa — plus hurtige søg til Provence, Veneto, sherry, England, Grækenland m.m.",
  alternates: { canonical: `${siteUrl}/regioner` },
};

export default function RegionerHubPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/regioner", label: "Regioner" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vinregioner</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Region giver ofte en stilforventning — men husk at moderne vinmageri også skaber fantastiske vine uden for de klassiske navne. Start med{" "}
        <strong className="font-medium text-stone-800">lande-guiden</strong> for overblik, brug{" "}
        <strong className="font-medium text-stone-800">hurtige søg</strong> når du vil direkte til flasker, og læs{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          vin &amp; mad-guiden
        </Link>{" "}
        for parring.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Vi dækker de vigtigste eksport- og kvalitetslande med lange artikler. Lande som England og Grækenland har du stadig gode muligheder for at finde via søgning — se listen &quot;Flere vinlande&quot; nederst.
      </p>

      <section id="europa" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Europa</h2>
        <p className="mt-2 max-w-3xl text-stone-700">
          De klassiske vinkulturer — med dybdegående guides til de største markeder i Danmark.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LAND_GUIDES_EUROPA.map((g) => (
            <LandCard key={g.slug} g={g} />
          ))}
        </ul>
      </section>

      <section id="amerika" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Amerika</h2>
        <p className="mt-2 max-w-3xl text-stone-700">Nord- og Sydamerika — nyt og gammelt vinland i samme oversigt.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {LAND_GUIDES_AMERIKA.map((g) => (
            <LandCard key={g.slug} g={g} />
          ))}
        </ul>
      </section>

      <section id="afrika-oceanien" className="mt-14 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Afrika &amp; Oceanien</h2>
        <p className="mt-2 max-w-3xl text-stone-700">Sydafrika, Australien og New Zealand — ofte stærke på syre, frugt og pris.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {LAND_GUIDES_AFRIKA_OCEANIEN.map((g) => (
            <LandCard key={g.slug} g={g} />
          ))}
        </ul>
      </section>

      <section id="hurtige-soeg" className="mt-16 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Hurtige søg — klassiske områder</h2>
        <p className="mt-3 max-w-3xl text-stone-700">
          Spring til forsidens søgning med forudfyldte ord. Kombinér gerne med{" "}
          <Link href="/druesorter" className="text-rose-900 hover:underline">
            druesorter
          </Link>{" "}
          og{" "}
          <Link href="#europa" className="text-rose-900 hover:underline">
            lande-guiden
          </Link>{" "}
          du kom fra.
        </p>
        <div className="mt-10 space-y-12">
          {REGION_GRUPPER.map((gruppe) => (
            <div key={gruppe.titel}>
              <h3 className="text-lg font-semibold text-rose-950">{gruppe.titel}</h3>
              {gruppe.intro ? <p className="mt-2 text-sm text-stone-600">{gruppe.intro}</p> : null}
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {gruppe.punkter.map((r) => (
                  <RegionMiniCard key={`${gruppe.titel}-${r.q}`} r={r} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="flere-vinlande" className="mt-16 scroll-mt-20">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Flere vinlande (søg)</h2>
        <p className="mt-3 max-w-3xl text-stone-700">
          Disse lande har ikke en separat Vinbot-artikel endnu, men du finder ofte flasker via søgning. Vi udvider løbende — skriv endelig, hvis du savner en bestemt guide.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FLERE_VINLANDE.map((r) => (
            <RegionMiniCard key={r.navn} r={r} />
          ))}
        </ul>
      </section>

      <PartnerAdsLeaderboard className="mt-16" />

      <p className="mt-10 text-stone-700">
        Udforsk også{" "}
        <Link href="/druesorter" className="text-rose-900 hover:underline">
          druesorter
        </Link>
        ,{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson
        </Link>{" "}
        og{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>
    </div>
  );
}
