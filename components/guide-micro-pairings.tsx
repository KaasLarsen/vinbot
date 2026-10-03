import Link from "next/link";

import { microPairingBySlug, microPairingsForParent } from "@/lib/growth/micro-pairings";

export function GuideMicroPairings({ slug }: { slug: string }) {
  const self = microPairingBySlug(slug);
  const children = microPairingsForParent(slug);
  if (!self && children.length === 0) return null;

  return (
    <>
      {self ? (
        <section className="not-prose mt-10 border-t border-stone-200 pt-8" aria-labelledby="micro-pairing-parent">
          <h2 id="micro-pairing-parent" className="text-xl font-semibold text-stone-900">
            Den brede guide
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Denne side er en specifik variant. Den overordnede parring står i forældre-guiden.
          </p>
          <p className="mt-4">
            <Link
              href={`/guides/${self.parentSlug}`}
              className="font-medium text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950"
            >
              {self.parentLabel}
            </Link>
          </p>
        </section>
      ) : null}
      {children.length > 0 ? (
        <section className="not-prose mt-10 border-t border-stone-200 pt-8" aria-labelledby="micro-pairing-children">
          <h2 id="micro-pairing-children" className="text-xl font-semibold text-stone-900">
            Mere specifikke retter
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            Samme klynge, men sovs, protein eller tilbehør flytter vinvalget.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {children.map((child) => (
              <li key={child.slug}>
                <Link
                  href={`/guides/${child.slug}`}
                  className="font-medium text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950"
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
