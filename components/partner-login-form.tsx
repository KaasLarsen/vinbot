"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

const inputClassName =
  "mt-1.5 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm outline-none placeholder:text-stone-400 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15";

export function PartnerLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (signError) {
        setError("Forkert e-mail eller adgangskode.");
        return;
      }
      router.push("/partnere/dashboard");
      router.refresh();
    } catch {
      setError("Netværksfejl. Prøv igen.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="text-sm font-medium text-stone-800">
          E-mail
        </label>
        <input
          id="login-email"
          type="email"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="text-sm font-medium text-stone-800">
          Adgangskode
        </label>
        <input
          id="login-password"
          type="password"
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>
      {error ? (
        <p className="text-sm text-rose-800" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-950 disabled:opacity-60"
      >
        {submitting ? "Logger ind…" : "Log ind"}
      </button>
      <p className="text-xs text-stone-500">
        Ingen konto?{" "}
        <Link href="/partnere" className="font-medium text-rose-900 underline underline-offset-2">
          Ansøg her
        </Link>
      </p>
    </form>
  );
}
