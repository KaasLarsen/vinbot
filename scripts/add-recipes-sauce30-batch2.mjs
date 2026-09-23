#!/usr/bin/env node
import { runBatch } from "./add-recipes-tilbehor30-lib.mjs";
import {
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
} from "./recipes-sauce30-batch2-data.mjs";

runBatch({
  RECIPES,
  GUIDE_RECIPE_ADDITIONS,
  SLUG_EXPANSIONS,
  UPDATED,
  label: "Sauce 30 batch 2",
});
