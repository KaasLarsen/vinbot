import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideTopicHubExtras } from "@/components/guide-topic-hub-extras";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listNaturvinHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Naturvin — smag, mad, økologi og servering";
const PAGE_DESCRIPTION =
  "Naturvin-hub: funky smag vs. fejl, økologisk vs. biodynamisk vs. naturvin, mad til orange og pét-nat, og hvor længe en åbnet flaske holder.";
const PAGE_URL = `${siteUrl}/naturvin`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function NaturvinHubPage() {
  const guides = listNaturvinHubGuides();
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
    { name: "Naturvin", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} items={collectionItems} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/naturvin", label: "Naturvin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Naturvin</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Konkrete svar om <strong className="font-medium text-stone-800">naturvin</strong>: hvad den funky smag er,
        hvordan den adskiller sig fra økologisk og biodynamisk, og hvad du spiser og serverer til. Start med{" "}
        <Link href="/guides/naturvin-hvad-er-det" className="text-rose-900 hover:underline">
          hvad naturvin er
        </Link>{" "}
        eller{" "}
        <Link href="/guides/naturvin-funky-smag" className="text-rose-900 hover:underline">
          forstå den funky smag
        </Link>
        .
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Søgning på{" "}
        <Link href="/?q=naturvin" className="text-rose-900 hover:underline">
          naturvin
        </Link>{" "}
        og{" "}
        <Link href="/?q=orange%20wine" className="text-rose-900 hover:underline">
          orange wine
        </Link>{" "}
        er et nøgleord i titler og beskrivelser — ikke et certificeret filter. Ordet står sjældent på etiketten, så
        listen kan både ramme forbi og mangle flasker.{" "}
        <Link href="/sps-wine" className="text-rose-900 hover:underline">
          SPS Wine
        </Link>{" "}
        er én af forhandlerne med den slags vine, ikke hele kategorien. Relateret:{" "}
        <Link href="/vin-viden" className="text-rose-900 hover:underline">
          vin-viden
        </Link>{" "}
        og{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad og vin
        </Link>
        .
      </p>

      <section className="mt-8 rounded-lg bg-rose-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Start her</h2>
        <p className="mt-3 text-sm text-stone-700">Fire værktøjer, ikke fire essays:</p>
        <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-rose-900 sm:grid-cols-2">
          <Link href="/guides/naturvin-funky-smag" className="font-medium hover:underline">
            Forstå den funky smag
          </Link>
          <Link href="/guides/okologisk-vs-biodynamisk-vs-naturvin" className="font-medium hover:underline">
            Økologisk vs. biodynamisk vs. naturvin
          </Link>
          <Link href="/guides/naturvin-til-mad" className="hover:underline">
            Naturvin til mad
          </Link>
          <Link href="/guides/naturvin-holdbarhed-og-servering" className="hover:underline">
            Holdbarhed og servering
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Smag og begreber</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/naturvin-hvad-er-det" className="text-rose-900 hover:underline">
                Hvad er naturvin?
              </Link>
            </li>
            <li>
              <Link href="/guides/orangevin-for-begyndere" className="text-rose-900 hover:underline">
                Orangevin for begyndere
              </Link>{" "}
              og{" "}
              <Link href="/guides/hvad-er-orange-vin" className="text-rose-900 hover:underline">
                hvad er orange vin
              </Link>
            </li>
            <li>
              <Link href="/guides/pet-nat-for-begyndere" className="text-rose-900 hover:underline">
                Pét-nat for begyndere
              </Link>{" "}
              og{" "}
              <Link href="/guides/hvad-er-pet-nat" className="text-rose-900 hover:underline">
                hvad er pét-nat
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-900">Mærker og praksis</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
            <li>
              <Link href="/guides/hvad-er-biodynamisk-vin" className="text-rose-900 hover:underline">
                Hvad er biodynamisk vin
              </Link>
            </li>
            <li>
              <Link href="/guides/bedste-okologiske-vin" className="text-rose-900 hover:underline">
                Bedste økologiske vin
              </Link>
            </li>
            <li>
              <Link href="/guides/hvad-er-sulfit-i-vin" className="text-rose-900 hover:underline">
                Sulfit i vin
              </Link>{" "}
              og{" "}
              <Link href="/guides/chillable-reds" className="text-rose-900 hover:underline">
                kølig rød
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
        hub="naturvin"
        slug="naturvin-hub"
        products={[]}
        seoHeading="Naturvin i praksis: smag, mærke, mad og flasken dagen efter"
        faq={[
          {
            question: "Er naturvin det samme som økologisk vin?",
            answer:
              "Nej. Økologisk er certificeret dyrkning i marken. Naturvin beskriver ofte kælderpraksis med få tilsætninger — uden et fælles EU-mærke. Økologisk er ikke automatisk naturvin.",
          },
          {
            question: "Hvornår er funky smag en fejl?",
            answer:
              "Gær, cider og uklarhed er ofte stil. Mus i eftersmagen, skarp eddike og brett der dækker frugten er fejl. Hæld den ud, hvis eftersmagen minder om bur eller tørre kiks.",
          },
          {
            question: "Hvor længe holder åbnet naturvin?",
            answer:
              "Ofte samme aften eller næste dag i køleskab. Lavt eller intet tilsat svovl gør den mere sårbar over for luft og varme end en almindelig hverdagsvin.",
          },
        ]}
      >
        <p>
          Naturvin er ikke et officielt mærke. Det er et ord om vine med lidt indgriben i kælderen: ofte vild gær, lidt
          filtrering og lidt eller intet tilsat svovl. Nogle flasker smager som klassisk vin. Andre er rå. Kvaliteten
          svinger, som i resten af vinverdenen.
        </p>
        <p>
          Vil du vide, om glasset er sjovt eller gået i stykker, så start i{" "}
          <Link href="/guides/naturvin-funky-smag" className="text-rose-900 hover:underline">
            den funky smag
          </Link>
          . Vil du købe på et logo, du kan tjekke, så læs{" "}
          <Link href="/guides/okologisk-vs-biodynamisk-vs-naturvin" className="text-rose-900 hover:underline">
            sammenligningen
          </Link>{" "}
          — EU-blad og Demeter er noget andet end ordet naturvin.
        </p>
        <p>
          Til mad: orangevin til krydderi og grønt, kølig let rød til charcuteri, pét-nat til salt snacks. Det står i{" "}
          <Link href="/guides/naturvin-til-mad" className="text-rose-900 hover:underline">
            naturvin til mad
          </Link>
          . Åbnet flaske hører i køleskabet, og mange lette røde skal serveres køligt — se{" "}
          <Link href="/guides/naturvin-holdbarhed-og-servering" className="text-rose-900 hover:underline">
            holdbarhed og servering
          </Link>
          .
        </p>
      </GuideTopicHubExtras>

      <PartnerAdsLeaderboard className="mt-12" hub="naturvin" slug="naturvin-hub" />

      <p className="mt-10 text-sm text-stone-700">
        Se også{" "}
        <Link href="/vin-viden" className="text-rose-900 hover:underline">
          vin-viden
        </Link>
        ,{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad og vin
        </Link>{" "}
        og{" "}
        <Link href="/sps-wine" className="text-rose-900 hover:underline">
          SPS Wine
        </Link>
        .
      </p>
    </PageShell>
  );
}
