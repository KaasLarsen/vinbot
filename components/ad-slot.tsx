import Script from "next/script";

/**
 * AdSense er slået fra som standard. Aktivér først når Google har godkendt sitet:
 * sæt NEXT_PUBLIC_ADSENSE_ACTIVE=true og NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…
 */
const adsActive = process.env.NEXT_PUBLIC_ADSENSE_ACTIVE === "true";
const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const adsEnabled = adsActive && Boolean(client);

export function AdSenseLoader() {
  if (!adsEnabled) return null;
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
  if (!adsEnabled) return null;
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
