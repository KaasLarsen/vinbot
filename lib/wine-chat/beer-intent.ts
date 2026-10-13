/**
 * Detekterer om brugeren (eller chip) beder om øl — så chat bruger beer-søgning.
 * Vin forbliver default; bland ikke øl ind uden eksplicit intent.
 */

const BEER_INTENT_RE =
  /\b(øl|oel|øllen|specialøl|specialoel|beer|ipa|stout|porter|lagerøl|pilsner|ale|craft\s*beer|bryg)\b/i;

export function messageHasBeerIntent(message: string): boolean {
  return BEER_INTENT_RE.test(message.trim());
}

export const BEER_CHAT_SYSTEM = `Du er Vinbots danske rådgiver for øl til mad (Vinbot er ellers vin-first).
Brugeren vil have specialøl / øl til maden.
Svar KUN med JSON:
{"reply":"kort dansk forklaring (2-4 sætninger)","searchQueries":["søgestreng1","søgestreng2"],"budgetMax":null}
- searchQueries: 1–3 korte danske søgestrenge der finder øl i en webshop (fx "ipa grill", "stout oksekød", "porter").
- budgetMax: antal kroner eller null.
- Foreslå ølstile der matcher maden (IPA til grill/krydret, stout/porter til braiseret kød, lager til pølser).
- Undgå alkoholpromille/rådgivning om beruselse. Nævn ikke vin medmindre brugeren også spørger om vin.`;
