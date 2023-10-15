import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { profiles } from '@topplethenun/wow-misc-sims-profiles';
import { format } from 'prettier';
import { dedent } from 'ts-dedent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directory = join(__dirname, '..', 'src');

// Some of this bullshit is to trick rollup/TypeScript into letting us export
// the constants that are going to be strings after bundling.
const exports = profiles
  .map(
    (profile) =>
      `export const ${profile}: Config = createDefaultConfigForProfile("${profile}");`,
  )
  .join('\n');
const defaultConfigMapping = profiles.join(',\n');

const rawContents = dedent`
import {
  encounterTypes,
  type EncounterType,
  generators,
  type Generator,
} from '@topplethenun/wow-misc-sims-generators';
import { type Profile } from '@topplethenun/wow-misc-sims-profiles';
import fastCartesian from 'fast-cartesian';
import { type Draft, produce } from 'immer';

export interface ConfigMatrix {
  encounterTypes: EncounterType[];
  generators: Generator[];
}
export interface ConfigMatrixItem {
  encounterType: EncounterType;
  generator: Generator;
  profile: Profile;
}
export interface Config {
  profile: Profile;
  matrix: ConfigMatrix;
}

const createDefaultConfigForProfile = (profile: Profile): Config => ({
  profile,
  matrix: {
    encounterTypes: [...encounterTypes],
    generators,
  },
});

/* eslint-disable camelcase -- Disabling because this needs to match simc. */
${exports}
/* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */

export type ConfigMapping = Record<Profile, Config>;
export const defaultConfigMapping: ConfigMapping = {
  /* eslint-disable camelcase -- Disabling because this needs to match simc. */
  ${defaultConfigMapping}
  /* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */
};
export const getDefaultConfig = (profile: Profile): Config =>
  defaultConfigMapping[profile];
  
type ConfigProducerReturningConfig = (draft: Draft<Config>) => Config;
type ConfigProducerReturningVoid = (draft: Draft<Config>) => void;
export type ConfigProducer =
  | ConfigProducerReturningConfig
  | ConfigProducerReturningVoid;
export const getModifiedConfig = (
  config: Config,
  producer: ConfigProducer,
): Config => produce(config, producer);

type ConfigMappingProducerReturningConfig = (draft: Draft<ConfigMapping>) => ConfigMapping;
type ConfigMappingProducerReturningVoid = (draft: Draft<ConfigMapping>) => void;
export type ConfigMappingProducer =
  | ConfigMappingProducerReturningConfig
  | ConfigMappingProducerReturningVoid;
export const getModifiedConfigMapping = (
  config: ConfigMapping,
  producer: ConfigMappingProducer,
): ConfigMapping => produce(config, producer);

const toConfigMatrixItem = ([profile, encounterType, generator]: [
  Profile,
  EncounterType,
  Generator,
]): ConfigMatrixItem => ({ encounterType, generator, profile });
export const getMatrix = (config: Config): ConfigMatrixItem[] => {
  const profiles = [config.profile];
  const matrixEncounterTypes = config.matrix.encounterTypes;
  const matrixGenerators = config.matrix.generators;
  return fastCartesian([profiles, matrixEncounterTypes, matrixGenerators]).map(
    toConfigMatrixItem,
  );
};
`;

const formattedContents = await format(rawContents, { parser: 'typescript' });
writeFileSync(join(directory, 'index.ts'), formattedContents, {
  encoding: 'utf-8',
});
