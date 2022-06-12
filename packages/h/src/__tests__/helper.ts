/* eslint-disable @typescript-eslint/no-shadow */
import { render as _render } from '@testing-library/vue';
import { isVue2 } from 'vue-demi';

import { h } from '../h';

export function render(component: any, props: Record<string, any>, ...children: any[]) {
  const App = {
    render(this: any) {
      const p = this.$attrs;
      return h(component, p, ...(p.children ?? []));
    },
  };

  const result = _render(App, { props: { ...props, children } });

  const rerender = (props: Record<string, any>, ...children: any[]) => {
    const p = Object.assign(props, { children });
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
