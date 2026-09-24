#!/usr/bin/env node
import { runBatch } from "./add-recipes-tilbehor30-lib.mjs";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-chill-reds-batch1-data.mjs";

runBatch({
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
  label: "Chill reds batch 1",
});
