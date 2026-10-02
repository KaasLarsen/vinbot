/** Fælles OpenAI helpers — genbrugt af label-scan og wine-chat. */

/** Strip whitespace/quotes that often sneaks ind fra Vercel env-UI. */
export function getOpenAiApiKey(): string | null {
  const raw = process.env.OPENAI_API_KEY;
  if (!raw) return null;
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1).trim();
  }
  // Fjern utilsigtede newlines/spaces midt i nøglen (copy-paste).
  key = key.replace(/\s+/g, "");
  if (!key) return null;
  return key;
}

export function hasOpenAi(): boolean {
  const key = getOpenAiApiKey();
  // Kræv sk-prefix så placeholders ikke tæller som «konfigureret».
  return Boolean(key && key.startsWith("sk-"));
}

export function openAiKeyMeta(): {
  present: boolean;
  looksValid: boolean;
  length: number;
  prefix: string | null;
} {
  const raw = process.env.OPENAI_API_KEY?.trim() ?? "";
  const key = getOpenAiApiKey();
  return {
    present: Boolean(raw),
    looksValid: Boolean(key && key.startsWith("sk-")),
    length: key?.length ?? 0,
    prefix: key ? `${key.slice(0, 7)}…` : null,
  };
}

/**
 * Chat-model: kun OPENAI_CHAT_MODEL (eller default).
 * Brug ikke VISION-modellen her — den kan pege på en model uden json_object.
 */
export function openAiChatModel(fallback = "gpt-4o-mini"): string {
  const fromEnv = process.env.OPENAI_CHAT_MODEL?.trim().replace(/^["']|["']$/g, "");
  return fromEnv || fallback;
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
      const raw = err.message.trim();
      if (/incorrect api key|invalid api key|authentication|invalid_api_key/i.test(raw)) {
        code = "invalid_api_key";
        message = "OpenAI API-nøglen er ugyldig.";
      } else if (/quota|billing|insufficient/i.test(raw)) {
        code = "insufficient_quota";
        message = "OpenAI-kontoen har ingen kredit/kvote.";
      } else if (/model/i.test(raw) && /not found|does not exist|unsupported|does not support/i.test(raw)) {
        code = "model_not_found";
        message = "OpenAI-modellen findes ikke eller understøttes ikke.";
      } else if (/rate limit/i.test(raw)) {
        code = "rate_limit_exceeded";
        message = "OpenAI rate limit — prøv igen om lidt.";
      } else if (/country|region|not available/i.test(raw)) {
        code = "region_blocked";
        message = "OpenAI er ikke tilgængelig fra denne region.";
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

async function callChatCompletions(opts: {
  key: string;
  model: string;
  system: string;
  user: string;
  maxTokens: number;
  temperature: number;
  jsonMode: boolean;
}): Promise<OpenAiChatJsonResult> {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${opts.key}`,
    "Content-Type": "application/json",
  };
  const org = process.env.OPENAI_ORG_ID?.trim().replace(/^["']|["']$/g, "");
  const project = process.env.OPENAI_PROJECT_ID?.trim().replace(/^["']|["']$/g, "");
  if (org) headers["OpenAI-Organization"] = org;
  if (project) headers["OpenAI-Project"] = project;

  const body: Record<string, unknown> = {
    model: opts.model,
    temperature: opts.temperature,
    max_tokens: opts.maxTokens,
    messages: [
      { role: "system", content: opts.system },
      { role: "user", content: opts.user },
    ],
  };
  if (opts.jsonMode) {
    body.response_format = { type: "json_object" };
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    console.error("[openai] HTTP", res.status, opts.model, bodyText.slice(0, 500));
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

  // Strip optional markdown fences if jsonMode was off.
  const cleaned = content.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  try {
    return { ok: true, data: JSON.parse(cleaned) as Record<string, unknown> };
  } catch {
    return {
      ok: false,
      error: { status: res.status, code: "bad_json", message: "OpenAI-svaret kunne ikke parses som JSON." },
    };
  }
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
  if (!key.startsWith("sk-")) {
    return {
      ok: false,
      error: {
        status: null,
        code: "invalid_api_key",
        message: "OPENAI_API_KEY ligner ikke en OpenAI-nøgle (skal starte med sk-).",
      },
    };
  }

  const primary = openAiChatModel();
  const models = primary === "gpt-4o-mini" ? ["gpt-4o-mini"] : [primary, "gpt-4o-mini"];
  const maxTokens = opts.maxTokens ?? 500;
  const temperature = opts.temperature ?? 0.4;

  let lastError: OpenAiChatError | null = null;

  for (const model of models) {
    // Først med json_object; hvis modellen ikke understøtter det, prøv uden.
    for (const jsonMode of [true, false]) {
      try {
        const result = await callChatCompletions({
          key,
          model,
          system: opts.system,
          user: opts.user,
          maxTokens,
          temperature,
          jsonMode,
        });
        if (result.ok) return result;
        lastError = result.error;
        // Ugyldig nøgle/kvote: stop med det samme.
        if (
          result.error.code === "invalid_api_key" ||
          result.error.code === "insufficient_quota" ||
          result.error.code === "rate_limit_exceeded"
        ) {
          return result;
        }
        // model_not_found → prøv næste model; andre fejl → prøv uden jsonMode / næste model.
        if (result.error.code === "model_not_found") break;
      } catch (err) {
        console.error("[openai] error:", err);
        lastError = {
          status: null,
          code: "network",
          message: err instanceof Error ? err.message.slice(0, 160) : "Netværksfejl til OpenAI.",
        };
      }
    }
  }

  return {
    ok: false,
    error: lastError ?? { status: null, code: "http_error", message: "OpenAI-kaldet fejlede." },
  };
}

/** Hurtig models/list-probe — bruges til diagnose uden at bruge mange tokens. */
export async function probeOpenAi(): Promise<OpenAiChatJsonResult> {
  const key = getOpenAiApiKey();
  if (!key || !key.startsWith("sk-")) {
    return {
      ok: false,
      error: {
        status: null,
        code: key ? "invalid_api_key" : "no_key",
        message: key
          ? "OPENAI_API_KEY ligner ikke en OpenAI-nøgle (skal starte med sk-)."
          : "OPENAI_API_KEY mangler.",
      },
    };
  }

  try {
    const headers: Record<string, string> = { Authorization: `Bearer ${key}` };
    const org = process.env.OPENAI_ORG_ID?.trim().replace(/^["']|["']$/g, "");
    const project = process.env.OPENAI_PROJECT_ID?.trim().replace(/^["']|["']$/g, "");
    if (org) headers["OpenAI-Organization"] = org;
    if (project) headers["OpenAI-Project"] = project;

    const res = await fetch("https://api.openai.com/v1/models/gpt-4o-mini", {
      method: "GET",
      headers,
    });
    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      console.error("[openai] probe HTTP", res.status, bodyText.slice(0, 500));
      return { ok: false, error: sanitizeOpenAiError(res.status, bodyText) };
    }
    return { ok: true, data: { model: "gpt-4o-mini", reachable: true } };
  } catch (err) {
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
