import { MicroApp } from '../../types';

export interface MicroAppNormalized extends MicroApp {
  /**
   * 没有携带 baseUrl 的 activeRule
   */
  activeRuleRaw: string;

  loader?: (loading: boolean) => Promise<void>;
}
