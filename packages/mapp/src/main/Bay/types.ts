import { MicroApp } from '../../types';
import { type ActivityFn } from 'single-spa';

export interface MicroAppNormalized extends MicroApp {
  /**
   * 没有携带 baseUrl 的 activeRule
   */
  activeRuleRaw: string | string[];

  loader?: (loading: boolean) => Promise<void>;
}

export interface ModernMicroAppNormalized extends MicroAppNormalized {
  activeRuleWhen: ActivityFn[];
}
