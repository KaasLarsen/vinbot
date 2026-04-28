import type { Metadata } from "next";
import Link from "next/link";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { VineHubSearch, type WineSummary } from "@/components/vine-hub-search";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { siteUrl } from "@/lib/site";

const PAGE_URL = `${siteUrl}/vine`;

export const metadata: Metadata = {
  title: "Vin-katalog — sammenlign priser på tværs af forhandlere",
  description:
    "Find samme vin hos flere danske forhandlere: pris, links og kort om smag. Adskilt fra forsøgningen — kun Vinbots vin-indeks.",
  alternates: { canonical: PAGE_URL },
};

export const revalidate = 21600;

export default async function VineHubPage() {
  const catalog = await getCachedWineCatalog();

  const summaries: WineSummary[] = catalog.wines.map((w) => {
    const prices = w.offers.map((o) => o.price).filter((p): p is number => typeof p === "number");
    const lowestPrice = prices.length ? Math.min(...prices) : null;
    return {
      slug: w.slug,
      displayTitle: w.displayTitle,
      brand: w.brand,
      merchantCount: w.offers.length,
      lowestPrice,
    };
  });

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin-katalog", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((b) => ({ name: b.name, url: b.url }))}
      />
      <CollectionPageJsonLd
        name="Vin-katalog — priser på tværs af forhandlere"
        description="Sammenlægning af vin fra affiliate-feeds. Søg her; brug forsiden til almindelig produktsøgning."
        url={PAGE_URL}
        items={summaries.slice(0, 500).map((s) => ({
          name: s.displayTitle,
          url: `${siteUrl}/vine/${s.slug}`,
        }))}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vine", label: "Vin-katalog" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin-katalog</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Her grupperer vi <strong className="font-medium text-stone-800">samme vin</strong> på tværs af forhandlere, så du kan sammenligne
        pris og åbne det sted, der passer dig. Dette er et <strong className="font-medium text-stone-800">egen indeks</strong> —{" "}
        <Link href="/" className="text-rose-900 underline decoration-rose-300 underline-offset-4 hover:decoration-rose-900">
          forsøgningen på forsiden
        </Link>{" "}
        er uændret og viser bred match fra feeds som før.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Opdateret ud fra feeds ({catalog.generatedAt.slice(0, 10)}) · {catalog.wines.length} vine · {catalog.offerCount} tilbudslinjer.
      </p>

      <section className="mt-10">
        {summaries.length === 0 ? (
          <p className="text-stone-700">Ingen vine i indekset lige nu — prøv igen senere.</p>
        ) : (
          <VineHubSearch wines={summaries} />
        )}
      </section>

      <section className="mt-12">
        <AffiliateDisclosure />
      </section>
    </div>
  );
}
