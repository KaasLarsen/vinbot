"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Kompakt søge-input i headeren. Submitter til /?q=… så brugeren lander i
 * hovedsøgningen på forsiden, uanset hvilken underside de kom fra.
 */
export function HeaderSearch({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    if (!v) {
      router.push("/");
      return;
    }
    router.push(`/?q=${encodeURIComponent(v)}`);
  }

  const isMobile = variant === "mobile";
  return (
    <form
      role="search"
      aria-label="Søg vin"
      onSubmit={submit}
      className={
        isMobile
          ? "mt-3 flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-2 py-1.5 shadow-sm"
          : "hidden items-center gap-2 rounded-xl border border-stone-200 bg-white px-2 py-1.5 shadow-sm md:flex"
      }
    >
      <label htmlFor={isMobile ? "hdr-search-m" : "hdr-search-d"} className="sr-only">
        Søg vin
      </label>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="ml-1 h-4 w-4 shrink-0 text-stone-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <input
        id={isMobile ? "hdr-search-m" : "hdr-search-d"}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Søg fx sushi, julemad, pinot noir…"
        className={`min-w-0 flex-1 bg-transparent px-1 py-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none ${
          isMobile ? "" : "w-56"
        }`}
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg bg-rose-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-950"
      >
        Søg
      </button>
    </form>
  );
}
