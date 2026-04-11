import Script from "next/script";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/** Reserveret plads til AdSense — kræver NEXT_PUBLIC_ADSENSE_CLIENT og godkendt site. */
export function AdSenseLoader() {
  if (!client) return null;
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

type SlotProps = { slot: string; className?: string; format?: "auto" | "rectangle" | "horizontal" | "vertical" };

export function AdSlot({ slot, className = "", format = "auto" }: SlotProps) {
  if (!client) {
    return (
      <div
        className={`flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-stone-200 bg-stone-50 text-sm text-stone-400 ${className}`}
      >
        Annonceplads (sæt NEXT_PUBLIC_ADSENSE_CLIENT)
      </div>
    );
  }
  return (
    <div className={className}>
      <ins
        className="adsbygoogle block min-h-[100px] w-full"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
