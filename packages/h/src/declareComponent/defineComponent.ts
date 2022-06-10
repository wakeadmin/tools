/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Ref, EmitsOptions, ObjectEmitsOptions, RenderFunction } from '@vue/runtime-core';
import { UnionToIntersection } from '@vue/shared';
import { UnionToTuple } from './typeUtils';

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      // JSX 从 $slots 推断子元素
      $slots: {};
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
    ctx: SetupContext<Emit, Slots, Expose, Data & EmitsToProps<Emit>>
  ) => Promise<RenderFunction | void> | RenderFunction | void;
  // 内置禁用
  // inheritAttrs?: boolean;
  serverPrefetch?(): Promise<any>;
} & ThisType<void>;

// export type ComponentInstance<>

export type DefineComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> = {
  new (...args: any[]): {
    $props: Props & EmitsToProps<Emit> & { $slots?: Partial<Slots> } & { ref?: Ref<Expose | null> | string }; // string 用于兼容 template 引用
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
 * 创建 Vue 组件
 * @param options
 * @returns
 */
export function declareComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}>(
  options: SimpleComponentOptions<Props, Emit, Expose, Slots>
): DefineComponent<Props, Emit, Expose, Slots> {
  return { options } as any;
}
