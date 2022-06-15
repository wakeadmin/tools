import { unref, watchEffect } from '@wakeadmin/demi';
import { EventName, EventArgument, EventBus } from '@wakeapp/framework-core';
import { MaybeRef } from '@wakeadmin/h';

import { useEventBus } from './useEventBus';

/**
 * 监听事件总线事件
 */
export function useEventBusListener<N extends EventName, A extends EventArgument<N>>(
  event: MaybeRef<N>,
  listener: (arg: A) => void,
  eventBus?: MaybeRef<EventBus>
) {
  const injectedEventBus = useEventBus();

  watchEffect(onCleanup => {
    const _event = unref(event);
    const _eventBus = unref(eventBus) ?? unref(injectedEventBus);

    onCleanup(_eventBus.on(_event, listener));
  });
}
