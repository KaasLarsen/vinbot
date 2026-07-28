import { Resend } from "resend";

import { siteName, siteUrl } from "@/lib/site";

const SEGMENT_NAME = "Vinbot nyhedsbrev";
const TOPIC_NAME = "Vinbot nyhedsbrev";
const TOPIC_DESCRIPTION =
  "Tilbud, tips og nyheder fra Vinbot — prissammenligning og inspiration fra danske vinforhandlere.";

type NewsletterIds = {
  segmentId: string;
  topicId: string;
};

let cachedIds: NewsletterIds | null = null;

function getResendClient(apiKey: string): Resend {
  return new Resend(apiKey);
}

function getFromAddress(): string {
  return process.env.RESEND_FROM?.trim() || `${siteName} <onboarding@resend.dev>`;
}

/** Resolve segment + topic IDs (env override, else find-or-create by name). Cached per runtime. */
export async function ensureNewsletterIds(resend: Resend): Promise<NewsletterIds> {
  if (cachedIds) return cachedIds;

  const envSegment = process.env.RESEND_NEWSLETTER_SEGMENT_ID?.trim();
  const envTopic = process.env.RESEND_NEWSLETTER_TOPIC_ID?.trim();
  if (envSegment && envTopic) {
    cachedIds = { segmentId: envSegment, topicId: envTopic };
    return cachedIds;
  }

  let segmentId = envSegment || "";
  if (!segmentId) {
    const listed = await resend.segments.list({ limit: 100 });
    if (listed.error) {
      throw new Error(listed.error.message || "Kunne ikke hente Resend-segmenter.");
    }
    const existing = listed.data?.data.find((s) => s.name === SEGMENT_NAME);
    if (existing) {
      segmentId = existing.id;
    } else {
      const created = await resend.segments.create({ name: SEGMENT_NAME });
      if (created.error || !created.data?.id) {
        throw new Error(created.error?.message || "Kunne ikke oprette Resend-segment.");
      }
      segmentId = created.data.id;
    }
  }

  let topicId = envTopic || "";
  if (!topicId) {
    const listed = await resend.topics.list();
    if (listed.error) {
      throw new Error(listed.error.message || "Kunne ikke hente Resend-topics.");
    }
    const existing = listed.data?.data.find((t) => t.name === TOPIC_NAME);
    if (existing) {
      topicId = existing.id;
    } else {
      const created = await resend.topics.create({
        name: TOPIC_NAME,
        description: TOPIC_DESCRIPTION,
        defaultSubscription: "opt_out",
      });
      if (created.error || !created.data?.id) {
        throw new Error(created.error?.message || "Kunne ikke oprette Resend-topic.");
      }
      topicId = created.data.id;
    }
  }

  cachedIds = { segmentId, topicId };
  return cachedIds;
}

function looksLikeAlreadyExists(message: string | undefined): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return m.includes("already") || m.includes("exist") || m.includes("duplicate");
}

/**
 * Create or re-subscribe contact to the Vinbot newsletter segment + topic.
 * Returns whether this was a brand-new contact (for welcome email).
 */
export async function subscribeNewsletterContact(
  apiKey: string,
  email: string,
): Promise<{ ok: true; isNew: boolean } | { ok: false; message: string }> {
  const resend = getResendClient(apiKey);

  let ids: NewsletterIds;
  try {
    ids = await ensureNewsletterIds(resend);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Resend-konfiguration fejlede.";
    console.error("ensureNewsletterIds:", err);
    return { ok: false, message };
  }

  const created = await resend.contacts.create({
    email,
    unsubscribed: false,
    segments: [{ id: ids.segmentId }],
    topics: [{ id: ids.topicId, subscription: "opt_in" }],
  });

  if (!created.error && created.data?.id) {
    return { ok: true, isNew: true };
  }

  if (!looksLikeAlreadyExists(created.error?.message)) {
    console.error("Resend contacts.create:", created.error);
    return {
      ok: false,
      message: created.error?.message || "Kunne ikke tilmelde e-mailen.",
    };
  }

  // Existing contact: add segment, opt into topic, clear global unsubscribe.
  const addSeg = await resend.contacts.segments.add({
    email,
    segmentId: ids.segmentId,
  });
  if (addSeg.error && !looksLikeAlreadyExists(addSeg.error.message)) {
    console.error("Resend contacts.segments.add:", addSeg.error);
    return { ok: false, message: addSeg.error.message || "Kunne ikke tilmelde e-mailen." };
  }

  const topics = await resend.contacts.topics.update({
    email,
    topics: [{ id: ids.topicId, subscription: "opt_in" }],
  });
  if (topics.error) {
    console.error("Resend contacts.topics.update:", topics.error);
    return { ok: false, message: topics.error.message || "Kunne ikke tilmelde e-mailen." };
  }

  const updated = await resend.contacts.update({
    email,
    unsubscribed: false,
  });
  if (updated.error) {
    console.error("Resend contacts.update:", updated.error);
    // Non-fatal if segment/topic already applied
  }

  return { ok: true, isNew: false };
}

/** Short welcome mail after first-time signup. Failures are logged, not thrown. */
export async function sendNewsletterWelcomeEmail(
  apiKey: string,
  email: string,
): Promise<void> {
  const resend = getResendClient(apiKey);
  const from = getFromAddress();
  const tilbudUrl = `${siteUrl}/tilbud`;
  const privatlivUrl = `${siteUrl}/privatliv`;

  const text = [
    `Tak for din tilmelding til ${siteName}s nyhedsbrev.`,
    "",
    "Du får fremover udvalgte vin-tilbud, tips og nyheder direkte i indbakken.",
    `Se aktuelle tilbud her: ${tilbudUrl}`,
    "",
    "Du kan til enhver tid afmelde dig via linket i vores mails.",
    `Læs mere om behandling af personoplysninger: ${privatlivUrl}`,
    "",
    `— ${siteName}`,
  ].join("\n");

  const html = `
    <p>Tak for din tilmelding til <strong>${siteName}</strong>s nyhedsbrev.</p>
    <p>Du får fremover udvalgte vin-tilbud, tips og nyheder direkte i indbakken.</p>
    <p><a href="${tilbudUrl}">Se aktuelle tilbud</a></p>
    <p style="color:#78716c;font-size:13px;">
      Du kan til enhver tid afmelde dig via linket i vores mails.
      <a href="${privatlivUrl}">Privatlivspolitik</a>
    </p>
    <p>— ${siteName}</p>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: `Velkommen til ${siteName}s nyhedsbrev`,
      text,
      html,
    });
    if (error) {
      console.error("Resend welcome email:", error);
    }
  } catch (err) {
    console.error("Resend welcome email failed:", err);
  }
}
