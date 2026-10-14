import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupermarketChainPage } from "@/components/supermarket-chain-page";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { getAllChains, getChain } from "@/lib/supermarket/chains";
import { chainH1, chainMetaDescription, chainMetaTitle } from "@/lib/supermarket/freshness";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 86400;

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllChains().map((chain) => ({ slug: chain.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const chain = getChain(slug);
  if (!chain) return { title: "Vin i supermarkedet" };
  const title = chainMetaTitle(chain.name);
  const description = chainMetaDescription(chain.descriptionTemplate);
  const url = `${siteUrl}/vin-i/${chain.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
  };
}

export default async function VinIChainPage({ params }: Props) {
  const { slug } = await params;
  const chain = getChain(slug);
  if (!chain) notFound();

  const title = chainH1(chain.name);
  const description = chainMetaDescription(chain.descriptionTemplate);
  const url = `${siteUrl}/vin-i/${chain.slug}`;

  return (
    <>
      <WebPageJsonLd name={title} description={description} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vin i supermarkedet", url: `${siteUrl}/vin-i` },
          { name: chain.name, url },
        ]}
      />
      <FaqJsonLd items={chain.faq} />
      <SupermarketChainPage chain={chain} />
    </>
  );
}
