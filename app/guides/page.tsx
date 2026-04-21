import type { Metadata } from "next";
import Link from "next/link";
import { GuideHubBrowser } from "@/components/guide-hub-browser";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Alle vin-guides — søg og filtrér";
const PAGE_DESCRIPTION =
  "Find vin til mad, druesorter og begreber: søg på tværs af alle Vinbot-guides, eller filtrér efter vin til retter, druer og overblik.";
const PAGE_URL = `${siteUrl}/guides`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function GuidesIndexPage() {
  const guides = listGuides();
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
    { name: "Guides", url: PAGE_URL },
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
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/guides", label: "Guides" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Alle guides</h1>
      <p className="mt-4 max-w-3xl text-lg text-stone-700">
        Søg på tværs af <strong className="font-medium text-stone-800">vin til mad</strong>,{" "}
        <strong className="font-medium text-stone-800">druesorter</strong> og{" "}
        <strong className="font-medium text-stone-800">begreber</strong>. Brug kategorierne til hurtigt at indsnævre listen — eller hop til{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad &amp; vin
        </Link>
        ,{" "}
        <Link href="/humoer-og-vin" className="text-rose-900 hover:underline">
          humør &amp; stemning
        </Link>{" "}
        og{" "}
        <Link href="/saeson" className="text-rose-900 hover:underline">
          sæson
        </Link>{" "}
        for kuraterede udvalg.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        Godt sted at starte:{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          komplet guide til vin og mad
        </Link>
        .
      </p>

      <section className="mt-10">
        <GuideHubBrowser guides={cards} showKindTabs showTagChips tagMinCount={2} />
      </section>
    </div>
  );
}
