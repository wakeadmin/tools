import { Ref, unref, computed, watchEffect } from '@wakeadmin/demi';
import { MaybeRef } from '@wakeadmin/h';
import { DIIdentifier, DIValue, Container, isLongTimeScope, getDisposerMethods } from '@wakeapp/framework-core';
import { isObject } from '../utils';

import { useDIContainer } from './useDIContainer';

/**
 * 获取所有相同标识符的注入
 */
export function useInjectAll<I extends DIIdentifier, T extends DIValue<I>>(
  identifier: MaybeRef<I>,
  defaultValue?: MaybeRef<T[]>,
  container?: MaybeRef<Container>
): Ref<T[]> {
  const injectedContainer = useDIContainer();

  const instances = computed(() => {
    const _container = unref(container) ?? unref(injectedContainer);
    const _defaultValue = unref(defaultValue);
    const _identifier = unref(identifier);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      return _container.getAll(_identifier) as T[];
    } catch (err) {
      if (_defaultValue !== undefined && !_container.isBound(_identifier)) {
        return _defaultValue;
      }
      throw err;
    }
  });

  // 尝试销毁
  watchEffect(onCleanup => {
    const _instances = unref(instances);
    const disposers: Function[] = [];

    _instances.forEach(_instance => {
      if (isObject(_instance) && !isLongTimeScope(_instance)) {
        const disposerMethods = getDisposerMethods(_instance);
        if (disposerMethods.length) {
          disposers.push(() => {
            disposerMethods.forEach(method => {
              (_instance as any)[method]?.();
            });
          });
        }
      }
    });

    if (disposers.length) {
      onCleanup(() => {
        disposers.forEach(fn => fn());
      });
    }
  });

  return instances;
}
