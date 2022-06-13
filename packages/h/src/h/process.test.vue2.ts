/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-empty-function */
import { processChildren, isSlots, wrap, isWrapped, processVue2Event, processVue2Attr, processProps } from './process';

test('wrap', () => {
  const a = {};
  expect(isWrapped(a)).toBe(false);
  wrap(a);
  expect(isWrapped(a)).toBe(true);
});

test('processVue2Event', () => {
  const handler = () => {};
  // 非 on*
  expect(processVue2Event('', handler)).toBe(null);
  expect(processVue2Event('on', handler)).toBe(null);
  expect(processVue2Event('onxx', handler)).toBe(null);
  expect(processVue2Event('on12', handler)).toBe(null);

  expect(processVue2Event('onClick', handler)).toEqual({
    name: 'click',
    value: handler,
    isNative: false,
  });

  expect(processVue2Event('onClickMe', handler)).toEqual({
    name: 'clickMe',
    value: handler,
    isNative: false,
  });
  expect(processVue2Event('onUpdate:modelValue', handler)).toEqual({
    name: 'update:modelValue',
    value: handler,
    isNative: false,
  });

  // 修饰符
  expect(processVue2Event('onClickCapture', handler)).toEqual({
    name: '!click',
    value: handler,
    isNative: false,
  });
  expect(processVue2Event('onClickCaptureOnce', handler)).toEqual({
    name: '~!click',
    value: handler,
    isNative: false,
  });
  expect(processVue2Event('onClickPassiveOnce', handler)).toEqual({
    name: '~&click',
    value: handler,
    isNative: false,
  });

  // native
  expect(processVue2Event('onClickNative', handler)).toEqual({
    name: 'click',
    value: handler,
    isNative: true,
  });
});

test('processVue2Attr', () => {
  const value = {};

  // 强制 domProps
  expect(processVue2Attr({ tag: 'test', type: 'input' }, '.attr', value)).toEqual({
    domProps: true,
    name: 'attr',
    value,
  });

  // 强制 attr
  expect(processVue2Attr({ tag: 'test', type: 'input' }, '^attr', value)).toEqual({
    domProps: false,
    name: 'attr',
    value,
  });

  // mustUseProp
  expect(processVue2Attr({ tag: 'input', type: 'text' }, 'value', value)).toEqual({
    domProps: true,
    name: 'value',
    value,
  });

  // 默认
  expect(processVue2Attr({ tag: 'test', type: 'input' }, 'attr', value)).toEqual({
    domProps: false,
    name: 'attr',
    value,
  });

  // innerHTML 和 textContent, 必须为 props
  ['innerHTML', 'textContent'].forEach(k => {
    expect(processVue2Attr({ tag: 'div', type: undefined }, k, value)).toEqual({
      domProps: true,
      name: k,
      value,
    });
  });
});

test('isSlots', () => {
  expect(isSlots({})).toBe(false);
  expect(isSlots([])).toBe(false);
  expect(isSlots(wrap({}))).toBe(false);

  expect(isSlots({ default: () => {} })).toBe(true);
});

test('processProps', () => {
  expect(processProps('tag', {})).toEqual({
    // attrs: {},
    // domProps: {},
    // nativeOn: {},
    // on: {},
  });

  const p = {};
  const h = () => {};

  expect(
    processProps('input', {
      onClick1: h,
      onClick2Capture: h,
      onClick3CaptureOnce: h,
      onClick4Native: h,
      p1: p,
      '^p2': p,
      '.p3': p,
      value: p,
      // 合并
      attrs: {
        foo: 'foo',
      },
      domProps: {
        bar: 'bar',
      },
      refInFor: true,
    })
  ).toEqual({
    attrs: {
      p1: p,
      p2: p,
      foo: 'foo',
    },
    domProps: {
      p3: p,
      value: p,
      bar: 'bar',
    },
    nativeOn: {
      click4: h,
    },
    on: {
      click1: h,
      '!click2': h,
      '~!click3': h,
    },
    refInFor: true,
  });
});

describe('processChildren', () => {
  test('无法识别 slots', () => {
    {
      const props = {};
      expect(processChildren('', props, [])).toEqual([]);
      expect(processChildren('', props, ['hello'])).toEqual(['hello']);
      expect(processChildren('', props, [{}])).toEqual([{}]);
    }

    {
      const props: any = {
        'v-slots': {},
      };

      expect(() => processChildren('', props, ['hello', 'world'])).toThrowError('v-slots 必须为对象, 值为函数');
    }
  });

  test('识别 slots', () => {
    {
      const props: any = {};
      expect(processChildren('', props, [{ default: () => {} }])).toEqual(null);
      expect(props.scopedSlots).toBeDefined();
    }
    // 合并 slots
    {
      const props: any = {
        'v-slots': {
          foo: () => null,
        },
      };
      expect(processChildren('', props, ['hello', 'world'])).toEqual(null);
      expect(Object.keys(props.scopedSlots)).toEqual(['foo', 'default']);
      expect(props['v-slots']).toBeUndefined();
    }
    // slots 冲突
    {
      const props: any = {
        'v-slots': {
          default: () => null,
        },
      };
      expect(() => processChildren('', props, ['hello', 'world'])).toThrowError(
        '在 v-slots 已经定义了 default slot, 不能同时设置 children'
      );
    }
  });
});
