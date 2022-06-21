import { VNodeChild, isVue2 } from '@wakeadmin/demi';
import { declareComponent, h } from '@wakeadmin/h';
import { render as _render } from '@testing-library/vue';

export function createComponent(renderFn: () => VNodeChild) {
  return declareComponent({ setup: () => renderFn });
}

export function render<Props extends Record<string, any>>(component: any, props: Props, ...children: any[]) {
  const App = {
    name: 'AppWrapper',
    inheritAttrs: false,
    render(this: any) {
      const { __children, ...p } = this.$attrs;
      return h(component, p, ...__children);
    },
  };

  const result = _render(App, { props: { ...props, __children: children } });

  const rerender = (_props: Props, ..._children: any[]) => {
    const p = Object.assign(_props, { __children: _children });
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

export interface RenderHookOptions<Props> {
  initialProps?: Props;
  /**
   * 包装组件
   */
  wrapper?: any;
}

/**
 * 在组件内渲染 hook
 * @param hookRender
 * @param options
 * @returns
 */
export function renderHook<Result, Props extends {}>(
  hookRender: (props: Props) => Result,
  options?: RenderHookOptions<Props>
) {
  const { initialProps, wrapper } = options ?? {};
  let result: Result | undefined;

  const App = declareComponent({
    setup(_, { attrs }) {
      // 实际上只会执行一次
      result = hookRender(attrs as Props);

      return () => <div title="hook"></div>;
    },
  });

  let Component = wrapper
    ? {
        render(this: any) {
          return h(wrapper, null, h(App, this.$attrs));
        },
      }
    : App;

  const rtn = render<Props>(Component, (initialProps ?? {}) as Props);

  return {
    ...rtn,
    current: result,
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
