/** Kurateret mix på forsiden: rød, hvid, bobler + pinot — opdater når feeds skifter. */
export const FEATURED_WINE_SLUGS = [
  "susana-balbo-benmarco-malbec-2019-d83affb5",
  "rapaura-springs-rapaura-springs-sauvignon-blanc-4daa24a0",
  "laurent-perrier-champagne-laurent-perrier-cuvee-0c705d33",
  "hamilton-russell-hamilton-russell-pinot-noir-202-feeca1a9",
] as const;

export type FeaturedWineSlug = (typeof FEATURED_WINE_SLUGS)[number];
