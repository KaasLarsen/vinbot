"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/** Opdaterer page_path ved klient-navigation (App Router). */
function GaRouteTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.toString();
    const pagePath = q ? `${pathname}?${q}` : pathname;
    if (typeof window.gtag === "function") {
      window.gtag("config", measurementId, { page_path: pagePath });
    }
  }, [pathname, searchParams, measurementId]);

  return null;
}

/**
 * Google Analytics 4 — kræver NEXT_PUBLIC_GA_MEASUREMENT_ID (fx G-XXXXXXXX).
 * Indlæses kun når variablen er sat.
 */
export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="vinbot-ga4" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: true });
        `.trim()}
      </Script>
      <Suspense fallback={null}>
        <GaRouteTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}
