import Link from "next/link";

const nav = [
  { href: "/mad-og-vin", label: "Mad & vin" },
  { href: "/humoer-og-vin", label: "Humør & stemning" },
  { href: "/saeson", label: "Sæson" },
  { href: "/druesorter", label: "Druesorter" },
  { href: "/regioner", label: "Regioner" },
  { href: "/guides/komplet-guide-til-vin-og-mad", label: "Guides" },
  { href: "/den-sidste-flaske", label: "Den Sidste Flaske" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight text-rose-950">
          Vinbot
        </Link>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-stone-700">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-rose-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
