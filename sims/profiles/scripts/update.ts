import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSimcFilesInFlatDirectory } from '@topplethenun/wow-misc-sims-utils';
import { format } from 'prettier';
import { dedent } from 'ts-dedent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const t31GitHubLink = (profile: string): string =>
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
  // eslint-disable-next-line no-await-in-loop -- idc
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

const { imports, exports, names, mapping } =
  getSimcFilesInFlatDirectory(directory);

const rawContents = dedent`
import { isPresent } from "@topplethenun/wow-misc-sims-utils";
${imports}


/* eslint-disable camelcase -- Disabling because this needs to match simc. */
${exports}
/* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */

export const profiles = [${names}] as const;
export type Profile = (typeof profiles)[number];
export const isProfile = (s: unknown): s is Profile =>
  isPresent(s) && typeof s === "string" && profiles.includes(s as Profile);

const profileMapping: Record<Profile, string> = {
  
  /* eslint-disable camelcase -- Disabling because this needs to match simc. */
  ${mapping}
  /* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */
};
export const getProfile = (profile: Profile): string => profileMapping[profile];
`;

const formattedContents = await format(rawContents, { parser: 'typescript' });
writeFileSync(join(directory, 'index.ts'), formattedContents, {
  encoding: 'utf-8',
});
