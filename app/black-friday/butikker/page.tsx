import type { Metadata } from "next";

import { BlackFridayStoreGrid } from "@/components/black-friday-store-grid";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { listBlackFridayStores } from "@/lib/black-friday/store-directory";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Black Friday vinbutikker — overblik over det danske vinmarked";
const PAGE_DESCRIPTION =
  "Se danske vinforhandlere samlet ét sted. Live-links og verificerede priser gælder kun partnere — resten vises i oversigten uden eksternt link.";
const PAGE_URL = `${siteUrl}/black-friday/butikker`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    locale: "da_DK",
    type: "website",
  },
};

export default function BlackFridayStoresPage() {
  const stores = listBlackFridayStores();
  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Black Friday vin", url: `${siteUrl}/black-friday` },
    { name: "Butikker", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <CollectionPageJsonLd
        name={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        url={PAGE_URL}
        items={stores
          .filter((s) => s.partner)
          .map((s) => ({ name: s.displayName, url: s.href ?? PAGE_URL }))}
      />

      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/black-friday", label: "Black Friday" },
          { href: "/black-friday/butikker", label: "Butikker" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-800/90">Black Friday 2026</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Danske vinbutikker i ét overblik
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Vinbot sælger ikke vin. Vi samler forhandlerne, så du kan se markedet samlet. Klikbare logoer går videre til
          partnere med prissamarbejde. Øvrige butikker er med i indekset, men uden eksternt link.
        </p>
      </header>

      <div className="mt-12">
        <BlackFridayStoreGrid stores={stores} />
      </div>
    </PageShell>
  );
}
