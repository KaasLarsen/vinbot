"use client";

import type { ReactNode } from "react";

import { MerchantAffiliateOutboundLink } from "@/components/merchant-affiliate-outbound-link";

/** DSF-outbound er redaktionelt (direct link) — se MerchantAffiliateOutboundLink. */
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
