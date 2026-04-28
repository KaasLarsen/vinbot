"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { HeaderSearch } from "@/components/header-search";

type NavItem = { href: string; label: string; activePrefix?: string };

const nav: NavItem[] = [
  { href: "/mad-og-vin", label: "Mad & vin" },
  { href: "/humoer-og-vin", label: "Humør & stemning" },
  { href: "/saeson", label: "Sæson" },
  { href: "/druesorter", label: "Druesorter" },
  { href: "/regioner", label: "Regioner" },
  { href: "/vinkoleskabe", label: "Vinkøleskabe" },
  { href: "/rabatkoder", label: "Rabatkoder" },
  { href: "/vine", label: "Vin-katalog", activePrefix: "/vine" },
  { href: "/guides/komplet-guide-til-vin-og-mad", label: "Guides", activePrefix: "/guides" },
];

function navItemActive(item: NavItem, pathname: string) {
  if (pathname === item.href) return true;
  if (item.activePrefix) {
    return pathname === item.activePrefix || pathname.startsWith(`${item.activePrefix}/`);
  }
  return item.href !== "/" && pathname.startsWith(`${item.href}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="border-b border-stone-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
          >
            <span className="text-xl font-semibold tracking-tight text-rose-950 group-hover:text-rose-900">
              Vinbot
            </span>
            <span className="max-w-[min(100%,20rem)] text-xs font-normal leading-snug text-stone-600 sm:max-w-none sm:text-[0.8125rem]">
              <span className="hidden sm:inline" aria-hidden>
                —{" "}
              </span>
              Find den rette vin til mad, stemning og lejlighed
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/vine"
              className={`hidden rounded-lg px-3 py-2 text-sm font-medium transition sm:inline-flex ${
                navItemActive({ href: "/vine", label: "Vin-katalog", activePrefix: "/vine" }, pathname)
                  ? "bg-rose-50 text-rose-950"
                  : "text-stone-800 hover:bg-stone-50 hover:text-rose-900"
              }`}
            >
              Vin-katalog
            </Link>
            <HeaderSearch variant="desktop" />
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
          </div>
        </div>

        <div
          id={panelId}
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Hovedmenu"
              className="border-t border-stone-100 pt-4 sm:pt-5"
            >
              <ul className="flex flex-col gap-1 pb-1 sm:gap-0.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition sm:py-2 ${
                        navItemActive(item, pathname)
                          ? "bg-rose-50 text-rose-950"
                          : "text-stone-700 hover:bg-stone-50 hover:text-rose-900"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 pb-1 md:hidden">
                <HeaderSearch variant="mobile" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
