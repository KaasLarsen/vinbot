import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const revalidate = 21600;

const SLUG = "winesommelier" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function WinesommelierPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
