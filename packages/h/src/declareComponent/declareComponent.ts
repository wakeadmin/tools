/* eslint-disable @typescript-eslint/array-type */
import { defineComponent as vueDefineComponent, isVue2, getCurrentInstance, VNodeChild } from 'vue-demi';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import omit from 'lodash/omit';

import { DefineComponent, SimpleComponentOptions } from './types';
import { isObject } from '../utils';

/**
 * 声明属性
 * @param list
 * @returns
 */
export function declareProps<T extends {}>(list: Array<keyof T>): T {
  return list as any as T;
}

/**
 * 声明暴露
 * @returns
 */
export function declareExpose<T extends {}>(): T {
  return undefined as any as T;
}

/**
 * 声明插槽
 * @returns
 */
export function declareSlots<T extends { [key: string]: {} }>(): {
  [K in keyof T]: T[K] extends never ? () => VNodeChild : (scope: T[K]) => VNodeChild;
} {
  return undefined as any;
}

/**
 * 声明 emits
 * @param list
 * @returns
 */
export function declareEmits<T extends { [key: string]: Function }>(): T {
  return undefined as any as T;
}

export type ExtraRef<T extends DefineComponent<any, any, any, any>> = T['__ref'] | null;

const FORCE_OMIT_PROPS = ['emits'];

/**
 * 创建 Vue 组件
 * @param options
 * @returns
 */
export function declareComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}>(
  options: SimpleComponentOptions<Props, Emit, Expose, Slots>
): DefineComponent<Props, Emit, Expose, Slots> {
  const { setup, ...other } = options;

  const vueOptions = {
    // 关闭隐式继承
    inheritAttrs: false,
  };

  if (isVue2) {
    // @ts-expect-error 统一使用 modelValue 形式
    vueOptions.model = {
      prop: 'modelValue',
      event: 'update:modelValue',
    };
  }

  Object.assign(vueOptions, omit(other, FORCE_OMIT_PROPS));

  return vueDefineComponent({
    ...vueOptions,
    setup: isVue2
      ? function (props: any, context: any) {
          // vue2 不支持 expose
          const expose =
            context.expose ??
            ((values: any) => {
              if (!isObject(values) && process.env.NODE_ENV !== 'production') {
                throw new Error(`expose 必须为对象`);
              }
              const instance = getCurrentInstance();

              if (instance) {
                // 追加到 vm 实例上
                Object.assign(instance, values);
              }
            });

          const findEventHandler = (name: string) => {
            if (name in context.listeners) {
              return name;
            }

            let normalized = name.toLowerCase();
            if (normalized in context.listeners) {
              return normalized;
            }

            // 转换为kebab-case
            normalized = name
              .split(':')
              .map(i => kebabCase(i))
              .join(':');

            if (normalized in context.listeners) {
              return normalized;
            }

            return undefined;
          };

          // vue2 emit 规范化，支持多种命名规范
          const emit = (name: string, ...args: any[]) => {
            if (process.env.NODE_ENV !== 'production') {
              if (name.includes('-')) {
                throw new Error(`emit(${name}) 统一使用驼峰式命名`);
              }
            }

            const eventName = findEventHandler(name);
            if (eventName) {
              context.emit(eventName, ...args);
            }
          };

          const contextProxy = new Proxy(context, {
            get(target, p) {
              if (p === 'expose') {
                return expose;
              } else if (p === 'emit') {
                return emit;
              }
              return Reflect.get(target, p);
            },
          });

          // @ts-expect-error
          return setup.call(this, props, contextProxy);
        }
      : function (props: any, context: any) {
          const findEventHandler = (name: string): string | undefined => {
            let normalized = `on${upperFirst(name)}`;
            if (normalized in context.attrs) {
              return normalized;
            }

            // 转换成 kebab-case
            normalized = `on${upperFirst(
              name
                .split(':')
                .map(i => kebabCase(i))
                .join(':')
            )}`;

            if (normalized in context.attrs) {
              return normalized;
            }

            return undefined;
          };

          // @ts-expect-error
          return setup.call(this, props, {
            ...context,
            emit(name, ...args: any[]) {
              if (process.env.NODE_ENV !== 'production' && name.includes('-')) {
                throw new Error(`emit(${name}) 统一使用驼峰式命名`);
              }

              // 先尝试从 attrs 中调用
              const eventName = findEventHandler(name);
              if (eventName) {
                context.attrs[eventName](...args);
              } else {
                context.emit(name, ...args);
              }
            },
          });
        },
  } as any) as any;
}
