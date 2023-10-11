import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  type Gear,
  stringifiedPairedGearCombinations,
} from "./utils/combinations";

const __filename = fileURLToPath(import.meta.url);

const weapons: Gear[] = [
  {
    name: "Bile-Stained Crawg Tusks",
    slot: "main_hand",
    options: "bilestained_crawg_tusks,id=159653,bonus_id=3291/6652/7981/1498/8767,enchant_id=6643",
  },
  {
    name: "Double Time",
    slot: "main_hand",
    options: "double_time,id=207991,ilevel=441,enchant_id=6643",
  },
  {
    name: "Primal Molten Warglaive",
    slot: "main_hand",
    options:
      "primal_molten_warglaive,id=190508,ilevel=447,enchant_id=6643,crafted_stats=36/32",
  },
];

writeFileSync(
  __filename.replace(".ts", ".simc"),
  stringifiedPairedGearCombinations(weapons),
  {
    encoding: "utf-8",
  },
);
