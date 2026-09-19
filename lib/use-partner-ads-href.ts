"use client";

import { useEffect, useState } from "react";

import {
  capturePartnerAdsTrafficUidFromSearch,
  withPartnerAdsTrafficUid,
} from "@/lib/partner-ads-traffic-uid";

/**
 * Returnér Partner-Ads-href med sessionens uid (vinbot / vinbot-google).
 * SSR og første paint bruger input-href; efter mount opdateres uid fra session.
 * Kalder også capture på nuværende URL, så vi ikke taber race mod layout-capture.
 */
export function usePartnerAdsHref(href: string): string {
  const [out, setOut] = useState(href);

  useEffect(() => {
    capturePartnerAdsTrafficUidFromSearch(window.location.search);
    setOut(withPartnerAdsTrafficUid(href));
  }, [href]);

  return out;
}
