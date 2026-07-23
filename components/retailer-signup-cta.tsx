"use client";

import { useState } from "react";
import { RetailerSignupModal } from "@/components/retailer-signup-modal";

export function RetailerSignupCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-fit text-left font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 transition hover:text-rose-950 hover:decoration-rose-500"
      >
        Bliv forhandler på Vinbot
      </button>
      <RetailerSignupModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
