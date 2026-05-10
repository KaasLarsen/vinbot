/**
 * Tærskelværdier der styrer, hvilke guides vi indekserer, og hvilke vi beholder
 * som intern reference (tilgængelige for brugere via hubber, men noindex for
 * søgemaskiner).
 *
 * Sat ved AdSense-afslag ("tyndt indhold"), hvor vi valgte at noindex
 * substans-lette referenceartikler i stedet for at slette dem.
 */
export const MIN_INDEXABLE_WORDS = 400;

/**
 * Genereret FAQ (fallback fra lib/guide-faq-*-fallback.ts) sendes kun til JSON-LD og accordion,
 * når brødteksten er lang nok — undgår hundredvis af næsten identiske FAQ-sider på tynde artikler.
 */
export const MIN_WORDS_FOR_FALLBACK_FAQ = 650;
