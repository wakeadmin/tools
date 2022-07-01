import { EffectScope, effectScope } from '@wakeadmin/demi';

import { hasProp, addHiddenProp } from '../utils';

const effectScopeStoreSymbol = Symbol('stored-effect-scope');

/**
 * 获取或创建 detached effect scope
 * @param target
 * @returns
 */
export const getEffectScope = (target: any): EffectScope => {
  if (hasProp(target, effectScopeStoreSymbol)) {
    return target[effectScopeStoreSymbol];
  }

  const scope = effectScope(true);

  addHiddenProp(target, effectScopeStoreSymbol, scope);

  return scope;
};
