"use client";

import type { ReactNode } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";
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
  const baseHref = merchantPartnerAdsClickUrl(merchantId, clean);
  const href = usePartnerAdsHref(baseHref);

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
