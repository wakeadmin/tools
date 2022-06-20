import { BayOptions, IBay } from '../types';

import { Bay } from './Bay';

export * from '../types';

export function createBay(options: BayOptions): IBay {
  return new Bay(options);
}
