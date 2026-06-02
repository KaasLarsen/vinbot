# Vækst-måling (2 uger) — trafik og salg

Brug denne tjekliste hver 14. dag. Formålet er at skelne **trafik**, **affiliate-klik** og **salg** fra hinanden.

## Partner-Ads (provision)

1. Log ind på [Partner-Ads](https://www.partner-ads.com/) → partner **50537**.
2. Filtrér statistik på **UID: `vinbot`** (sat på alle `klikbanner.php`-links siden maj 2026).
3. Notér pr. **banner-id** / forhandler:
   - Antal klik (7 og 30 dage)
   - Antal salg / provision (hvis tilgængeligt)
4. Sammenlign med **total klik uden UID** — hvor stor andel kommer fra Vinbot-sporet?

**Fortolkning:** Klik uden salg → konvertering/indhold. Ingen klik → CTA-placering eller forkert intent.

## Google Analytics 4

**Måle-ID:** `G-JB0QD6J59G` (også i Vercel som `NEXT_PUBLIC_GA_MEASUREMENT_ID`).

**Hvis GA4 siger «ingen data endnu»:**

1. Besøg **www.vinbot.dk** (ikke kun preview-URL) og tryk **Accepter** i cookie-banneret — GA4 indlæses **kun** efter samtykke.
2. Tjek **Rapporter → Realtid** (ikke kun «Start»-oversigten) — der kan gå 1–2 minutter før første hit.
3. I browser: DevTools → Network → filtrér `collect` eller `gtag/js` — skal ses efter Accepter.
4. Vercel → Environment Variables → `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-JB0QD6J59G` på **Production** → **Redeploy** (NEXT_PUBLIC indbygges ved build).

1. **Rapporter → Engagement → Events** → `wine_search` (antal søgninger) og `affiliate_click` (klik til shop).
2. For søgning: dimension **`query`** på `wine_search`; notér antal events pr. uge.
3. Tilføj dimension **`placement`** (og evt. `merchant`, `slug`, `hub`) på `affiliate_click`.
4. Notér top 10 `placement` efter antal events (7 og 30 dage).

Kendte placements i koden:

| placement | Betydning |
|-----------|-----------|
| `guide-picks` | Produktkort på guides |
| `recipe-picks` | Produktkort på opskrifter |
| `search-curated-wine` | Kuraterede enkeltvin under søgning (alle forhandlere, DSF først) |
| `search-dsf-curated` | (ældre navn — samme som search-curated-wine) |
| `guide-inline-search` | Produktkort i inline-søgning på udvalgte guides |
| `product-card` / `home-search` | Forside-/søgekort (feed) |
| `partner-leaderboard-*` | Horisontalt banner |
| `merchant-hub-shop` | «Besøg shop» på forhandler-hub |
| `footer-affiliate` | Footer-links til partnere |
| `rabatkoder-shop` | «Gå til shop» på /rabatkoder |
| `home-featured-store-*` | Udvalgte forhandlere på forsiden |

5. Kryds med **Landing page** (hvilken URL brugeren var på ved klik — hvis konfigureret).

## Google Search Console

1. **Effektivitet** → sidst 28 dage → sorter på **Klik**.
2. Notér top 20 **sider** og top 20 **forespørgsler**.
3. Find sider med **høj visning, lav CTR** → forbedre title/description.
4. **Sitemaps** → bekræft `sitemap-opskrifter.xml` og `sitemap-wine-detail.xml` uden fejl (se `docs/gsc-index-priority.md`).

## Teknisk sundhed

- [ ] `https://www.vinbot.dk/api/search?q=rodvin` returnerer produkter
- [ ] Vercel deploy grøn efter seneste push
- [ ] Ingen spike i 404 på `/vine/*` (udløbne feed-URL'er)

## Beslutning efter 2 uger

| Signal | Næste skridt |
|--------|----------------|
| Trafik ↑, klik fladt | Stærkere shop-CTA, produkt-picks højere på top-sider |
| Klik ↑, salg fladt | Bedre match (rød/hvid-filter), DSF/enkeltvin-links |
| Trafik fladt | GSC-indeksering, intern linking, opskrifts-rich results |
| Alt fladt | Prioritér 3 commercial guides + 5 opskrifter med højest intent |

Sidst opdateret: maj 2026.
