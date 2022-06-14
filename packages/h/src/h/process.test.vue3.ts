/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h } from '@wakeadmin/demi';
import { wrap, isWrapped, processChildren } from './process';

test('wrap', () => {
  const a = {};
  expect(isWrapped(a)).toBe(false);
  // 不做处理
  wrap(a);
  expect(isWrapped(a)).toBe(false);

  expect(isWrapped(h('div'))).toBe(true);
});

test('processChildren', () => {
  {
    const props: any = {
      'v-slots': {
        foo: () => null,
      },
    };
    expect(Object.keys(processChildren('', props, ['hello', 'world'])!)).toEqual(['foo', 'default']);
    expect(props['v-slots']).toBeUndefined();
  }
  {
    // 从 children 中传入 slots
    const props = {};
    const r = () => {};
    expect(processChildren('', props, [{ foo: r }])).toEqual({ foo: r });
  }
  // slots 合并2
  {
    const props: any = {
      'v-slots': {
        foo: () => null,
      },
    };
    expect(() => processChildren('', props, [{ bar: () => null }])).toThrowError(
      '已经使用 v-slots 定义了命名 slot, 禁止使用 children 设置 slots'
    );
  }
  {
    const props = {};
    expect(processChildren('', props, ['hello'])).toEqual(['hello']);
  }
});
