"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

import { facebookOlVinUrl } from "@/lib/site";

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: (element?: HTMLElement | null) => void };
    };
  }
}

/**
 * Facebooks officielle Page Plugin (timeline) — live opslag fra Øl & Vin.
 * Kræver offentlig Facebook Page; ingen Meta API-token.
 */
export function FacebookPagePlugin() {
  const containerRef = useRef<HTMLDivElement>(null);

  const parseXfbml = useCallback(() => {
    window.FB?.XFBML.parse(containerRef.current);
  }, []);

  useEffect(() => {
    parseXfbml();
  }, [parseXfbml]);

  return (
    <section className="mt-16" aria-labelledby="home-facebook-heading">
      <div className="max-w-2xl">
        <h2 id="home-facebook-heading" className="text-xl font-semibold tracking-tight text-stone-900">
          Følg Øl &amp; Vin på Facebook
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Nyeste tilbud og tips direkte fra siden — opdateres automatisk.
        </p>
      </div>

      <div className="mt-5 flex justify-center sm:justify-start">
        <div ref={containerRef} className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div
            className="fb-page"
            data-href={facebookOlVinUrl}
            data-tabs="timeline"
            data-width="500"
            data-height="600"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote cite={facebookOlVinUrl} className="p-6 text-sm text-stone-600">
              <a href={facebookOlVinUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-[#1877F2] hover:underline">
                Øl &amp; Vin på Facebook
              </a>
            </blockquote>
          </div>
        </div>
      </div>

      <div id="fb-root" />
      <Script
        src="https://connect.facebook.net/da_DK/sdk.js#xfbml=1&version=v21.0"
        strategy="lazyOnload"
        onLoad={parseXfbml}
      />
    </section>
  );
}
