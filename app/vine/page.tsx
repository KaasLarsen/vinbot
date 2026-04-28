import type { Metadata } from "next";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { VineFeaturedStrip, type VineFeaturedWine } from "@/components/vine-featured";
import { VineHubSearch, type WineSummary } from "@/components/vine-hub-search";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { getCachedWineCatalog } from "@/lib/vine/catalog";
import { vineCatalogStyleFromBlob } from "@/lib/vine/catalog-style";
import { siteUrl } from "@/lib/site";

const PAGE_URL = `${siteUrl}/vine`;

export const metadata: Metadata = {
  title: "Vin-katalog — sammenlign priser på tværs af forhandlere",
  description:
    "Find samme vin hos flere danske forhandlere: sammenlign pris og åbn det sted, der passer dig.",
  alternates: { canonical: PAGE_URL },
};

export const revalidate = 21600;

export default async function VineHubPage() {
  const catalog = await getCachedWineCatalog();

  const summaries: WineSummary[] = catalog.wines.map((w) => {
    const prices = w.offers.map((o) => o.price).filter((p): p is number => typeof p === "number");
    const lowestPrice = prices.length ? Math.min(...prices) : null;
    const blob = [w.displayTitle, w.brand, w.category].filter(Boolean).join(" ");
    const catalogStyle = vineCatalogStyleFromBlob(blob);
    return {
      slug: w.slug,
      displayTitle: w.displayTitle,
      brand: w.brand,
      merchantCount: w.offers.length,
      lowestPrice,
      image: w.image ?? null,
      catalogStyle,
    };
  });

  const featured: VineFeaturedWine[] = summaries
    .filter((s): s is WineSummary & { image: string } => Boolean(s.image))
    .slice(0, 8);

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin-katalog", url: PAGE_URL },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((b) => ({ name: b.name, url: b.url }))}
      />
      <CollectionPageJsonLd
        name="Vin-katalog — priser på tværs af forhandlere"
        description="Sammenlign pris og find link til danske vinforhandlere."
        url={PAGE_URL}
        items={summaries.slice(0, 500).map((s) => ({
          name: s.displayTitle,
          url: `${siteUrl}/vine/${s.slug}`,
        }))}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vine", label: "Vin-katalog" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Vin-katalog</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-700">
        Sammenlign priser og find link videre til danske vinforhandlere — ét samlet overblik.
      </p>
      <p className="mt-4 text-sm text-stone-500">
        Opdateret {new Date(catalog.generatedAt).toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" })} ·{" "}
        {catalog.wines.length.toLocaleString("da-DK")} vine
      </p>

      <PartnerAdsLeaderboard className="mt-10" hub="vine-katalog" placement="vine-catalog-hub" />

      {featured.length > 0 ? <VineFeaturedStrip wines={featured} /> : null}

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
