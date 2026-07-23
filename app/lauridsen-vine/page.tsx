import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const dynamic = "force-dynamic";

const SLUG = "lauridsen-vine" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function LauridsenVinePage() {
  return <MerchantHubRoute slug={SLUG} />;
}
