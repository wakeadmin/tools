/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { h } from 'vue-demi';
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
  {
    const props = {};
    expect(processChildren('', props, ['hello'])).toEqual(['hello']);
  }
});
