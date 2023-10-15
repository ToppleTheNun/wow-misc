import { readdirSync } from 'node:fs';

export const isPresent = <T>(x: T | undefined | null): x is T =>
  x !== undefined && x !== null;

export const snakeToCamel = (str: string): string =>
  str.replace(/(?<snake>[-_]\w)/g, (g) => g.at(1)?.toUpperCase() ?? '');

export const snakeToPascal = (str: string): string => {
  const camel = snakeToCamel(str);
  if (camel.length === 0) {
    return camel;
  }
  return `${camel.at(0)?.toUpperCase() ?? ''}${camel.substring(1)}`;
};

interface SimcFilesInDirectory {
  imports: string;
  exports: string;
  names: string;
  mapping: string;
}

// Some of this bullshit is to trick rollup/TypeScript into letting us export
// the constants that are going to be strings after bundling.
export const getSimcFilesInFlatDirectory = (
  directory: string,
): SimcFilesInDirectory => {
  const simcFilesInDirectory = readdirSync(directory).filter((item) =>
    item.endsWith('.simc'),
  );
  const simcFiles = simcFilesInDirectory.map((file) => ({
    baseName: file.replace('.simc', ''),
    importName: snakeToPascal(file.replace('.simc', '')),
    fileName: file,
  }));

  // Some of this bullshit is to trick rollup/TypeScript into letting us export
  // the constants that are going to be strings after bundling.
  const imports = simcFiles
    .map((file) => `import ${file.importName} from './${file.fileName}'`)
    .join('\n');
  const exports = simcFiles
    .map(
      (file) => `export const ${file.baseName}: string = ${file.importName};`,
    )
    .join('\n');
  const names = simcFiles.map((file) => `'${file.baseName}'`).join(', ');
  const mapping = simcFiles.map((file) => `${file.baseName},`).join('\n');

  return { imports, exports, names, mapping };
};
