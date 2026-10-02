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

export type OpenAiChatError = {
  status: number | null;
  code: string;
  message: string;
};

export type OpenAiChatJsonResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; error: OpenAiChatError };

function sanitizeOpenAiError(status: number | null, bodyText: string): OpenAiChatError {
  let code = "http_error";
  let message = "OpenAI-kaldet fejlede.";
  try {
    const parsed = JSON.parse(bodyText) as {
      error?: { code?: string | null; type?: string; message?: string };
    };
    const err = parsed.error;
    if (err?.code) code = String(err.code);
    else if (err?.type) code = String(err.type);
    if (typeof err?.message === "string" && err.message.trim()) {
      // Undgå at lække nøgle/org-id — kun korte, generiske beskeder til klient.
      const raw = err.message.trim();
      if (/incorrect api key|invalid api key|authentication/i.test(raw)) {
        code = "invalid_api_key";
        message = "OpenAI API-nøglen er ugyldig.";
      } else if (/quota|billing|insufficient/i.test(raw)) {
        code = "insufficient_quota";
        message = "OpenAI-kontoen har ingen kredit/kvote.";
      } else if (/model/i.test(raw) && /not found|does not exist|unsupported/i.test(raw)) {
        code = "model_not_found";
        message = "OpenAI-modellen findes ikke eller understøttes ikke.";
      } else if (/rate limit/i.test(raw)) {
        code = "rate_limit_exceeded";
        message = "OpenAI rate limit — prøv igen om lidt.";
      } else {
        message = raw.slice(0, 160);
      }
    }
  } catch {
    if (status === 401) {
      code = "invalid_api_key";
      message = "OpenAI API-nøglen er ugyldig.";
    } else if (status === 429) {
      code = "rate_limit_exceeded";
      message = "OpenAI rate limit — prøv igen om lidt.";
    }
  }
  return { status, code, message };
}

export async function openAiChatJson(opts: {
  system: string;
  user: string;
  maxTokens?: number;
  temperature?: number;
}): Promise<OpenAiChatJsonResult> {
  const key = getOpenAiApiKey();
  if (!key) {
    return { ok: false, error: { status: null, code: "no_key", message: "OPENAI_API_KEY mangler." } };
  }

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
      const bodyText = await res.text().catch(() => "");
      console.error("[openai] HTTP", res.status, bodyText.slice(0, 500));
      return { ok: false, error: sanitizeOpenAiError(res.status, bodyText) };
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return {
        ok: false,
        error: { status: res.status, code: "empty_content", message: "OpenAI returnerede et tomt svar." },
      };
    }
    try {
      return { ok: true, data: JSON.parse(content) as Record<string, unknown> };
    } catch {
      return {
        ok: false,
        error: { status: res.status, code: "bad_json", message: "OpenAI-svaret kunne ikke parses som JSON." },
      };
    }
  } catch (err) {
    console.error("[openai] error:", err);
    return {
      ok: false,
      error: {
        status: null,
        code: "network",
        message: err instanceof Error ? err.message.slice(0, 160) : "Netværksfejl til OpenAI.",
      },
    };
  }
}
