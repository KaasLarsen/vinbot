import Link from "next/link";
import { siteName } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-stone-600">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-semibold text-stone-900">{siteName}</p>
            <p className="mt-2 max-w-md leading-relaxed">
              Uafhængig inspiration og produktsøgning. Affiliate og annoncer finansierer driften — du betaler ikke ekstra hos forhandlerne.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/guides/komplet-guide-til-vin-og-mad" className="hover:text-rose-900">
              Stor guide: vin og mad
            </Link>
            <Link href="/privatliv" className="hover:text-rose-900">
              Privatliv
            </Link>
            <Link href="/betingelser" className="hover:text-rose-900">
              Betingelser
            </Link>
            <Link href="/kontakt" className="hover:text-rose-900">
              Kontakt
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-stone-500">© {new Date().getFullYear()} {siteName}</p>
      </div>
    </footer>
  );
}
