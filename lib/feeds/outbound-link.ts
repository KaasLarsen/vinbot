import type { FeedTier } from "@/lib/feeds/config";

/** Affiliate/betalende: sponsored. Gratis butikker: kun nofollow. */
export function productOutboundRel(tier: FeedTier | undefined): string {
  return tier === "free" ? "nofollow noopener noreferrer" : "nofollow sponsored noopener noreferrer";
}
