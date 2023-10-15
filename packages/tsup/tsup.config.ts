import { defineConfig } from 'tsup';

export default defineConfig((overrideOptions) => ({
  entry: ['src/node.ts'],
  splitting: false,
  sourcemap: true,
  clean: !overrideOptions.watch,
  dts: true,
  format: ['esm'],
  platform: 'node',
  target: 'node20',
}));
