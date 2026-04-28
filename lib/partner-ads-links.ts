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
 * Verificér tracking i Partner-Ads ved tvivl — Beer Me: 74589 (abonnement/footer), 74625 (shop/feed).
 */
export const PARTNER_ADS_KLIK_BANNERS = {
  /** Mere om Vin — samme banner som produktfeed */
  mereOmVin: "87611",
  /** Johnsen Wine (“Johnsen Vine” i feed) */
  johnsenWine: "114732",
  /**
   * Beer Me — footer / ølabonnement (produktfeed og shop-klik bruger `beerMeShop`).
   */
  beerMe: "74589",
  /** Beer Me — webshop / produktfeed (samme banner som feed_udlaes) */
  beerMeShop: "74625",
  /** Whiskystack — samme banner som produktfeed */
  whiskystack: "105231",
  /** Winther Vin — samme banner som produktfeed */
  wintherVin: "76708",
  /** Lauridsen Vine — samme banner som produktfeed */
  lauridsenVine: "116085",
  /** Winefriends — samme banner som produktfeed */
  winefriends: "115348",
  /** DH Wines — samme banner som produktfeed */
  dhWines: "108173",
  /** SPS Wine — samme banner som produktfeed */
  spsWine: "112662",
  /** LforLiving.dk — vinglas m.m.; feed filtreres til vin/vintilbehør (smykker m.m. indgår ikke i søgning). */
  lforLiving: "47209",
  /**
   * RareWine Members Club — kun klikbanner (intet produktfeed / intet visbanner i programmet).
   * Brug altid `htmlurl`: Partner-Ads’ standard-redirect rammer `/da/members-club/`, som pt. giver 404;
   * `https://www.rarewine.com/members-club/` returnerer 200 og tilføjer paid/utm ved klik.
   */
  rareWineMembersClub: "114954",
} as const;

/** Landingsside RareWine Members Club (engelsk sti — dansk `/da/…` er 404 pr. apr. 2026). */
export const RAREWINE_MEMBERS_CLUB_LANDING = "https://www.rarewine.com/members-club/";
