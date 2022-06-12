import { h } from './h';

test('h props 转换', () => {
  const value = {};
  const handler = () => {};

  const vnode: any = h(
    'div',
    { foo: value, '.bar': value, onFoo: handler, onBarNative: handler, onFooCapture: handler },
    h('hello'),
    h('world')
  );

  expect(vnode.children?.[0].tag).toBe('hello');
  expect(vnode.children?.[1].tag).toBe('world');

  expect(vnode.data).toEqual({
    attrs: {
      foo: value,
    },
    domProps: {
      bar: value,
    },
    nativeOn: {
      bar: handler,
    },
    on: {
      '!foo': handler,
      foo: handler,
    },
  });
});

test('h slots 转换', () => {
  const vnode1: any = h('div', { foo: 'bar', 'v-slots': { foo: () => 'hello' } }, 'world');

  expect(Object.keys(vnode1.data.scopedSlots)).toEqual(['foo', 'default']);

  // v-slots 不会出现在 attrs 中
  expect(Object.keys(vnode1.data.attrs)).toEqual(['foo']);

  // slots 放在 children
  const vnode2: any = h('div', { foo: 'bar' }, { foo: () => 'hello' });
  expect(Object.keys(vnode2.data.scopedSlots)).toEqual(['foo']);
});
