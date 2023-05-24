import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { type Gear, printCombinations } from "./utils/combinations";

const __filename = fileURLToPath(import.meta.url);

const gear: Gear = {
  "Elementium Pocket Anvil":
    "trinket1=elementium_pocket_anvil,id=202617,bonus_id=4800/4786/1498",
  "Dragonfire Bomb Dispenser":
    "trinket1=dragonfire_bomb_dispenser,id=202610,bonus_id=4800/4786/1498",
  "Screaming Black Dragonscale":
    "trinket1=screaming_black_dragonscale,id=202612,bonus_id=4800/4786/1498",
  "Beacon to the Beyond":
    "trinket1=beacon_to_the_beyond,id=203963,bonus_id=4800/4786/1498",
  "Neltharion's Call to Chaos":
    "trinket1=neltharions_call_to_chaos,id=204201,bonus_id=4800/4786/1498",
  "Mark of Dargrul": "trinket1=mark_of_dargrul,id=137357,ilevel=447",
  "Lingering Sporepods": "trinket1=lingering_sporepods,id=159626,ilevel=447",
  "Harlan's Loaded Dice": "trinket1=harlans_loaded_dice,id=155881,ilevel=447",
  "Igneous Flowstone":
    "trinket1=igneous_flowstone,id=203996,bonus_id=4800/4786/1498",
  "Storm-Eater's Boon":
    "trinket1=stormeaters_boon,id=194302,bonus_id=6652/7981/1498/8767",
  "Manic Grieftorch":
    "trinket1=manic_grieftorch,id=194308,bonus_id=7981/6652/1498/8767",
  "Heroic Storm-Eater's Boon": "trinket1=stormeaters_boon,id=194302,ilevel=408",
  "Drogbar Rocks (411)": "trinket1=drogbar_rocks,id=204810,ilevel=411",
  "Drogbar Rocks (437)": "trinket1=drogbar_rocks,id=204810,ilevel=437",
  "Heart of Thunder": "trinket1=heart_of_thunder,id=133246,ilevel=447",
  "The Hungerer": "trinket1=the_hungerer,id=171642,ilevel=437",
  "Matrix Restabilizer": "trinket1=matrix_restabilizer,id=171646,ilevel=437",
};

writeFileSync(__filename.replace(".ts", ".simc"), printCombinations(gear, 2), {
  encoding: "utf-8",
});
