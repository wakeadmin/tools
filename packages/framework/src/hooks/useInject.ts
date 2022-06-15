import { computed, unref, watchEffect, Ref } from '@wakeadmin/demi';
import { DIIdentifier, DIValue, Container, isLongTimeScope, getDisposerMethods } from '@wakeapp/framework-core';
import { MaybeRef } from '@wakeadmin/h';

import { useDIContainer } from './useDIContainer';
import { isObject } from '../utils';

export function useInject<I extends DIIdentifier, T extends DIValue<I>>(
  identifier: MaybeRef<I>,
  defaultValue?: MaybeRef<T>,
  container?: MaybeRef<Container>
): Ref<T> {
  const injectedContainer = useDIContainer();

  const instance = computed(() => {
    const _container = unref(container) ?? unref(injectedContainer);
    const _defaultValue = unref(defaultValue);
    const _identifier = unref(identifier);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return _container.get(_identifier) as T;
    } catch (err) {
      // 回退到默认值
      if (_defaultValue !== undefined && !_container.isBound(_identifier)) {
        return _defaultValue;
      }

      throw err;
    }
  });

  // 尝试销毁
  watchEffect(onCleanup => {
    const _instance = unref(instance);
    if (isObject(_instance) && !isLongTimeScope(_instance)) {
      const disposers = getDisposerMethods(_instance);
      if (disposers.length) {
        onCleanup(() => {
          disposers.forEach(method => {
            (_instance as any)[method]?.();
          });
        });
      }
    }
  });

  return instance;
}
