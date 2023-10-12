import { writeFileSync } from "node:fs";

import { type EncounterType, encounterTypes, headers } from "../headers";
import { type Actor, actorWithoutSlots } from "../actors";
import {
  type Gear,
  type Slot,
  stringifiedPairedGearCombinations,
} from "./combinations";
import { isPresent } from "./typeGuards";

type WriteSimFileParams = {
  isPtr?: boolean;
  encounterType: EncounterType;
  actor: Actor;
  withoutSlots: Slot[];
  outputFile: string;
};

type WriteGearPairSimFileParams = WriteSimFileParams & {
  gear: Gear[];
};

export const writeGearPairSimFile = (params: WriteGearPairSimFileParams) => {
  const header = headers[params.encounterType];

  const actor = actorWithoutSlots(params.actor, params.withoutSlots);

  const profilesets = stringifiedPairedGearCombinations(params.gear);

  const contents = [params.isPtr ? "ptr=1\n" : null, header, actor, profilesets]
    .filter(isPresent)
    .join("\n\n");

  writeFileSync(params.outputFile, contents, { encoding: "utf-8" });
};

type WriteGearPairSimFilesParams = Omit<
  WriteGearPairSimFileParams,
  "encounterType" | "outputFile"
> & {
  __filename: string;
};
export const writeGearPairSimFiles = ({
  __filename,
  ...params
}: WriteGearPairSimFilesParams) => {
  for (const encounterType of encounterTypes) {
    writeGearPairSimFile({
      ...params,
      encounterType,
      outputFile: __filename.replace(".ts", `_${encounterType}.simc`),
    });
  }
};
