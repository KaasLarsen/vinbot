import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const revalidate = 21600;

const SLUG = "lovegaarden" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function LovegaardenPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
