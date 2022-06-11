import { h } from './h';

test('h', () => {
  const value = {};
  const handler = () => {};

  const vnode = h(
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
