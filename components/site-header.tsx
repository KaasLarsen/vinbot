"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { HeaderSearch } from "@/components/header-search";
import { VinbotLogo } from "@/components/vinbot-logo";

type NavItem = { href: string; label: string; activePrefix?: string; activePrefixes?: string[] };

const nav: NavItem[] = [
  { href: "/mad-og-vin", label: "Mad & vin" },
  { href: "/humoer-og-vin", label: "Humør & stemning" },
  { href: "/saeson", label: "Sæson" },
  { href: "/fest-og-vin", label: "Fest & selskab" },
  {
    href: "/guides/bedste-alkoholfri-vin",
    label: "Alkoholfri",
    activePrefixes: ["/guides/bedste-alkoholfri", "/guides/alkoholfri-vin-til-"],
  },
  { href: "/druesorter", label: "Druesorter" },
  { href: "/regioner", label: "Regioner" },
  { href: "/vinkoleskabe", label: "Vinkøleskabe" },
  { href: "/rabatkoder", label: "Rabatkoder" },
  { href: "/vine", label: "Vin-katalog", activePrefix: "/vine" },
  { href: "/guides/komplet-guide-til-vin-og-mad", label: "Guides", activePrefix: "/guides" },
];

function navItemActive(item: NavItem, pathname: string) {
  if (pathname === item.href) return true;
  const prefixes = item.activePrefixes?.length
    ? item.activePrefixes
    : item.activePrefix
      ? [item.activePrefix]
      : [];
  for (const p of prefixes) {
    if (pathname === p || pathname.startsWith(`${p}/`)) return true;
  }
  return item.href !== "/" && pathname.startsWith(`${item.href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <header className="relative z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-2.5">
            <VinbotLogo className="h-8 w-8 shrink-0 text-rose-950 transition-colors group-hover:text-rose-900" />
            <span className="text-xl font-semibold tracking-tight text-rose-950 transition-colors group-hover:text-rose-900">
              Vinbot
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <HeaderSearch />

            <div ref={menuRef} className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Luk menu" : "Åbn menu"}</span>
                <svg
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-stone-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {open ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <>
                      <path d="M5 8h14M5 12h14M5 16h14" />
                    </>
                  )}
                </svg>
                Menu
              </button>

              {open ? (
                <nav
                  id={panelId}
                  aria-label="Hovedmenu"
                  className="absolute right-0 top-full z-40 mt-1.5 min-w-[12rem] rounded-lg border border-stone-200 bg-white py-1 shadow-lg"
                >
                  <ul>
                    {nav.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-4 py-2 text-sm transition ${
                            navItemActive(item, pathname)
                              ? "font-medium text-rose-950"
                              : "text-stone-700 hover:bg-stone-50 hover:text-rose-900"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
