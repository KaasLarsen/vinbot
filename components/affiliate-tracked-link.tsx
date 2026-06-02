"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { trackAffiliateClick } from "@/lib/affiliate-track";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  href: string;
  merchant: string;
  placement: string;
  slug?: string;
  hub?: string;
  children: ReactNode;
};

/** Udgående affiliate-link med GA4 `affiliate_click`. */
export function AffiliateTrackedLink({
  href,
  merchant,
  placement,
  slug = "",
  hub = "",
  children,
  target = "_blank",
  rel = "nofollow sponsored noopener noreferrer",
  ...rest
}: Props) {
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
