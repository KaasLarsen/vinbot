"use client";

import type { ReactNode } from "react";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";

export function RabatkodeShopLink({
  href,
  merchant,
  children,
  className,
  placement = "rabatkoder-shop",
}: {
  href: string;
  merchant: string;
  children: ReactNode;
  className?: string;
  placement?: string;
}) {
  return (
    <AffiliateTrackedLink
      href={href}
      merchant={merchant}
      placement={placement}
      slug="rabatkoder"
      className={className}
    >
      {children}
    </AffiliateTrackedLink>
  );
}
