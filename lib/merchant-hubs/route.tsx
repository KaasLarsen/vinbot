import type { Metadata } from "next";
import { getMerchantHub } from "@/lib/merchant-hubs";
import { siteUrl } from "@/lib/site";
import { MerchantHubPage } from "@/components/merchant-hub-page";

export const dynamic = "force-dynamic";

function hubOrThrow(slug: string) {
  const hub = getMerchantHub(slug);
  if (!hub) throw new Error(`Missing merchant hub config: ${slug}`);
  return hub;
}

export function merchantHubMetadata(slug: string): Metadata {
  const hub = hubOrThrow(slug);
  return {
    title: hub.title,
    description: hub.description,
    alternates: { canonical: `${siteUrl}/${hub.slug}` },
    openGraph: {
      url: `${siteUrl}/${hub.slug}`,
      title: hub.title,
      description: hub.description,
    },
  };
}

export function MerchantHubRoute({ slug }: { slug: string }) {
  return <MerchantHubPage hub={hubOrThrow(slug)} />;
}
