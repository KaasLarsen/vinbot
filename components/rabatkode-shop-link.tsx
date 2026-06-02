"use client";

import type { ReactNode } from "react";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";

export function RabatkodeShopLink({
  href,
  merchant,
  children,
  className,
}: {
  href: string;
  merchant: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AffiliateTrackedLink
      href={href}
      merchant={merchant}
      placement="rabatkoder-shop"
      slug="rabatkoder"
      className={className}
    >
      {children}
    </AffiliateTrackedLink>
  );
}
