/** Merchant-nøgler til Partner-Ads-banner og hub-butikskort. */
export type HubRotationMerchant = "winther" | "lauridsen" | "johnsen" | "dh" | "dsf";

/**
 * Hub → tre forhandlere (rækkefølge = visning på hub-kort; banner picker ét af dem).
 */
export const HUB_ROTATIONS: Record<string, HubRotationMerchant[]> = {
  "bedste-vine": ["winther", "lauridsen", "johnsen"],
  "mad-og-vin": ["dh", "lauridsen", "winther"],
  opskrifter: ["dh", "winther", "lauridsen"],
  "vin-viden": ["johnsen", "lauridsen", "dh"],
  hedvin: ["lauridsen", "johnsen", "dh"],
  regioner: ["lauridsen", "dh", "johnsen"],
  saeson: ["winther", "lauridsen", "dh"],
  "fest-og-vin": ["winther", "lauridsen", "johnsen"],
  "humoer-og-vin": ["winther", "lauridsen", "dh"],
  druesorter: ["johnsen", "lauridsen", "winther"],
  "vine-katalog": ["dsf", "winther"],
  "alkoholfri-vin": ["winther", "lauridsen", "johnsen"],
  "supermarked-vin": ["winther", "dh", "lauridsen"],
  "black-friday": ["winther", "dsf", "lauridsen"],
};

export function rotationIndex(slug: string, modulo: number): number {
  if (modulo <= 1) return 0;
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h + slug.charCodeAt(i) * (i + 1)) % 10007;
  }
  return h % modulo;
}

export function hubRotationPool(hub: string | undefined): HubRotationMerchant[] {
  const key = hub && HUB_ROTATIONS[hub] ? hub : "bedste-vine";
  return HUB_ROTATIONS[key] ?? HUB_ROTATIONS["bedste-vine"]!;
}
