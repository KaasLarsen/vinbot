import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listSaesonHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Sæson og vin — forår, sommer, efterår, vinter";
const PAGE_DESCRIPTION =
  "Sæsonvin i Danmark: jul, påske, nytår, fastelavn, Mortensaften, Sankt Hans, sommer, grill, højtider og klassisk dansk mad — søg i guiderne her.";
const PAGE_URL = `${siteUrl}/saeson`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function SaesonHubPage() {
  const guides = listSaesonHubGuides();
  const cards = guides.map((g) => ({
    slug: g.slug,
    title: g.title,
    description: g.description,
    updated: g.updated,
    tags: g.tags,
  }));

  const collectionItems = guides.map((g) => ({
    name: g.title,
    url: `${siteUrl}/guides/${g.slug}`,
  }));

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Sæson", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={collectionItems}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/saeson", label: "Sæson" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Sæson og vin</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Årstiden påvirker både køkkenet og lysten i glasset. Her finder du{" "}
        <strong className="font-medium text-stone-800">højtider</strong>,{" "}
        <strong className="font-medium text-stone-800">grill og sommer</strong>,{" "}
        <strong className="font-medium text-stone-800">vinter og hygge</strong> og praktiske sider om fx temperatur og gavevin. Søg nedenfor, eller gå til{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          alle guides
        </Link>
        .
      </p>

      <section className="mt-8 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Året rundt: hvornår drikker vi hvad?</h2>
        <p>
          Dansk vinkultur følger årstiderne tættere end mange tror. Forårets første rosé åbnes ofte samtidig med at påsken nærmer sig, sommerens crémant og albariño drikkes på terrassen i juni og juli, efterårets første kraftige rødvin til vildt dukker op i september-oktober, og vinterens barolo, amarone og port-vine lyser de mørke aftener op. Mellem disse brede bevægelser ligger en vifte af danske højtider og sociale begivenheder, der hver har deres egne vinvaner: konfirmationer om foråret, sommerbrylluper, julefrokoster fra november, og nytårsaften med champagne og kransekage.
        </p>
        <p>
          Sæsonguiderne her er skrevet med udgangspunkt i hvordan danskere faktisk drikker vin: hvad er der i butikkerne, hvad passer til den mad der serveres, og hvad gør en flaske fra 100 kr bedst mulig. Vi dækker både de klassiske danske højtider (jul, påske, nytår, Mortensaften, fastelavn) og de bredere sæsonskift (forår, sommer, efterår, vinter) med konkrete vinforslag til både hverdag og fest.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Forår (marts-maj)</h3>
          <p className="mt-2 text-sm text-stone-700">
            Foråret bringer lysere mad og lettere vine. Tør riesling, grüner veltliner, chablis og rosé fylder glassene, mens påskelam kalder på lettere rødvin som pinot noir eller cru beaujolais. Læs om{" "}
            <Link href="/guides/vin-til-paaske-og-paaskefrokost" className="text-rose-900 hover:underline">påske</Link>,{" "}
            <Link href="/guides/vin-til-lam" className="text-rose-900 hover:underline">lam</Link>,{" "}
            <Link href="/guides/vin-til-asparges" className="text-rose-900 hover:underline">asparges</Link> og{" "}
            <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">konfirmation</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Sommer (juni-august)</h3>
          <p className="mt-2 text-sm text-stone-700">
            Grill, haveselskab, Sankt Hans og sommerbrylluper. Kølet rosé, provence-stil, vermentino, albariño og lettere rødvine (gamay, pinot noir). Læs om{" "}
            <Link href="/guides/vin-til-grill-og-bbq" className="text-rose-900 hover:underline">grill og BBQ</Link>,{" "}
            <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">bedste sommervin</Link>,{" "}
            <Link href="/guides/rosevin-til-mad-og-sommer" className="text-rose-900 hover:underline">rosévin</Link>,{" "}
            <Link href="/guides/vin-til-sankt-hans" className="text-rose-900 hover:underline">Sankt Hans</Link> og{" "}
            <Link href="/guides/vin-til-sommerbryllup" className="text-rose-900 hover:underline">sommerbryllup</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Efterår (september-november)</h3>
          <p className="mt-2 text-sm text-stone-700">
            Mortensaften, vildt, svampe, og overgangen til kraftigere rødvine. Moden pinot noir, syrah, nebbiolo og sangiovese passer til kraftigere retter. Læs om{" "}
            <Link href="/guides/vin-til-mortensaften" className="text-rose-900 hover:underline">Mortensaften</Link>,{" "}
            <Link href="/guides/vin-til-vildt" className="text-rose-900 hover:underline">vildt</Link>,{" "}
            <Link href="/guides/vin-til-and" className="text-rose-900 hover:underline">and</Link> og{" "}
            <Link href="/guides/vin-til-gryderet" className="text-rose-900 hover:underline">gryderetter</Link>.
          </p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-lg font-semibold text-stone-900">Vinter (december-februar)</h3>
          <p className="mt-2 text-sm text-stone-700">
            Jul, julefrokost, nytår og fastelavn. Tør riesling og bobler til sild, beaujolais til medister, kraftig rødvin til flæskesteg og champagne til nytår. Læs om{" "}
            <Link href="/guides/vin-til-julemad-den-store-guide" className="text-rose-900 hover:underline">julemad</Link>,{" "}
            <Link href="/guides/vin-til-julefrokost" className="text-rose-900 hover:underline">julefrokost</Link>,{" "}
            <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="text-rose-900 hover:underline">nytår</Link> og{" "}
            <Link href="/guides/vin-til-fastelavn" className="text-rose-900 hover:underline">fastelavn</Link>.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Lige nu: forår og tidlig sommer</h2>
        <p className="mt-3 text-stone-700">
          Sæson-højdepunkter: {" "}
          <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
            vin til konfirmation
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-studenterfest" className="text-rose-900 hover:underline">
            vin til studenterfest
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-mors-dag" className="text-rose-900 hover:underline">
            vin til mors dag
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-fars-dag" className="text-rose-900 hover:underline">
            vin til fars dag
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-haveselskab" className="text-rose-900 hover:underline">
            vin til haveselskab
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-sommerbryllup" className="text-rose-900 hover:underline">
            sommerbryllup
          </Link>{" "}
          og {" "}
          <Link href="/guides/bedste-sommervin" className="text-rose-900 hover:underline">
            bedste sommervin
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan vælger du sæsonvin</h2>
        <p>
          Vinvalg efter sæson handler om tre ting: <strong>madens karakter</strong>, <strong>temperaturen udendørs</strong> og <strong>stemningen</strong>. Når det er 28 grader og vi griller, vil de færreste have en kraftig amarone; når kulden bider i november, kan en let sommerrosé føles tom. Brug sæsonen som rettesnor, men husk at reglerne kan brydes — en godt afkølet cru beaujolais fungerer næsten hele året rundt, og en tør riesling passer til både sild i december og grillet fisk i juli.
        </p>
        <p>
          Højtiderne fortjener ekstra opmærksomhed: vinen skal både passe til maden og til lejligheden. Til jul og påske dækker vi kompleksiteten af et bord med mange smag — hvor en enkelt flaske sjældent er nok. Til fest (bryllup, konfirmation, runde fødselsdage) handler det også om mængder og prisbevidsthed: vi guider dig i valget mellem bobler, hvid og rød i forhold til både gæsteantal og budget. Se også vores{" "}
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
            komplet guide til vin og mad
          </Link>
          {" "}for bredere principper der gælder året rundt.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-stone-900">Sæsonguides</h2>
        <GuideHubBrowser guides={cards} showKindTabs={false} showTagChips tagMinCount={1} />
      </section>

      <PartnerAdsLeaderboard className="mt-12" />
      <p className="mt-10 text-stone-700">
        Se også{" "}
        <Link href="/guides/vin-til-julemad-den-store-guide" className="text-rose-900 hover:underline">
          vin til julemad
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="text-rose-900 hover:underline">
          nytår og nytårsmenu
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-paaske-og-paaskefrokost" className="text-rose-900 hover:underline">
          påske og påskefrokost
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-fastelavn" className="text-rose-900 hover:underline">
          fastelavn
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-mortensaften" className="text-rose-900 hover:underline">
          Mortensaften
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-sankt-hans" className="text-rose-900 hover:underline">
          Sankt Hans
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-brunch" className="text-rose-900 hover:underline">
          brunch
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-sommer" className="text-rose-900 hover:underline">
          vin til sommer
        </Link>
        ,{" "}
        <Link href="/guides/rosevin-til-mad-og-sommer" className="text-rose-900 hover:underline">
          rosévin
        </Link>
        ,{" "}
        <Link href="/guides/vin-i-cocktails-spritz-og-drikke" className="text-rose-900 hover:underline">
          vin i cocktails
        </Link>
        ,{" "}
        <Link href="/guides/vin-til-grill-og-bbq" className="text-rose-900 hover:underline">
          grill og BBQ
        </Link>{" "}
        og{" "}
        <Link href="/humoer-og-vin" className="text-rose-900 hover:underline">
          humør og stemning
        </Link>
        .
      </p>
    </div>
  );
}
