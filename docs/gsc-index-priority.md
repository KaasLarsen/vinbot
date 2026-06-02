# GSC — prioriteret indeksering (maj 2026)

Genindsend i [Google Search Console](https://search.google.com/search-console) → **Sitemaps**:

- `https://www.vinbot.dk/sitemap-opskrifter.xml`
- `https://www.vinbot.dk/sitemap-wine-detail.xml`

Brug **URL-inspektion → Anmod om indeksering** på URL'erne nedenfor (én ad gangen eller de vigtigste først).

## Tier 1 — nye/oppdaterede opskrifter (Gemini + tapas)

- https://www.vinbot.dk/opskrifter/chorizo-i-rodvin
- https://www.vinbot.dk/opskrifter/svinekaebber-i-rodvinssky
- https://www.vinbot.dk/opskrifter/estofado-oksestuvning-i-rodvin
- https://www.vinbot.dk/opskrifter/spansk-koedboller-i-rodvinsauce
- https://www.vinbot.dk/opskrifter/risotto-med-rodvin-barolo
- https://www.vinbot.dk/opskrifter/champignons-al-ajillo-med-hvidvin
- https://www.vinbot.dk/opskrifter/syltede-roedloeg-med-hvidvin
- https://www.vinbot.dk/opskrifter/roedvinsgele-til-charcuteri
- https://www.vinbot.dk/opskrifter/figner-og-dadler-i-rodvin
- https://www.vinbot.dk/opskrifter

## Tier 2 — simremad-grundsten (bekræft indeks)

- https://www.vinbot.dk/opskrifter/coq-au-vin
- https://www.vinbot.dk/opskrifter/boeuf-bourguignon
- https://www.vinbot.dk/opskrifter/braiseret-lammeskank-med-rodvin
- https://www.vinbot.dk/opskrifter/braiseret-oksekaebe-med-rodvin

## Tier 3 — hub opdateret med opskriftslinks

- https://www.vinbot.dk/guides/vin-til-tapas

## Tier 4 — enkeltvin-sider (salgsnære)

Genindsend hele `sitemap-wine-detail.xml` frem for 64 enkelt-URL'er. Eksempler:

- https://www.vinbot.dk/den-sidste-flaske/vin/august-kesseler-daily-august-pinot-noir-2023
- https://www.vinbot.dk/lauridsen-vine/vin/sartori-den-hvide-amarone
- https://www.vinbot.dk/winther-vin/vin/il-poeta-barolo-2019

Efter deploy med opskriftsbilleder: valider **Recipe** rich result på coq-au-vin (feltet `image` skal være grønt).
