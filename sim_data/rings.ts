import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { type Gear, printCombinations } from "./utils/combinations";

const __filename = fileURLToPath(import.meta.url);

const gear: Gear = {
  "Seal of Diurna's Chosen (M)":
    "finger1=seal_of_diurnas_chosen,id=195480,bonus_id=4800/4786/1498,gem_id=192952,enchant_id=6556",
  "Onyx Annulet":
    "finger1=onyx_annulet,id=203460,bonus_id=1491,gem_id=204011/204027/204029,gem_bonus_id=9369:1472/9369:1472/9369:1472,enchant_id=6556",
  "Onyx Impostor's Birthright (M)":
    "finger1=onyx_impostors_birthright,id=204398,gem_id=192952,enchant_id=6556,ilevel=450",
  "Shard of Titanic Insight":
    "finger1=,id=192999,crafted_stats=32/36,gem_id=192952,enchant_id=6556,ilevel=447",
  "Band of the Wyrm Matron":
    "finger=,id=134524,,gem_id=192952,gem_id=192952,enchant_id=6556,ilevel=447",
  "Loop of Vitriolic Intent":
    "finger=,id=134530,gem_id=192952,enchant_id=6556,ilevel=447",
  "Seal of Questionable Loyalties":
    "finger=,id=158314,gem_id=192952,enchant_id=6556,ilevel=",
  "Loop of Pulsing Veins":
    "finger=,id=159463,gem_id=192952,enchant_id=6556,ilevel=447",
  "Bloodied Wedding Ring":
    "finger=,id=193671,gem_id=192952,enchant_id=6556,ilevel=447",
  "Circle of Ascended Frost":
    "finger=,id=193731,gem_id=192952,enchant_id=6556,ilevel=447",
  "Scalebane Signet":
    "finger=,id=193768,gem_id=192952,enchant_id=6556,ilevel=447",
  "Eternal Sentry's Ring":
    "finger=,id=193804,gem_id=192952,enchant_id=6556,ilevel=447",
  "Skyshard Ring": "finger=,id=206184,gem_id=192952,enchant_id=6556,ilevel=447",
  "Ring of Frozen Rain":
    "finger=,id=206185,gem_id=192952,enchant_id=6556,ilevel=447",
};

writeFileSync(__filename.replace(".ts", ".simc"), printCombinations(gear, 2), {
  encoding: "utf-8",
});
