"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { NavSearchKind, NavSearchSuggestion } from "@/lib/nav-search";

type SearchMode = "vin" | "guides";

const STORAGE_KEY = "vinbot-header-search-mode";
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

const KIND_LABEL: Record<NavSearchKind, string> = {
  guide: "Guide",
  recipe: "Opskrift",
  hub: "Overblik",
  quick: "Forslag",
};

const KIND_CLASS: Record<NavSearchKind, string> = {
  guide: "bg-rose-100 text-rose-900",
  recipe: "bg-amber-100 text-amber-950",
  hub: "bg-stone-200 text-stone-800",
  quick: "bg-stone-100 text-stone-700",
};

function useDebouncedValue<T>(value: T, ms: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), ms);
    return () => window.clearTimeout(t);
  }, [value, ms]);
  return debounced;
}

/**
 * Kompakt søgning i header med forslag i dropdown — navigerer til guide/opskrift/hub,
 * ikke til forsidenavnets vin-feed (medmindre brugeren vælger det eksplicit).
 */
export function HeaderSearch({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter();
  const formId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<SearchMode>("vin");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<NavSearchSuggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  const debouncedQ = useDebouncedValue(q, 120);

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

  const fetchSuggestions = useCallback(async (query: string, searchMode: SearchMode) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: query,
        mode: searchMode,
        limit: "8",
      });
      const res = await fetch(`/api/nav-search?${params}`);
      if (!res.ok) throw new Error("nav-search failed");
      const data = (await res.json()) as { suggestions: NavSearchSuggestion[] };
      setSuggestions(data.suggestions ?? []);
      setActiveIndex(-1);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    void fetchSuggestions(debouncedQ, mode);
  }, [debouncedQ, mode, open, fetchSuggestions]);

  useEffect(() => {
    function onDocPointer(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocPointer);
    return () => document.removeEventListener("mousedown", onDocPointer);
  }, []);

  const isMobile = variant === "mobile";
  const inputId = `${formId}-${isMobile ? "m" : "d"}`;

  function navigateTo(s: NavSearchSuggestion) {
    setOpen(false);
    setQ("");
    router.push(s.href);
  }

  function pickSuggestion(index: number) {
    const s = suggestions[index];
    if (s) navigateTo(s);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      pickSuggestion(activeIndex);
      return;
    }
    if (suggestions.length > 0) {
      pickSuggestion(0);
      return;
    }
    if (mode === "guides") {
      router.push(v ? `/guides?q=${encodeURIComponent(v)}` : "/guides");
      setOpen(false);
      return;
    }
    if (v) {
      router.push(`/guides?q=${encodeURIComponent(v)}`);
      setOpen(false);
      return;
    }
    setOpen(true);
    void fetchSuggestions("", mode);
  }

  const placeholder =
    mode === "vin"
      ? "Søg ret, drue, opskrift…"
      : "Søg guide, begreb, region…";

  const shell = isMobile
    ? "mt-3 flex w-full flex-col gap-2 rounded-xl border border-stone-200 bg-white p-2 shadow-sm"
    : "hidden rounded-xl border border-stone-200 bg-white px-2 py-1.5 shadow-sm md:flex md:max-w-[min(100%,28rem)] md:flex-row md:flex-wrap md:items-center md:gap-2";

  const showPanel = open && (loading || suggestions.length > 0 || debouncedQ.trim().length > 0);

  const panel = showPanel ? (
    <div
      className={`z-50 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg ring-1 ring-stone-100 ${
        isMobile ? "mt-2 w-full" : "absolute left-0 right-0 mt-1 min-w-[20rem]"
      }`}
    >
      <ul id={listId} role="listbox" className="max-h-[min(70vh,20rem)] overflow-y-auto py-1">
        {loading && suggestions.length === 0 ? (
          <li className="px-3 py-2.5 text-sm text-stone-500">Henter forslag…</li>
        ) : null}
        {!loading && suggestions.length === 0 ? (
          <li className="px-3 py-2.5 text-sm text-stone-500">Ingen forslag — prøv et andet ord.</li>
        ) : null}
        {suggestions.map((s, i) => (
          <li key={`${s.href}-${s.label}`} role="option" aria-selected={activeIndex === i} id={`${listId}-opt-${i}`}>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => navigateTo(s)}
              className={`flex w-full items-start gap-2 px-3 py-2.5 text-left transition hover:bg-rose-50 ${
                activeIndex === i ? "bg-rose-50" : ""
              }`}
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${KIND_CLASS[s.kind]}`}
              >
                {KIND_LABEL[s.kind]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-stone-900">{s.label}</span>
                {s.description ? (
                  <span className="mt-0.5 line-clamp-1 text-xs text-stone-500">{s.description}</span>
                ) : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {q.trim() && mode === "vin" ? (
        <div className="border-t border-stone-100 bg-stone-50 px-3 py-2 text-xs text-stone-600">
          Vil du se flasker hos forhandlere?{" "}
          <Link
            href={`/?q=${encodeURIComponent(q.trim())}`}
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950"
            onClick={() => setOpen(false)}
          >
            Søg vin på forsiden
          </Link>
        </div>
      ) : null}
      {!q.trim() ? (
        <p className="border-t border-stone-100 bg-stone-50 px-3 py-2 text-xs text-stone-500">
          Klik et forslag — eller skriv og vælg med piletaster + Enter.
        </p>
      ) : null}
    </div>
  ) : null;

  return (
    <div ref={rootRef} className={`${isMobile ? "w-full" : "relative md:min-w-[16rem] md:flex-1"}`}>
      <form
        role="search"
        aria-label={mode === "vin" ? "Søg vin og mad på Vinbot" : "Søg i Vinbots guides"}
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
            onClick={() => {
              persistMode("vin", setMode);
              if (open) void fetchSuggestions(debouncedQ, "vin");
            }}
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
            onClick={() => {
              persistMode("guides", setMode);
              if (open) void fetchSuggestions(debouncedQ, "guides");
            }}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
              mode === "guides"
                ? "bg-white text-rose-950 shadow-sm ring-1 ring-stone-200/80"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Guides
          </button>
        </div>

        <div className="relative flex min-w-0 flex-1 items-center gap-1.5">
          <label htmlFor={inputId} className="sr-only">
            {mode === "vin" ? "Søg efter vin og mad" : "Søg i guides"}
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
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
            autoComplete="off"
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              setOpen(true);
              void fetchSuggestions(q, mode);
            }}
            onKeyDown={(e) => {
              if (!showPanel || suggestions.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((i) => (i + 1) % suggestions.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
              } else if (e.key === "Escape") {
                setOpen(false);
                setActiveIndex(-1);
              }
            }}
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

      {panel}
    </div>
  );
}
