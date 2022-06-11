import { resolveComponent, resolveDirective, isVNode } from './helper';
import { wrap } from './process';

test('resolveComponent', () => {
  expect(resolveComponent('h')).toBe('h');
});

test('resolveDirective', () => {
  expect(resolveDirective('h')).toBe('h');
});

test('isVNode', () => {
  expect(isVNode({})).toBeFalsy();
  expect(isVNode(wrap({}))).toBeTruthy();
});
