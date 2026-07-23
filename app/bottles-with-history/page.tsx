import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const dynamic = "force-dynamic";

const SLUG = "bottles-with-history" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function BottlesWithHistoryPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
