import type { Metadata } from "next";
import { MerchantHubRoute, merchantHubMetadata } from "@/lib/merchant-hubs/route";

export const dynamic = "force-dynamic";

const SLUG = "quierovinos" as const;

export const metadata: Metadata = merchantHubMetadata(SLUG);

export default function QuieroVinosPage() {
  return <MerchantHubRoute slug={SLUG} />;
}
