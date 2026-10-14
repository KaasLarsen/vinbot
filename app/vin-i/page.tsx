import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, CollectionPageJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { getAllChains } from "@/lib/supermarket/chains";
import { chainH1, indexMetaTitle } from "@/lib/supermarket/freshness";
import { siteUrl } from "@/lib/site";

const PAGE_DESCRIPTION =
  "Bedste vin i Netto, Føtex, Bilka, Rema 1000, Lidl og Coop. Hylde-råd opdateret hver måned — og samme stil online, hvis butikken er udsolgt.";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const title = indexMetaTitle();
  const url = `${siteUrl}/vin-i`;
  return {
    title,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: PAGE_DESCRIPTION,
      url,
      type: "website",
    },
  };
}

export default function VinIIndexPage() {
  const chains = getAllChains();
  const title = indexMetaTitle();
  const url = `${siteUrl}/vin-i`;

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vin i supermarkedet", url },
        ]}
      />
      <CollectionPageJsonLd
        name={title}
        description={PAGE_DESCRIPTION}
        url={url}
        items={chains.map((chain) => ({
          name: chainH1(chain.name),
          url: `${siteUrl}/vin-i/${chain.slug}`,
        }))}
      />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vin-i", label: "Vin i supermarkedet" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-stone-700">
        Én side pr. kæde. Den siger, hvad du går efter på hylden lige nu — og viser samme stil online, hvis flasken er
        udsolgt. Vi sælger ikke kædernes vin, og vi viser ikke deres hyldepriser.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chains.map((chain) => (
          <li key={chain.slug}>
            <Link
              href={`/vin-i/${chain.slug}`}
              className="block h-full rounded-2xl border border-stone-200 bg-white p-5 hover:border-rose-300"
            >
              <span className="text-lg font-semibold text-stone-900">{chainH1(chain.name)}</span>
              <span className="mt-2 block text-sm leading-relaxed text-stone-600">{chain.teaser}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-stone-600">
        De længere hyldeguides ligger på{" "}
        <Link href="/supermarked-vin" className="font-medium text-rose-900 hover:underline">
          vin i supermarkedet
        </Link>
        .
      </p>
    </PageShell>
  );
}
