/* eslint-disable no-lone-blocks */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ref } from '@wakeadmin/demi';
import {
  processChildren,
  isSlots,
  wrap,
  isWrapped,
  processVue2Event,
  processVue2Attr,
  processProps,
  vue2GetElementInstance,
  vue2MustUseProps,
  processRef,
  mergeProps,
  mergeEvents,
} from './process';
import { isVue2Dot7 } from '../utils';
import { render } from '../__tests__/helper';

test('wrap', () => {
  const a = {};
  expect(isWrapped(a)).toBe(false);
  wrap(a);
  expect(isWrapped(a)).toBe(true);
});

test('mergeProps', () => {
  expect(mergeProps({}, {})).toEqual({});
  expect(mergeProps({ foo: { bar: 1 } }, { foo: { baz: 2 } })).toEqual({ foo: { bar: 1, baz: 2 } });

  const h1 = () => {};
  const h2 = () => {};

  expect(mergeProps({ on: { foo: h1, bar: h1 } }, { on: { foo: h2, baz: h2 } })).toEqual({
    on: { foo: h2, bar: h1, baz: h2 },
  });
});

test('mergeEvents', () => {
  const handler = () => {};
  const overwriteHandle = () => {};

  const eventMap = {
    cl: {
      isNative: false,
      value: handler,
      name: 'cl',
    },
    's-q-w-q': {
      isNative: false,
      value: handler,
      name: 's-q-w-q',
    },
    'select-all': {
      isNative: true,
      value: handler,
      name: 'select-all',
    },
  };

  expect(
    mergeEvents({
      ...eventMap,
      selectAll: {
        isNative: true,
        value: overwriteHandle,
        name: 'selectAll',
      },
      sQWQ: {
        isNative: false,
        value: overwriteHandle,
        name: 'sQWQ',
      },
    })
  ).toEqual({
    nativeOn: {
      selectAll: overwriteHandle,
    },
    on: {
      sQWQ: overwriteHandle,
      cl: handler,
    },
  });
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

test('vue2GetElementInstance', () => {
  expect(vue2GetElementInstance('foo')).toBe(null);
  expect(vue2GetElementInstance('foo-bar')).toBe(null);

  const divInstance = vue2GetElementInstance('div');
  // 缓存
  expect(vue2GetElementInstance('div')).toBe(divInstance);
  expect(divInstance.constructor).toBe(HTMLDivElement);
});

test('vue2MustUseProps', () => {
  expect(vue2MustUseProps({}, undefined, 'foo')).toBe(false);
  expect(vue2MustUseProps('input', 'text', 'value')).toBe(true);
  expect(vue2MustUseProps('img', undefined, 'width')).toBe(true);
  expect(vue2MustUseProps('img', undefined, 'class')).toBe(false);
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
  expect(isSlots({})).toBe(true);
  expect(isSlots([])).toBe(false);
  expect(isSlots(wrap({}))).toBe(false);

  expect(isSlots({ default: () => {} })).toBe(true);
  expect(isSlots({ default: () => {}, foo: null, bar: undefined })).toBe(true);
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

  expect(
    processProps('div', {
      staticClass: 'w-83',
      onClick1: h,
      attrs: {
        foo: 'foo',
      },
    })
  ).toEqual({
    staticClass: 'w-83',
    on: {
      click1: h,
    },
    attrs: {
      foo: 'foo',
    },
  });
});

describe('processChildren', () => {
  test('无法识别 slots', () => {
    {
      const props = {};
      expect(processChildren('', props, [])).toEqual(null);
      expect(processChildren('', props, ['hello'])).toEqual(['hello']);
      // 识别为 slots, 空对象 children 没有意义
      expect(processChildren('', props, [{}])).toEqual(null);
    }

    {
      const props: any = {
        'v-slots': [],
      };

      expect(() => processChildren('', props, ['hello', 'world'])).toThrowError('v-slots 必须为对象');
    }
  });

  test('识别 slots', () => {
    {
      // 没有设置 slots
      const props: any = {};
      expect(processChildren('', props, ['hello', 'world'])).toEqual(['hello', 'world']);
    }
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
      expect(processChildren('', props, ['hello', 'world'])).toEqual([['hello', 'world']]);
      expect(Object.keys(props.scopedSlots)).toEqual(['foo']);
      expect(props['v-slots']).toBeUndefined();
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

describe('processRef', () => {
  test('ref for', () => {
    const props1 = {
      refInFor: true,
    };
    processRef('', props1);
    expect(props1).toEqual({ refInFor: true });

    const props2 = {
      ref_for: true,
    };

    processRef('', props2);
    expect(props2).toEqual({ refInFor: true, ref_for: true });
  });

  if (!isVue2Dot7) {
    test('异常情况', () => {
      expect(() => {
        processRef('', { ref: () => {} });
      }).toThrowError('ref 只能是字符串或者 Ref 对象');
    });

    test('ref', () => {
      let nodeRef = ref<any>(null);

      const App = {
        render() {
          const props = { ref: nodeRef };
          processRef('tag', props);

          expect(props).toEqual({ ref: '__ref_0__' });

          return null;
        },
      };

      const { rerender } = render(App, {});

      rerender({});
    });
  }
});
