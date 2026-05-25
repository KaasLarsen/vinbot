"use client";

import type { ReactNode } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig, merchantPartnerAdsClickUrl } from "@/lib/wine-detail-pages/merchants";

const linkRel = "nofollow sponsored noopener noreferrer";

export function MerchantAffiliateOutboundLink({
  merchantId,
  productUrl,
  placement,
  className,
  children,
  slug,
}: {
  merchantId: MerchantWineId;
  productUrl: string;
  placement: string;
  className?: string;
  children: ReactNode;
  slug?: string;
}) {
  const cfg = getMerchantWineConfig(merchantId);
  const clean = cfg.sanitizeProductUrl(productUrl);
  const href = merchantPartnerAdsClickUrl(merchantId, clean);

  function onClick() {
    trackAffiliateClick({
      merchant: cfg.displayName,
      placement,
      slug: slug ?? "",
      url: href,
    });
  }

  return (
    <a href={href} target="_blank" rel={linkRel} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
