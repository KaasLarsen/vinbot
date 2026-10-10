import assert from "node:assert/strict";
import { test } from "node:test";

import { looksLikeWineCabinetOrAromaKit } from "./non-wine-cabinet.ts";

test("vinskabe og duftsæt er ikke vin, men en flaske med køleskab i beskrivelsen er", () => {
  assert.equal(
    looksLikeWineCabinetOrAromaKit({
      title: "Champagnekøleskab til indbygning - WineCave 700 30S Anthracite Black",
      category: "Wine - Built-in (under counter)",
    }),
    true,
  );
  assert.equal(
    looksLikeWineCabinetOrAromaKit({
      title: "Le Nez du Vin - Red Wines 12 aromas - Duftsæt",
      category: "Wine",
    }),
    true,
  );
  assert.equal(
    looksLikeWineCabinetOrAromaKit({
      title: "Artevino multifunktionsskab OXG3T199NVSD",
      category: "",
    }),
    true,
  );
  assert.equal(
    looksLikeWineCabinetOrAromaKit({
      title: "Champagne Brut",
      category: "Champagne",
    }),
    false,
  );
  assert.equal(
    looksLikeWineCabinetOrAromaKit({
      title: "Riesling Mosel",
      category: "Hvidvin",
    }),
    false,
  );
});
