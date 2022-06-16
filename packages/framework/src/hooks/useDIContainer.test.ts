import { container } from '@wakeapp/framework-core';
import { useDIContainer } from './useDIContainer';

test('useDIContainer', () => {
  expect(useDIContainer().value).toBe(container);
});
