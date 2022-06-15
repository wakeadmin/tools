import { Ref, inject, computed } from '@wakeadmin/demi';
import { EventBus, eventBus } from '@wakeapp/framework-core';

import { ContainerProviderKey } from '../constants';
import { DIContainerProviderProps } from '../components';

/**
 * 获取事件总线
 * @returns
 */
export function useEventBus(): Ref<EventBus> {
  const injected = inject<DIContainerProviderProps>(ContainerProviderKey);

  return computed(() => injected?.eventBus ?? eventBus);
}
