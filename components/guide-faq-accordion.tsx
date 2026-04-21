type FaqItem = { question: string; answer: string };

/**
 * Synlig FAQ-accordion (`<details>`) der matcher den FAQ-JSON-LD
 * vi allerede sender til Google. Forbedrer både UX og styrker trust-signalet
 * ved at match visuelt indhold til structured data.
 */
export function GuideFaqAccordion({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="not-prose mt-12 rounded-2xl border border-stone-200 bg-white p-5 sm:p-6" aria-labelledby="guide-faq-heading">
      <h2 id="guide-faq-heading" className="text-xl font-semibold text-stone-900 sm:text-2xl">
        Ofte stillede spørgsmål
      </h2>
      <p className="mt-1 text-sm text-stone-600">Klik på et spørgsmål for svaret.</p>
      <ul className="mt-4 divide-y divide-stone-200 border-t border-stone-200">
        {items.map((item, i) => (
          <li key={`${i}-${item.question}`}>
            <details className="group py-3">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-base font-semibold text-stone-900 marker:content-none hover:text-rose-900 [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="mt-0.5 shrink-0 text-stone-400 group-open:rotate-180 transition-transform" aria-hidden>
                  {"\u25BC"}
                </span>
              </summary>
              <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-stone-700">{item.answer}</div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
