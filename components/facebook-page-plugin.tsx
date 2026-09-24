"use client";

import { OlVinFacebookCarousel } from "@/components/ol-vin-facebook-carousel";
import { OL_VIN_FACEBOOK_POSTS } from "@/lib/social/ol-vin-posts";

/**
 * Facebook-sektion på forsiden.
 *
 * Facebooks Page Plugin (timeline-iframe) returnerer tomt for Øl & Vin-siden
 * (ikke offentlig/ubegrænset Page i Metas øjne). Vi viser derfor den kuraterede
 * karusel — samme som på /tilbud — med link til Facebook.
 */
export function FacebookPagePlugin() {
  return <OlVinFacebookCarousel posts={OL_VIN_FACEBOOK_POSTS} />;
}
