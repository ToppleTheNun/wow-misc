import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getSimcFilesInFlatDirectory,
  isPresent,
  snakeToPascal,
} from '@topplethenun/wow-misc-sims-utils';
import {
  type ConfigMapping,
  defaultConfigMapping,
  getMatrix,
  getModifiedConfigMapping,
} from '@topplethenun/wow-misc-sims-config';
import { getGeneratorByName } from '@topplethenun/wow-misc-sims-generators';
import { format } from 'prettier';
import { dedent } from 'ts-dedent';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configMapping: ConfigMapping = getModifiedConfigMapping(
  defaultConfigMapping,
  (mapping) => {
    mapping.T31_Demon_Hunter_Vengeance.matrix.generators =
      mapping.T31_Demon_Hunter_Vengeance.matrix.generators.filter(
        (generator) => generator.name !== 'embellishments',
      );
    mapping.T31_Demon_Hunter_Vengeance_Crafted.matrix.generators = [
      getGeneratorByName('embellishments'),
    ];
  },
);

const matrix = Object.values(configMapping).flatMap(getMatrix);
const directory = join(__dirname, '..', 'src');

for (const matrixItem of matrix) {
  const { encounterType, generator, profile } = matrixItem;
  const templateName = `${profile}_${generator.name}_${snakeToPascal(
    encounterType,
  )}`;
  const fileName = join(directory, `${templateName}.simc`);

  const generated = generator.generateAsString({
    encounterType,
    profile,
  });
  const templateContents = [profile.includes('T31') ? 'ptr=1' : null, generated]
    .filter(isPresent)
    .join('\n\n');

  writeFileSync(fileName, templateContents, { encoding: 'utf-8' });
}

const { imports, exports, names, mapping } =
  getSimcFilesInFlatDirectory(directory);

const rawContents = dedent`
import {
  type EncounterType,
  type Generator,
  getGeneratorByName,
  type GeneratorName,
  isGeneratorName,
} from '@topplethenun/wow-misc-sims-generators';
import { type Profile } from '@topplethenun/wow-misc-sims-profiles';
import { snakeToPascal } from '@topplethenun/wow-misc-sims-utils';
${imports}


/* eslint-disable camelcase -- Disabling because this needs to match simc. */
${exports}
/* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */

export const templates = [${names}] as const;
export type Template = (typeof templates)[number];
export const isTemplate = (s: unknown): s is Template =>
  templates.includes(s as Template);

const templateMapping: Record<Template, string> = {
  
  /* eslint-disable camelcase -- Disabling because this needs to match simc. */
  ${mapping}
  /* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */
};
export const getTemplateByName = (template: Template): string =>
  templateMapping[template];

interface GetTemplateParams {
  profile: Profile;
  encounterType: EncounterType;
  generator: Generator | GeneratorName;
}
export const getTemplate = (params: GetTemplateParams): string | undefined => {
  const generator = isGeneratorName(params.generator)
    ? getGeneratorByName(params.generator)
    : params.generator;
  const possibleTemplateName = \`\${params.profile}_\${
  generator.name
}_\${snakeToPascal(params.encounterType)}\`;
  if (!isTemplate(possibleTemplateName)) {
    return undefined;
  }
  return getTemplateByName(possibleTemplateName);
};
`;

const formattedContents = await format(rawContents, { parser: 'typescript' });
writeFileSync(join(directory, 'index.ts'), formattedContents, {
  encoding: 'utf-8',
});
