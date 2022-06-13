/* eslint-disable @typescript-eslint/no-shadow */
import { render as _render } from '@testing-library/vue';
import { isVue2 } from 'vue-demi';

import { h } from '../h';

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

  const rerender = (props: Record<string, any>, ...children: any[]) => {
    const p = Object.assign(props, { __children: children });
    if (isVue2) {
      // @ts-expect-error
      result.updateProps(p);
    } else {
      result.rerender(p);
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
