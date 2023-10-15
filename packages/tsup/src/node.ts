import type { Options } from 'tsup';

export const node = (options: Options): Options => ({
  // Base stuff
  ...options,
  splitting: false,
  sourcemap: true,
  clean: !options.watch,
  dts: true,
  format: ['esm'],
  publicDir: !options.publicDir,

  // Node specific stuff
  platform: 'node',
  target: 'node20',
  loader: {
    '.simc': 'text',
  },
});
