export const isPresent = <T>(x: T | undefined | null): x is T =>
  x !== undefined && x !== null;
