import { markRaw } from '@wakeadmin/demi';
import { ownKeys } from '../utils';

import { apply } from './administrator';
import { collectAnnotations } from './decorators';

/**
 * makeObservable 建议在类构造函数的最后调用
 * @param target
 * @returns
 */
export function makeObservable<T extends object>(target: T): T {
  const annotations = collectAnnotations(target);
  ownKeys(annotations).forEach(key => {
    const annotation = annotations[key];
    apply(target, key, annotation);
  });

  // 避免被转换
  markRaw(target);

  return target;
}
