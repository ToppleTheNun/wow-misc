import { defineConfig } from 'tsup';

export default defineConfig((overrideOptions) => ({
  entry: ['src/index.ts'],
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
