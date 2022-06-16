import { eventBus } from '@wakeapp/framework-core';
import { useEventBus } from './useEventBus';

test('useDIContainer', () => {
  expect(useEventBus().value).toBe(eventBus);
});
