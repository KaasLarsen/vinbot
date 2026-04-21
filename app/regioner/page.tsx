import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
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

type HurtigRegion = { navn: string; q: string; note: string; slug?: string };

/** Klassiske søgeord på forsiden — grupperet efter land/område. */
const REGION_GRUPPER: { titel: string; intro?: string; punkter: HurtigRegion[] }[] = [
  {
    titel: "Frankrig",
    punkter: [
      { navn: "Bordeaux", q: "bordeaux", slug: "vinregion-bordeaux", note: "Struktur og klassisk cabernet-merlot — okse og langtidsgryder." },
      { navn: "Bourgogne", q: "bourgogne", slug: "vinregion-bourgogne", note: "Pinot og chardonnay i høj klasse — fjerkræ, svampe og fisk." },
      { navn: "Champagne", q: "champagne", slug: "vinregion-champagne", note: "Bobler til fest, salt og fed ost." },
      { navn: "Loire / Sancerre", q: "sancerre sauvignon", slug: "vinregion-loire", note: "Frisk sauvignon og mineralsk hvid — fisk, ged og salater." },
      { navn: "Rhône", q: "cotes du rhone", slug: "vinregion-rhone", note: "Grenache/syrah — krydret mad og gryderetter." },
      { navn: "Alsace", q: "alsace riesling", slug: "vinregion-alsace", note: "Aromatiske hvide — ost, svinekød og asiatisk." },
      { navn: "Provence", q: "provence rosé", note: "Tør, bleg rosé — salat, grill og middelhavsmad." },
    ],
  },
  {
    titel: "Italien",
    punkter: [
      { navn: "Toscana / Chianti", q: "chianti", slug: "vinregion-toscana", note: "Sangiovese og tomat — italiensk hverdag og weekend." },
      { navn: "Piemonte", q: "barolo", slug: "vinregion-piemonte", note: "Nebbiolo — kraftige retter og tålmodighed i glasset." },
      { navn: "Veneto", q: "valpolicella amarone", slug: "vinregion-veneto", note: "Amarone, ripasso, soave — kraft og elegance nord for Toscana." },
      { navn: "Sicilien / Etna", q: "etna nerello mascalese", note: "Mineral rød og hvid fra vulkanjord — fisk, grønt og lammekød." },
    ],
  },
  {
    titel: "Spanien & Portugal",
    punkter: [
      { navn: "Rioja", q: "rioja", slug: "vinregion-rioja", note: "Tempranillo og fad — tapas, grill og simremad." },
      { navn: "Ribera del Duero", q: "ribera del duero tempranillo", slug: "vinregion-ribera-del-duero", note: "Kraftig tempranillo fra højland — lammekød og grill." },
      { navn: "Priorat", q: "priorat garnacha", note: "Kraft og mineral fra skifer — lammekød og gryde." },
      { navn: "Jerez / sherry", q: "sherry jerez", note: "Fin sherry til tapas, suppe og ost — fra tør til sød." },
      { navn: "Douro", q: "douro touriga nacional", note: "Struktureret rød og portvinens hjemstavn." },
      { navn: "Vinho Verde", q: "vinho verde alvarinho", note: "Frisk, lav alkohol — fisk, salat og frokost." },
    ],
  },
  {
    titel: "Tyskland & Østrig",
    punkter: [
      { navn: "Mosel", q: "mosel riesling trocken", slug: "vinregion-mosel", note: "Tysk riesling med syre — asiatisk, fisk og lettere kød." },
      { navn: "Rheingau / Pfalz", q: "rheingau riesling", note: "Riesling og spätburgunder — alsidige til både hvid og rød." },
      { navn: "Wachau", q: "wachau gruner veltliner", note: "\u00d8strig: grüner og riesling på terrasser — alsidig hvid." },
    ],
  },
  {
    titel: "Nordamerika",
    punkter: [
      { navn: "Willamette Valley", q: "willamette valley pinot noir", note: "Oregon pinot — laks, svampe og fjerkræ." },
      { navn: "Napa Valley", q: "napa valley cabernet", slug: "vinregion-napa-valley", note: "Kraftig cabernet — grill, okse og fest." },
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
      <h4 className="font-semibold text-stone-900">
        {r.slug ? (
          <Link href={`/guides/${r.slug}`} className="text-stone-900 hover:text-rose-900 hover:underline">
            {r.navn}
          </Link>
        ) : (
          r.navn
        )}
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{r.note}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {r.slug ? (
          <Link href={`/guides/${r.slug}`} className="font-medium text-rose-900 hover:underline">
            Læs dybdeguide →
          </Link>
        ) : null}
        <Link href={`/?q=${encodeURIComponent(r.q)}`} className="font-medium text-rose-900 hover:underline">
          Søg {r.navn} →
        </Link>
      </div>
    </li>
  );
}

const PAGE_TITLE = "Vinregioner — klassiske områder og inspiration";
const PAGE_DESCRIPTION =
  "Vinregioner: dybdegående guides til Frankrig, Italien, Spanien, Tyskland, Portugal, USA, Chile, Argentina, Australien, New Zealand, Sydafrika og Central- og Østeuropa — plus hurtige søg til Provence, Veneto, sherry, England, Grækenland m.m.";
const PAGE_URL = `${siteUrl}/regioner`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function RegionerHubPage() {
  const collectionItems = [
    ...LAND_GUIDES_EUROPA,
    ...LAND_GUIDES_AMERIKA,
    ...LAND_GUIDES_AFRIKA_OCEANIEN,
  ].map((g) => ({
    name: g.title,
    url: `${siteUrl}/guides/${g.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Regioner", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
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

      <section className="mt-10 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Nye dybdeguider til de vigtigste sub-regioner</h2>
        <p className="mt-3 text-stone-700">
          Nye dybdegående guides til klassiske sub-regioner — ideelt når du vil forstå etiketten, ikke bare landet:
        </p>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/vinregion-bourgogne" className="text-rose-900 hover:underline">Bourgogne — pinot & chardonnay</Link>
          <Link href="/guides/vinregion-bordeaux" className="text-rose-900 hover:underline">Bordeaux — cabernet & merlot</Link>
          <Link href="/guides/vinregion-rhone" className="text-rose-900 hover:underline">Rhône — syrah & grenache</Link>
          <Link href="/guides/vinregion-loire" className="text-rose-900 hover:underline">Loire — sauvignon & chenin</Link>
          <Link href="/guides/vinregion-alsace" className="text-rose-900 hover:underline">Alsace — riesling & gewürz</Link>
          <Link href="/guides/vinregion-champagne" className="text-rose-900 hover:underline">Champagne — bobler</Link>
          <Link href="/guides/vinregion-toscana" className="text-rose-900 hover:underline">Toscana — sangiovese</Link>
          <Link href="/guides/vinregion-piemonte" className="text-rose-900 hover:underline">Piemonte — nebbiolo</Link>
          <Link href="/guides/vinregion-veneto" className="text-rose-900 hover:underline">Veneto — Amarone & Prosecco</Link>
          <Link href="/guides/vinregion-rioja" className="text-rose-900 hover:underline">Rioja — tempranillo</Link>
          <Link href="/guides/vinregion-ribera-del-duero" className="text-rose-900 hover:underline">Ribera del Duero — tinto fino</Link>
          <Link href="/guides/vinregion-napa-valley" className="text-rose-900 hover:underline">Napa Valley — cabernet</Link>
          <Link href="/guides/vinregion-mosel" className="text-rose-900 hover:underline">Mosel — riesling</Link>
        </div>
      </section>

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

      <section id="drue-region" className="mt-16 scroll-mt-20 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Drue × region — klassiske long-tails</h2>
        <p className="mt-3 max-w-3xl text-stone-700">
          29 dybdeguider om de mest ikoniske kombinationer af drue og terroir — hvor region og drue er blevet synonymer med hinanden. Med stil, klima, producenter, klassificering, pris og madparring:
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DRUE_REGION_BY_COUNTRY.map((group) => (
            <div key={group.country} className="rounded-xl border border-stone-200 bg-white p-4">
              <h3 className="text-base font-semibold text-stone-900">{group.country}</h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/guides/${item.slug}`} className="text-rose-900 hover:underline">
                      {item.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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

type DrueRegionCountryGroup = { country: string; items: { slug: string; label: string }[] };

const DRUE_REGION_BY_COUNTRY: DrueRegionCountryGroup[] = [
  {
    country: "Frankrig",
    items: [
      { slug: "chardonnay-fra-chablis", label: "Chardonnay fra Chablis" },
      { slug: "chardonnay-fra-maconnais", label: "Chardonnay fra Mâconnais" },
      { slug: "pinot-noir-fra-bourgogne", label: "Pinot noir fra Bourgogne" },
      { slug: "sauvignon-blanc-fra-sancerre", label: "Sauvignon blanc fra Sancerre" },
      { slug: "chenin-blanc-fra-vouvray", label: "Chenin blanc fra Vouvray" },
      { slug: "riesling-fra-alsace", label: "Riesling fra Alsace" },
      { slug: "cabernet-sauvignon-fra-bordeaux", label: "Cabernet sauvignon fra Bordeaux" },
      { slug: "merlot-fra-pomerol", label: "Merlot fra Pomerol" },
      { slug: "syrah-fra-nord-rhone", label: "Syrah fra Nord-Rhône" },
      { slug: "grenache-fra-chateauneuf-du-pape", label: "Grenache fra Châteauneuf-du-Pape" },
    ],
  },
  {
    country: "Italien",
    items: [
      { slug: "nebbiolo-fra-barolo", label: "Nebbiolo fra Barolo" },
      { slug: "nebbiolo-fra-barbaresco", label: "Nebbiolo fra Barbaresco" },
      { slug: "sangiovese-fra-chianti-classico", label: "Sangiovese fra Chianti Classico" },
      { slug: "sangiovese-fra-montalcino", label: "Sangiovese fra Montalcino (Brunello)" },
    ],
  },
  {
    country: "Spanien",
    items: [
      { slug: "tempranillo-fra-rioja", label: "Tempranillo fra Rioja" },
      { slug: "tempranillo-fra-ribera-del-duero", label: "Tempranillo fra Ribera del Duero" },
      { slug: "grenache-fra-priorat", label: "Garnacha fra Priorat" },
      { slug: "albarino-fra-rias-baixas", label: "Albariño fra Rías Baixas" },
    ],
  },
  {
    country: "Tyskland",
    items: [{ slug: "riesling-fra-mosel", label: "Riesling fra Mosel" }],
  },
  {
    country: "USA",
    items: [
      { slug: "cabernet-sauvignon-fra-napa-valley", label: "Cabernet sauvignon fra Napa Valley" },
      { slug: "pinot-noir-fra-willamette-valley", label: "Pinot noir fra Willamette Valley" },
    ],
  },
  {
    country: "Sydamerika",
    items: [
      { slug: "malbec-fra-mendoza", label: "Malbec fra Mendoza" },
      { slug: "cabernet-sauvignon-fra-maipo-valley", label: "Cabernet sauvignon fra Maipo Valley" },
    ],
  },
  {
    country: "Australien & New Zealand",
    items: [
      { slug: "chardonnay-fra-margaret-river", label: "Chardonnay fra Margaret River" },
      { slug: "riesling-fra-clare-valley", label: "Riesling fra Clare Valley" },
      { slug: "syrah-fra-barossa-valley", label: "Shiraz fra Barossa Valley" },
      { slug: "sauvignon-blanc-fra-marlborough", label: "Sauvignon blanc fra Marlborough" },
      { slug: "pinot-noir-fra-central-otago", label: "Pinot noir fra Central Otago" },
    ],
  },
  {
    country: "Sydafrika",
    items: [{ slug: "chenin-blanc-fra-swartland", label: "Chenin blanc fra Swartland" }],
  },
];
