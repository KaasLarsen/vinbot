import assert from "node:assert/strict";
import test from "node:test";

import {
  absoluteProductImageUrl,
  imageHostAllowsDirectHotlink,
  proxyImg,
  tryDirectProductImageUrl,
} from "./helpers.ts";

test("Shopify CDN images bypass /api/img", () => {
  const src = "https://cdn.shopify.com/s/files/1/0816/5435/0170/files/bottle.jpg?v=1";
  assert.equal(tryDirectProductImageUrl(src), src);
  assert.equal(proxyImg(src), src);
  assert.equal(absoluteProductImageUrl(src, "https://www.vinbot.dk"), src);
});

test("protocol-relative Shopify URL becomes https direct", () => {
  const src = "//cdn.shopify.com/s/files/1/x/files/a.jpg";
  assert.equal(proxyImg(src), "https://cdn.shopify.com/s/files/1/x/files/a.jpg");
});

test("unknown merchant host stays on image proxy", () => {
  const src = "https://shop.example-vin.dk/media/flaske.jpg";
  assert.equal(tryDirectProductImageUrl(src), null);
  assert.equal(proxyImg(src), `/api/img?src=${encodeURIComponent(src)}`);
  assert.equal(
    absoluteProductImageUrl(src, "https://www.vinbot.dk"),
    `https://www.vinbot.dk/api/img?src=${encodeURIComponent(src)}`,
  );
});

test("http images are never direct (force proxy)", () => {
  const src = "http://cdn.shopify.com/s/files/1/x/a.jpg";
  assert.equal(tryDirectProductImageUrl(src), null);
  assert.ok(proxyImg(src).startsWith("/api/img?"));
});

test("imageHostAllowsDirectHotlink matches suffixes", () => {
  assert.equal(imageHostAllowsDirectHotlink("cdn.shopify.com"), true);
  assert.equal(imageHostAllowsDirectHotlink("images.cdn.shopify.com"), true);
  assert.equal(imageHostAllowsDirectHotlink("res.cloudinary.com"), true);
  assert.equal(imageHostAllowsDirectHotlink("vinhandel.dk"), false);
});
