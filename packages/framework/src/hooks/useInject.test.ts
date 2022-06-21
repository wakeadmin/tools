import { effectScope, nextTick, ref } from '@wakeadmin/demi';
import { useInject } from './useInject';
import { cleanAndRebind, container, stubDisposer, Demo1, Demo2 } from './helper.test.share';
import { DIIdentifier } from '@wakeapp/framework-core';

beforeEach(cleanAndRebind);

test('自动回收', () => {
  const dispose = jest.fn();
  stubDisposer(dispose);

  const scope = effectScope();
  scope.run(() => {
    const instance = useInject('Demo1', undefined, container);
    expect(instance.value).toBeInstanceOf(Demo1);
  });

  scope.stop();
  expect(dispose).toBeCalled();
});

test('默认值', () => {
  const instance = useInject('Unknown' as any, 'default', container);
  expect(instance.value).toBe('default');
});

test('ref 标识符', async () => {
  const scope = effectScope();
  const dispose = jest.fn();

  scope.run(() => {
    const id = ref<DIIdentifier>('Demo1');
    stubDisposer(dispose);
    const instance = useInject(id, undefined, container);
    expect(instance.value).toBeInstanceOf(Demo1);
    expect(dispose).toBeCalledTimes(0);

    // 切换标识符
    id.value = 'Demo2';
    expect(instance.value).toBeInstanceOf(Demo2);
  });

  // 等待队列清空
  await nextTick();
  expect(dispose).toBeCalledTimes(1);

  // 手动释放
  scope.stop();
  expect(dispose).toBeCalledTimes(2);
});
