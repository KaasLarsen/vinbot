import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HomeStickyPartnerBanners } from "@/components/home-sticky-partner-banners";
import { AnalyticsConsentGate } from "@/components/analytics-consent-gate";
import { AdSenseConsentGate } from "@/components/adsense-consent-gate";
import { CookieBanner } from "@/components/cookie-banner";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/json-ld";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – vin til mad, humør og stemning`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "da_DK",
    siteName,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: { canonical: siteUrl },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-stone-900">
        {gaMeasurementId ? <AnalyticsConsentGate measurementId={gaMeasurementId} /> : null}
        <AdSenseConsentGate />
        <CookieBanner />
        <OrganizationJsonLd />
        <WebSiteJsonLd url={siteUrl} />
        <HomeStickyPartnerBanners />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
