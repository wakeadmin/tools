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
  isVue2,
  getCurrentInstance,
} from 'vue-demi';
import type { UnionToIntersection } from '@vue/shared';

import { UnionToTuple } from './typeUtils';
import { isObject } from '../utils';

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      // JSX 从 children 推断子元素
      children: {};
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
    ctx: SetupContext<Emit, Slots, Expose, Data & EmitsToProps<Emit> & ReservedAttrs>
  ) => Promise<RenderFunction | void> | RenderFunction | void;
  // 内置禁用
  // inheritAttrs?: boolean;
  serverPrefetch?(): Promise<any>;
} & ThisType<void>;

// export type ComponentInstance<>

export type DefineComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> = {
  new (...args: any[]): {
    $props: Props & EmitsToProps<Emit> & { children?: Partial<Slots> } & { ref?: Ref<Expose | null> | string }; // string 用于兼容 template 引用
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
export function declareProps<T extends {}>(list: UnionToTuple<keyof T>): T {
  return list as any as T;
}

/**
 * 声明暴露
 * @returns
 */
export function declareExpose<T extends {}>(): T {
  return null as any as T;
}

/**
 * 声明插槽
 * @returns
 */
export function declareSlots<T extends { [key: string]: Function }>(): T {
  return null as any as T;
}

/**
 * 声明 emits
 * @param list
 * @returns
 */
export function declareEmits<T extends { [key: string]: Function }>(list: UnionToTuple<keyof T>): T {
  return list as any as T;
}

export type ExtraRef<T extends DefineComponent<any, any, any, any>> = T['__ref'] | null;

/**
 * 给 props 添加默认值，只能在 setup 中使用
 */
export function withDefaults() {}

/**
 * 创建 Vue 组件
 * @param options
 * @returns
 */
export function declareComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}>(
  options: SimpleComponentOptions<Props, Emit, Expose, Slots>
): DefineComponent<Props, Emit, Expose, Slots> {
  const { setup, ...other } = options;

  return vueDefineComponent({
    inheritAttrs: false,
    ...other,
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

          // vue2 下，将 $listeners 合并 $attrs
          const attrsProxy = new Proxy(
            {},
            {
              get(_, p) {
                return Reflect.get(Reflect.has(context.attrs, p) ? context.attrs : context.listeners, p);
              },
              set(_, p) {
                if (process.env.NODE_ENV !== 'production') {
                  throw new Error(`attrs 是只读对象，不能修改 ${String(p)}`);
                }
                return true;
              },
              ownKeys() {
                return Reflect.ownKeys(context.attrs).concat(context.listeners);
              },
            }
          );

          const contextProxy = new Proxy(context, {
            get(target, p) {
              if (p === 'attrs') {
                return attrsProxy;
              } else if (p === 'expose') {
                return expose;
              }
              return Reflect.get(target, p);
            },
          });

          // @ts-expect-error
          return setup.call(this, props, contextProxy);
        }
      : setup,
  } as any) as any;
}
