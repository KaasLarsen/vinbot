"use client";

import type { ReactNode } from "react";

import { MerchantAffiliateOutboundLink } from "@/components/merchant-affiliate-outbound-link";

/** Alle klik ud til densidsteflaske.dk skal igennem Partner-Ads banner 68720. */
export function DsfAffiliateOutboundLink({
  productUrl,
  placement,
  className,
  children,
  slug,
}: {
  productUrl: string;
  placement: string;
  className?: string;
  children: ReactNode;
  slug?: string;
}) {
  return (
    <MerchantAffiliateOutboundLink
      merchantId="den-sidste-flaske"
      productUrl={productUrl}
      placement={placement}
      className={className}
      slug={slug}
    >
      {children}
    </MerchantAffiliateOutboundLink>
  );
}
