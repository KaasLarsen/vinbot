"use client";

import type { ReactNode } from "react";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";

type Props = {
  href: string;
  merchant: string;
  slug: string;
  children: ReactNode;
  className?: string;
};

/** «Besøg shop» på forhandler-hub med GA4 `merchant-hub-shop`. */
export function MerchantHubShopLink({ href, merchant, slug, children, className }: Props) {
  return (
    <AffiliateTrackedLink
      href={href}
      merchant={merchant}
      placement="merchant-hub-shop"
      slug={slug}
      className={className}
    >
      {children}
    </AffiliateTrackedLink>
  );
}
