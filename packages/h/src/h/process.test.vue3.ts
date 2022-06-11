import { h } from 'vue-demi';
import { wrap, isWrapped } from './process';

test('wrap', () => {
  const a = {};
  expect(isWrapped(a)).toBe(false);
  // 不做处理
  wrap(a);
  expect(isWrapped(a)).toBe(false);

  expect(isWrapped(h('div'))).toBe(true);
});
