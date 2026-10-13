import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listGloggHubGuides } from "@/lib/content/guides";
import { getDrinkImageAlt, getDrinkImagePath } from "@/lib/drink-images";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Gløgg — opskrifter, vin i gryden og julehygge";
const PAGE_DESCRIPTION =
  "Dansk gløgg: hvilken vin i gryden, papvin til fest, rød-, port-, hvidvins- og alkoholfri opskrift — plus hvad du drikker ved siden af æbleskiver.";
const PAGE_URL = `${siteUrl}/glogg`;

const DRINK_CARDS = [
  {
    slug: "roedvinsgloegg",
    href: "/drinks/roedvinsgloegg",
    title: "Rødvinsgløgg",
    blurb: "Klassisk dansk — kanel, nelliker, appelsin og et skvæt port. Start her.",
    meta: "8 glas · ca. 45 min",
  },
  {
    slug: "portvinsgloegg",
    href: "/drinks/portvinsgloegg",
    title: "Portvinsgløgg",
    blurb: "Fyldigere med ruby port og æblejuice — server i mindre glas.",
    meta: "6–8 glas · ca. 35 min",
  },
  {
    slug: "hvidvinsgloegg",
    href: "/drinks/hvidvinsgloegg",
    title: "Hvidvinsgløgg",
    blurb: "Lysere gløgg med pinot gris eller viognier — samme varme, mere citrus.",
    meta: "8 glas · ca. 35 min",
  },
  {
    slug: "alkoholfri-gloegg",
    href: "/drinks/alkoholfri-gloegg",
    title: "Alkoholfri gløgg",
    blurb: "Saft/te eller alkoholfri rød — samme krydderi, uden alkohol.",
    meta: "8 glas · ca. 30 min",
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
        Den danske juledrik: varm, krydret og nem at lave i stor portion. Her finder du{" "}
        <strong className="font-medium text-stone-800">opskrifter</strong>,{" "}
        <strong className="font-medium text-stone-800">hvilken vin i gryden</strong> og praktisk hjælp til papvin,
        æbleskiver og alkoholfri. Start med{" "}
        <Link href="/drinks/roedvinsgloegg" className="text-rose-900 hover:underline">
          klassisk rødvinsgløgg
        </Link>{" "}
        eller{" "}
        <Link href="/guides/vin-til-glogg" className="text-rose-900 hover:underline">
          vin til gløgg
        </Link>
        .
      </p>

      <section className="mt-8 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Tre hurtige valg</h2>
        <ul className="mt-4 grid gap-3 text-sm text-stone-700 sm:grid-cols-3">
          <li>
            <Link href="/drinks/roedvinsgloegg" className="font-medium text-rose-900 hover:underline">
              Klassisk rød
            </Link>
            <p className="mt-1">Én flaske hverdagsrød + krydderier. Sikkert til æbleskiver og julefrokost.</p>
          </li>
          <li>
            <Link href="/guides/glogg-paa-papvin" className="font-medium text-rose-900 hover:underline">
              Mange gæster
            </Link>
            <p className="mt-1">3 L tør rød papvin som base — billigere og nemmere end mange flasker.</p>
          </li>
          <li>
            <Link href="/drinks/alkoholfri-gloegg" className="font-medium text-rose-900 hover:underline">
              Uden alkohol
            </Link>
            <p className="mt-1">Saft/te eller alkoholfri rød med samme kanel, nellike og appelsin.</p>
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-stone-900">Opskrifter</h2>
        <p className="mt-2 max-w-2xl text-stone-700">
          Fire kerneopskrifter. Samme regel for alle:{" "}
          <strong className="font-medium text-stone-800">varm forsigtigt — kog ikke</strong>.
        </p>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2">
          {DRINK_CARDS.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-rose-200 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={getDrinkImagePath(d.slug)}
                    alt={getDrinkImageAlt(d.title)}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-lg font-semibold text-stone-900 group-hover:text-rose-950">{d.title}</h3>
                  <p className="mt-1 flex-1 text-sm text-stone-600">{d.blurb}</p>
                  <p className="mt-3 text-xs text-stone-500">{d.meta}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          Cocktail-varianter:{" "}
          <Link href="/drinks/gluehwein-sour" className="text-rose-900 hover:underline">
            Glühwein-Sour
          </Link>{" "}
          og{" "}
          <Link href="/drinks/spiced-red-wine-hot-toddy" className="text-rose-900 hover:underline">
            Spiced Red Wine Hot Toddy
          </Link>
          . Flere varme drinks:{" "}
          <Link href="/drinks?style=varm" className="text-rose-900 hover:underline">
            filter «varm»
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Hvilken vin i gryden?</h2>
        <p className="mt-3 text-stone-700">
          Brug en frugtig, blød rød du også vil drikke lunken — typisk{" "}
          <strong className="font-medium text-stone-800">60–120 kr</strong>. Dyre flasker er spild: varme og krydderi
          skjuler finesse.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-stone-200">
          <table className="w-full min-w-[20rem] border-collapse text-left text-sm text-stone-700">
            <thead className="bg-stone-100 text-stone-900">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Situation</th>
                <th className="px-3 py-2.5 font-semibold">Vælg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              <tr>
                <td className="px-3 py-2.5">Default (flaske)</td>
                <td className="px-3 py-2.5">Côtes du Rhône, Languedoc, garnacha</td>
              </tr>
              <tr className="bg-stone-50/80">
                <td className="px-3 py-2.5">Mange gæster</td>
                <td className="px-3 py-2.5">
                  <Link href="/guides/glogg-paa-papvin" className="text-rose-900 hover:underline">
                    Tør rød papvin 3 L
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2.5">Mere fylde</td>
                <td className="px-3 py-2.5">
                  <Link href="/drinks/portvinsgloegg" className="text-rose-900 hover:underline">
                    Ruby port + æblejuice
                  </Link>
                </td>
              </tr>
              <tr className="bg-stone-50/80">
                <td className="px-3 py-2.5">Lysere stil</td>
                <td className="px-3 py-2.5">Pinot gris / viognier (hvidvinsgløgg)</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5">Undgå</td>
                <td className="px-3 py-2.5">Dyr Bourgogne, ung stram cabernet, sur restvin</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-stone-700">
          Uddybning:{" "}
          <Link href="/guides/vin-til-glogg" className="text-rose-900 hover:underline">
            vin til gløgg
          </Link>{" "}
          (base vs. ved siden af) ·{" "}
          <Link href="/?q=gl%C3%B8gg%20r%C3%B8dvin%20cotes%20du%20rhone" className="text-rose-900 hover:underline">
            søg rødvin til gløgg
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Mængde og servering</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          <li>
            <strong className="font-medium text-stone-800">1 flaske (75 cl)</strong> ≈ 6–8 kopper, afhængig af fortynding
            og spiritus.
          </li>
          <li>
            <strong className="font-medium text-stone-800">3 L papvin</strong> ≈ fire flasker base — nok til ca. 20 gæster
            à 1–2 små kopper, hvis I også har saft/vand.
          </li>
          <li>Varm gløgg føles stærkere end kold vin — server mindre glas, tæl kopper før juleanden.</li>
          <li>Hold varm i termokande. Genopvarm forsigtigt; kog ikke igen.</li>
        </ul>
        <p className="mt-3 text-sm text-stone-700">
          Til julebordets øvrige flasker:{" "}
          <Link href="/julevin-beregner" className="text-rose-900 hover:underline">
            julevin-beregner
          </Link>{" "}
          og{" "}
          <Link href="/guides/vin-til-julemad-den-store-guide" className="text-rose-900 hover:underline">
            den store julevinsguide
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Ved siden af gløggen</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/vin-til-aebleskiver" className="text-rose-900 hover:underline">
                Æbleskiver
              </Link>{" "}
              — gløgg er drikkken
            </li>
            <li>
              <Link href="/guides/vin-til-julefrokost" className="text-rose-900 hover:underline">
                Julefrokost
              </Link>{" "}
              — skift til bobler/hvid når silden kommer
            </li>
            <li>
              <Link href="/guides/vin-til-juleaften" className="text-rose-900 hover:underline">
                Juleaften
              </Link>{" "}
              — stop gløgg før hovedretten
            </li>
            <li>
              <Link href="/opskrifter/gloegg-sauce-til-julestegen" className="text-rose-900 hover:underline">
                Gløgg-sauce til julestegen
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-stone-900">Køb &amp; praktisk</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/glogg-paa-papvin" className="text-rose-900 hover:underline">
                Gløgg på papvin
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-papvin-under-150-kr" className="text-rose-900 hover:underline">
                Papvin under 150 kr
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-portvin" className="text-rose-900 hover:underline">
                Bedste portvin
              </Link>
            </li>
            <li>
              <Link href="/guides/alkoholfri-vin-til-jul" className="text-rose-900 hover:underline">
                Alkoholfri vin til jul
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Guides i klyngen</h2>
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
        seoHeading="Gløgg i Danmark: sådan vælger du vin og opskrift"
        faq={[
          {
            question: "Hvilken vin skal man bruge til gløgg?",
            answer:
              "En frugtig, blød hverdagsrød — Côtes du Rhône, Languedoc eller garnacha under ca. 120 kr. Undgå dyre Bourgogne og unge, stramme cabernet.",
          },
          {
            question: "Må gløgg koge?",
            answer:
              "Nej. Varm forsigtigt under låg. Kogning gør smagen flad og driver alkohol og aroma væk.",
          },
          {
            question: "Hvor meget gløgg til 10 gæster?",
            answer:
              "Regn 1–2 små kopper pr. gæst til velkomst. Én flaske rækker sjældent — planlæg to flasker eller en 3 L papvin, plus saft til børn.",
          },
          {
            question: "Kan man lave alkoholfri gløgg?",
            answer:
              "Ja — saft/te-base med samme krydderier, eller alkoholfri rød. Se opskriften alkoholfri gløgg.",
          },
        ]}
      >
        <p>
          Dansk gløgg er varm vin (eller saft) med kanel, nelliker, appelsin og ofte port eller rom. Den klassiske røde
          version er det sikre startpunkt. Portvinsgløgg giver mere fylde med færre liter; hvidvinsgløgg er lysere;
          alkoholfri bruger samme krydderikasse.
        </p>
        <p>
          Skeln mellem vin <em>i</em> gryden og vin <em>ved siden af</em> æbleskiver eller før juleanden. Dyre flasker
          hører hjemme ved middagsbordet — ikke i gløggen. Til mange gæster er tør rød papvin det praktiske valg.
        </p>
        <p>
          PriceRunner-widgets er annoncer (kræver cookie-accept for at loade). Affiliate-butikkerne på hubben roterer —
          køb og alderskontrol sker hos forhandleren.
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
        <Link href="/guides/bedste-julevin" className="text-rose-900 hover:underline">
          bedste julevin
        </Link>
        .
      </p>
    </PageShell>
  );
}
