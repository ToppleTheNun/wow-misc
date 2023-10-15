import type { Options } from 'tsup';
import { base } from './base';

export const node = (options: Options): Options => ({
  ...base(options),
  platform: 'node',
  target: 'node20',
  loader: {
    '.simc': 'text',
  },
});
