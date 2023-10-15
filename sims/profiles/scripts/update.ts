import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { format } from 'prettier';
import { dedent } from 'ts-dedent';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const t31GitHubLink = (profile: string) =>
  `https://raw.githubusercontent.com/simulationcraft/simc/dragonflight/profiles/generators/Tier31/${profile}.simc`;

const rawProfileLinks: Record<string, string> = {
  T31_Demon_Hunter_Vengeance: t31GitHubLink('T31_Generate_Demon_Hunter'),
};

const profilesToUpdate = Object.keys(rawProfileLinks);
const directory = join(__dirname, '..', 'src');

const fetchCache: Record<string, string> = {};
const fetchProfile = async (link: string): Promise<string> => {
  const cached = fetchCache[link];
  if (cached) {
    return cached;
  }
  const response = await fetch(link);
  const toCache = await response.text();
  fetchCache[link] = toCache;
  return toCache;
};

for (const profileToUpdate of profilesToUpdate) {
  const profileToUpdateLink = rawProfileLinks[profileToUpdate];
  if (!profileToUpdateLink) {
    continue;
  }
  const fetchedProfile = await fetchProfile(profileToUpdateLink);
  const fetchedProfileSplit = fetchedProfile.split('\n');

  const startingLine = fetchedProfileSplit.findIndex((line) =>
    line.includes(`="${profileToUpdate}"`),
  );
  const endingLine = fetchedProfileSplit.findIndex((line) =>
    line.includes(`save=${profileToUpdate}.simc`),
  );

  if (startingLine < 0 || endingLine < 0) {
    continue;
  }

  const profile = fetchedProfileSplit
    .slice(startingLine, endingLine - 1)
    .join('\n');
  const fileName = join(directory, `${profileToUpdate}.simc`);

  writeFileSync(fileName, profile, { encoding: 'utf-8' });
}

// Some of this bullshit is to trick rollup/TypeScript into letting us export
// the constants that are going to be strings after bundling.
const imports = profilesToUpdate
  .map(
    (profile) =>
      `import ${profile.replaceAll('_', '')} from './${profile}.simc'`,
  )
  .join('\n');
const exports = profilesToUpdate
  .map(
    (profile) =>
      `export const ${profile}: string = ${profile.replaceAll('_', '')};`,
  )
  .join('\n');
const profiles = profilesToUpdate.map((profile) => `'${profile}'`).join(', ');
const profileMapping = profilesToUpdate
  .map((profile) => `${profile},`)
  .join('\n');

const rawContents = dedent`
${imports}
import { isPresent } from "./utils";

${exports}

export const profiles = [${profiles}] as const;
export type Profile = (typeof profiles)[number];
export const isProfile = (s: any): s is Profile =>
  isPresent(s) && typeof s === "string" && profiles.includes(s as Profile);

const profileMapping: Record<Profile, string> = {
  ${profileMapping}
};
export const getProfile = (profile: Profile): string => profileMapping[profile];
`;

const formattedContents = await format(rawContents, { parser: 'typescript' });
writeFileSync(join(directory, 'index.ts'), formattedContents, {
  encoding: 'utf-8',
});
