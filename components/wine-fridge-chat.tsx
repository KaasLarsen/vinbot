"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { ProductHit } from "@/lib/search/types";
import { tasteContextForApi } from "@/lib/taste/storage";

const CHIPS = [
  {
    label: "Pasta og tomat",
    message: "Pasta, tomat og basilikum — hvad skal jeg købe i Føtex?",
  },
  {
    label: "Grillkød",
    message: "Rester af grillkød og salat. Rød eller hvid?",
  },
  {
    label: "Køleskabet",
    message: "Jeg har tre slatne gulerødder, et kyllingebryst og gedeost. Hvilken vin?",
  },
  {
    label: "Under 100 kr",
    message: "Hverdagsvin under 100 kr til pasta og tomat.",
  },
] as const;

const INITIAL_VISIBLE = 4;
const PAGE_MORE = 4;

type ChatMsg = {
  role: "user" | "assistant";
  text: string;
  products?: ProductHit[];
  /** Hvor mange flasker der vises for dette svar. Nye svar starter på 4. */
  visibleCount?: number;
};

export function WineFridgeChat({ className = "" }: { className?: string }) {
  const inputId = useId();
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
        if (res.status === 502 || res.status === 504) {
          setError("Søgningen tog for lang tid. Prøv igen.");
          return;
        }
        let json: {
          ok?: boolean;
          reply?: string;
          products?: ProductHit[];
          error?: string;
        };
        try {
          json = (await res.json()) as typeof json;
        } catch {
          setError("Søgningen tog for lang tid. Prøv igen.");
          return;
        }
        if (!res.ok || !json.ok) {
          setError(json.error || "Kunne ikke hente svar.");
          return;
        }
        const products = json.products || [];
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: json.reply || "Her er nogle forslag.",
            products,
            visibleCount: Math.min(INITIAL_VISIBLE, products.length),
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

  const chatting = messages.length > 0;

  return (
    <section className={className} aria-labelledby="home-ask-heading">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          Spørg Vinbot om vin
        </label>
        <input
          id={inputId}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ret, køleskab, stemning eller budget…"
          disabled={loading || available === null}
          className="min-w-0 flex-1 rounded-2xl border border-white/80 bg-white px-4 py-3.5 text-base text-stone-900 shadow-lg ring-1 ring-rose-200/60 placeholder:text-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200 sm:py-4 sm:text-lg"
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || available === null}
          className="shrink-0 rounded-2xl bg-rose-900 px-5 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-rose-800 disabled:opacity-50 sm:px-6"
        >
          Spørg
        </button>
      </form>

      {chatting ? null : (
        <ul className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <li key={chip.label}>
              <button
                type="button"
                onClick={() => void send(chip.message)}
                disabled={loading || available === null}
                className="rounded-full border border-stone-200/90 bg-white/90 px-3 py-1.5 text-sm text-stone-700 shadow-sm hover:border-rose-300 hover:bg-rose-50 disabled:opacity-50"
              >
                {chip.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      {chatting ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/40" aria-live="polite">
          {messages.map((m, i) => {
            const products = m.products ?? [];
            const visibleCount = m.visibleCount ?? INITIAL_VISIBLE;
            const visibleProducts = products.slice(0, visibleCount);
            const remaining = products.length - visibleProducts.length;
            return (
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
                {visibleProducts.length > 0 ? (
                  <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                    {visibleProducts.map((p) => (
                      <li key={`${p.url}-${p.title}`}>
                        <ProductCard product={p} placement="wine-chat" />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {remaining > 0 ? (
                  <div className="mt-3 flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        setMessages((prev) =>
                          prev.map((msg, idx) =>
                            idx === i
                              ? {
                                  ...msg,
                                  visibleCount: Math.min(
                                    (msg.visibleCount ?? INITIAL_VISIBLE) + PAGE_MORE,
                                    msg.products?.length ?? 0,
                                  ),
                                }
                              : msg,
                          ),
                        )
                      }
                      className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm hover:border-rose-400 hover:bg-rose-50"
                    >
                      Se flere forslag
                    </button>
                    <p className="text-xs text-stone-500">+{Math.min(PAGE_MORE, remaining)} næste</p>
                  </div>
                ) : null}
              </div>
            );
          })}
          {loading ? <p className="text-sm text-stone-500">Tænker…</p> : null}
        </div>
      ) : null}

      {error ? <p className="mt-2 text-sm text-rose-800">{error}</p> : null}
    </section>
  );
}
