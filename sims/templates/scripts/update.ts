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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const templatesToUpdate = fastCartesian([profiles, encounterTypes, generators]);
const directory = join(__dirname, '..', 'src');

const isPresent = <T>(x: T | undefined | null): x is T =>
  x !== undefined && x !== null;

const snakeToCamel = (str: string): string =>
  str.replace(/([-_]\w)/g, (g) => g.at(1)?.toUpperCase() ?? '');
const snakeToPascal = (str: string): string => {
  const camel = snakeToCamel(str);
  if (camel.length === 0) {
    return camel;
  }
  return `${camel.at(0)?.toUpperCase() ?? ''}${camel.substring(1)}`;
};

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
${imports}

${exports}

export const templates = [${templateNames}] as const;
export type Template = (typeof templates)[number];
export const isTemplate = (s: string): s is Template =>
  templates.includes(s as Template);

const templateMapping: Record<Template, string> = {
  ${templateMapping}
};
export const getTemplate = (template: Template): string => templateMapping[template];
`;

const formattedContents = await format(rawContents, { parser: 'typescript' });
writeFileSync(join(directory, 'index.ts'), formattedContents, {
  encoding: 'utf-8',
});
