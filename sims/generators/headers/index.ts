import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseHeaders = readFileSync(join(__dirname, "headers.simc"), {
  encoding: "utf-8",
});
const headersWithTargetAndTime = (targets: number, time: number) =>
  baseHeaders
    .replace("{{TARGETS}}", String(targets))
    .replace("{{TIME}}", String(time));

export const encounterTypes = [
  "singleTargetRaid",
  "councilRaid",
  "mythicPlusSmallPack",
  "mythicPlusLargePack",
] as const;
export type EncounterType = (typeof encounterTypes)[number];

export const headers: Record<EncounterType, string> = {
  councilRaid: headersWithTargetAndTime(4, 300),
  mythicPlusLargePack: headersWithTargetAndTime(10, 60),
  mythicPlusSmallPack: headersWithTargetAndTime(6, 40),
  singleTargetRaid: headersWithTargetAndTime(1, 300),
};
