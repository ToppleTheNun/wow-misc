import { defineConfig } from 'tsup';

export default defineConfig((overrideOptions) => ({
  entry: [
    'src/profilesets/embellishments.ts',
    'src/profilesets/rings.ts',
    'src/profilesets/trinkets.ts',
    'src/profilesets/weapons.ts',
  ],
  splitting: false,
  sourcemap: true,
  clean: !overrideOptions.watch,
  dts: true,
  format: ['esm'],
  platform: 'node',
  target: 'node20',
  loader: {
    '.simc': 'text',
  },
}));
