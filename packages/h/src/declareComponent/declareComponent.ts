/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import {
  Ref,
  EmitsOptions,
  ObjectEmitsOptions,
  RenderFunction,
  StyleValue,
  defineComponent as vueDefineComponent,
  set,
  isVue2,
  getCurrentInstance,
  isReactive,
} from 'vue-demi';
import kebabCase from 'lodash/kebabCase';
import upperFirst from 'lodash/upperFirst';
import omit from 'lodash/omit';

import { UnionToIntersection, NotUndefined } from './typeUtils';
import { isObject, isPlainObject } from '../utils';

declare module 'vue' {
  interface HTMLAttributes {
    // FIXME: vue 没有设置这个属性
    textContent?: string;

    // 避免原生组件报错
    'v-slots'?: any;
  }
}

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      // JSX 从 v-slots 推断子元素
      // 和 vue 的 jsx 插件语法保持一致
      'v-slots': {};
    }
  }
}

type EmitsToProps<T extends EmitsOptions> = T extends string[]
  ? {
      [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
    }
  : T extends ObjectEmitsOptions
  ? {
      [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
        ? T[Uncapitalize<C>] extends null
          ? (...args: any[]) => any
          : // eslint-disable-next-line @typescript-eslint/no-shadow
            (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any
        : never;
    }
  : {};

type EmitFn<Options = ObjectEmitsOptions, Event extends keyof Options = keyof Options> = Options extends (infer V)[]
  ? (event: V, ...args: any[]) => void
  : {} extends Options
  ? (event: string, ...args: any[]) => void
  : UnionToIntersection<
      {
        [key in Event]: Options[key] extends (...args: infer Args) => any
          ? (event: key, ...args: Args) => void
          : (event: key, ...args: any[]) => void;
      }[Event]
    >;

export type ReservedAttrs = {
  class?: any;
  style?: StyleValue;
};

export interface SetupContext<Emit, Slot, Expose, Attrs> {
  attrs: Attrs;
  slots: Partial<Slot>;
  emit: EmitFn<Emit>;
  expose: (exposed?: Expose) => void;
}

export type Data = Record<string, unknown>;

export type MergeDefaultProps<DefaultProps extends {}, Props extends DefaultProps> = DefaultProps &
  Required<Pick<Props, keyof DefaultProps>>;

export type SimpleComponentOptions<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> = {
  name?: string;
  props?: Props;
  emits?: Emit;
  slots?: Slots;
  expose?: Expose;
  setup: (
    this: void,
    props: Props,
    // 因为关闭了 inheritAttrs，所以可以通过 attrs 访问 class、style
    ctx: SetupContext<Emit, Slots, Expose, Data & ReservedAttrs>
  ) => Promise<RenderFunction | void> | RenderFunction | void;
  inheritAttrs?: boolean;
  serverPrefetch?(): Promise<any>;
} & ThisType<void>;

export type DefineComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> = {
  new (...args: any[]): {
    $props: Props & EmitsToProps<Emit> & { 'v-slots'?: Partial<Slots> } & { ref?: Ref<Expose | null> | string }; // string 用于兼容 template 引用
    $slots: Slots;
    $emit: EmitFn<Emit>;
  };

  // 方便外部提取
  __ref: Expose;
};

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
export function declareSlots<T extends { [key: string]: Function }>(): T {
  return undefined as any as T;
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

/**
 * 给 props 添加默认值，只能在 setup 中使用
 */
export function withDefaults<T extends {}, D extends { [K in keyof T]?: T[K] }>(
  props: T,
  defaultValue: D
): T & { [K in keyof D]: K extends keyof T ? NotUndefined<T[K]> : never } {
  if (process.env.NODE_ENV !== 'production' && (!isReactive(props) || !isPlainObject(props))) {
    throw new Error(`withDefaults() expects a reactive object but received a plain one.`);
  }

  const DEFAULT_VALUE_KEYS = Object.keys(defaultValue);

  // vue2 如果 props 属性为空，可能不会响应，这里最好设置默认值
  if (isVue2) {
    for (const key in defaultValue) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        set(props, key, defaultValue[key]);
      }
    }
  }

  return new Proxy(props, {
    get(target, p) {
      const value = Reflect.get(target, p);
      if (value === undefined && Reflect.has(defaultValue, p)) {
        return Reflect.get(defaultValue, p);
      }
      return value;
    },
    // 让 default value 可被枚举
    getOwnPropertyDescriptor(target, p) {
      if (Reflect.has(target, p)) {
        return Reflect.getOwnPropertyDescriptor(target, p);
      }

      return Reflect.getOwnPropertyDescriptor(defaultValue, p);
    },
    ownKeys(target) {
      const keys = Reflect.ownKeys(target);
      for (const key of DEFAULT_VALUE_KEYS) {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      }

      return keys;
    },
  }) as any;
}

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
          const findEventHandler = (name: string) => {
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
