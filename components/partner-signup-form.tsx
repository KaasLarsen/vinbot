"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15";

export function PartnerSignupForm() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/partnere/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, website, email, password, message }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Noget gik galt.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Netværksfejl. Prøv igen.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/90 px-5 py-6 text-stone-800">
        <p className="font-semibold text-emerald-950">Tak — ansøgningen er sendt.</p>
        <p className="mt-2 text-sm leading-relaxed text-emerald-950/80">
          Vi aftaler CPC og aktiverer jeres konto. Når den er aktiv, kan I{" "}
          <Link href="/partnere/login" className="font-medium underline underline-offset-2">
            logge ind
          </Link>{" "}
          og se klikstatistik.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="cpc-name" className="text-sm font-medium text-stone-800">
            Butiksnavn
          </label>
          <input
            id="cpc-name"
            className={inputClassName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="organization"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cpc-website" className="text-sm font-medium text-stone-800">
            Website
          </label>
          <input
            id="cpc-website"
            className={inputClassName}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://jeres-shop.dk"
            required
            autoComplete="url"
          />
        </div>
        <div>
          <label htmlFor="cpc-email" className="text-sm font-medium text-stone-800">
            E-mail
          </label>
          <input
            id="cpc-email"
            type="email"
            className={inputClassName}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="cpc-password" className="text-sm font-medium text-stone-800">
            Adgangskode
          </label>
          <input
            id="cpc-password"
            type="password"
            className={inputClassName}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Mindst 8 tegn"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cpc-message" className="text-sm font-medium text-stone-800">
          Besked <span className="font-normal text-stone-500">(valgfrit)</span>
        </label>
        <textarea
          id="cpc-message"
          className={`${inputClassName} min-h-[5.5rem] resize-y`}
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Fx ønsket CPC, sortiment eller feed-status"
        />
      </div>

      {errorMessage ? (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-900" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-xl bg-rose-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-950 disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sender…" : "Send ansøgning"}
      </button>

      <p className="text-xs leading-relaxed text-stone-500">
        CPC aftales med os og kan ikke ændres af jer. Har I konto?{" "}
        <Link href="/partnere/login" className="font-medium text-rose-900 underline underline-offset-2">
          Log ind
        </Link>
      </p>
    </form>
  );
}
