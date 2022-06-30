import { defineCustomElement, DefineComponent } from 'vue';
import kebabCase from 'lodash/kebabCase';

import { IGNORE_PROPS } from './constants';
import { CustomElements } from './type-utils';

export function registerCustomElement(prefix: string, name: string, comp: any) {
  let CustomElement = defineCustomElement(comp);

  const props = (
    ('props' in comp ? (Array.isArray(comp.props) ? comp.props : Object.keys(comp.props)) : []) as string[]
  ).filter(p => {
    return !IGNORE_PROPS.has(p);
  });

  const isDefinedInProps = (prop: string) => {
    return props.includes(prop);
  };

  if (props.length) {
    CustomElement = class extends CustomElement {
      constructor(...args: any[]) {
        super(...args);

        // 设置 props 初始值，让 vue3 可以始终识别引用数据的传递
        props.forEach(prop => {
          if (!(prop in this)) {
            // @ts-expect-error
            this[prop] = null;
          }
        });
      }
    };
  }

  // 创建 expose 代理
  if (comp.customElementExpose != null || comp.expose != null) {
    CustomElement = class extends CustomElement {
      constructor(...args: any[]) {
        super(...args);

        // FIXME: 这里依赖了内部细节
        const getVM = () => (this as any)._instance;

        const expose = (exposed: string[], getter: (vueInstance: any) => any, exposeType: string) => {
          const resolve = (key: string) => {
            const contexts = getter(getVM());
            if (Array.isArray(contexts)) {
              for (const context of contexts) {
                if (context && key in context) {
                  return context[key];
                }
              }

              return undefined;
            }

            return contexts?.[key];
          };

          exposed.forEach(ep => {
            if (isDefinedInProps(ep)) {
              if (process.env.NODE_ENV !== 'production') {
                console.warn(`registerCustomElement: ${exposeType}.${ep} 和 props 定义冲突，将被忽略`);
              }
              return;
            }

            Object.defineProperty(this, ep, {
              configurable: true,
              enumerable: false,
              get() {
                if (getVM() == null) {
                  throw new Error(`[${name}]#${ep} 只能在自定义元素挂载到 DOM 后才能访问`);
                }

                return resolve(ep);
              },
            });
          });
        };

        // 注意 expose 不要和 props 冲突
        // 原生 option 语法 expose。将从实例全局读取属性
        // expose 选项和 setup 的 expose 是冲突的，不要混用
        if (comp.expose) {
          expose(comp.expose, instance => instance.ctx, 'expose');
        }

        if (comp.customElementExpose) {
          if (process.env.NODE_ENV !== 'production' && !Array.isArray(comp.customElementExpose)) {
            throw new Error(`customElementExpose 选项必须是字符串数组`);
          }

          expose(comp.customElementExpose, instance => [instance.exposed, instance.ctx], 'customElementExpose');
        }
      }
    };
  }

  const ComponentName = `${prefix.endsWith('-') ? prefix : `${prefix}-`}${kebabCase(name)}`;

  window.customElements.define(ComponentName, CustomElement);

  return {
    name: ComponentName,
    component: CustomElement,
  };
}

/**
 * 注册自定义组件
 * @param prefix 元素前缀
 * @param components
 */
export function registerCustomElements<
  PREFIX extends string,
  COMPONENTS extends { [key: string]: DefineComponent<any, any, any, any, any, any, any, any, any> }
>(prefix: PREFIX, components: COMPONENTS): CustomElements<PREFIX, COMPONENTS> {
  const results: any = {};
  Object.keys(components).forEach(key => {
    const { name, component } = registerCustomElement(prefix, key, components[key]);

    results[name] = component;
  });

  return results;
}
