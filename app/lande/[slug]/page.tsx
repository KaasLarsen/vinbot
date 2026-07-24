import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandPage } from "@/components/land-page";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { getAllLande, getLand } from "@/lib/lande/registry";
import { siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllLande().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const land = getLand(slug);
  if (!land) return { title: "Vinland" };
  const url = `${siteUrl}/lande/${land.slug}`;
  return {
    title: land.title,
    description: land.description,
    alternates: { canonical: url },
    openGraph: {
      title: land.title,
      description: land.description,
      url,
      type: "website",
    },
  };
}

export default async function LandDetailPage({ params }: Props) {
  const { slug } = await params;
  const land = getLand(slug);
  if (!land) notFound();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vinlande", url: `${siteUrl}/lande` },
          { name: land.displayName, url: `${siteUrl}/lande/${land.slug}` },
        ]}
      />
      <LandPage land={land} />
    </>
  );
}
