"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { ProductHit } from "@/lib/search/types";
import { tasteContextForApi } from "@/lib/taste/storage";
import { useTasteProfile } from "@/lib/taste/use-taste-profile";

const EXAMPLES = [
  "Jeg har tre slatne gulerødder, et kyllingebryst og gedeost. Hvilken vin?",
  "Pasta, tomat og basilikum — hvad skal jeg købe i Føtex?",
  "Rester af grillkød og salat. Rød eller hvid?",
] as const;

type ChatMsg = {
  role: "user" | "assistant";
  text: string;
  products?: ProductHit[];
};

export function WineFridgeChat({ className = "" }: { className?: string }) {
  const inputId = useId();
  const { ready } = useTasteProfile();
  const [available, setAvailable] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/wine-chat")
      .then((r) => r.json())
      .then((j: { available?: boolean }) => {
        // Chat er altid tilgængelig (AI eller katalog-fallback).
        if (!cancelled) setAvailable(j.available !== false);
      })
      .catch(() => {
        // Vis stadig UI — POST håndterer fejl.
        if (!cancelled) setAvailable(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const send = useCallback(
    async (text: string) => {
      const message = text.trim();
      if (!message || loading) return;
      setError(null);
      setInput("");
      setMessages((prev) => [...prev, { role: "user", text: message }]);
      setLoading(true);
      try {
        const res = await fetch("/api/wine-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message,
            taste: tasteContextForApi(),
          }),
        });
        const json = (await res.json()) as {
          ok?: boolean;
          reply?: string;
          products?: ProductHit[];
          error?: string;
        };
        if (!res.ok || !json.ok) {
          setError(json.error || "Kunne ikke hente svar.");
          return;
        }
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: json.reply || "Her er nogle forslag.",
            products: json.products || [],
          },
        ]);
      } catch {
        setError("Netværksfejl. Prøv igen.");
      } finally {
        setLoading(false);
      }
    },
    [loading],
  );

  if (available === false) {
    return null;
  }

  return (
    <section
      className={`rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-sm sm:p-5 ${className}`}
      aria-labelledby="fridge-chat-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90">AI-chat</p>
      <h2 id="fridge-chat-heading" className="mt-1 text-lg font-semibold tracking-tight text-stone-900">
        Hvad har du i køleskabet?
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-600">
        Skriv fritekst — Vinbot foreslår vine hos danske forhandlere
        {ready ? " (tilpasset din smagsprofil)" : ""}.
      </p>

      {messages.length === 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {EXAMPLES.map((ex) => (
            <li key={ex}>
              <button
                type="button"
                onClick={() => void send(ex)}
                disabled={loading || available === null}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-left text-sm text-stone-700 hover:border-rose-300 hover:bg-rose-50 disabled:opacity-50"
              >
                {ex}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 max-h-80 space-y-3 overflow-y-auto" aria-live="polite">
          {messages.map((m, i) => (
            <div key={`${m.role}-${i}`} className={m.role === "user" ? "text-right" : ""}>
              <div
                className={`inline-block max-w-[95%] rounded-2xl px-3 py-2 text-left text-sm ${
                  m.role === "user"
                    ? "bg-rose-900 text-white"
                    : "border border-stone-200 bg-stone-50 text-stone-800"
                }`}
              >
                {m.text}
              </div>
              {m.products && m.products.length > 0 ? (
                <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                  {m.products.map((p) => (
                    <li key={`${p.url}-${p.title}`}>
                      <ProductCard product={p} placement="wine-chat" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
          {loading ? <p className="text-sm text-stone-500">Tænker…</p> : null}
        </div>
      )}

      {error ? <p className="mt-2 text-sm text-rose-800">{error}</p> : null}

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Beskriv hvad du har i køleskabet
        </label>
        <input
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Fx kylling, gedeost, gulerødder…"
          disabled={loading || available === null}
          className="min-w-0 flex-1 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-base text-stone-900 placeholder:text-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || available === null}
          className="shrink-0 rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-800 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </section>
  );
}
