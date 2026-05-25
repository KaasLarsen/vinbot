import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WineDetailPageView } from "@/components/wine-detail-page";
import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig, wineDetailPagePath } from "@/lib/wine-detail-pages/merchants";
import { getWineDetailPage, listWineDetailSlugsForMerchant } from "@/lib/wine-detail-pages/registry";
import { siteUrl } from "@/lib/site";

export const WINE_DETAIL_REVALIDATE = 21600;

export function createWineDetailRoute(merchantId: MerchantWineId) {
  type Props = { params: Promise<{ slug: string }> };
  const cfg = getMerchantWineConfig(merchantId);

  function generateStaticParams() {
    return listWineDetailSlugsForMerchant(merchantId).map((slug) => ({ slug }));
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const wine = getWineDetailPage(merchantId, slug);
    if (!wine) return { title: "Vin ikke fundet | Vinbot" };
    const url = `${siteUrl}${wineDetailPagePath(merchantId, wine.slug)}`;
    const title = `${wine.displayTitle} | ${cfg.displayName} · Vinbot`;
    const ogCandidates = [...(wine.imageUrl != null ? [wine.imageUrl] : []), ...(wine.additionalGalleryImageUrls ?? [])];
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

  async function WineDetailRoutePage({ params }: Props) {
    const { slug } = await params;
    const wine = getWineDetailPage(merchantId, slug);
    if (!wine) notFound();
    return <WineDetailPageView wine={wine} />;
  }

  return {
    revalidate: WINE_DETAIL_REVALIDATE,
    generateStaticParams,
    generateMetadata,
    default: WineDetailRoutePage,
  };
}
