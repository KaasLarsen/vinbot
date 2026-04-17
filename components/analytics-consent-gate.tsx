"use client";

import { GoogleAnalytics } from "@/components/google-analytics";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

type Props = { measurementId: string };

/** Indlæser GA4 kun når brugeren har valgt &quot;Accepter&quot; (all). */
export function AnalyticsConsentGate({ measurementId }: Props) {
  const allowAnalytics = useMarketingConsent();
  if (!allowAnalytics) return null;
  return <GoogleAnalytics measurementId={measurementId} />;
}
