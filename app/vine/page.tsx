import Link from "next/link";
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
    "Vinbots vin-katalog samler vin fra danske netbutiks-feeds, så du kan sammenligne priser og åbne den shop, du vil handle hos — med redaktionel kontekst om Vinbots rolle som mellemled og journalistiske kerne på vinbot.dk (guides til mad og vin). Priser og tilbud kan ændre sig; dobbelttjek altid hos forhandleren.",
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
        description="Vinbots vin-katalog samler vin fra udvalgte danske netbutiks-feeds til prissammenligning og kontekst om Vinbots rolle som mellemled — ikke webshop; guides til mad og vin findes separat på vinbot.dk."
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

      <section className="mt-10 max-w-3xl space-y-4 border-l-4 border-rose-200 pl-5 text-[0.9375rem] leading-relaxed text-stone-700">
        <h2 className="text-lg font-semibold text-stone-900">Sådan skal du læse vin-kataloget</h2>
        <p>
          Vin-kataloget er et praktisk indeks oven på åbne produkt-feeds fra udvalgte danske vinforhandlere — ikke et selvstændigt magasin og ikke Vinbots egen webshop.
          Vi forsøger at koble samme vin på tværs af listninger (GTIN eller stabil titel-match), så du slipper for at kopiere titler mellem faner.
          Vinbots journalistiske hjerte findes primært i de dedikerede guides om mad og vin — du finder dem via menuen eller på forsiden.
        </p>
        <p>
          Hvis du vil vide, hvordan vi arbejder med kilder, affiliate-markering og ansvar over for læserne, kan du læse siden{" "}
          <Link href="/redaktionel-proces" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            Redaktionel proces
          </Link>
          . Købsaftalen er altid mellem dig og den forhandler, du klikker ind til — priser og lager kan ændre sig efter sidste opdatering.
        </p>
      </section>

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
