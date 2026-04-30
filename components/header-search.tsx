"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";

type SearchMode = "vin" | "guides";

const STORAGE_KEY = "vinbot-header-search-mode";
/** Synkroniserer Vin/Guides mellem desktop- og mobil-header (to komponent-instanser). */
const MODE_SYNC_EVENT = "vinbot-header-search-mode-changed";

function readStoredMode(): SearchMode | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "guides" || raw === "vin") return raw;
  } catch {
    /* private mode / quota */
  }
  return null;
}

function persistMode(next: SearchMode, apply: (m: SearchMode) => void) {
  apply(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent<SearchMode>(MODE_SYNC_EVENT, { detail: next }));
  } catch {
    /* ignore */
  }
}

/**
 * Kompakt søgning i header: vælg Vin (feed-søgning på forsiden) eller Guides (/guides?q=…).
 * Sidste valg gemmes i localStorage på tværs af besøg; desktop og mobil holdes synkroniseret.
 */
export function HeaderSearch({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter();
  const formId = useId();
  const [mode, setMode] = useState<SearchMode>("vin");
  const [q, setQ] = useState("");

  useEffect(() => {
    const stored = readStoredMode();
    if (stored) setMode(stored);

    function onSync(e: Event) {
      const ce = e as CustomEvent<SearchMode>;
      if (ce.detail === "vin" || ce.detail === "guides") setMode(ce.detail);
    }
    function onStorage(e: StorageEvent) {
      if (e.key !== STORAGE_KEY || e.newValue == null) return;
      if (e.newValue === "vin" || e.newValue === "guides") setMode(e.newValue);
    }

    window.addEventListener(MODE_SYNC_EVENT, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(MODE_SYNC_EVENT, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const isMobile = variant === "mobile";
  const inputId = `${formId}-${isMobile ? "m" : "d"}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    if (mode === "guides") {
      router.push(v ? `/guides?q=${encodeURIComponent(v)}` : "/guides");
      return;
    }
    if (!v) {
      router.push("/");
      return;
    }
    router.push(`/?q=${encodeURIComponent(v)}`);
  }

  const placeholder =
    mode === "vin" ? "Søg fx sushi, julemad, pinot noir…" : "Søg fx tanniner, Alsace, vin til lam…";

  const shell = isMobile
    ? "mt-3 flex w-full flex-col gap-2 rounded-xl border border-stone-200 bg-white p-2 shadow-sm"
    : "hidden rounded-xl border border-stone-200 bg-white px-2 py-1.5 shadow-sm md:flex md:max-w-[min(100%,28rem)] md:flex-row md:flex-wrap md:items-center md:gap-2";

  return (
    <form
      role="search"
      aria-label={mode === "vin" ? "Søg vin hos forhandlere" : "Søg i Vinbots guides"}
      onSubmit={submit}
      className={shell}
    >
      <div
        className="flex shrink-0 rounded-lg border border-stone-200 bg-stone-100 p-0.5"
        role="group"
        aria-label="Søgetype"
      >
        <button
          type="button"
          aria-pressed={mode === "vin"}
          onClick={() => persistMode("vin", setMode)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
            mode === "vin"
              ? "bg-white text-rose-950 shadow-sm ring-1 ring-stone-200/80"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Vin
        </button>
        <button
          type="button"
          aria-pressed={mode === "guides"}
          onClick={() => persistMode("guides", setMode)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
            mode === "guides"
              ? "bg-white text-rose-950 shadow-sm ring-1 ring-stone-200/80"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          Guides
        </button>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-1.5">
        <label htmlFor={inputId} className="sr-only">
          {mode === "vin" ? "Søg efter vin" : "Søg i guides"}
        </label>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-stone-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input
          id={inputId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-1 py-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-rose-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-950"
        >
          Søg
        </button>
      </div>
    </form>
  );
}
