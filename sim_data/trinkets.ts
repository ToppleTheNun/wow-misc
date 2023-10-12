import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  type Gear,
  stringifiedPairedGearCombinations,
} from "./utils/combinations";

const __filename = fileURLToPath(import.meta.url);

const trinkets: Gear[] = [
  {
    name: "Bandolier",
    slot: "trinket1",
    options: "bandolier_of_twisted_blades,id=207165,bonus_id=7187/1520",
    uniqueId: 207165,
  },
  {
    name: "Ashes",
    slot: "trinket1",
    options: "ashes_of_the_embersoul,id=207167,bonus_id=7187/1520",
    uniqueId: 207167,
  },
  {
    name: "Badge",
    slot: "trinket1",
    options: "pips_emerald_friendship_badge,id=207168,bonus_id=7187/1520",
    uniqueId: 207168,
  },
  {
    name: "Gift",
    slot: "trinket1",
    options: "gift_of_ursine_vengeance,id=207173,bonus_id=7187/1520",
    uniqueId: 207173,
  },
  {
    name: "Rageheart",
    slot: "trinket1",
    options: "fyrakks_tainted_rageheart,id=207174,bonus_id=7187/1520",
    uniqueId: 207174,
  },
  {
    name: "Signet",
    slot: "trinket1",
    options: "cataclysmic_signet_brand,id=207166,bonus_id=7187/1520",
    uniqueId: 207166,
  },
  {
    name: "Coiled",
    slot: "trinket1",
    options: "coiled_serpent_idol,id=207175,bonus_id=7187/1520",
    uniqueId: 207175,
  },
  {
    name: "Augury",
    slot: "trinket1",
    options: "augury_of_the_primal_flame,id=208614,bonus_id=7187/1520",
    uniqueId: 208614,
  },
  {
    name: "Boon",
    slot: "trinket1",
    options: "stormeaters_boon,id=194302,bonus_id=6652/7981/1498/8767",
    uniqueId: 194302,
  },
  {
    name: "Grieftorch",
    slot: "trinket1",
    options: "manic_grieftorch,id=194308,bonus_id=7981/6652/1498/8767",
    uniqueId: 194308,
  },
  {
    name: "Call",
    slot: "trinket1",
    options: "neltharions_call_to_chaos,id=204201,bonus_id=4800/4786/1498",
    uniqueId: 204201,
  },
  {
    name: "Beacon",
    slot: "trinket1",
    options: "beacon_to_the_beyond,id=203963,bonus_id=4800/4786/1498",
    uniqueId: 203963,
  },
  {
    name: "Mark",
    slot: "trinket1",
    options: "beacon_to_the_beyond,id=203963,bonus_id=4800/4786/1498",
    uniqueId: 203963,
  },
  {
    name: "Mirror",
    slot: "trinket1",
    options: "mirror_of_fractured_tomorrows,id=207581,bonus_id=6536/1540/6646",
    uniqueId: 207581,
  },
  {
    name: "Stonescales",
    slot: "trinket1",
    options: "prophetic_stonescales,id=207528,bonus_id=6536/1540/6646",
    uniqueId: 207528,
  },
  {
    name: "Sandglass",
    slot: "trinket1",
    options: "accelerating_sandglass,id=207566,bonus_id=6536/1540/6646",
    uniqueId: 207566,
  },
  {
    name: "Box",
    slot: "trinket1",
    options: "lady_waycrests_music_box,id=159631,ilevel=489",
    uniqueId: 159631,
  },
  {
    name: "My'das",
    slot: "trinket1",
    options: "mydas_talisman,id=158319,ilevel=489",
    uniqueId: 158319,
  },
  {
    name: "Shell",
    slot: "trinket1",
    options: "nightmare_egg_shell,id=137312,ilevel=489",
    uniqueId: 137312,
  },
  {
    name: "Counterweight",
    slot: "trinket1",
    options: "spiked_counterweight,id=136715,ilevel=489",
    uniqueId: 136715,
  },
  {
    name: "Branch",
    slot: "trinket1",
    options: "witherbarks_branch,id=109999,ilevel=489",
    uniqueId: 109999,
  },
];

writeFileSync(
  __filename.replace(".ts", ".simc"),
  stringifiedPairedGearCombinations(trinkets),
  {
    encoding: "utf-8",
  },
);
