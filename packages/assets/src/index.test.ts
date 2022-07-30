import { unref, ref } from '@wakeadmin/demi';

import { getAsset, registerAsset, listenAssets, useAsset } from '.';

window.__MAPP_ASSETS__ = [{ global1: '1', global2: '2' }, ['global3', '3']];

test('globalMount', () => {
  expect(getAsset('global1', 'fallback')).toBe('1');
  expect(getAsset('global2', 'fallback')).toBe('2');
  expect(getAsset('global3', 'fallback')).toBe('3');
});

test('assets', () => {
  const listener = jest.fn();

  const dispose = listenAssets(listener);

  expect(getAsset('unknown', 'unknown')).toBe('unknown');

  registerAsset('unknown', 'hello');
  expect(getAsset('unknown', 'unknown')).toBe('hello');
  expect(listener.mock.calls[0][0]).toBe('unknown');
  expect(listener.mock.calls[0][1]).toBe('hello');

  dispose();

  registerAsset('test', 'test');

  expect(listener).toBeCalledTimes(1);
});

test('useAsset', async () => {
  const value = useAsset('demo', 'fallback');

  expect(unref(value)).toBe('fallback');

  registerAsset('demo', 'demo');

  expect(unref(value)).toBe('demo');

  // ref
  const keyRef = ref('demo');
  const value2 = useAsset(keyRef, 'fallback');
  expect(unref(value2)).toBe('demo');
  keyRef.value = 'unknown!';

  expect(unref(value2)).toBe('fallback');
});
