import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listGloggHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Gløgg — opskrifter, vin i gryden og julehygge";
const PAGE_DESCRIPTION =
  "Gløgg-hub: rød-, port-, hvidvins- og alkoholfri gløgg, hvilken vin i gryden, papvin til fest og hvad du drikker ved siden af æbleskiver.";
const PAGE_URL = `${siteUrl}/glogg`;

const DRINK_CARDS = [
  {
    href: "/drinks/roedvinsgloegg",
    title: "Rødvinsgløgg",
    blurb: "Klassisk dansk — kanel, nelliker, appelsin og et skvæt port.",
  },
  {
    href: "/drinks/portvinsgloegg",
    title: "Portvinsgløgg",
    blurb: "Fyldigere kusine med ruby port og æblejuice — server i mindre glas.",
  },
  {
    href: "/drinks/hvidvinsgloegg",
    title: "Hvidvinsgløgg",
    blurb: "Lysere gløgg med pinot gris eller viognier — stadig varm og krydret.",
  },
  {
    href: "/drinks/alkoholfri-gloegg",
    title: "Alkoholfri gløgg",
    blurb: "Saft/te-base eller alkoholfri rød — samme krydderi, uden alkohol.",
  },
] as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function GloggHubPage() {
  const guides = listGloggHubGuides();
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  const collectionItems = [
    ...guides.map((g) => ({
      name: g.title,
      url: `${siteUrl}/guides/${g.slug}`,
    })),
    ...DRINK_CARDS.map((d) => ({
      name: d.title,
      url: `${siteUrl}${d.href}`,
    })),
  ];

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Gløgg", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} items={collectionItems} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/glogg", label: "Gløgg" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Gløgg</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Alt om <strong className="font-medium text-stone-800">dansk gløgg</strong> — hvilken vin i gryden, papvin til
        mange gæster, klassiske opskrifter og hvad du drikker ved siden af æbleskiver. Start med{" "}
        <Link href="/guides/vin-til-glogg" className="text-rose-900 hover:underline">
          vin til gløgg
        </Link>{" "}
        eller hop direkte til{" "}
        <Link href="/drinks/roedvinsgloegg" className="text-rose-900 hover:underline">
          rødvinsgløgg
        </Link>
        .
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Sammenlign priser med{" "}
        <Link href="/?q=gl%C3%B8gg%20r%C3%B8dvin%20cotes%20du%20rhone" className="text-rose-900 hover:underline">
          søgning på gløgg og rødvin
        </Link>
        . Relateret:{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson
        </Link>
        ,{" "}
        <Link href="/drinks?style=varm" className="text-rose-900 hover:underline">
          varme drinks
        </Link>{" "}
        og{" "}
        <Link href="/julevin-beregner" className="text-rose-900 hover:underline">
          julevin-beregner
        </Link>
        .
      </p>

      <section className="mt-8 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Start her</h2>
        <p className="mt-3 text-sm text-stone-700">Vin i gryden, papvin-base, opskrifter og alkoholfri:</p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/guides/vin-til-glogg" className="font-medium hover:underline">
            Vin til gløgg
          </Link>
          <Link href="/guides/glogg-paa-papvin" className="font-medium hover:underline">
            Gløgg på papvin
          </Link>
          <Link href="/drinks/roedvinsgloegg" className="hover:underline">
            Rødvinsgløgg
          </Link>
          <Link href="/drinks/portvinsgloegg" className="hover:underline">
            Portvinsgløgg
          </Link>
          <Link href="/drinks/hvidvinsgloegg" className="hover:underline">
            Hvidvinsgløgg
          </Link>
          <Link href="/drinks/alkoholfri-gloegg" className="hover:underline">
            Alkoholfri gløgg
          </Link>
          <Link href="/guides/alkoholfri-vin-til-jul" className="hover:underline">
            Alkoholfri vin til jul
          </Link>
          <Link href="/opskrifter/gloegg-sauce-til-julestegen" className="hover:underline">
            Gløgg-sauce til julestegen
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-stone-900">Opskrifter</h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-700">
          Fire kerneopskrifter — klassisk rød, port, hvid og alkoholfri. Alle følger samme regel: varm forsigtigt, kog
          ikke.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {DRINK_CARDS.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-rose-300"
            >
              <h3 className="text-lg font-semibold text-stone-900">{d.title}</h3>
              <p className="mt-2 text-sm text-stone-700">{d.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Vin til gløgg</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/vin-til-glogg" className="text-rose-900 hover:underline">
                Vin til gløgg
              </Link>{" "}
              — base i gryden vs. ved siden af
            </li>
            <li>
              <Link href="/guides/glogg-paa-papvin" className="text-rose-900 hover:underline">
                Gløgg på papvin
              </Link>{" "}
              — 3 L til mange gæster
            </li>
            <li>
              <Link href="/guides/bedste-papvin-under-150-kr" className="text-rose-900 hover:underline">
                Papvin under 150 kr
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-portvin" className="text-rose-900 hover:underline">
                Bedste portvin
              </Link>{" "}
              — til portvinsgløgg
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Tilbehør &amp; jul</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/vin-til-aebleskiver" className="text-rose-900 hover:underline">
                Vin til æbleskiver
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-julefrokost" className="text-rose-900 hover:underline">
                Vin til julefrokost
              </Link>
            </li>
            <li>
              <Link href="/guides/vin-til-juleaften" className="text-rose-900 hover:underline">
                Vin til juleaften
              </Link>
            </li>
            <li>
              <Link href="/opskrifter/gloegg-sauce-til-julestegen" className="text-rose-900 hover:underline">
                Gløgg-sauce til julestegen
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan bruger du hubben</h2>
        <p>
          Skal du vælge flaske til gryden?{" "}
          <Link href="/guides/vin-til-glogg" className="text-rose-900 hover:underline">
            Vin til gløgg
          </Link>{" "}
          . Mange gæster?{" "}
          <Link href="/guides/glogg-paa-papvin" className="text-rose-900 hover:underline">
            Papvin-guiden
          </Link>
          . Klar opskrift?{" "}
          <Link href="/drinks/roedvinsgloegg" className="text-rose-900 hover:underline">
            Rødvinsgløgg
          </Link>{" "}
          eller{" "}
          <Link href="/drinks/portvinsgloegg" className="text-rose-900 hover:underline">
            portvinsgløgg
          </Link>
          . Uden alkohol:{" "}
          <Link href="/drinks/alkoholfri-gloegg" className="text-rose-900 hover:underline">
            alkoholfri gløgg
          </Link>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Alle gløgg-guides</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <GuideTopicHubExtras
        hub="glogg"
        slug="glogg-hub"
        products={[
          {
            productKey: "guigal-cotes-du-rhone-rouge",
            heading: "Rødvin til gløgg-base — Guigal Côtes du Rhône (sammenlign priser)",
          },
          {
            productKey: "grahams-10-tawny",
            heading: "Port til gløgg og avec — Graham's 10 Year Tawny",
          },
          {
            productKey: "torres-natureo-red",
            heading: "Alkoholfri rød til julebordet — Torres Natureo Red",
          },
        ]}
        seoHeading="Gløgg i Danmark: vin, opskrifter og julehygge"
        faq={[
          {
            question: "Hvilken vin skal man bruge til gløgg?",
            answer:
              "En frugtig, blød hverdagsrød — Côtes du Rhône, Languedoc eller garnacha under ca. 120 kr. Undgå dyre Bourgogne og unge, stramme cabernet; varmen og krydderiet skjuler finesse.",
          },
          {
            question: "Må gløgg koge?",
            answer:
              "Nej. Varm forsigtigt under låg, så aroma og alkohol bliver i glasset. Kogning gør smagen flad.",
          },
          {
            question: "Kan man lave alkoholfri gløgg?",
            answer:
              "Ja — saft/te-base med samme krydderier, eller alkoholfri rød. Se alkoholfri gløgg-opskriften og guiden alkoholfri vin til jul.",
          },
        ]}
      >
        <p>
          Dansk gløgg er varm, krydret vin (eller saft) med kanel, nelliker, appelsin og ofte et skvæt port eller rom.
          Den klassiske røde version er det sikre startpunkt — se{" "}
          <Link href="/drinks/roedvinsgloegg" className="text-rose-900 hover:underline">
            rødvinsgløgg
          </Link>
          . Skal du have mere fylde med færre flasker:{" "}
          <Link href="/drinks/portvinsgloegg" className="text-rose-900 hover:underline">
            portvinsgløgg
          </Link>
          . Lysere alternativ:{" "}
          <Link href="/drinks/hvidvinsgloegg" className="text-rose-900 hover:underline">
            hvidvinsgløgg
          </Link>
          .
        </p>
        <p>
          Vin <em>i</em> gryden er ikke det samme som vin <em>ved siden af</em> æbleskiver eller før juleanden.{" "}
          <Link href="/guides/vin-til-glogg" className="text-rose-900 hover:underline">
            Vin til gløgg
          </Link>{" "}
          skiller de to. Til mange gæster er{" "}
          <Link href="/guides/glogg-paa-papvin" className="text-rose-900 hover:underline">
            papvin
          </Link>{" "}
          det praktiske valg — tør, frugtig rød, ikke den sure rest i køleskabet.
        </p>
        <p>
          Widgets herunder er PriceRunner-annoncer: Guigal som eksempel på gløgg-base, Graham’s til port/avec, Torres
          Natureo til alkoholfri. Affiliate-butikkerne roterer på hubben — køb og alderskontrol sker hos forhandleren.
        </p>
        <p>
          Til resten af julen:{" "}
          <Link href="/guides/vin-til-julemad-den-store-guide" className="text-rose-900 hover:underline">
            den store julevinsguide
          </Link>
          ,{" "}
          <Link href="/saeson" className="text-rose-900 hover:underline">
            sæson
          </Link>{" "}
          og{" "}
          <Link href="/julevin-beregner" className="text-rose-900 hover:underline">
            julevin-beregner
          </Link>
          .
        </p>
      </GuideTopicHubExtras>

      <PartnerAdsLeaderboard className="mt-12" hub="glogg" slug="glogg-hub" />

      <p className="mt-10 text-sm text-stone-700">
        Se også{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson
        </Link>
        ,{" "}
        <Link href="/drinks" className="text-rose-900 hover:underline">
          drinks
        </Link>
        ,{" "}
        <Link href="/hedvin" className="text-rose-900 hover:underline">
          hedvin
        </Link>{" "}
        og{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>
    </PageShell>
  );
}
