# Tilføj en forhandler (intern ops)

Eksterne butikker ansøger via [/forhandlere](https://www.vinbot.dk/forhandlere). Denne guide er til dig/agenten, når feedet skal ind i koden.

## 1. Produktfeed

Tilføj en post i [`lib/feeds/config.ts`](../lib/feeds/config.ts) (`FEEDS`):

```ts
{
  merchant: "Butiksnavn",           // skal matche feedMerchant på hub, hvis I har én
  url: "https://…",                 // XML/CSV fra Partner-Ads, Adtraction, Daisycon eller direkte
  tier: "paid",                     // default; brug "free" til gratis listing
  // wineFilter: false,             // kun hvis feedet ikke er vinflasker (fx vinkøleskabe)
  // vinAdjacentIncludeAny: [...],  // når wineFilter: false
  // vinAdjacentExcludeAny: [...],
}
```

**Bemærk:**

- `paid` (standard): affiliate/betalende partner — højere prioritet i søgning og redaktionel surfacing.
- `free`: med i søgning, lavere prioritet, ingen commission.
- Vinkøleskabe / blandfeeds: se eksisterende poster (fx Vinkøleskabet.dk, Erling Christensen) og `WINE_COOLER_ONLY_*`.

## 2. Merchant hub (valgfrit)

Hvis butikken skal have en hub-side (`/butiks-slug`):

1. Tilføj config i [`lib/merchant-hubs/registry.ts`](../lib/merchant-hubs/registry.ts) (`MERCHANT_HUBS`).
2. Sæt `feedMerchant` til samme streng som `merchant` i feed-config (eller `null` hvis feed-only uden match).
3. Udfyld blurb, intro, FAQ, produktsektioner og `affiliate`-blok.

Hubben picks op automatisk via App Router-mønsteret for merchant hubs.

## 3. Affiliate-tracking

Afhængigt af netværk:

| Netværk | Typisk fil |
|---------|------------|
| Partner-Ads | [`lib/partner-ads-links.ts`](../lib/partner-ads-links.ts) — banner-ID’er + `partnerAdsKlikUrl` |
| Daisycon | [`lib/daisycon-links.ts`](../lib/daisycon-links.ts) (hvis relevant) |
| Direct / free | `affiliate: { kind: "direct", shopUrl }` på hubben |

Sørg for at feed-URL’er allerede er tracked (Partner-Ads/Adtraction/Daisycon-feeds), så produktklik ikke skal wraps dobbelt.

## 4. Synlighed i UI

- Footer: [`components/site-footer.tsx`](../components/site-footer.tsx) — tilføj link under «Vinforhandlere» hvis hubben er vigtig.
- Indeks: [`/vinforhandlere`](../app/vinforhandlere/page.tsx) bygger typisk fra hub-registry.

## 5. Verificér

1. `npm run dev` — søg efter et produktnavn fra butikken på forsiden.
2. Tjek at merchant-filter viser butikken.
3. Hvis GTIN findes i feedet: test EAN/stregkode-søgning.
4. Efter deploy: cron flusher feeds (`/api/cron/revalidate-feeds` med `CRON_SECRET`), eller vent på næste planlagte kørsel.
5. Valgfrit: `npm run audit:feed-deals` hvis I forventer før/efter-pris i feedet.

## 6. Ekstern ansøgning

Butikker uden kode-adgang: henvis til [/forhandlere](https://www.vinbot.dk/forhandlere) (feed-URL, e-mail, gratis / affiliate / CPC). Signup går via Resend til `info@vinbot.dk`.
