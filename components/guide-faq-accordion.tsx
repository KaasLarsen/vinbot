type FaqItem = { question: string; answer: string };

/**
 * Synlig FAQ-accordion (`<details>`) der matcher FAQ-JSON-LD.
 * Tydelig sektion med eyebrow, så det ikke ligner almindelig brødtekst.
 */
export function GuideFaqAccordion({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section
      className="not-prose mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8"
      aria-labelledby="guide-faq-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-800">FAQ</p>
      <h2 id="guide-faq-heading" className="mt-1 text-xl font-semibold text-stone-900 sm:text-2xl">
        Ofte stillede spørgsmål
      </h2>
      <p className="mt-1 text-sm text-stone-600">Klik på et spørgsmål for at se svaret.</p>
      <ul className="mt-6 divide-y divide-stone-200 overflow-hidden rounded-xl border border-stone-200 bg-white">
        {items.map((item, i) => (
          <li key={`${i}-${item.question}`}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-4 py-4 text-left text-base font-semibold text-stone-900 marker:content-none hover:bg-stone-50 sm:px-5 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 leading-snug">{item.question}</span>
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 text-sm text-stone-500 transition-transform group-open:rotate-180 group-open:bg-rose-50 group-open:text-rose-800"
                  aria-hidden
                >
                  {"\u25BE"}
                </span>
              </summary>
              <div className="border-t border-stone-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-stone-700 sm:px-5 whitespace-pre-line">
                {item.answer}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
