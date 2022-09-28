/* eslint-disable no-lone-blocks */
import { screen, fireEvent } from '@testing-library/vue';
import { nextTick } from '@wakeadmin/demi';

import { render, createComponent } from '../__tests__/helper';

import { h } from './h';

test('h props 转换', () => {
  const value = {};
  const handler = () => {};
  let vnode: any;

  // vue2 h 必须在组件环境才能正常渲染

  render(
    createComponent(() => {
      return (vnode = h(
        'div',
        { foo: value, '.bar': value, onFoo: handler, onBarNative: handler, onFooCapture: handler },
        h('hello'),
        h('world')
      ));
    }),
    {}
  );

  expect(vnode.children?.[0].tag).toBe('hello');
  expect(vnode.children?.[1].tag).toBe('world');

  expect(vnode.data).toMatchObject({
    attrs: {
      foo: value,
    },
    domProps: {
      bar: value,
    },
    nativeOn: {
      bar: handler,
    },
  });
  expect(Object.keys(vnode.data.on)).toEqual(['foo', '!foo']);
});

test('h listener 合并', async () => {
  const fn = jest.fn();
  const fn2 = () => fn();
  render(
    createComponent(() => {
      return h('div', { title: 'target', onClick: fn, on: { click: fn2 } });
    }),
    {}
  );
  const target = screen.getByTitle('target');
  fireEvent(target, new MouseEvent('click'));
  await nextTick();

  // 外部 onClick 会取代 on内部的
  expect(fn).toBeCalledTimes(1);
});

test('h slots 转换', () => {
  {
    let vnode1: any;

    render(
      createComponent(() => {
        return (vnode1 = h('my-component', { foo: 'bar', 'v-slots': { foo: () => 'hello' } }, 'world'));
      }),
      {}
    );

    expect(Object.keys(vnode1.data.scopedSlots)).toEqual(['foo']);

    // v-slots 不会出现在 attrs 中
    expect(Object.keys(vnode1.data.attrs)).toEqual(['foo']);
  }

  {
    // slots 放在 children
    let vnode2: any;
    render(
      createComponent(() => {
        return (vnode2 = h('my-component', { foo: 'bar' }, { foo: () => 'hello' }));
      }),
      {}
    );

    expect(Object.keys(vnode2.data.scopedSlots)).toEqual(['foo']);
  }

  {
    // 内置组件不支持 scopedSlots

    expect(() => {
      h('div', { foo: 'bar', 'v-slots': { foo: () => 'hello' } }, 'world');
    }).toThrowError('[h] 内置组件不支持 scopedSlots');
  }

  {
    // 支持静态 slot
    let vnode3: any;
    render(
      createComponent(() => {
        return (vnode3 = h('my-component', { foo: 'bar', 'v-slots': { foo: () => 'hello', bar: 'baz' } }, [
          'hello',
          'world',
        ]));
      }),
      {}
    );

    expect(Object.keys(vnode3.data.scopedSlots)).toEqual(['foo']);
    expect(vnode3.children[0].tag).toBe('template');
    expect(vnode3.children[0].data.slot).toBe('bar');
    expect(vnode3.children[1].text).toBe('helloworld');
  }
});
