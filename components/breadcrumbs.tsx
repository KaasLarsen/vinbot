import Link from "next/link";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Brødkrummer" className="text-sm text-stone-600">
      <ol className="flex flex-wrap gap-2">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-stone-400">/</span>}
            {i === items.length - 1 ? (
              <span className="font-medium text-stone-900">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-rose-900">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
