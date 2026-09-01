/**
 * Genereret FAQ (fallback fra lib/guide-faq-*-fallback.ts) sendes kun til JSON-LD og accordion,
 * når brødteksten er lang nok — undgår hundredvis af næsten identiske FAQ-sider på tynde artikler.
 */
export const MIN_WORDS_FOR_FALLBACK_FAQ = 650;
