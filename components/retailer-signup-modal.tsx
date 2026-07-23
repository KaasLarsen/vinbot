"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { FormEvent } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Status = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm outline-none placeholder:text-stone-400 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15";

export function RetailerSignupModal({ open, onClose }: Props) {
  const titleId = useId();
  const [storeName, setStoreName] = useState("");
  const [feedUrl, setFeedUrl] = useState("");
  const [email, setEmail] = useState("");
  const [hasAffiliate, setHasAffiliate] = useState<"yes" | "no" | "">("");
  const [affiliateNetwork, setAffiliateNetwork] = useState("");
  const [wantsCpc, setWantsCpc] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setStoreName("");
    setFeedUrl("");
    setEmail("");
    setHasAffiliate("");
    setAffiliateNetwork("");
    setWantsCpc(false);
    setStatus("idle");
    setErrorMessage(null);
  }, [open]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!storeName.trim()) {
      setErrorMessage("Butiksnavn er påkrævet.");
      return;
    }
    if (!feedUrl.trim()) {
      setErrorMessage("Produkt feed URL er påkrævet.");
      return;
    }
    if (!email.trim()) {
      setErrorMessage("E-mail er påkrævet.");
      return;
    }
    if (hasAffiliate === "") {
      setErrorMessage("Vælg om I samarbejder via et affiliate-netværk.");
      return;
    }
    if (hasAffiliate === "yes" && !affiliateNetwork.trim()) {
      setErrorMessage("Angiv hvilket affiliate-netværk I samarbejder via.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/retailer-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName: storeName.trim(),
          feedUrl: feedUrl.trim(),
          email: email.trim(),
          hasAffiliate: hasAffiliate === "yes",
          affiliateNetwork: hasAffiliate === "yes" ? affiliateNetwork.trim() : undefined,
          wantsCpc: hasAffiliate === "no" ? wantsCpc : false,
        }),
      });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json?.error || "Noget gik galt. Prøv igen.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Kunne ikke sende. Tjek din forbindelse og prøv igen.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-stone-950/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[min(90vh,40rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-stone-200 bg-white shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-stone-100 px-5 py-4">
          <div>
            <h2 id={titleId} className="text-base font-semibold text-stone-900">
              Bliv forhandler på Vinbot
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Fortæl os om jeres butik og produktfeed — vi vender tilbage.{" "}
              <Link
                href="/forhandlere"
                onClick={onClose}
                className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950"
              >
                Læs mere
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Luk
          </button>
        </div>

        {status === "success" ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm font-semibold text-stone-900">Tak for din ansøgning</p>
            <p className="mt-2 text-sm text-stone-600">
              Vi har modtaget oplysningerne og vender tilbage snarest.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
            >
              Luk
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 py-5">
            <label className="block text-sm font-medium text-stone-800">
              Butiksnavn <span className="text-rose-800">*</span>
              <input
                type="text"
                name="storeName"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className={inputClassName}
                autoComplete="organization"
                required
              />
            </label>

            <label className="block text-sm font-medium text-stone-800">
              Produkt feed URL <span className="text-rose-800">*</span>
              <input
                type="url"
                name="feedUrl"
                value={feedUrl}
                onChange={(e) => setFeedUrl(e.target.value)}
                className={inputClassName}
                placeholder="https://…"
                required
              />
            </label>

            <label className="block text-sm font-medium text-stone-800">
              E-mail <span className="text-rose-800">*</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
                autoComplete="email"
                required
              />
            </label>

            <fieldset>
              <legend className="text-sm font-medium text-stone-800">
                Samarbejder I via et affiliate-netværk? <span className="text-rose-800">*</span>
              </legend>
              <p className="mt-1 text-xs text-stone-500">Fx Awin, Adtraction eller Partner-Ads</p>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="radio"
                    name="hasAffiliate"
                    value="yes"
                    checked={hasAffiliate === "yes"}
                    onChange={() => {
                      setHasAffiliate("yes");
                      setWantsCpc(false);
                    }}
                    className="accent-rose-900"
                  />
                  Ja
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-stone-700">
                  <input
                    type="radio"
                    name="hasAffiliate"
                    value="no"
                    checked={hasAffiliate === "no"}
                    onChange={() => setHasAffiliate("no")}
                    className="accent-rose-900"
                  />
                  Nej
                </label>
              </div>
            </fieldset>

            {hasAffiliate === "yes" ? (
              <label className="block text-sm font-medium text-stone-800">
                Hvilket netværk? <span className="text-rose-800">*</span>
                <input
                  type="text"
                  name="affiliateNetwork"
                  value={affiliateNetwork}
                  onChange={(e) => setAffiliateNetwork(e.target.value)}
                  className={inputClassName}
                  placeholder="Awin, Adtraction…"
                  required
                />
              </label>
            ) : null}

            {hasAffiliate === "no" ? (
              <label className="inline-flex items-start gap-2.5 text-sm text-stone-700">
                <input
                  type="checkbox"
                  name="wantsCpc"
                  checked={wantsCpc}
                  onChange={(e) => setWantsCpc(e.target.checked)}
                  className="mt-0.5 accent-rose-900"
                />
                <span>
                  Jeg ønsker en CPC-aftale med vinbot.dk (betalende partner uden affiliate)
                </span>
              </label>
            ) : null}

            {errorMessage ? (
              <p className="text-sm text-rose-800" role="alert">
                {errorMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "submitting" ? "Sender…" : "Send ansøgning"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
