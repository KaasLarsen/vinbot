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
 * Kompakt etiket-scan på telefon — skjult på computer, hvor tastatur-søgning er hurtigere.
 */
export function HomeLabelScanButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 font-medium text-stone-700 underline-offset-2 hover:text-rose-900 hover:underline lg:hidden"
        aria-label="Scan vin-etiket med kamera"
      >
        <CameraIcon className="h-4 w-4" />
        Scan etiket
      </button>
      {open ? <LabelScanner onClose={() => setOpen(false)} /> : null}
    </>
  );
}
