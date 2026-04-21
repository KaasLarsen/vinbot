import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";

type Drue = { navn: string; q: string; note: string; guide: string };

type DrueGruppe = { id: string; titel: string; intro: string; punkter: Drue[] };

type DrueRegionCluster = { drueSlug: string; title: string; items: { slug: string; label: string }[] };

const DRUE_REGION_CLUSTERS: DrueRegionCluster[] = [
  {
    drueSlug: "chardonnay",
    title: "Chardonnay",
    items: [
      { slug: "chardonnay-fra-chablis", label: "Chardonnay fra Chablis" },
      { slug: "chardonnay-fra-maconnais", label: "Chardonnay fra Mâconnais" },
      { slug: "chardonnay-fra-margaret-river", label: "Chardonnay fra Margaret River" },
    ],
  },
  {
    drueSlug: "sauvignon-blanc",
    title: "Sauvignon blanc",
    items: [
      { slug: "sauvignon-blanc-fra-sancerre", label: "Sauvignon blanc fra Sancerre" },
      { slug: "sauvignon-blanc-fra-marlborough", label: "Sauvignon blanc fra Marlborough" },
    ],
  },
  {
    drueSlug: "riesling",
    title: "Riesling",
    items: [
      { slug: "riesling-fra-mosel", label: "Riesling fra Mosel" },
      { slug: "riesling-fra-alsace", label: "Riesling fra Alsace" },
      { slug: "riesling-fra-clare-valley", label: "Riesling fra Clare Valley" },
    ],
  },
  {
    drueSlug: "chenin-blanc",
    title: "Chenin blanc",
    items: [
      { slug: "chenin-blanc-fra-vouvray", label: "Chenin blanc fra Vouvray" },
      { slug: "chenin-blanc-fra-swartland", label: "Chenin blanc fra Swartland" },
    ],
  },
  {
    drueSlug: "albarino",
    title: "Albariño",
    items: [{ slug: "albarino-fra-rias-baixas", label: "Albariño fra Rías Baixas" }],
  },
  {
    drueSlug: "pinot-noir",
    title: "Pinot noir",
    items: [
      { slug: "pinot-noir-fra-bourgogne", label: "Pinot noir fra Bourgogne" },
      { slug: "pinot-noir-fra-willamette-valley", label: "Pinot noir fra Willamette Valley" },
      { slug: "pinot-noir-fra-central-otago", label: "Pinot noir fra Central Otago" },
    ],
  },
  {
    drueSlug: "cabernet-sauvignon",
    title: "Cabernet sauvignon",
    items: [
      { slug: "cabernet-sauvignon-fra-bordeaux", label: "Cabernet sauvignon fra Bordeaux" },
      { slug: "cabernet-sauvignon-fra-napa-valley", label: "Cabernet sauvignon fra Napa Valley" },
      { slug: "cabernet-sauvignon-fra-maipo-valley", label: "Cabernet sauvignon fra Maipo Valley" },
    ],
  },
  {
    drueSlug: "merlot",
    title: "Merlot",
    items: [{ slug: "merlot-fra-pomerol", label: "Merlot fra Pomerol" }],
  },
  {
    drueSlug: "syrah",
    title: "Syrah / shiraz",
    items: [
      { slug: "syrah-fra-nord-rhone", label: "Syrah fra Nord-Rhône" },
      { slug: "syrah-fra-barossa-valley", label: "Shiraz fra Barossa Valley" },
    ],
  },
  {
    drueSlug: "malbec",
    title: "Malbec",
    items: [{ slug: "malbec-fra-mendoza", label: "Malbec fra Mendoza" }],
  },
  {
    drueSlug: "tempranillo",
    title: "Tempranillo",
    items: [
      { slug: "tempranillo-fra-rioja", label: "Tempranillo fra Rioja" },
      { slug: "tempranillo-fra-ribera-del-duero", label: "Tempranillo fra Ribera del Duero" },
    ],
  },
  {
    drueSlug: "sangiovese",
    title: "Sangiovese",
    items: [
      { slug: "sangiovese-fra-chianti-classico", label: "Sangiovese fra Chianti Classico" },
      { slug: "sangiovese-fra-montalcino", label: "Sangiovese fra Montalcino (Brunello)" },
    ],
  },
  {
    drueSlug: "nebbiolo",
    title: "Nebbiolo",
    items: [
      { slug: "nebbiolo-fra-barolo", label: "Nebbiolo fra Barolo" },
      { slug: "nebbiolo-fra-barbaresco", label: "Nebbiolo fra Barbaresco" },
    ],
  },
  {
    drueSlug: "grenache",
    title: "Grenache / garnacha",
    items: [
      { slug: "grenache-fra-chateauneuf-du-pape", label: "Grenache fra Châteauneuf-du-Pape" },
      { slug: "grenache-fra-priorat", label: "Garnacha fra Priorat" },
    ],
  },
];

