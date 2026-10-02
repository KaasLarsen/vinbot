/** Fælles OpenAI helpers — genbrugt af label-scan og wine-chat. */

export function getOpenAiApiKey(): string | null {
  return process.env.OPENAI_API_KEY?.trim() || null;
}

export function hasOpenAi(): boolean {
  return Boolean(getOpenAiApiKey());
}

export function openAiChatModel(fallback = "gpt-4o-mini"): string {
  return process.env.OPENAI_CHAT_MODEL?.trim() || process.env.OPENAI_VISION_MODEL?.trim() || fallback;
}

export async function openAiChatJson(opts: {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<Record<string, unknown> | null> {
  const key = getOpenAiApiKey();
  if (!key) return null;

  const model = openAiChatModel();
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: opts.temperature ?? 0.4,
        max_tokens: opts.maxTokens ?? 500,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: opts.system },
          { role: "user", content: opts.user },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[openai] HTTP", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;
    return JSON.parse(content) as Record<string, unknown>;
  } catch (err) {
    console.error("[openai] error:", err);
    return null;
  }
}
