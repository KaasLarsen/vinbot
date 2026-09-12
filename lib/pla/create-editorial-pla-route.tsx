import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WineDetailPageView } from "@/components/wine-detail-page";
import { getSalePlaItemBySlug } from "@/lib/pla/catalog";
import { decodePlaSlugParam } from "@/lib/pla/slug";
import { plaItemToWineDetail } from "@/lib/pla/to-wine-detail";
import type { PlaMerchantId } from "@/lib/pla/types";
import { getMerchantWineConfig, wineDetailPagePath } from "@/lib/wine-detail-pages/merchants";
import { getWineDetailPage, listWineDetailSlugsForMerchant } from "@/lib/wine-detail-pages/registry";
import { siteUrl } from "@/lib/site";

type SalePlaMerchantId = Exclude<PlaMerchantId, "sps-wine">;

export function createPlaEditorialWineDetailRoute(merchantId: SalePlaMerchantId) {
  const cfg = getMerchantWineConfig(merchantId);
  type Props = { params: Promise<{ slug: string }> };

  async function resolveWine(rawSlug: string) {
    const slug = decodePlaSlugParam(rawSlug);
    const editorial = getWineDetailPage(merchantId, slug);
    if (editorial) return { wine: editorial, imageUrl: editorial.imageUrl };
    const item = await getSalePlaItemBySlug(merchantId, slug);
    if (!item) return null;
    return { wine: plaItemToWineDetail(item), imageUrl: item.imageUrl };
  }

  function generateStaticParams() {
    return listWineDetailSlugsForMerchant(merchantId).map((slug) => ({ slug }));
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
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

  async function Page({ params }: Props) {
    const { slug } = await params;
    const resolved = await resolveWine(slug);
    if (!resolved) notFound();
    return <WineDetailPageView wine={resolved.wine} />;
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: Page,
  };
}
