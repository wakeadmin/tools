import {
  isDirectiveArgumentsBinding,
  withDirectives,
  directiveArgumentsToBinding,
  resolveComponent,
  resolveDirective,
  isVNode,
} from './helper';
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

test('directiveArgumentsToBinding', () => {
  const binding = directiveArgumentsToBinding([['one'], ['two', 1, 'foo', {}]]);
  expect(isDirectiveArgumentsBinding(binding.directives)).toBe(true);

  expect(binding).toEqual({
    directives: [
      {
        arg: undefined,
        dir: 'one',
        modifiers: undefined,
        name: 'one',
        value: undefined,
      },
      {
        dir: 'two',
        arg: 'foo',
        modifiers: {},
        name: 'two',
        value: 1,
      },
    ],
  });
});

test('withDirectives', () => {
  // 注入模式
  const vnode: any = wrap({
    data: {},
  });

  withDirectives(vnode, [['one']]);

  expect(vnode.data).toEqual({
    directives: [
      {
        arg: undefined,
        dir: 'one',
        modifiers: undefined,
        name: 'one',
        value: undefined,
      },
    ],
  });
});
