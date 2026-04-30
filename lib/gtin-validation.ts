/**
 * GS1-kontrolciffer til GTIN-8/12/13/14.
 * Vi validerer før Product JSON-LD — ellers klager Merchant Listings over «GTIN er ikke gyldigt globalt»
 * (ofte forkert ciffer eller intern SKU gemt som GTIN).
 */

export function isValidGtinChecksum(digitsOnly: string): boolean {
  if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(digitsOnly)) return false;
  if (/^0+$/.test(digitsOnly)) return false;

  const body = digitsOnly.slice(0, -1);
  const check = parseInt(digitsOnly.charAt(digitsOnly.length - 1), 10);
  let sum = 0;
  for (let i = body.length - 1, weight = 3; i >= 0; i--, weight = weight === 3 ? 1 : 3) {
    sum += parseInt(body.charAt(i), 10) * weight;
  }
  const expected = (10 - (sum % 10)) % 10;
  return check === expected;
}

/**
 * Felter til schema.org Product: kun gyldige gtin*-felter.
 * Ved ugyldig stregkode: `sku` i stedet (stadig kontekst til crawlers uden falsk GTIN).
 */
export function productJsonLdGtinFields(gtinRaw: string | null | undefined): Record<string, string> {
  const trimmed = gtinRaw?.trim();
  const digits = String(trimmed ?? "").replace(/\D/g, "");

  if (digits.length >= 8 && /^0+$/.test(digits)) return {};

  if (digits.length === 13 && isValidGtinChecksum(digits)) return { gtin13: digits };
  if (digits.length === 12 && isValidGtinChecksum(digits)) return { gtin12: digits };
  if (digits.length === 8 && isValidGtinChecksum(digits)) return { gtin8: digits };
  if (digits.length === 14 && isValidGtinChecksum(digits)) return { gtin14: digits };

  if (trimmed && trimmed.length > 0) {
    const sku = trimmed.length > 128 ? trimmed.slice(0, 128) : trimmed;
    return { sku };
  }
  return {};
}
