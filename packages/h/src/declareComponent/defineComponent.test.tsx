import { toRefs, reactive, isReactive, watchEffect } from 'vue-demi';

import { withDefaults, declareProps, declareEmits, declareExpose, declareSlots } from './defineComponent';

test('declareProps', () => {
  expect(declareProps<{ foo: string; bar: string }>(['foo', 'bar'])).toEqual(['foo', 'bar']);
});

test('declareEmits', () => {
  expect(declareEmits<{ click: () => void }>(['click'])).toEqual(['click']);
});

test('declareExpose', () => {
  expect(declareExpose<{ a: string }>()).toEqual(undefined);
});

test('declareSlots', () => {
  expect(declareSlots<{ a: () => any }>()).toEqual(undefined);
});

describe('withDefaults', () => {
  test('如果是非 reactive 对象则抛出异常', () => {
    expect(() => {
      withDefaults({}, {});
    }).toThrowError();

    expect(() => {
      // @ts-expect-error
      withDefaults([], {});
    }).toThrowError();
  });

  test('withDefaultValue', () => {
    const value = reactive<{ foo: string; bar?: string }>({ foo: 'bar' });
    const withDefaultValue = withDefaults(value, { bar: 'baz' });

    // 依旧还是 reactive
    expect(isReactive(withDefaultValue)).toBe(true);

    expect(Object.keys(withDefaultValue)).toEqual(['foo', 'bar']);

    // 保持响应性
    let bar: any;
    watchEffect(
      () => {
        bar = withDefaultValue.bar;
      },
      {
        flush: 'sync',
      }
    );

    // toRefs 兼容, 依赖于 ownKeys
    const refs = toRefs(withDefaultValue);

    expect(withDefaultValue.bar).toBe('baz');
    expect(bar).toBe('baz');
    expect(refs.bar.value).toBe('baz');

    // vue2 在这里不会响应, 需要 set
    value.bar = 'new bar';

    expect(withDefaultValue.bar).toBe('new bar');
    expect(bar).toBe('new bar');
    expect(refs.bar.value).toBe('new bar');

    // 恢复默认
    value.bar = undefined;
    expect(withDefaultValue.bar).toBe('baz');
    expect(bar).toBe('baz');
    expect(refs.bar.value).toBe('baz');
  });
});
