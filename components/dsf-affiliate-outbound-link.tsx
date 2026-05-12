"use client";

import type { ReactNode } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { sanitizeDsfProductUrl } from "@/lib/dsf-product-url";
import { partnerAdsDsfClickUrl } from "@/lib/site";

const linkRel = "nofollow sponsored noopener noreferrer";

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
  const clean = sanitizeDsfProductUrl(productUrl);
  const href = partnerAdsDsfClickUrl(clean);

  function onClick() {
    trackAffiliateClick({
      merchant: "Den Sidste Flaske",
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
