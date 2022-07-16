import { getAsset, registerAsset, listenAssets, useAsset } from '.';
import { unref } from '@wakeadmin/demi';

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

test('useAsset', () => {
  const value = useAsset('demo', 'fallback');

  expect(unref(value)).toBe('fallback');

  registerAsset('demo', 'demo');

  expect(unref(value)).toBe('demo');
});
