import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const dynamic = "force-dynamic";

const SLUG = "vindien" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function VindienPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
