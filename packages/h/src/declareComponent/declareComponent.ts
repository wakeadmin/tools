/* eslint-disable @typescript-eslint/array-type */
import {
  defineComponent as vueDefineComponent,
  isVue2,
  getCurrentInstance,
  ComponentObjectPropsOptions,
} from '@wakeadmin/demi';
import { omit } from '@wakeadmin/utils';

import { DefineComponent, SimpleComponentOptions } from './types';
import { vue2Expose, findEventHandler, vue3EventNameCapitalized, safeCallHandler } from './process';

export { ExtraRef, ExtraArrayRef, ExtraProps } from './types';

/**
 * 声明属性
 * @param list
 * @returns
 */
export function declareProps<T extends {}>(list: Array<keyof T> | ComponentObjectPropsOptions<Partial<T>>): T {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
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
  [K in keyof T]: T[K] extends never ? () => any : (scope: T[K]) => any;
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

const FORCE_OMIT_PROPS = ['emits'];

/**
 * 创建 Vue 组件
 * @param options
 * @returns
 */
export function declareComponent<
  Props extends {} = {},
  Emit extends {} = {},
  Expose extends {} = {},
  Slots extends {} = {}
>(options: SimpleComponentOptions<Props, Emit, Expose, Slots>): DefineComponent<Props, Emit, Expose, Slots> {
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
          const expose = context.expose ?? vue2Expose;
          const instance = getCurrentInstance() as any;

          // vue2 emit 规范化，支持多种命名规范
          const emit = (name: string, ...args: any[]) => {
            const found = findEventHandler(name, instance.proxy.$listeners);
            if (found) {
              safeCallHandler(instance.proxy.$listeners[found], instance.proxy.$listeners, args);
            } else {
              context.emit(name, ...args);
            }
          };

          // @ts-expect-error
          return setup.call(this, props, { ...context, expose, emit });
        }
      : function (props: any, context: any) {
          const emit = (name: string, ...args: any[]) => {
            // 先尝试从 attrs 中调用
            const found = findEventHandler(name, context.attrs, vue3EventNameCapitalized);
            if (found) {
              safeCallHandler(context.attrs[found], context.attrs, args);
            } else {
              context.emit(name, ...args);
            }
          };

          // @ts-expect-error
          return setup.call(this, props, {
            ...context,
            emit,
          });
        },
  } as any) as any;
}
