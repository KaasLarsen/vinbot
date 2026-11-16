import assert from "node:assert/strict";
import test from "node:test";

import {
  allowImgUpstreamFetch,
  isAllowedImgReferer,
  isVinbotCronUserAgent,
} from "./img-referer.ts";

test("isAllowedImgReferer accepts www and apex for site host", () => {
  assert.equal(isAllowedImgReferer("https://www.vinbot.dk/vine/foo", "www.vinbot.dk"), true);
  assert.equal(isAllowedImgReferer("https://vinbot.dk/", "www.vinbot.dk"), true);
  assert.equal(isAllowedImgReferer("https://www.vinbot.dk", "vinbot.dk"), true);
  assert.equal(isAllowedImgReferer("https://evil.example/img", "www.vinbot.dk"), false);
  assert.equal(isAllowedImgReferer(null, "www.vinbot.dk"), false);
  assert.equal(isAllowedImgReferer("", "www.vinbot.dk"), false);
});

test("isVinbotCronUserAgent matches own warm UA", () => {
  assert.equal(isVinbotCronUserAgent("VinbotCronWarm/1.0"), true);
  assert.equal(isVinbotCronUserAgent("Mozilla/5.0"), false);
});

test("allowImgUpstreamFetch requires referer/origin or cron UA", () => {
  assert.equal(
    allowImgUpstreamFetch({
      referer: null,
      origin: null,
      userAgent: "curl/8",
      siteHost: "www.vinbot.dk",
    }),
    false,
  );
  assert.equal(
    allowImgUpstreamFetch({
      referer: "https://www.vinbot.dk/tilbud",
      origin: null,
      userAgent: "Mozilla/5.0",
      siteHost: "www.vinbot.dk",
    }),
    true,
  );
  assert.equal(
    allowImgUpstreamFetch({
      referer: null,
      origin: "https://www.vinbot.dk",
      userAgent: "Mozilla/5.0",
      siteHost: "www.vinbot.dk",
    }),
    true,
  );
  assert.equal(
    allowImgUpstreamFetch({
      referer: null,
      origin: null,
      userAgent: "VinbotCronWarm/1.0",
      siteHost: "www.vinbot.dk",
    }),
    true,
  );
});
