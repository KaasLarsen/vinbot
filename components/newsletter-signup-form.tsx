"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm outline-none placeholder:text-stone-400 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15";

type Props = {
  /** Compact variant for footer; default is a bit more spacious (fx /tilbud). */
  variant?: "footer" | "section";
  className?: string;
};

export function NewsletterSignupForm({ variant = "footer", className = "" }: Props) {
  const formId = useId();
  const emailId = `${formId}-email`;
  const consentId = `${formId}-consent`;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("E-mail er påkrævet.");
      return;
    }
    if (!consent) {
      setErrorMessage("Du skal give samtykke for at tilmelde dig.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), consent: true }),
      });
      const json = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json?.error || "Noget gik galt. Prøv igen.");
        return;
      }
      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMessage("Kunne ikke sende. Tjek din forbindelse og prøv igen.");
    }
  }

  if (status === "success") {
    return (
      <div className={className} role="status">
        <p className="text-sm font-semibold text-stone-900">Tak — du er tilmeldt</p>
        <p className="mt-1 text-sm text-stone-600">
          Du får snart en velkomstmail. Se også{" "}
          <Link href="/tilbud" className="font-medium text-rose-900 hover:underline">
            aktuelle tilbud
          </Link>
          .
        </p>
      </div>
    );
  }

  const isFooter = variant === "footer";
  const compactInput =
    "min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15";

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-2.5 ${className}`}>
      {isFooter ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Nyhedsbrev</p>
          <p className="text-sm text-stone-600">Få gode tilbud i din mailbox — plus nyheder og tips.</p>
        </>
      ) : (
        <p className="text-sm font-medium text-stone-800">Få tilbud i indbakken</p>
      )}

      <label htmlFor={emailId} className="sr-only">
        E-mail
      </label>
      {isFooter ? (
        <input
          id={emailId}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClassName}
          placeholder="din@email.dk"
          autoComplete="email"
          required
        />
      ) : (
        <div className="flex gap-2">
          <input
            id={emailId}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={compactInput}
            placeholder="din@email.dk"
            autoComplete="email"
            required
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="shrink-0 rounded-lg bg-rose-900 px-3.5 py-2 text-sm font-semibold text-white hover:bg-rose-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "…" : "Tilmeld"}
          </button>
        </div>
      )}

      <label
        htmlFor={consentId}
        className={`flex min-w-0 items-start gap-2 leading-snug text-stone-500 ${isFooter ? "text-xs text-stone-600" : "text-[11px]"}`}
      >
        <input
          id={consentId}
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className={`${isFooter ? "mt-0.5 size-4" : "mt-0.5 size-3.5"} shrink-0 accent-rose-900`}
          required
        />
        <span className="min-w-0">
          {isFooter ? (
            <>
              Jeg samtykker til at Vinbot sender mig nyhedsbrev med tilbud og nyheder. Jeg kan afmelde mig når som helst. Se{" "}
              <Link href="/privatliv" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950">
                privatlivspolitik
              </Link>
              .
            </>
          ) : (
            <>
              Ja tak — se{" "}
              <Link href="/privatliv" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950">
                privatliv
              </Link>
              .
            </>
          )}
        </span>
      </label>

      {errorMessage ? (
        <p className="text-sm text-rose-800" role="alert">
          {errorMessage}
        </p>
      ) : null}

      {isFooter ? (
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Tilmelder…" : "Tilmeld nyhedsbrev"}
        </button>
      ) : null}
    </form>
  );
}
