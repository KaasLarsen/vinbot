export type FeedConfig = { merchant: string; url: string };

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
  {
    merchant: "Bottles With History",
    url: "https://daisycon.io/datafeed/?media_id=399526&standard_id=4&language_code=da&locale_id=11&type=xml&program_id=20114&html_transform=none&rawdata=false&encoding=utf8&general=false",
  },
  {
    merchant: "Wine Store",
    url: "https://daisycon.io/datafeed/?media_id=399526&standard_id=1&language_code=da&locale_id=11&type=xml&program_id=20108&html_transform=none&rawdata=false&encoding=utf8&general=false",
  },
];
