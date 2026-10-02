import { Resend } from "resend";

const TOPIC_NAME = "Prisfald";
const TOPIC_DESCRIPTION =
  "Besked når en partnerbutik sætter en vin, du følger på Vinbot, på tilbud. Ikke nyhedsbrevet.";

let cachedTopicId: string | null = null;

function looksLikeAlreadyExists(message: string | undefined): boolean {
  if (!message) return false;
  const m = message.toLowerCase();
  return m.includes("already") || m.includes("exist") || m.includes("duplicate");
}

async function ensurePriceAlertTopicId(resend: Resend): Promise<string> {
  if (cachedTopicId) return cachedTopicId;
  const fromEnv = process.env.RESEND_PRICE_ALERT_TOPIC_ID?.trim();
  if (fromEnv) {
    cachedTopicId = fromEnv;
    return fromEnv;
  }

  const listed = await resend.topics.list();
  if (listed.error) {
    throw new Error(listed.error.message || "Kunne ikke hente Resend-topics.");
  }
  const existing = listed.data?.data.find((t) => t.name === TOPIC_NAME);
  if (existing) {
    cachedTopicId = existing.id;
    return existing.id;
  }

  const created = await resend.topics.create({
    name: TOPIC_NAME,
    description: TOPIC_DESCRIPTION,
    defaultSubscription: "opt_out",
  });
  if (created.error || !created.data?.id) {
    throw new Error(created.error?.message || "Kunne ikke oprette Resend-topic.");
  }
  cachedTopicId = created.data.id;
  return created.data.id;
}

/** Tilmeld kun prisfald-topic. Rører ikke nyhedsbrev-segmentet. */
export async function optInPriceAlertTopic(apiKey: string, email: string): Promise<void> {
  const resend = new Resend(apiKey);
  try {
    const topicId = await ensurePriceAlertTopicId(resend);
    const created = await resend.contacts.create({
      email,
      unsubscribed: false,
      topics: [{ id: topicId, subscription: "opt_in" }],
    });
    if (!created.error) return;
    if (!looksLikeAlreadyExists(created.error.message)) {
      console.error("Resend prisfald contact:", created.error);
      return;
    }
    const topics = await resend.contacts.topics.update({
      email,
      topics: [{ id: topicId, subscription: "opt_in" }],
    });
    if (topics.error) console.error("Resend prisfald topic opt-in:", topics.error);
  } catch (err) {
    console.error("optInPriceAlertTopic:", err);
  }
}

export async function optOutPriceAlertTopic(apiKey: string, email: string): Promise<void> {
  const resend = new Resend(apiKey);
  try {
    const topicId = await ensurePriceAlertTopicId(resend);
    const topics = await resend.contacts.topics.update({
      email,
      topics: [{ id: topicId, subscription: "opt_out" }],
    });
    if (topics.error) console.error("Resend prisfald topic opt-out:", topics.error);
  } catch (err) {
    console.error("optOutPriceAlertTopic:", err);
  }
}
