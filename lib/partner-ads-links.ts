/** Partner-Ads publisher (Vinbot). */
export const PARTNER_ADS_PARTNER_ID = "50537";

/**
 * Standard klik-URL til Partner-Ads. Brug `htmlurl` kun når banner-typen understøtter dyb link (tjek i Partner-Ads).
 * Feed-URL'er (feed_udlaes.php) må ikke bruges som brugerlinks.
 */
export function partnerAdsKlikUrl(bannerId: string, htmlUrl?: string): string {
  const u = new URL("https://www.partner-ads.com/dk/klikbanner.php");
  u.searchParams.set("partnerid", PARTNER_ADS_PARTNER_ID);
  u.searchParams.set("bannerid", bannerId.trim());
  if (htmlUrl?.trim()) {
    u.searchParams.set("htmlurl", htmlUrl.trim());
  }
  return u.toString();
}

/**
 * Klikbanner-id'er der matcher jeres feeds / eksisterende integration.
 * Verificér tracking i Partner-Ads ved tvivl — især Beer Me (74589 er også brugt til abonnement).
 */
export const PARTNER_ADS_KLIK_BANNERS = {
  /** Mere om Vin — samme banner som produktfeed */
  mereOmVin: "87611",
  /** Johnsen Wine (“Johnsen Vine” i feed) */
  johnsenWine: "114732",
  /**
   * Beer Me — kendt fra footer (ølabonnement). Med htmlurl til forsiden for nyhedsbrev/butik;
   * hvis klik ikke tæller eller lander forkert: opret dedikeret tekstbanner i Partner-Ads og skift id her.
   */
  beerMe: "74589",
  /** Winther Vin — samme banner som produktfeed */
  wintherVin: "76708",
} as const;
