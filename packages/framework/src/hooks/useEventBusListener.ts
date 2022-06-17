import { unref, watch } from '@wakeadmin/demi';
import { EventName, EventArgument, EventBus } from '@wakeapp/framework-core';
import { MaybeRef } from '@wakeadmin/h';

import { useEventBus } from './useEventBus';

/**
 * 监听事件总线事件
 */
export function useEventBusListener<N extends EventName, A extends EventArgument<N>>(
  event: MaybeRef<N>,
  listener: MaybeRef<(arg: A) => void>,
  eventBus?: MaybeRef<EventBus>
) {
  const injectedEventBus = useEventBus();

  const stop = watch(
    () => ({ event: unref(event), bus: unref(eventBus) ?? unref(injectedEventBus) }),
    (value, _, onCleanup) => {
      onCleanup(
        value.bus.on(value.event, (...args: any[]) => {
          unref(listener).apply(null, args as any);
        })
      );
    },
    { flush: 'sync', immediate: true }
  );

  return stop;
}
