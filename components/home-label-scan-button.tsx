"use client";

import { useState } from "react";
import { LabelScanner } from "@/components/label-scanner";

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 7 10.2 5.4A1.5 1.5 0 0 1 11.4 5h1.2a1.5 1.5 0 0 1 1.2.6L15 7h2.5A2.5 2.5 0 0 1 20 9.5v7A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-7A2.5 2.5 0 0 1 6.5 7H9Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="13" r="3.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/**
 * Tydelig kamera-CTA til forsiden — åbner etiket-scanner (adskilt fra stregkode-scan i søgefeltet).
 */
export function HomeLabelScanButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-5 flex flex-col items-center sm:items-start">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group flex w-full max-w-sm flex-col items-center gap-2 rounded-2xl border border-rose-900/15 bg-white/90 px-5 py-4 text-center shadow-md ring-1 ring-rose-200/60 backdrop-blur-sm transition hover:border-rose-900/25 hover:shadow-lg active:scale-[0.99] sm:max-w-md sm:flex-row sm:text-left"
          aria-label="Scan vin-etiket med kamera"
        >
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-900 text-white shadow-sm transition group-hover:bg-rose-950">
            <CameraIcon className="h-7 w-7" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-semibold text-stone-900">Scan etiket</span>
            <span className="mt-0.5 block text-sm leading-snug text-stone-600">
              Tag et billede i butikken eller til middagen — vi finder tilbud og guide.
            </span>
          </span>
        </button>
      </div>
      {open ? <LabelScanner onClose={() => setOpen(false)} /> : null}
    </>
  );
}
