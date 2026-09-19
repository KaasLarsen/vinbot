"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { trackAffiliateClick } from "@/lib/affiliate-track";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  href: string;
  merchant: string;
  placement: string;
  slug?: string;
  hub?: string;
  children: ReactNode;
};

/** Udgående affiliate-link med GA4 `affiliate_click` og sessionens Partner-Ads uid. */
export function AffiliateTrackedLink({
  href: hrefProp,
  merchant,
  placement,
  slug = "",
  hub = "",
  children,
  target = "_blank",
  rel = "nofollow sponsored noopener noreferrer",
  ...rest
}: Props) {
  const href = usePartnerAdsHref(hrefProp);

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={() => trackAffiliateClick({ merchant, placement, slug, hub, url: href })}
      {...rest}
    >
      {children}
    </a>
  );
}
