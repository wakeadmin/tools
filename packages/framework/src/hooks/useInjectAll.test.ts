import { effectScope, ref } from '@wakeadmin/demi';
import { useInjectAll } from './useInjectAll';
import { cleanAndRebind, container, stubDisposer, Demo1, Demo2 } from './helper.test.share';
import { DIIdentifier } from '@wakeapp/framework-core';

beforeEach(cleanAndRebind);

test('自动回收', () => {
  const dispose = jest.fn();
  stubDisposer(dispose);

  const scope = effectScope();
  scope.run(() => {
    const instance = useInjectAll('DemoAll', undefined, container);
    expect(instance.value.length).toBe(2);
  });

  scope.stop();
  // 释放两个
  expect(dispose).toBeCalledTimes(2);
});

test('默认值', () => {
  const instance = useInjectAll('Unknown' as any, ['default'], container);
  expect(instance.value).toEqual(['default']);
});

test('ref 标识符', () => {
  const id = ref<DIIdentifier>('Demo1');
  const scope = effectScope();
  const dispose = jest.fn();
  stubDisposer(dispose);

  scope.run(() => {
    const instance = useInjectAll(id, undefined, container);
    expect(instance.value[0]).toBeInstanceOf(Demo1);
    expect(dispose).toBeCalledTimes(0);

    // 切换标识符
    id.value = 'Demo2';
    expect(instance.value[0]).toBeInstanceOf(Demo2);
    expect(dispose).toBeCalledTimes(1);
  });

  scope.stop();
  expect(dispose).toBeCalledTimes(2);
});
