import type { FeedTier } from "@/lib/feeds/config";

/** Synlig label for gratis butikker (ingen udgående shop-link). */
export const FREE_TIER_LABEL = "Ikke samarbejdspartner";

/** Gratis butikker vises i søgning, men uden klik videre til shoppen. */
export function canProductOutbound(tier: FeedTier | undefined): boolean {
  return tier !== "free";
}

/** Affiliate/betalende: sponsored. Gratis butikker: kun nofollow (hvis der alligevel findes et link). */
export function productOutboundRel(tier: FeedTier | undefined): string {
  return tier === "free" ? "nofollow noopener noreferrer" : "nofollow sponsored noopener noreferrer";
}
