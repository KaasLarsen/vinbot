#!/usr/bin/env bash
# Kør på din maskine (én gang) efter du har oprettet projektet "vinbot-thisone" på Vercel.
#
# Forudsætninger:
#   brew install gh && gh auth login
#
# Værdier fra Vercel:
#   VERCEL_TOKEN       → https://vercel.com/account/tokens
#   VERCEL_ORG_ID      → Team Settings → General (Team ID) — ofte slug som dennis-projects-78a79d5b
#   VERCEL_PROJECT_ID  → vinbot-thisone → Project Settings → General → Project ID
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
echo "Indsæt værdier fra Vercel (input vises ikke for token — tryk Enter efter hver)."
read -rsp "VERCEL_TOKEN: " VERCEL_TOKEN
echo
read -rsp "VERCEL_ORG_ID: " VERCEL_ORG_ID
echo
read -rsp "VERCEL_PROJECT_ID: " VERCEL_PROJECT_ID
echo

if [[ -z "${VERCEL_TOKEN:-}" || -z "${VERCEL_ORG_ID:-}" || -z "${VERCEL_PROJECT_ID:-}" ]]; then
  echo "Alle tre værdier skal udfyldes."
  exit 1
fi

printf '%s' "$VERCEL_TOKEN" | gh secret set VERCEL_TOKEN -R "$REPO"
printf '%s' "$VERCEL_ORG_ID" | gh secret set VERCEL_ORG_ID -R "$REPO"
printf '%s' "$VERCEL_PROJECT_ID" | gh secret set VERCEL_PROJECT_ID -R "$REPO"

echo ""
echo "Færdig. GitHub Actions har nu secrets til projektet vinbot-thisone."
echo "Trig et deploy med: gh workflow run 'Deploy production to Vercel' -R $REPO"
echo "eller: git commit --allow-empty -m 'chore: trigger vercel' && git push"