const DRUE_GRUPPER: DrueGruppe[] = [
  {
    id: "hvide",
    titel: "Hvide druer",
    intro: "Frisk syre, aroma og ofte lavere tannin — oplagt til fisk, skaldyr, salat og mange lettere kødretter.",
    punkter: [
      { navn: "Albariño", q: "albariño", note: "Citrus og salt — skaldyr, tapas og let fisk.", guide: "albarino-druen" },
      { navn: "Assyrtiko", q: "assyrtiko", note: "Mineral og syre fra Santorini — fisk, skaldyr og grillet grønt.", guide: "assyrtiko-druen" },
      { navn: "Chardonnay", q: "chardonnay", note: "Fad og krop — kylling, skaldyr og cremede saucer.", guide: "chardonnay-druen" },
      { navn: "Chenin Blanc", q: "chenin blanc", note: "Syre og alsidighed — ost, gris og både tør og halvtør stil.", guide: "chenin-blanc-druen" },
      {
        navn: "Grüner Veltliner",
        q: "grüner veltliner",
        note: "Hvid peber og friskhed — grønt, brunch og asiatisk-inspireret.",
        guide: "gruener-veltliner-druen",
      },
      {
        navn: "Gewürztraminer",
        q: "gewürztraminer",
        note: "Lychee og rose — krydret mad, thai og blåskimmel.",
        guide: "gewurztraminer-druen",
      },
      { navn: "Muscadet", q: "muscadet", note: "Høj syre og sur lie — østers, muslinger og salt fisk.", guide: "muscadet-druen" },
      { navn: "Pinot Blanc", q: "pinot blanc", note: "Ren hvid fra pinot-familien — fisk, svampe og mild ost.", guide: "pinot-blanc-druen" },
      { navn: "Pinot Gris / Grigio", q: "pinot grigio", note: "Neutral til aromatisk — salat, let pasta og som rosé-alternativ.", guide: "pinot-gris-druen" },
      {
        navn: "Prosecco (Glera)",
        q: "prosecco",
        note: "Lette bobler fra Veneto — aperitif, friture og brunch.",
        guide: "prosecco-glera-druen",
      },
      { navn: "Riesling", q: "riesling", note: "Syre og aroma — fisk, asiatisk, brunch og mange oste.", guide: "riesling-druen" },
      { navn: "Sauvignon Blanc", q: "sauvignon blanc", note: "Urtet og frisk — grøntsager, fisk og lette saucer.", guide: "sauvignon-blanc-druen" },
      { navn: "Verdejo", q: "verdejo", note: "Citrus og urter fra Rueda — tapas, fisk og salat.", guide: "verdejo-druen" },
      { navn: "Viognier", q: "viognier", note: "Aromatisk og fyldig hvid — fjerkræ, sauce og smagfuld fisk.", guide: "viognier-druen" },
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
      {
        navn: "Cabernet Franc",
        q: "cabernet franc",
        note: "Peber og rød frugt — lam, gris og lettere grill end cabernet sauvignon.",
        guide: "cabernet-franc-druen",
      },
      { navn: "Carménère", q: "carmenere", note: "Urter og mørke bær fra Chile — grill, burger og simrekød.", guide: "carmenere-druen" },
      { navn: "Dolcetto", q: "dolcetto", note: "Let Piemonte-rød — pizza, salumi og hverdag.", guide: "dolcetto-druen" },
      { navn: "Gamay / Beaujolais", q: "gamay", note: "Saft og lav tannin — charcuteri, lettere kød og kølig servering.", guide: "gamay-druen" },
      { navn: "Grenache / Garnacha", q: "garnacha", note: "Moden frugt — grill, middelhavsmad og BBQ.", guide: "grenache-druen" },
      { navn: "Malbec", q: "malbec", note: "Mørke bær og blid struktur — burger, grill og argentinsk-inspireret kød.", guide: "malbec-druen" },
      { navn: "Mencía", q: "mencia", note: "Nordspansk frugt og syre — tapas, gris og lettere kød.", guide: "mencia-druen" },
      { navn: "Merlot", q: "merlot", note: "Blødere frugt og rundere mundfuld — pizza, lyst kød og hverdagssimre.", guide: "merlot-druen" },
      {
        navn: "Montepulciano d’Abruzzo",
        q: "montepulciano d'abruzzo",
        note: "Saftig rød fra Abruzzo — ikke Vino Nobile (sangiovese).",
        guide: "montepulciano-druen",
      },
      { navn: "Nebbiolo / Barolo", q: "barolo", note: "Tanniner og parfume — langtidssteg og kraftigere retter.", guide: "nebbiolo-druen" },
      { navn: "Pinot Noir", q: "pinot noir", note: "Let til mellem fyldig — fjerkræ, svampe og lyst kød.", guide: "pinot-noir-druen" },
      { navn: "Pinotage", q: "pinotage", note: "Sydafrikansk signatur — BBQ, braai og kraftige saucer.", guide: "pinotage-druen" },
      { navn: "Sangiovese / Chianti", q: "chianti", note: "Syre og tomatven — pizza, pasta og italiensk.", guide: "sangiovese-druen" },
      { navn: "Syrah / Shiraz", q: "syrah", note: "Krydderi og mørke bær — grill, lam og gryde.", guide: "syrah-druen" },
      { navn: "Tempranillo / Rioja", q: "rioja", note: "Bær og krydderi — tapas, pølser og simremad.", guide: "tempranillo-druen" },
      {
        navn: "Touriga Nacional",
        q: "touriga nacional",
        note: "Tæt frugt og tannin fra Portugal — lam, vildt og moden ost.",
        guide: "touriga-nacional-druen",
      },
      { navn: "Zinfandel", q: "zinfandel", note: "Moden frugt og krydderi — BBQ, burger og røget kød.", guide: "zinfandel-druen" },
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

const PAGE_TITLE = "Druesorter — oversigt og vinsøgning";
const PAGE_DESCRIPTION =
  "Alle Vinbots drueguider: hvide (riesling, assyrtiko, gewürztraminer m.fl.) og røde (dolcetto, montepulciano, mencía, cabernet franc, sangiovese m.fl.) — med søgning og madparring.";
const PAGE_URL = `${siteUrl}/druesorter`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function DruesorterHubPage() {
  const collectionItems = DRUE_GRUPPER.flatMap((g) =>
    g.punkter.map((d) => ({
      name: d.navn,
      url: `${siteUrl}/guides/${d.guide}`,
    })),
  );

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Druesorter", url: PAGE_URL },
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

      <section id="drue-region" className="mt-16 scroll-mt-20 rounded-2xl border border-rose-200 bg-rose-50/60 p-6">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-900">Drue × region — klassiske long-tails</h2>
        <p className="mt-2 max-w-3xl text-stone-700">
          Nogle drue-region-kombinationer er blevet synonymer med hinanden — chardonnay fra Chablis, pinot noir fra Bourgogne, nebbiolo fra Barolo. 29 dybdeguider med stil, producenter, klassificeringer, pris og madparring:
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {DRUE_REGION_CLUSTERS.map((cluster) => (
            <div key={cluster.drueSlug} className="rounded-xl border border-stone-200 bg-white p-4">
              <h3 className="text-base font-semibold text-stone-900">{cluster.title}</h3>
              <ul className="mt-3 flex flex-col gap-1.5 text-sm">
                {cluster.items.map((item) => (
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

      <p className="mt-10 text-sm text-stone-500">
        Tip: på forsiden kan du også skrive druenavnet direkte i søgefeltet — URL&apos;en her er en genvej til det samme.
      </p>
    </div>
  );
}
