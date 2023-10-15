import type { Options } from 'tsup';

export const base = (options: Options): Options => ({
  ...options,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  format: ['esm'],
  publicDir: !options.publicDir,
});
