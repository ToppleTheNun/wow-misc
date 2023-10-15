import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { profiles } from '@topplethenun/wow-misc-sims-profiles';
import {
  encounterTypes,
  generators,
} from '@topplethenun/wow-misc-sims-generators';
import fastCartesian from 'fast-cartesian';
import { format } from 'prettier';
import { dedent } from 'ts-dedent';

import { isPresent, snakeToPascal } from '../src/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesToUpdate = fastCartesian([profiles, encounterTypes, generators]);
const directory = join(__dirname, '..', 'src');

const templates: string[] = [];
for (const [profile, encounterType, generator] of templatesToUpdate) {
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
  templates.push(templateName);
}

// Some of this bullshit is to trick rollup/TypeScript into letting us export
// the constants that are going to be strings after bundling.
const imports = templates
  .map(
    (template) => `import ${snakeToPascal(template)} from './${template}.simc'`,
  )
  .join('\n');
const exports = templates
  .map(
    (template) =>
      `export const ${template}: string = ${snakeToPascal(template)};`,
  )
  .join('\n');
const templateNames = templates.map((template) => `'${template}'`).join(', ');
const templateMapping = templates.map((template) => `${template},`).join('\n');

const rawContents = dedent`
import {
  type EncounterType,
  type Generator,
  generator as getGenerator,
  type GeneratorName,
  isGeneratorName,
} from '@topplethenun/wow-misc-sims-generators';
import { type Profile } from '@topplethenun/wow-misc-sims-profiles';
${imports}
import { snakeToPascal } from './utils';


/* eslint-disable camelcase -- Disabling because this needs to match simc. */
${exports}

/* eslint-enable camelcase -- Enabling because the rest does not need to match simc. */

export const templates = [${templateNames}] as const;
export type Template = (typeof templates)[number];
export const isTemplate = (s: unknown): s is Template =>
  templates.includes(s as Template);

const templateMapping: Record<Template, string> = {
  
  /* eslint-disable camelcase -- Disabling because this needs to match simc. */
  ${templateMapping}
  
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
    ? getGenerator(params.generator)
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
