/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Ref, EmitsOptions, ObjectEmitsOptions, RenderFunction, StyleValue, VNodeChild } from 'vue-demi';

export type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (arg: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (_: never) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

export type NotUndefined<T> = T extends undefined ? never : T;

declare module 'vue' {
  interface HTMLAttributes {
    // FIXME: vue 没有设置这个属性
    textContent?: string;

    // 避免原生组件报错
    'v-children'?: VNodeChild;
  }
}

declare global {
  namespace JSX {
    interface ElementChildrenAttribute {
      // JSX 从 v-slots 推断子元素
      // 和 vue 的 jsx 插件语法保持一致
      // 'v-slots': {};
      // 为什么不直接用 v-slots, 因为 children 的类型应该更加宽松，v-slots 则必须为对象
      'v-children': {};
    }

    // fix: 自定义组件在未声明情况下， 也能使用 class/style
    interface IntrinsicAttributes {
      class?: any;
      style?: StyleValue;
    }
  }
}

export type EmitsToProps<T extends EmitsOptions> = T extends string[]
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

export type EmitFn<
  Options = ObjectEmitsOptions,
  Event extends keyof Options = keyof Options
> = Options extends (infer V)[]
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

export interface ReservedAttrs {
  class?: any;
  style?: StyleValue;
}

/**
 * 支持 Ref 形式展开
 */
export type WithRef<T extends {}> = { [K in keyof T]: T[K] | Ref<T[K]> };

export interface SetupContext<Emit, Slot, Expose, Attrs> {
  attrs: Attrs;
  slots: Readonly<Partial<Slot>>;
  emit: EmitFn<Emit>;
  expose: (exposed: WithRef<Expose>) => void;
}

export type Data = Record<string, unknown>;

export type MergeDefaultProps<DefaultProps extends {}, Props extends DefaultProps> = DefaultProps &
  Required<Pick<Props, keyof DefaultProps>>;

export interface DefaultSlots {
  default?: () => VNodeChild;
}

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
    ctx: SetupContext<Emit, DefaultSlots & Slots, Expose, Data & ReservedAttrs>
  ) => Promise<RenderFunction | void> | RenderFunction | void;
  inheritAttrs?: boolean;
  serverPrefetch?(): Promise<any>;
} & ThisType<void>;

export type VSlotType<Slots extends {}> = DefaultSlots & Slots;
export type VChildrenType<Slots extends {}> = VNodeChild | VSlotType<Slots>;

export type RefType<Expose extends {}> = Ref<Expose | null> | string; // string 用于兼容 template 引用

export type ExtraRef<T extends DefineComponent<any, any, any, any>, Expose = T['__ref']> = Expose | null;

export type ExtraArrayRef<T extends DefineComponent<any, any, any, any>, Expose = T['__ref']> = Expose[] | null;

export interface DefineComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> {
  new (...args: any[]): {
    $props: Props &
      EmitsToProps<Emit> & { 'v-slots'?: Partial<VSlotType<Slots>> } & { 'v-children'?: VChildrenType<Slots> } & {
        ref?: RefType<Expose | Expose[]>;
      };
    // 支持 volar 推断
    $slots: VSlotType<Slots>;
    $emit: EmitFn<Emit>;
  };

  // 方便外部提取
  __ref: Expose;
}
