import fastCartesian from "fast-cartesian";

export type Slot =
  | "head"
  | "neck"
  | "shoulder"
  | "shoulders"
  | "back"
  | "chest"
  | "wrist"
  | "wrists"
  | "hand"
  | "hands"
  | "waist"
  | "leg"
  | "legs"
  | "feet"
  | "finger1"
  | "finger2"
  | "trinket1"
  | "trinket2"
  | "main_hand"
  | "off_hand";

export type Gear = {
  name: string;
  slot: Slot;
  options: string;
  uniqueId?: number;
};
export type GearPair = {
  slot1: Gear;
  slot2: Gear;
};

// const replaceParts =
//   (gearNames: string, gear: Gear) =>
//   (piece: string, idx: number): string =>
//     `profileset."${gearNames}"+=${gear[piece]}`
//       .replace("trinket1", idx === 0 ? "trinket1" : "trinket2")
//       .replace("finger1", idx === 0 ? "finger1" : "finger2")
//       .replace("main_hand", idx === 0 ? "main_hand" : "off_hand");

export const areNotSameUnique = (gearPair: GearPair): boolean => {
  if (!gearPair.slot1.uniqueId && !gearPair.slot2.uniqueId) {
    return true;
  }
  if (!gearPair.slot1.uniqueId && gearPair.slot2.uniqueId) {
    return true;
  }
  if (gearPair.slot1.uniqueId && !gearPair.slot2.uniqueId) {
    return true;
  }
  return gearPair.slot1.uniqueId !== gearPair.slot2.uniqueId;
};

export const pairedGearCombinations = (equipment: Gear[]) => {
  return fastCartesian([equipment, equipment])
    .map<GearPair>(([slot1, slot2]) => ({
      slot1,
      slot2,
    }))
    .filter(areNotSameUnique);
};

const stringifySlot1 = (gear: Gear) =>
  `${gear.slot}=${gear.options}`
    .replace("trinket2", "trinket1")
    .replace("finger2", "finger1")
    .replace("off_hand", "main_hand");
const stringifySlot2 = (gear: Gear) =>
  `${gear.slot}=${gear.options}`
    .replace("trinket1", "trinket2")
    .replace("finger1", "finger2")
    .replace("main_hand", "off_hand");

export const stringifyGearPair = (gearPair: GearPair) => {
  const profilesetName = [gearPair.slot1.name, gearPair.slot2.name].join(" / ");
  const slot1 = stringifySlot1(gearPair.slot1);
  const slot2 = stringifySlot2(gearPair.slot2);
  return [
    `profileset."${profilesetName}"+=${slot1}`,
    `profileset."${profilesetName}"+=${slot2}`,
  ].join("\n");
};

export const stringifyGearCombinations = (gearPairs: GearPair[]) =>
  gearPairs.map(stringifyGearPair).join("\n\n");

export const stringifiedPairedGearCombinations = (equipment: Gear[]) =>
  stringifyGearCombinations(pairedGearCombinations(equipment));
