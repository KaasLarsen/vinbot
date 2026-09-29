"use client";

import type { ReactNode } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";
import type { MerchantWineId } from "@/lib/wine-detail-pages/merchants";
import { getMerchantWineConfig, merchantOutboundClickUrl } from "@/lib/wine-detail-pages/merchants";

const affiliateLinkRel = "nofollow sponsored noopener noreferrer";
const editorialLinkRel = "nofollow noopener noreferrer";

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
  const outboundHref = merchantOutboundClickUrl(merchantId, clean);
  const trackedHref = usePartnerAdsHref(cfg.usesPartnerAdsAffiliate ? outboundHref : clean);
  const href = cfg.usesPartnerAdsAffiliate ? trackedHref : clean;

  function onClick() {
    if (!cfg.usesPartnerAdsAffiliate) return;
    trackAffiliateClick({
      merchant: cfg.displayName,
      placement,
      slug: slug ?? "",
      url: href,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel={cfg.usesPartnerAdsAffiliate ? affiliateLinkRel : editorialLinkRel}
      className={className}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
