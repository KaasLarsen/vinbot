import assert from "node:assert/strict";
import test from "node:test";

import {
  PARTNER_ADS_UID_GOOGLE,
  appendGooglePlaLandingQuery,
  isGoogleAdsLandingSearch,
  withPartnerAdsTrafficUid,
} from "./partner-ads-traffic-uid.ts";

test("isGoogleAdsLandingSearch: gclid", () => {
  assert.equal(isGoogleAdsLandingSearch("?gclid=abc123"), true);
  assert.equal(isGoogleAdsLandingSearch("gclid=abc123"), true);
});

test("isGoogleAdsLandingSearch: gbraid / wbraid", () => {
  assert.equal(isGoogleAdsLandingSearch("?gbraid=x"), true);
  assert.equal(isGoogleAdsLandingSearch("?wbraid=y"), true);
});

test("isGoogleAdsLandingSearch: PLA utm_campaign", () => {
  assert.equal(
    isGoogleAdsLandingSearch("?utm_source=google&utm_medium=cpc&utm_campaign=vinbot-pla"),
    true,
  );
});

test("isGoogleAdsLandingSearch: google cpc without campaign", () => {
  assert.equal(isGoogleAdsLandingSearch("?utm_source=google&utm_medium=cpc"), true);
  assert.equal(isGoogleAdsLandingSearch("?utm_source=google&utm_medium=organic"), false);
});

test("isGoogleAdsLandingSearch: empty / unrelated", () => {
  assert.equal(isGoogleAdsLandingSearch(""), false);
  assert.equal(isGoogleAdsLandingSearch("?fbclid=1"), false);
});

test("appendGooglePlaLandingQuery adds utm params", () => {
  const out = appendGooglePlaLandingQuery("https://www.vinbot.dk/sps-wine/vin/test-flaske");
  const u = new URL(out);
  assert.equal(u.searchParams.get("utm_source"), "google");
  assert.equal(u.searchParams.get("utm_medium"), "cpc");
  assert.equal(u.searchParams.get("utm_campaign"), "vinbot-pla");
  assert.equal(u.pathname, "/sps-wine/vin/test-flaske");
});

test("withPartnerAdsTrafficUid defaults to vinbot without session", () => {
  const href =
    "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=108173&uid=other&htmlurl=https%3A%2F%2Fdhwines.dk%2F";
  const out = withPartnerAdsTrafficUid(href);
  assert.equal(new URL(out).searchParams.get("uid"), "vinbot");
});

test("withPartnerAdsTrafficUid ignores non-partner-ads urls", () => {
  const shop = "https://dhwines.dk/products/x";
  assert.equal(withPartnerAdsTrafficUid(shop), shop);
});

test("PARTNER_ADS_UID_GOOGLE has no slash", () => {
  assert.equal(PARTNER_ADS_UID_GOOGLE.includes("/"), false);
});
