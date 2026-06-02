# Den Sidste Flaske — synlighed og salg (beslutning maj 2026)

## Problem

DSF er **ikke** i `lib/feeds/config.ts`. Kuraterede DSF-sider (`/den-sidste-flaske/vin/*`) og `DsfFeaturedPicks` på forsiden når brugeren, men **forsidens søgning** og `GuideProductPicks` / `RecipeProductPicks` viser kun feed-forhandlere.

## Valg: detail-only først (implementeret)

1. **Høj-intent sider** viser DSF via kuraterede enkeltvin-links:
   - Guides: `GuideWineDetailLinks` (via `guideRefs` på detail-sider)
   - Opskrifter: `RecipeCuratedWineLinks` — DSF sorteres først i `listWineDetailPagesForRecipe`
2. **Partner-Ads leaderboard** på `/vine` og hubs: kun banner-id’er med gyldigt `visbanner` (DSF 94856, Winther 76692).
3. **Ingen DSF-produktfeed** i søgning endnu — undgår uoverensstemmelse mellem feed-SKU og kuraterede sider.

## Når feed er relevant

Tilføj DSF til feeds **kun hvis**:

- Partner-Ads leverer et stabilt produktfeed-URL til DSF, og
- SKU/URL i feed matcher `productPageUrl` på detail-sider (eller I accepterer redirect-forskelle).

Efter tilføjelse: genkør feed-cron, verificér `/?q=…` returnerer DSF-produkter, og sammenlign PA-klik `placement=home-search` vs. `wine-detail`.

## Måling

- GA4: `affiliate_click` med `merchant` indeholdende «Den Sidste Flaske» fra `recipe-picks`, `guide-picks`, `wine-detail`, `merchant-hub-shop`.
- Partner-Ads: UID `vinbot` på banner 94856.

Sidst opdateret: maj 2026.
