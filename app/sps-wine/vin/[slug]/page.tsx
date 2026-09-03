import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WineDetailPageView } from "@/components/wine-detail-page";
import { getSpsPlaItemBySlug } from "@/lib/pla/catalog";
import { decodePlaSlugParam } from "@/lib/pla/slug";
import { spsPlaItemToWineDetail } from "@/lib/pla/to-wine-detail";
import { wineDetailPagePath } from "@/lib/wine-detail-pages/merchants";
import { siteUrl } from "@/lib/site";

export const revalidate = 21600;
export const dynamicParams = true;

export async function generateStaticParams() {
  return [];
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodePlaSlugParam(rawSlug);
  const item = await getSpsPlaItemBySlug(slug);
  if (!item) return { title: "Vin ikke fundet | Vinbot" };
  const wine = spsPlaItemToWineDetail(item);
  const url = `${siteUrl}${wineDetailPagePath("sps-wine", wine.slug)}`;
  const title = `${wine.displayTitle} | SPS Wine · Vinbot`;
  return {
    title,
    description: wine.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description: wine.metaDescription,
      ...(item.imageUrl ? { images: [{ url: item.imageUrl, alt: wine.displayTitle }] } : {}),
    },
  };
}

export default async function SpsWineProductPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodePlaSlugParam(rawSlug);
  const item = await getSpsPlaItemBySlug(slug);
  if (!item) notFound();
  return <WineDetailPageView wine={spsPlaItemToWineDetail(item)} />;
}
