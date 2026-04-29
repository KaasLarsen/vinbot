import Link from "next/link";

import type { CanonicalWine } from "@/lib/vine/types";
import {
  vineEditorialBridgeParagraphs,
  type VineProductFaqItem,
} from "@/lib/vine/editorial-product-copy";

export function VineProfileEditorial({ wine }: { wine: CanonicalWine }) {
  const paragraphs = vineEditorialBridgeParagraphs(wine);
  return (
    <section
      className="mt-8 rounded-2xl border border-stone-200 bg-stone-50/60 px-5 py-6"
      aria-labelledby="vine-editorial-heading"
    >
      <h2 id="vine-editorial-heading" className="text-xl font-semibold text-stone-900">
        Om Vinbots vinprofiler
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-stone-700">
        {paragraphs.map((p, i) => (
          <p key={`vine-editorial-${i}`}>{p}</p>
        ))}
      </div>
      <p className="mt-4 text-sm text-stone-600">
        <Link
          href="/redaktionel-proces"
          className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
        >
          Redaktionel proces
        </Link>{" "}
        — hvordan Vinbot skriver, kilder og adskiller redaktion fra prislinks.
      </p>
    </section>
  );
}

export function VineProfileFaq({ items }: { items: VineProductFaqItem[] }) {
  return (
    <section
      className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      aria-labelledby="vine-faq-heading"
    >
      <h2 id="vine-faq-heading" className="text-xl font-semibold text-stone-900">
        Ofte stillede spørgsmål om denne vinprofil
      </h2>
      <dl className="mt-6 space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-medium text-stone-900">{item.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-stone-700">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}