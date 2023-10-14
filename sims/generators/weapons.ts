import { fileURLToPath } from "node:url";

import { type Gear } from "./utils/combinations";
import { writeGearPairSimFiles } from "./utils/sim";

const __filename = fileURLToPath(import.meta.url);

const gear: Gear[] = [
  {
    name: "Thorncaller Claw",
    slot: "main_hand",
    options:
      "thorncaller_claw,id=207784,bonus_id=7187/1520,enchant=sophic_devotion_3",
    uniqueId: 207784,
  },
  {
    name: "Gholak",
    slot: "main_hand",
    options:
      "gholak_the_final_conflagration,id=207786,bonus_id=7187/1520,enchant=sophic_devotion_3",
    uniqueId: 207784,
  },
  {
    name: "Double Time",
    slot: "main_hand",
    options:
      "double_time,id=207991,bonus_id=6536/1540/6646,enchant=sophic_devotion_3",
  },
  {
    name: "Primal Molten Warglaive",
    slot: "main_hand",
    options:
      "primal_molten_warglaive,id=190508,ilevel=483,enchant=sophic_devotion_3,crafted_stats=36/32",
  },
];

writeGearPairSimFiles({
  isPtr: true,
  actor: "t31_vengeance",
  withoutSlots: ["main_hand", "off_hand"],
  __filename,
  gear,
});
