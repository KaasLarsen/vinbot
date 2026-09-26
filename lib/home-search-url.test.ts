import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

type FakeWindow = {
  location: { search: string; hash: string; href: string };
  addEventListener: (type: string, fn: () => void) => void;
  removeEventListener: (type: string, fn: () => void) => void;
  dispatchEvent: (event: Event) => boolean;
};

function installFakeWindow(search: string, hash = ""): FakeWindow {
  const listeners = new Map<string, Set<() => void>>();
  const fake: FakeWindow = {
    location: {
      search,
      hash,
      href: `https://vinbot.dk/${search}${hash}`,
    },
    addEventListener(type, fn) {
      if (!listeners.has(type)) listeners.set(type, new Set());
      listeners.get(type)!.add(fn);
    },
    removeEventListener(type, fn) {
      listeners.get(type)?.delete(fn);
    },
    dispatchEvent(event) {
      for (const fn of listeners.get(event.type) ?? []) fn();
      return true;
    },
  };
  (globalThis as { window?: FakeWindow }).window = fake;
  return fake;
}

afterEach(() => {
  delete (globalThis as { window?: FakeWindow }).window;
});

describe("home-search-url", () => {
  it("parses q and max from location.search", async () => {
    installFakeWindow("?q=chianti%20classico&max=200");
    const { readHomeSearchUrl, hasHomeSearchQuery } = await import("./home-search-url.ts");
    assert.deepEqual(readHomeSearchUrl(), { q: "chianti classico", initialMax: 200 });
    assert.equal(hasHomeSearchQuery(), true);
  });

  it("hasHomeSearchQuery is false for blank q", async () => {
    installFakeWindow("?q=%20%20");
    const { hasHomeSearchQuery } = await import("./home-search-url.ts");
    assert.equal(hasHomeSearchQuery(), false);
  });

  it("notifyHomeSearchUrlChanged reaches subscribers", async () => {
    installFakeWindow("?q=rioja");
    const { notifyHomeSearchUrlChanged, subscribeHomeSearchUrl } = await import(
      "./home-search-url.ts"
    );
    let hits = 0;
    const stop = subscribeHomeSearchUrl(() => {
      hits += 1;
    });
    notifyHomeSearchUrlChanged();
    assert.equal(hits, 1);
    stop();
    notifyHomeSearchUrlChanged();
    assert.equal(hits, 1);
  });
});
