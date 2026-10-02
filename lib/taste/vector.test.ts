import assert from "node:assert/strict";
import test from "node:test";
import { buildTasteVector, tasteSimilarity } from "./vector.ts";
import type { TasteRatedWine } from "./types.ts";

test("liked heavy reds score higher on primitivo than riesling", () => {
  const ratings: TasteRatedWine[] = [
    { slug: "a", title: "Primitivo Puglia Reserva", brand: "X", image: null, liked: true },
    { slug: "b", title: "Zinfandel California Oak", brand: "Y", image: null, liked: true },
    { slug: "c", title: "Shiraz Barossa", brand: "Z", image: null, liked: true },
  ];
  const vector = buildTasteVector(ratings);
  const heavy = tasteSimilarity("Primitivo Appassimento fadlagret", vector);
  const light = tasteSimilarity("Riesling Mosel Trocken 2024", vector);
  assert.ok(heavy > light, `expected ${heavy} > ${light}`);
});
