import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WineDetailPageView } from "@/components/wine-detail-page";
import { getDhPlaItemBySlug } from "@/lib/pla/catalog";
import { decodePlaSlugParam } from "@/lib/pla/slug";
import { plaItemToWineDetail } from "@/lib/pla/to-wine-detail";
import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig, wineDetailPagePath } from "@/lib/wine-detail-pages/merchants";
import { getWineDetailPage, listWineDetailSlugsForMerchant } from "@/lib/wine-detail-pages/registry";
import { siteUrl } from "@/lib/site";

const merchantId: MerchantWineId = "dh-wines";
const cfg = getMerchantWineConfig(merchantId);

export const revalidate = 21600;
export const dynamicParams = true;

export function generateStaticParams() {
  return listWineDetailSlugsForMerchant(merchantId).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

async function resolveWine(rawSlug: string) {
  const slug = decodePlaSlugParam(rawSlug);
  const editorial = getWineDetailPage(merchantId, slug);
  if (editorial) return { wine: editorial, imageUrl: editorial.imageUrl };
  const item = await getDhPlaItemBySlug(slug);
  if (!item) return null;
  return { wine: plaItemToWineDetail(item), imageUrl: item.imageUrl };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolved = await resolveWine(slug);
  if (!resolved) return { title: "Vin ikke fundet | Vinbot" };
  const { wine } = resolved;
  const url = `${siteUrl}${wineDetailPagePath(merchantId, wine.slug)}`;
  const primary = wine.metaTitle ?? wine.displayTitle;
  const title = `${primary} | ${cfg.displayName} · Vinbot`;
  const ogCandidates = [
    ...(resolved.imageUrl != null ? [resolved.imageUrl] : []),
    ...(wine.additionalGalleryImageUrls ?? []),
  ];
  const ogImages =
    ogCandidates.length > 0
      ? ogCandidates.slice(0, 6).map((u) => ({ url: u, alt: wine.displayTitle }))
      : undefined;
  return {
    title,
    description: wine.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description: wine.metaDescription,
      ...(ogImages ? { images: ogImages } : {}),
    },
  };
}

export default async function DhWinesProductPage({ params }: Props) {
  const { slug } = await params;
  const resolved = await resolveWine(slug);
  if (!resolved) notFound();
  return <WineDetailPageView wine={resolved.wine} />;
}
