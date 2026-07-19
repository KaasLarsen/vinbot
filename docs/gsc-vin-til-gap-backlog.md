# Vin-til gap-backlog (legacy + GSC workflow)

Genereret: 2026-07-19

## Sådan bruger du denne liste

1. **Med GSC-data (prioritet):** Eksporter Performance → Queries fra Search Console og kør:
   ```bash
   node scripts/vin-til-gsc-gap.mjs ~/Downloads/Queries.csv --min-impressions=10
   ```
2. **Uden GSC:** Brug «Legacy huller» nedenfor som kandidater — skriv kun guide hvis søgeintent ikke dækkes af svag match.
3. **Regel:** Ny `vin-til-*` guide kun ved ≥10–20 GSC-visninger/måned OG ingen stærk eksisterende slug.

## Status

| Metric | Antal |
|--------|-------|
| Nuværende `vin-til-*` guides | 147 |
| Legacy `vin-til/` emner | 36 |
| Dækket (exact/strong) | 18 |
| Svag match (tjek manuelt) | 12 |
| Mulige huller fra legacy | 6 |

## Legacy huller (prioriter efter GSC)

| Foreslået slug | Legacy emne | Note |
|----------------|-------------|------|
| `vin-til-bolognese` | bolognese | Verificér impressions i GSC |
| `vin-til-juleaften` | juleaften | Verificér impressions i GSC |
| `vin-til-nytarsaften` | nytarsaften | Verificér impressions i GSC |
| `vin-til-okseboef` | okseboef | Verificér impressions i GSC |
| `vin-til-pasta-tomat` | pasta-tomat | Verificér impressions i GSC |
| `vin-til-picnic` | picnic | Verificér impressions i GSC |

## Svage match (ofte dækket — undgå duplikat)

| Legacy emne | Eksisterende slug |
|-------------|-------------------|
| bryllup | `vin-til-sommerbryllup` |
| flaeskesteg | `vin-til-stegt-flaesk` |
| grillmad | `vin-til-afrikansk-mad` |
| hvide-oste | `vin-til-hard-ost` |
| ostebord-blaaskimmel | `vin-til-blaaskimmelost` |
| ostebord-faste-oste | `vin-til-hard-ost` |
| ostebord-hvide-oste | `vin-til-hard-ost` |
| ostebord-hvidskimmel | `vin-til-hard-ost` |
| ostebord | `vin-til-hard-ost` |
| paaskefrokost | `vin-til-frokost` |
| romantisk-middag | `vin-til-oksekoed-i-sauce` |
| vegetarretter | `vin-til-vegetar` |

## Anbefalede næste emner (SEO-sprint)

Baseret på legacy-huller og [seo-keyword-gap-matrix.md](./seo-keyword-gap-matrix.md):

1. `vin-til-bolognese` — tjek om [vin-til-lasagne](/guides/vin-til-lasagne) + [vin-til-pizza-og-pasta](/guides/vin-til-pizza-og-pasta) dækker intent; opret kun ved GSC-hul.
2. `vin-til-pasta-tomat` — overlap med pizza/pasta-hub; udvid eksisterende guide frem for ny URL.
3. `vin-til-vegetarretter` — [vin-til-vegetar-og-gront](/guides/vin-til-vegetar-og-gront) dækker sandsynligvis; redirect-intent internt.
4. `vin-til-picnic` — dækket af [vin-til-piknik](/guides/vin-til-piknik).
5. `vin-til-romantisk-middag` — overvej under [humoer-og-vin](/humoer-og-vin) hvis GSC viser volumen.

## Efter deploy

- Genindsend `sitemap-mad-og-vin.xml` (eller relevant guide-sitemap) i GSC
- URL-inspektion på nye/udvidede guides (se [gsc-index-priority.md](./gsc-index-priority.md))
