export type FeedConfig = {
  merchant: string;
  url: string;
  /**
   * true (standard): kun produkter der matcher `isWineLike` (typisk flasker).
   * false: hele feedet — til udstyr/kategorier der ellers filtreres fra (fx vinkøleskabe); produktlinks skal stadig være tracked i feedet (fx Adtraction).
   */
  wineFilter?: boolean;
  /**
   * Når `wineFilter: false` og listen er sat: kun produkter hvor titel+beskrivelse+kategori+brand (normaliseret)
   * indeholder mindst ét af ordene — typisk vin + tilbehør (glas, karaffel, proptrækker m.m.).
   */
  vinAdjacentIncludeAny?: string[];
  /**
   * Valgfrit: kassér rækker der matcher mindst ét af disse ord (efter include), fx smykker eller ikke-vins glas.
   */
  vinAdjacentExcludeAny?: string[];
};

export const FEEDS: FeedConfig[] = [
  { merchant: "Mere om Vin", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182" },
  { merchant: "Winther Vin", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766" },
  { merchant: "Vinea", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767" },
  { merchant: "Barlife", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=46609&feedid=651" },
  { merchant: "DH Wines", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=108173&feedid=3461" },
  { merchant: "D’Wine", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=92927&feedid=2455" },
  { merchant: "Gourmetshoppen", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=80950&feedid=1925" },
  { merchant: "Johnsen Vine", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=114732&feedid=4073" },
  { merchant: "SPS Wine", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=112662&feedid=3860" },
  { merchant: "Westjysk Smag", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=91648&feedid=2398" },
  { merchant: "Winesommelier", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=114219&feedid=4021" },
  { merchant: "Lauridsen Vine", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=116085&feedid=4230" },
  {
    merchant: "LforLiving.dk",
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=47209&feedid=664",
    wineFilter: false,
    vinAdjacentIncludeAny: [
      "vinglas",
      "champagneglas",
      "rødvinsglas",
      "hvidvinsglas",
      "roséglas",
      "karaffel",
      "dekanter",
      "decanter",
      "proptrækker",
      "korkskrue",
      "oplukker til vin",
      "vinæske",
      "vinæser",
      "vinskænk",
      "vinkøler",
      "vinholder",
      "aerator",
      "champagnekøler",
      "vin tilbehør",
      "matrivo glas",
    ],
    vinAdjacentExcludeAny: [
      "ørering",
      "smykker",
      "armbånd",
      "halskæde",
      "cocktailglas",
      "highball",
      "whiskyglas",
      "whiskeyglas",
      "ølglas",
      "snapseglas",
      "martiniglas",
      "krus",
      "kop til",
    ],
  },
  { merchant: "Winefriends", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=115348&feedid=4162" },
  { merchant: "Whiskystack", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=105231&feedid=3220" },
  { merchant: "Beer Me", url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=74625&feedid=1666" },
  {
    merchant: "Vinkøleskabet.dk",
    url: "https://adtraction.com/productfeed.htm?type=feed&format=XML&encoding=UTF8&epi=0&zip=0&cdelim=tab&tdelim=singlequote&sd=0&sn=0&flat=0&apid=1954033179&asid=2022448293&gsh=1&pfid=2796&gt=0",
    wineFilter: false,
  },
  {
    merchant: "Bottles With History",
    url: "https://daisycon.io/datafeed/?media_id=399526&standard_id=4&language_code=da&locale_id=11&type=xml&program_id=20114&html_transform=none&rawdata=false&encoding=utf8&general=false",
  },
  {
    merchant: "Wine Store",
    url: "https://daisycon.io/datafeed/?media_id=399526&standard_id=1&language_code=da&locale_id=11&type=xml&program_id=20108&html_transform=none&rawdata=false&encoding=utf8&general=false",
  },
];
