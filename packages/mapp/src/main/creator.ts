import { BayOptions, IBay } from '../types';

import { Bay } from './Bay';

let bay: IBay;

/**
 * 创建基座实例
 * @param options
 * @returns
 */
export function createBay(options: BayOptions): IBay {
  if (bay != null && process.env.NODE_ENV !== 'production') {
    throw new Error(`[mapp] createBay: bay is already created.`);
  }

  window.__MAPP_BAY__ = bay = new Bay(options);

  return bay;
}
