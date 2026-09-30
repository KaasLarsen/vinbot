"use client";

import { useState, type ReactNode } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";

export function RabatkodeCopyGoLink({
  href,
  merchant,
  code,
  placement = "home-rabatkoder-copy",
  className,
  children,
}: {
  href: string;
  merchant: string;
  code: string;
  placement?: string;
  className?: string;
  children?: ReactNode;
}) {
  const resolvedHref = usePartnerAdsHref(href);
  const [copied, setCopied] = useState(false);

  return (
    <a
      href={resolvedHref}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      className={className}
      onClick={() => {
        trackAffiliateClick({
          merchant,
          placement,
          slug: "rabatkoder",
          url: resolvedHref,
        });
        void navigator.clipboard.writeText(code).then(
          () => {
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          },
          () => {
            /* clipboard kan fejle uden https/permission — shop åbner stadig */
          },
        );
      }}
    >
      {copied ? "Kopieret — åbner shop *" : (children ?? "Kopiér kode & shop *")}
    </a>
  );
}
