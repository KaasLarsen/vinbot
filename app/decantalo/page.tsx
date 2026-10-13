import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const revalidate = 21600;

const SLUG = "decantalo" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function DecantaloPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
