# GSC — prioriteret indeksering (jul 2026)

Genindsend i [Google Search Console](https://search.google.com/search-console) → **Sitemaps**:

- `https://www.vinbot.dk/sitemap-opskrifter.xml`
- `https://www.vinbot.dk/sitemap-bedste.xml` (25 udvidede `bedste-*-under-*` guides)
- `https://www.vinbot.dk/sitemap-wine-detail.xml`

Brug **URL-inspektion → Anmod om indeksering** på URL'erne nedenfor (én ad gangen eller de vigtigste først).

## Tier 1 — nye sommeropskrifter (SEO-sprint jul 2026)

- https://www.vinbot.dk/opskrifter/grillet-kylling-med-hvidvin
- https://www.vinbot.dk/opskrifter/kold-pastasalat-med-hvidvin
- https://www.vinbot.dk/opskrifter/piknik-sandwich-med-hvidvin-dressing
- https://www.vinbot.dk/opskrifter/grillet-halloumi-med-hvidvin
- https://www.vinbot.dk/opskrifter/sommerfrugt-i-hvidvin
- https://www.vinbot.dk/opskrifter

## Tier 2 — udvidede bedste-* guides (nu indekserbare, ≥400 ord)

Eksempler — genindsend hele bedste-sitemap eller top 10:

- https://www.vinbot.dk/guides/bedste-merlot-under-100-kr
- https://www.vinbot.dk/guides/bedste-sauvignon-blanc-under-100-kr
- https://www.vinbot.dk/guides/bedste-pinot-noir-under-150-kr
- https://www.vinbot.dk/guides/bedste-cabernet-sauvignon-under-100-kr
- https://www.vinbot.dk/guides/bedste-tempranillo-under-150-kr

## Tier 3 — sommerguides + /saeson hub

- https://www.vinbot.dk/guides/bedste-sommervin
- https://www.vinbot.dk/guides/vin-til-sommer
- https://www.vinbot.dk/guides/vin-til-piknik
- https://www.vinbot.dk/guides/vin-til-haveselskab
- https://www.vinbot.dk/saeson

## Tier 4 — simremad-grundsten (bekræft indeks)

- https://www.vinbot.dk/opskrifter/coq-au-vin
- https://www.vinbot.dk/opskrifter/boeuf-bourguignon
- https://www.vinbot.dk/opskrifter/braiseret-lammeskank-med-rodvin
- https://www.vinbot.dk/opskrifter/braiseret-oksekaebe-med-rodvin

## Tier 5 — enkeltvin-sider (salgsnære)

Genindsend hele `sitemap-wine-detail.xml`. Eksempler:

- https://www.vinbot.dk/den-sidste-flaske/vin/august-kesseler-daily-august-pinot-noir-2023
- https://www.vinbot.dk/lauridsen-vine/vin/sartori-den-hvide-amarone
- https://www.vinbot.dk/winther-vin/vin/il-poeta-barolo-2019

## GSC gap-analyse (datadrevet næste emner)

1. Eksporter Performance → Queries (28 dage) fra GSC
2. Kør: `node scripts/vin-til-gsc-gap.mjs ~/Downloads/Queries.csv --min-impressions=10`
3. Se også [gsc-vin-til-gap-backlog.md](./gsc-vin-til-gap-backlog.md) (legacy-proxy)

Efter deploy: valider **Recipe** rich result på `grillet-kylling-med-hvidvin` (feltet `image` skal være grønt).

Sidst opdateret: 2026-07-19
