"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { capturePartnerAdsTrafficUidFromSearch } from "@/lib/partner-ads-traffic-uid";

function PartnerAdsTrafficCaptureInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams?.toString() ? `?${searchParams.toString()}` : window.location.search;
    capturePartnerAdsTrafficUidFromSearch(search);
  }, [pathname, searchParams]);

  return null;
}

/**
 * Gemmer Google Ads / PLA-attribution i sessionStorage, så senere Partner-Ads-klik
 * kan få uid=vinbot-google — også efter navigation på Vinbot.
 */
export function PartnerAdsTrafficCapture() {
  return (
    <Suspense fallback={null}>
      <PartnerAdsTrafficCaptureInner />
    </Suspense>
  );
}
