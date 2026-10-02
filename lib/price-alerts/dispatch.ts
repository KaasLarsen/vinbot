import { siteUrl } from "@/lib/site";
import { createSupabaseServiceClient, hasSupabaseServiceRole } from "@/lib/supabase/service";
import type { WineCatalog } from "@/lib/vine/types";

import {
  PRICE_ALERT_DEDUP_MS,
  PRICE_ALERT_MAX_OFFERS_PER_MAIL,
  PRICE_ALERT_MAX_SENDS_PER_RUN,
  qualifyingOffers,
  type AlertSendRecord,
} from "./match";
import { sendPriceAlertEmail } from "./send";
import { priceAlertTokenSecret, signPriceAlertToken } from "./token";

export type PriceAlertDispatchResult = {
  considered: number;
  sent: number;
  skipped: number;
  failed: number;
};

type AlertRow = {
  id: string;
  email: string;
  wine_id: string;
  wine_slug: string;
  wine_title: string;
  baseline_min_paid_price: number | string | null;
};

type SendRow = {
  alert_id: string;
  merchant: string;
  price: number | string;
  kind: string;
  sent_at: string;
};

function asNumber(value: number | string | null | undefined): number | null {
  if (value == null) return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

const EMPTY: PriceAlertDispatchResult = { considered: 0, sent: 0, skipped: 0, failed: 0 };

export async function dispatchPriceAlerts(catalog: WineCatalog): Promise<PriceAlertDispatchResult> {
  if (!hasSupabaseServiceRole()) return EMPTY;
  if (!priceAlertTokenSecret()) {
    console.error("Prisfald: PRICE_ALERT_TOKEN_SECRET eller CRON_SECRET mangler — ingen mails sendt.");
    return EMPTY;
  }
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("Prisfald: RESEND_API_KEY mangler — ingen mails sendt.");
    return EMPTY;
  }

  const supabase = createSupabaseServiceClient();
  const { data: alertRows, error: alertError } = await supabase
    .from("price_alerts")
    .select("id, email, wine_id, wine_slug, wine_title, baseline_min_paid_price")
    .eq("status", "active");

  if (alertError) {
    console.error("price_alerts dispatch list:", alertError);
    return { ...EMPTY, failed: 1 };
  }

  const alerts = (alertRows ?? []) as AlertRow[];
  if (alerts.length === 0) return EMPTY;

  const byId = new Map(catalog.wines.map((wine) => [wine.id, wine]));
  const bySlug = new Map(catalog.wines.map((wine) => [wine.slug, wine]));
  const sendsByAlert = await loadSends(supabase, alerts.map((a) => a.id));

  const now = Date.now();
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const alert of alerts) {
    if (sent >= PRICE_ALERT_MAX_SENDS_PER_RUN) break;
    const wine = byId.get(alert.wine_id) ?? bySlug.get(alert.wine_slug);
    if (!wine) {
      skipped += 1;
      continue;
    }

    const candidates = qualifyingOffers(
      wine.offers,
      asNumber(alert.baseline_min_paid_price),
      now,
      sendsByAlert.get(alert.id) ?? [],
    ).slice(0, PRICE_ALERT_MAX_OFFERS_PER_MAIL);

    if (candidates.length === 0) {
      skipped += 1;
      continue;
    }

    let unsubscribeUrl: string;
    try {
      const token = signPriceAlertToken(alert.id);
      unsubscribeUrl = `${siteUrl}/prisfald/afmeld?token=${encodeURIComponent(token)}`;
    } catch (err) {
      console.error("price alert token:", err);
      failed += 1;
      continue;
    }

    const mailed = await sendPriceAlertEmail(
      apiKey,
      alert.email,
      wine.displayTitle || alert.wine_title,
      wine.slug,
      candidates,
      unsubscribeUrl,
    );
    if (!mailed.ok) {
      failed += 1;
      continue;
    }

    const { error: insertError } = await supabase.from("price_alert_sends").insert(
      candidates.map((offer) => ({
        alert_id: alert.id,
        merchant: offer.merchant,
        price: offer.price,
        discount_percent: offer.discountPercent,
        affiliate_url: offer.url,
        kind: "sent",
      })),
    );
    if (insertError) {
      console.error("price_alert_sends insert:", insertError);
      failed += 1;
      continue;
    }

    if (wine.slug !== alert.wine_slug || wine.displayTitle !== alert.wine_title) {
      await supabase
        .from("price_alerts")
        .update({
          wine_slug: wine.slug,
          wine_title: wine.displayTitle,
          updated_at: new Date().toISOString(),
        })
        .eq("id", alert.id);
    }

    sent += 1;
  }

  return { considered: alerts.length, sent, skipped, failed };
}

async function loadSends(
  supabase: ReturnType<typeof createSupabaseServiceClient>,
  alertIds: string[],
): Promise<Map<string, AlertSendRecord[]>> {
  const grouped = new Map<string, AlertSendRecord[]>();
  const since = Date.now() - PRICE_ALERT_DEDUP_MS;

  for (let i = 0; i < alertIds.length; i += 200) {
    const chunk = alertIds.slice(i, i + 200);
    const { data, error } = await supabase
      .from("price_alert_sends")
      .select("alert_id, merchant, price, kind, sent_at")
      .in("alert_id", chunk);

    if (error) {
      console.error("price_alert_sends list:", error);
      continue;
    }

    for (const row of (data ?? []) as SendRow[]) {
      const sentAt = new Date(row.sent_at).getTime();
      const kind = row.kind === "seed" ? "seed" : "sent";
      if (kind === "sent" && sentAt < since) continue;
      const price = asNumber(row.price);
      if (price == null) continue;
      const list = grouped.get(row.alert_id) ?? [];
      list.push({ merchant: row.merchant, price, kind, sentAt });
      grouped.set(row.alert_id, list);
    }
  }

  return grouped;
}
