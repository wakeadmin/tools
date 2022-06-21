/** @jsxImportSource .. */
import { render as _render } from '@testing-library/vue';
import { isVue2, VNodeChild } from '@wakeadmin/demi';

import { h } from '../h';
import { declareComponent } from '../declareComponent';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function expectType<T>(value: T): void {}

// https://stackoverflow.com/a/53808212
type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2
  ? Y
  : N;
export declare function exactType<T, U>(draft: T & IfEquals<T, U>, expected: U & IfEquals<T, U>): IfEquals<T, U>;

export function createComponent(r: () => VNodeChild) {
  return declareComponent({ setup: () => r });
}

export function render(component: any, props: Record<string, any>, ...children: any[]) {
  const App = {
    name: 'AppWrapper',
    inheritAttrs: false,
    render(this: any) {
      const { __children, ...p } = this.$attrs;
      return h(component, p, ...__children);
    },
  };

  const result = _render(App, { props: { ...props, __children: children } });

  const rerender = (newProps: Record<string, any>, ...newChildren: any[]) => {
    const p = Object.assign(newProps, { __children: newChildren });
    if (isVue2) {
      // @ts-expect-error
      return result.updateProps(p);
    } else {
      return result.rerender(p);
    }
  };

  return {
    ...result,
    rerender,
  };
}

export function ignoreNewlineJoin(str: string) {
  return str
    .split('\n')
    .map(i => i.trim())
    .join('');
}

export function trimHTMLComments(str: string) {
  return str.replace(/<!--[^<]*-->/gm, '');
}
