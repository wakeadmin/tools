import { h } from './h';

test('h', () => {
  const value = {};
  const handler = () => {};

  const vnode = h('div', { foo: value, onFoo: handler }, 'hello', 'world');

  expect(vnode.props).toEqual({
    foo: value,
    onFoo: handler,
  });
  expect(vnode.children).toEqual(['hello', 'world']);
});
