import { Resend } from "resend";

import { siteName, siteUrl } from "@/lib/site";

import { priceKey, type PriceAlertCandidate } from "./match";

function getFromAddress(): string {
  return process.env.RESEND_FROM?.trim() || `${siteName} <onboarding@resend.dev>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatKr(price: number): string {
  const rounded = priceKey(price);
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(".", ",");
  return `${text} kr`;
}

function offerLines(offer: PriceAlertCandidate): { text: string; html: string } {
  const price = formatKr(offer.price);
  const discount =
    offer.discountPercent != null ? ` (−${offer.discountPercent} %)` : "";
  const before =
    offer.referencePrice != null && offer.referencePrice > offer.price
      ? ` Før: ${formatKr(offer.referencePrice)}.`
      : "";
  const text = `${offer.merchant}: ${price}${discount}.${before} ${offer.url}`;
  const html = `<p><strong>${escapeHtml(offer.merchant)}</strong>: ${escapeHtml(price)}${escapeHtml(discount)}.${escapeHtml(before)}<br/><a href="${escapeHtml(offer.url)}">Se tilbuddet</a></p>`;
  return { text, html };
}

export async function sendPriceAlertEmail(
  apiKey: string,
  to: string,
  wineTitle: string,
  wineSlug: string,
  offers: PriceAlertCandidate[],
  unsubscribeUrl: string,
): Promise<{ ok: true } | { ok: false; message: string }> {
  if (offers.length === 0) return { ok: false, message: "Ingen tilbud at sende." };

  const resend = new Resend(apiKey);
  const from = getFromAddress();
  const title = wineTitle.trim() || "Vinen";
  const subjectMerchant = offers.length === 1 ? ` hos ${offers[0]!.merchant}` : "";
  const subject = `Prisfald: ${title}${subjectMerchant}`;
  const wineUrl = `${siteUrl}/vine/${encodeURIComponent(wineSlug)}`;
  const privatlivUrl = `${siteUrl}/privatliv`;
  const lines = offers.map(offerLines);

  const text = [
    `${title} er sat ned hos ${offers.length === 1 ? offers[0]!.merchant : "en partnerbutik"}.`,
    "",
    ...lines.map((l) => l.text),
    "",
    `Alle butikker: ${wineUrl}`,
    "",
    `Afmeld prisfald for denne vin: ${unsubscribeUrl}`,
    `Privatliv: ${privatlivUrl}`,
    "",
    `— ${siteName}`,
  ].join("\n");

  const html = `
    <p><strong>${escapeHtml(title)}</strong> er sat ned hos ${
      offers.length === 1 ? escapeHtml(offers[0]!.merchant) : "en partnerbutik"
    }.</p>
    ${lines.map((l) => l.html).join("")}
    <p><a href="${escapeHtml(wineUrl)}">Se alle butikker på Vinbot</a></p>
    <p style="color:#78716c;font-size:13px;">
      <a href="${escapeHtml(unsubscribeUrl)}">Afmeld prisfald for denne vin</a>.
      Det påvirker ikke nyhedsbrevet.
      <a href="${escapeHtml(privatlivUrl)}">Privatlivspolitik</a>
    </p>
    <p>— ${escapeHtml(siteName)}</p>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
    });
    if (error) {
      console.error("Resend prisfald:", error);
      return { ok: false, message: error.message || "Mailen kunne ikke sendes." };
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Mailen kunne ikke sendes.";
    console.error("Resend prisfald failed:", err);
    return { ok: false, message };
  }
}
