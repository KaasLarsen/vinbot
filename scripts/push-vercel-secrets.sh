#!/usr/bin/env bash
# Kør på din maskine (én gang) efter du har oprettet projektet "vinbot" på Vercel.
#
# Forudsætninger:
#   brew install gh && gh auth login
#
# Værdier fra Vercel:
#   VERCEL_TOKEN       → https://vercel.com/account/tokens
#   VERCEL_ORG_ID      → Team Settings → General (Team ID) — ofte slug som dennis-projects-78a79d5b
#   VERCEL_PROJECT_ID  → vinbot → Project Settings → General → Project ID
#
# Vercel UI (kan ikke sættes fra script): Project → Settings → Git → connect KaasLarsen/vinbot, branch main.
# Root Directory skal være TOM. Tilføj domæner under Settings → Domains.

set -euo pipefail

REPO="${GITHUB_REPO:-KaasLarsen/vinbot}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Installer GitHub CLI: brew install gh"
  echo "Log ind: gh auth login"
  exit 1
fi

if ! gh auth status &>/dev/null; then
  echo "Kør først: gh auth login"
  exit 1
fi

echo "Repository: $REPO"
echo ""
echo "Hvis kun tokenet er udløbet: opret nyt på https://vercel.com/account/tokens"
echo "og sæt VERCEL_TOKEN (lad ORG/PROJECT stå tomme for at beholde eksisterende)."
echo "Indsæt værdier fra Vercel (input vises ikke — tryk Enter efter hver)."
read -rsp "VERCEL_TOKEN (påkrævet): " VERCEL_TOKEN
echo
read -rsp "VERCEL_ORG_ID (Enter = behold eksisterende): " VERCEL_ORG_ID
echo
read -rsp "VERCEL_PROJECT_ID (Enter = behold eksisterende): " VERCEL_PROJECT_ID
echo

if [[ -z "${VERCEL_TOKEN:-}" ]]; then
  echo "VERCEL_TOKEN skal udfyldes."
  exit 1
fi

# Hurtig sanity-check før vi skriver secret
http_code=$(curl -sS -o /tmp/vercel-whoami.json -w "%{http_code}" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  https://api.vercel.com/v2/user || true)
if [[ "$http_code" != "200" ]]; then
  echo "VERCEL_TOKEN blev afvist af Vercel API (HTTP ${http_code}). Tjek tokenet og prøv igen."
  cat /tmp/vercel-whoami.json 2>/dev/null || true
  exit 1
fi

printf '%s' "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN -R "$REPO"
if [[ -n "${VERCEL_ORG_ID:-}" ]]; then
  printf '%s' "$VERCEL_ORG_ID" | gh secret set VERCEL_ORG_ID -R "$REPO"
fi
if [[ -n "${VERCEL_PROJECT_ID:-}" ]]; then
  printf '%s' "$VERCEL_PROJECT_ID" | gh secret set VERCEL_PROJECT_ID -R "$REPO"
fi

echo ""
echo "Færdig. GitHub Actions har nu secrets til projektet vinbot."
echo "Trig et deploy med: gh workflow run 'Deploy production to Vercel' -R $REPO"
echo "eller: git commit --allow-empty -m 'chore: trigger vercel' && git push"
