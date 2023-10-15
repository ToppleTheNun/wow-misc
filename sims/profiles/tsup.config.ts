import { node } from '@topplethenun/wow-misc-tsup/node';
import { defineConfig } from 'tsup';

export default defineConfig((overrideOptions) =>
  node({
    ...overrideOptions,
    entry: ['src/index.ts'],
  }),
);
