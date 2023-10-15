export const isPresent = <T>(x: T | undefined | null): x is T =>
  x !== undefined && x !== null;

export const snakeToCamel = (str: string): string =>
  str.replace(/([-_]\w)/g, (g) => g.at(1)?.toUpperCase() ?? '');

export const snakeToPascal = (str: string): string => {
  const camel = snakeToCamel(str);
  if (camel.length === 0) {
    return camel;
  }
  return `${camel.at(0)?.toUpperCase() ?? ''}${camel.substring(1)}`;
};
