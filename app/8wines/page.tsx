import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const revalidate = 21600;

const SLUG = "8wines" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function EightWinesPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
