/* eslint-disable no-magic-numbers */
import { eventBus } from '@wakeapp/framework-core';
import { ref } from '@wakeadmin/demi';

import { useEventBusListener } from './useEventBusListener';

declare global {
  interface EventMapper {
    Test: number;
  }
}

test('useEventBusListener', () => {
  const l1 = jest.fn();
  const l2 = jest.fn();
  const listener = ref(l1);

  const stop = useEventBusListener('Test', listener);
  eventBus.emit('Test', 1);
  expect(l1).toBeCalledWith(1);

  listener.value = l2;
  eventBus.emit('Test', 2);
  expect(l2).toBeCalledWith(2);

  stop();

  eventBus.emit('Test', 3);
  expect(l1).toHaveBeenCalledTimes(1);
  expect(l2).toHaveBeenCalledTimes(1);
});
