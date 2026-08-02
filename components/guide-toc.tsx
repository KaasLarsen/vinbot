import type { GuideTocItem } from "@/lib/content/guide-headings";
import { GUIDE_TOC_MIN_HEADINGS } from "@/lib/content/guide-headings";

type GuideTocProps = {
  items: GuideTocItem[];
};

/**
 * Compact in-article outline for longer guides (≥ GUIDE_TOC_MIN_HEADINGS H2s).
 */
export function GuideToc({ items }: GuideTocProps) {
  if (items.length < GUIDE_TOC_MIN_HEADINGS) return null;

  return (
    <nav
      className="mt-8 rounded-xl border border-stone-200 bg-stone-50/80 px-4 py-4 sm:px-5"
      aria-labelledby="guide-toc-heading"
    >
      <h2 id="guide-toc-heading" className="text-sm font-semibold uppercase tracking-wide text-stone-500">
        Indhold
      </h2>
      <ol className="mt-3 columns-1 gap-x-8 space-y-1.5 sm:columns-2">
        {items.map((item) => (
          <li key={item.id} className="break-inside-avoid">
            <a
              href={`#${item.id}`}
              className="text-sm leading-snug text-rose-900 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
