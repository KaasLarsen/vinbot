/**
 * Adtraction tracking-URL'er fra partner.
 * Shop- og kampagne-links skal bruge de URL'er, partner stiller til rådighed.
 */
export const ADTRACTION_VINKOELSKABET_SHOP = "https://adtr.co/wxe7tp";

/**
 * KitchenOne DK (olier, køkkenudstyr) kører kun på Adtraction — program 1577686423.
 * Vi har endnu ikke et godkendt publisher-deeplink/feed i repoet, så olier
 * vises via kuraterede PriceRunner-widgets (KitchenOne kan optræde som shop dér).
 * Når kanalen er godkendt: tilføj tracked shop-URL her og evt. feed i lib/feeds/config.ts
 * med wineFilter: false + stramt include (olivenolie/trøffelolie) — aldrig hele køkkenkataloget.
 */
export const ADTRACTION_KITCHENONE_PROGRAM_ID = "1577686423";
