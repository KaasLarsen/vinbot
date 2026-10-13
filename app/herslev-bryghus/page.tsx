import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const dynamic = "force-dynamic";

const SLUG = "herslev-bryghus" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function HerslevBryghusPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
