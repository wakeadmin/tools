/* eslint-disable no-lone-blocks */
import { h } from './h';

test('h props 转换', () => {
  const value = {};
  const handler = () => {};

  const vnode = h('div', { foo: value, onFoo: handler }, 'hello', 'world');

  expect(vnode.props).toEqual({
    foo: value,
    onFoo: handler,
  });
  expect(vnode.children).toEqual(['hello', 'world']);
});

test('h slots 转换', () => {
  {
    // 注意这里type 设置为自定义组件，否则命名 slot 会被移除
    const vnode1: any = h({}, { foo: 'bar', 'v-slots': { foo: () => 'hello' } }, 'world');

    expect(vnode1.children.foo).toBeDefined();
    expect(vnode1.children.default).toBeDefined();
    expect(vnode1.props['v-slots']).not.toBeDefined();
  }

  {
    // slots 放在 children
    const vnode2: any = h({}, { foo: 'bar' }, { foo: () => 'hello' });
    expect(vnode2.children.foo).toBeDefined();
  }

  {
    // 支持静态 slots
    const vnode3: any = h({}, { foo: 'bar', 'v-slots': { foo: () => 'hello', bar: 'baz' } }, ['hello', 'world']);
    expect(typeof vnode3.children.foo).toBe('function');
    expect(typeof vnode3.children.bar).toBe('function');
    expect(typeof vnode3.children.default).toBe('function');

    expect(vnode3.children.bar()).toBe('baz');
  }
});

test('TODO, directive', () => {});
