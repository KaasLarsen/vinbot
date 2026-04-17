/** AdSense er aktivt når begge env-variabler er sat (build-time). */
export function isAdsenseEnabled(): boolean {
  return (
    process.env.NEXT_PUBLIC_ADSENSE_ACTIVE === "true" && Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim())
  );
}

export function getAdsenseClientId(): string {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "";
}
