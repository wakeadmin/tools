/* eslint-disable @typescript-eslint/no-invalid-void-type */
/* eslint-disable @typescript-eslint/array-type */
import {
  defineComponent as vueDefineComponent,
  isVue2,
  getCurrentInstance,
  ComponentObjectPropsOptions,
  RenderFunction,
  ObjectEmitsOptions,
  VNode,
} from '@wakeadmin/demi';

import { DefineComponent, DefineComponentContext, EmitFn, ExposeFn, PropsType, SimpleComponentOptions } from './types';
import { vue2Expose, findEventHandler, vue3EventNameCapitalized, safeCallHandler } from './process';

export {
  ExtraRef,
  ExtraArrayRef,
  ExtraProps,
  DefineComponent,
  ComponentInstance,
  DefineComponentContext,
} from './types';

/**
 * 声明属性
 * @param props
 * @returns
 */
export function declareProps<T extends {}>(props: Array<keyof T> | ComponentObjectPropsOptions<Partial<T>>): T {
  return props as T;
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
export function declareSlots<T extends { [key: string]: unknown }>(): {
  [K in keyof T]: T[K] extends never ? () => any : T[K] extends (...args: any) => any ? T[K] : (scope: T[K]) => any;
} {
  return undefined as any;
}

/**
 * 声明 emits
 * @param list
 * @returns
 */
export function declareEmits<T extends Record<string, Function>>(): T {
  return undefined as any as T;
}

export function declareType<T>(): T {
  return undefined as any as T;
}

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
>(options: SimpleComponentOptions<Props, Emit, Expose, Slots>): DefineComponent<Props, Emit, Expose, Slots>;
export function declareComponent<
  Props extends {},
  Emit extends ObjectEmitsOptions = {},
  Expose extends {} = {},
  Slots extends { [key: string]: Function } = {},
  Attrs extends {} = {}
>(
  setup: (
    props: Props,
    ctx: DefineComponentContext<Emit, Expose, Slots, Attrs>
  ) => Promise<RenderFunction | void> | RenderFunction | void,
  options?: {
    props?: Array<keyof Props> | ComponentObjectPropsOptions<Partial<Props>>;
    name?: string;
    inheritAttrs?: boolean;
    serverPrefetch?(): Promise<any>;
  }
): (
  props: PropsType<Props, Emit, Slots, Expose>,
  ctx: DefineComponentContext<Emit, Expose, Slots, Attrs>
) => VNode & {
  __ctx: {
    emit: EmitFn<Emit>;
    slots: Slots;
    expose: ExposeFn<Expose>;
    attrs: Attrs;
  };
};
export function declareComponent(setUpOrProps: any, maybeOption?: any) {
  const setup = typeof setUpOrProps === 'function' ? setUpOrProps : setUpOrProps.setup;
  const options = typeof setUpOrProps === 'function' ? maybeOption : setUpOrProps;

  options.props ??= setup.props;
  // 强制关闭 emits 声明
  options.emits = undefined;

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

  Object.assign(vueOptions, options);

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
