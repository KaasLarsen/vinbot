import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listSupermarkedVinHubGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vin i supermarkedet — Netto, Rema, Lidl, Føtex, Coop";
const PAGE_DESCRIPTION =
  "Vin i supermarkedet: guides til Netto, Rema, Lidl, Føtex, Bilka og Coop. Discount-hylde, månedens kup og samme stil online på Vinbot.";
const PAGE_URL = `${siteUrl}/supermarked-vin`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function SupermarkedVinHubPage() {
  const guides = listSupermarkedVinHubGuides();
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
    { name: "Supermarked-vin", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} items={collectionItems} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/supermarked-vin", label: "Supermarked-vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin i supermarkedet</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Når du står i <strong className="font-medium text-stone-800">Netto, Rema, Lidl, Føtex, Bilka eller Coop</strong>{" "}
        — her er guides der hjælper dig ved hylden: stilvalg under 70–80 kr, kæde for kæde, og månedens kup-logik.
        Vinbot sælger ikke kæde-vin; vi pege videre til samme stil online.
      </p>
      <p className="mt-3 max-w-3xl text-sm text-stone-600">
        Start med{" "}
        <Link href="/guides/vin-i-supermarkedet-guide" className="text-rose-900 hover:underline">
          overblikket
        </Link>
        ,{" "}
        <Link href="/guides/discount-vin-hylde-guide" className="text-rose-900 hover:underline">
          discount-hylden
        </Link>{" "}
        eller{" "}
        <Link href="/guides/ugens-vinkup-supermarked" className="text-rose-900 hover:underline">
          månedens vinkup
        </Link>
        . Søg flasker:{" "}
        <Link href="/?q=primitivo%20tempranillo%20cava&max=80" className="text-rose-900 hover:underline">
          under 80 kr
        </Link>
        .
      </p>

      <section className="mt-8 rounded-lg bg-amber-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Mest brugt ved hylden</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-700">
          <li>
            <Link href="/guides/vin-i-supermarkedet-guide" className="font-medium text-rose-900 hover:underline">
              Vin i supermarkedet — overblik
            </Link>
          </li>
          <li>
            <Link href="/guides/bedste-vin-i-netto-under-70-kr" className="text-rose-900 hover:underline">
              Netto under 70 kr
            </Link>
          </li>
          <li>
            <Link href="/guides/bedste-vin-i-rema-1000" className="text-rose-900 hover:underline">
              Rema 1000
            </Link>
          </li>
          <li>
            <Link href="/guides/alkoholfri-vin-i-netto-foetex" className="text-rose-900 hover:underline">
              Alkoholfri i Netto og Føtex
            </Link>
          </li>
        </ul>
      </section>

      <div className="mt-10">
        <PartnerAdsLeaderboard />
      </div>

      <div className="mt-10">
        <GuideHubBrowser guides={cards} />
      </div>
    </PageShell>
  );
}
