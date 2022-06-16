import { Ref, inject, computed } from '@wakeadmin/demi';
import { EventBus, eventBus } from '@wakeapp/framework-core';

import { DIContainerContext } from '../components';

/**
 * 获取事件总线
 * @returns
 */
export function useEventBus(): Ref<EventBus> {
  const injected = inject(DIContainerContext);

  return computed(() => injected?.eventBus ?? eventBus);
}
