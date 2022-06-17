import { inject } from 'vue';

import { BayProviderContext } from '../constants';

/**
 * 获取 bay 实例
 * @returns
 */
export function useBay() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return inject(BayProviderContext)!;
}
