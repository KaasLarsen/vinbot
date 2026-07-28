import { facebookOlVinUrl } from "@/lib/site";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.12.19 2.12.19v2.33h-1.2c-1.18 0-1.55.74-1.55 1.49v1.79h2.64l-.42 2.9h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

export function TilbudFacebookCta({ className }: { className?: string }) {
  return (
    <a
      href={facebookOlVinUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group flex shrink-0 items-start gap-3 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition",
        "hover:border-[#1877F2]/40 hover:bg-[#1877F2]/[0.03] hover:shadow-md",
        "lg:max-w-[17.5rem]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-sm">
        <FacebookIcon className="size-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-stone-900">Øl &amp; Vin på Facebook</span>
        <span className="mt-1 block text-sm leading-snug text-stone-600">
          Få de bedste vin-tilbud i dit feed — følg siden her.
        </span>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#1877F2] transition group-hover:underline">
          Følg Øl &amp; Vin
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </span>
    </a>
  );
}
