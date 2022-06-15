/** @jsx h */
/* eslint-disable no-magic-numbers */
import { ref, computed, nextTick, provide, inject } from '@wakeadmin/demi';
import { declareComponent, h } from '@wakeadmin/h';

import { renderHook } from '.';

describe('renderHook', () => {
  test('renderHook', () => {
    const result = renderHook(() => ref(1));

    expect(result.current?.value).toBe(1);

    result.rerender({});

    expect(result.current?.value).toBe(1);
  });

  test('renderHook props', async () => {
    const result = renderHook(props => computed(() => props.value), { initialProps: { value: 1 } });

    expect(result.current?.value).toBe(1);

    result.rerender({ value: 2 });

    // 等待响应
    await nextTick();

    expect(result.current?.value).toBe(2);
  });

  test('renderHook with wrapper', () => {
    const result = renderHook(() => inject<string>('value'), {
      wrapper: declareComponent({
        setup(_, { slots }) {
          provide('value', 'value');

          return () => <div title="wrapper">{slots.default?.()}</div>;
        },
      }),
    });

    result.debug();
    expect(result.current).toBe('value');
  });
});
