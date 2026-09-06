export type VisionWineGuess = {
  /** Fri tekst der beskriver etiketten (navn, producent, årgang, drue…). */
  rawText: string;
  /** Kort søgestreng til katalog/søgning. */
  query: string;
};

const SYSTEM = `Du aflæser vinflaske-etiketter. Svar KUN med JSON:
{"producer":"...","name":"...","vintage":"...","region":"...","grapes":"...","query":"..."}
- query: 3–6 ord der bedst finder vinen i en dansk webshop (producent + navn, evt. årgang).
- Brug tom streng for ukendte felter.
- Ignorér alkohol%, volumen, barcode og marketing-slogans.`;

/**
 * OpenAI Vision (gpt-4o-mini) — kun når OPENAI_API_KEY er sat.
 * Returnerer null hvis nøgle mangler eller kaldet fejler.
 */
export async function extractWineFromLabelImage(
  imageDataUrl: string,
): Promise<VisionWineGuess | null> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;

  const model = process.env.OPENAI_VISION_MODEL?.trim() || "gpt-4o-mini";

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens: 300,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Aflæs vin-etiketten på billedet.",
              },
              {
                type: "image_url",
                image_url: { url: imageDataUrl, detail: "low" },
              },
            ],
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error("[label-scan] OpenAI HTTP", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;

    const parsed = JSON.parse(content) as Record<string, unknown>;
    const parts = ["producer", "name", "vintage", "region", "grapes"]
      .map((k) => String(parsed[k] ?? "").trim())
      .filter(Boolean);
    const query = String(parsed.query ?? "").trim() || parts.slice(0, 4).join(" ");
    const rawText = parts.join(" ") || query;
    if (!rawText.trim()) return null;
    return { rawText, query };
  } catch (err) {
    console.error("[label-scan] OpenAI error:", err);
    return null;
  }
}

export function hasOpenAiVision(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
