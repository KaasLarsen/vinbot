# Vinbot

Dansk vinguide og prissammenligning: redaktionelle guides/opskrifter plus vinsøgning på tværs af danske (og nogle internationale) forhandlere. Vinbot sælger ikke vin — køb sker via affiliate-links til butikkerne.

Produktion: [vinbot.dk](https://www.vinbot.dk)

## Kom i gang

Krav: **Node.js ≥ 20.9**

```bash
npm install
cp .env.example .env.local   # udfyld efter behov
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000).

## Miljøvariabler

Se [`.env.example`](.env.example) for alle felter. Vigtigste:

| Variabel | Formål |
|----------|--------|
| `NEXT_PUBLIC_SITE_URL` | Canonical base-URL (typisk `https://www.vinbot.dk`) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` / `NEXT_PUBLIC_ADSENSE_ACTIVE` | AdSense |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `CRON_SECRET` | Auth til Vercel cron (`/api/cron/revalidate-feeds`) |
| `RESEND_API_KEY` / `RESEND_FROM` | Forhandler-tilmelding via e-mail |

Sæt de samme værdier i Vercel (Production + Preview) ved deploy.

## Mappe-overblik

| Sti | Indhold |
|-----|---------|
| `app/` | Next.js App Router (sider, API, sitemaps) |
| `components/` | UI (søgning, hubs, footer m.m.) |
| `content/guides/` | MDX-vinguides |
| `content/recipes/` | MDX-opskrifter |
| `lib/feeds/` | Produktfeeds (`config.ts`) |
| `lib/search/` | Vinsøgning, intents, helpers |
| `lib/deals/` | Tilbud (nedsat i shop + billigst på tværs) |
| `lib/merchant-hubs/` | Forhandler-hubsider |
| `lib/vine/` | Kanonisk vin-katalog |
| `docs/` | SEO/ops-checklists og interne guides |
| `marketing/` | SoMe-video og marketing-assets |
| `.cursor/rules/` | Cursor-regler (fx mad-og-vin-guides) |

## Scripts

| Kommando | Formål |
|----------|--------|
| `npm run dev` | Lokal udvikling |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run audit:guides` | Ordantal på guides |
| `npm run audit:guides:thin` | Guides under 400 ord |
| `npm run gsc:vin-til-gap` | GSC-queries → manglende `vin-til-*` |
| `npm run audit:feed-deals` | Audit af feed-tilbud |
| `npm run vercel:secrets` | Push secrets til Vercel |

## Deploy

Push til `main` deployer automatisk til Vercel production.

Feed-cache genindlæses via cron: `GET /api/cron/revalidate-feeds` med `Authorization: Bearer <CRON_SECRET>` (Vercel kører det typisk hver 6. time).

## Indhold og SEO

- Madparringsguides (`vin-til-*.mdx`): se [`.cursor/rules/mad-og-vin-guides.mdc`](.cursor/rules/mad-og-vin-guides.mdc)
- Keyword-gaps, GSC og vækst: filer under [`docs/`](docs/)
- Ny forhandler i kode: [`docs/adding-a-merchant.md`](docs/adding-a-merchant.md)
- Ekstern forhandler-ansøgning: [/forhandlere](https://www.vinbot.dk/forhandlere)

## Brugerrettet how-to

Produkt-flow på sitet: [/saadan-bruger-du-vinbot](https://www.vinbot.dk/saadan-bruger-du-vinbot)  
Kort SoMe-walkthrough: [`marketing/`](marketing/)
