"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import {
  AGE_CONFIRM_EVENT,
  clearStoredAgeConfirm,
  getStoredAgeConfirm,
  isUnder18AllowedPath,
  setStoredAgeConfirm,
  type AgeConfirmChoice,
} from "@/lib/age-confirm";
import { useIsClient } from "@/lib/use-is-client";

function subscribe(onChange: () => void) {
  window.addEventListener(AGE_CONFIRM_EVENT, onChange);
  return () => window.removeEventListener(AGE_CONFIRM_EVENT, onChange);
}

/**
 * Første besøg: bekræft 18+. Valget ligger kun i browseren, så sidernes HTML
 * stadig kan læses af søgemaskiner. Under 18 ser en kort spærre — ikke shop-links.
 */
export function AgeGate() {
  const pathname = usePathname() || "/";
  const titleId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();
  const choice = useSyncExternalStore(subscribe, getStoredAgeConfirm, (): AgeConfirmChoice | null => null);

  const allowedForUnder18 = choice === "under" && isUnder18AllowedPath(pathname);
  const blocking = isClient && (choice === null || (choice === "under" && !allowedForUnder18));

  useEffect(() => {
    if (!blocking) return;
    const overlay = overlayRef.current;
    const siblings = [...document.body.children].filter((el) => el !== overlay);
    siblings.forEach((el) => el.setAttribute("inert", ""));
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      siblings.forEach((el) => el.removeAttribute("inert"));
      document.body.style.overflow = previous;
    };
  }, [blocking]);

  if (!isClient || choice === "adult") return null;

  if (choice === "under" && allowedForUnder18) {
    return (
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-sm text-amber-950">
        Du har angivet, at du er under 18. Vinbot sælger ikke alkohol.{" "}
        <button
          type="button"
          className="font-medium underline decoration-amber-400 underline-offset-2 hover:text-amber-900"
          onClick={() => clearStoredAgeConfirm()}
        >
          Skift valg
        </button>
      </div>
    );
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] flex items-end justify-center bg-stone-950/50 p-4 sm:items-center"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8"
      >
        {choice === "under" ? (
          <>
            <h2 id={titleId} className="text-2xl font-semibold text-stone-900">
              Vinbot er for voksne
            </h2>
            <p className="mt-3 leading-relaxed text-stone-700">
              Sitet handler om vin, øl og spiritus og er for personer, der er fyldt 18. Vinbot sælger ikke alkohol. Du kan læse om alkoholfri vin, eller skifte dit valg, hvis du kom til at trykke forkert.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link
                href="/alkoholfri-vin"
                className="inline-flex justify-center rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
              >
                Læs om alkoholfri vin
              </Link>
              <button
                type="button"
                onClick={() => clearStoredAgeConfirm()}
                className="inline-flex justify-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                Skift valg
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id={titleId} className="text-2xl font-semibold text-stone-900">
              Er du fyldt 18?
            </h2>
            <p className="mt-3 leading-relaxed text-stone-700">
              Vinbot er for voksne. Vi sælger ikke alkohol — køb, betaling og butikkens egen alderskontrol sker hos forhandleren. Vi bruger 18 år som grænse her, fordi sitet også dækker spiritus, hedvin og links til netbutikker.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setStoredAgeConfirm("under")}
                className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50"
              >
                Jeg er under 18
              </button>
              <button
                type="button"
                onClick={() => setStoredAgeConfirm("adult")}
                className="rounded-xl bg-rose-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
              >
                Jeg er fyldt 18
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
