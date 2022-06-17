import { BayOptions, IBay } from '../types';

import { Bay } from './Bay';

export function createBay(options: BayOptions): IBay {
  return new Bay(options);
}
