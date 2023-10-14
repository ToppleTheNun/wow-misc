import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { Actor, isActor } from "./generators/actors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rawProfileLinks: Record<Actor, string> = {
  T31_Demon_Hunter_Vengeance:
    "https://raw.githubusercontent.com/simulationcraft/simc/dragonflight/profiles/generators/Tier31/T31_Generate_Demon_Hunter.simc",
};

const profilesToUpdate = Object.keys(rawProfileLinks).filter(isActor);
const directory = join(__dirname, "generators", "actors");

for (const profileToUpdate of profilesToUpdate) {
  const githubRawResponse = await fetch(rawProfileLinks[profileToUpdate]);
  const githubRawContents = await githubRawResponse.text();
  const githubSplit = githubRawContents.split("\n");

  const startingLine = githubSplit.findIndex((line) =>
    line.includes(`="${profileToUpdate}"`),
  );
  const endingLine = githubSplit.findIndex((line) =>
    line.includes(`save=${profileToUpdate}.simc`),
  );

  if (startingLine < 0 || endingLine < 0) {
    continue;
  }

  const profile = githubSplit.slice(startingLine, endingLine - 1).join("\n");
  const fileName = join(directory, `${profileToUpdate}.simc`);

  writeFileSync(fileName, profile, { encoding: "utf-8" });
}
