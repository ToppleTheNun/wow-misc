import { writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

import { type EncounterType, encounterTypes, headers } from "../headers";
import { type Profile, profileWithoutSlots } from "../profiles";
import {
  type Gear,
  type Slot,
  stringifiedPairedGearCombinations,
} from "../combinations/combinations";
import { isPresent } from "./typeGuards";

type WriteGearPairSimFileParams = {
  isPtr?: boolean;
  encounterType: EncounterType;
  actor: Profile;
  modifyDefaultActor?: (actor: string) => string;
  withoutSlots: Slot[];
  outputFile: string;
  gear: Gear[];
};

export const writeGearPairSimFile = (params: WriteGearPairSimFileParams) => {
  const header = headers[params.encounterType];

  const baseActor = profileWithoutSlots(params.actor, params.withoutSlots);
  const actor = params?.modifyDefaultActor?.(baseActor) ?? baseActor;

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
  const baseFileName = basename(__filename);
  const directory = dirname(__filename);
  for (const encounterType of encounterTypes) {
    const outputFileName = [
      params.actor,
      baseFileName.replace(".ts", `_${encounterType}.simc`),
    ].join("_");
    const outputFile = join(directory, "..", "templates", outputFileName);
    writeGearPairSimFile({
      ...params,
      encounterType,
      outputFile,
    });
  }
};
