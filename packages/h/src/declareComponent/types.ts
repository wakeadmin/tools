/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Ref, EmitsOptions, ObjectEmitsOptions, RenderFunction, StyleValue } from '@wakeadmin/demi';

export type UnionToIntersection<U> = (U extends never ? never : (arg: U) => never) extends (arg: infer I) => void
  ? I
  : never;

export type UnionToTuple<T> = UnionToIntersection<T extends never ? never : (t: T) => T> extends (_: never) => infer W
  ? [...UnionToTuple<Exclude<T, W>>, W]
  : [];

export type NotUndefined<T> = T extends undefined ? never : T;

export type EmitsToProps<T extends EmitsOptions> = T extends string[]
  ? {
      [K in string & `on${Capitalize<T[number]>}`]?: (...args: any[]) => any;
    }
  : T extends ObjectEmitsOptions
  ? {
      [K in string & `on${Capitalize<string & keyof T>}`]?: K extends `on${infer C}`
        ? T[Uncapitalize<C>] extends null
          ? (...args: any[]) => any
          : (...args: T[Uncapitalize<C>] extends (...args: infer P) => any ? P : never) => any
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

export type ExposeFn<Expose extends {}> = (exposed: WithRef<Expose>) => void;

export interface ReservedAttrs {
  class?: any;
  style?: StyleValue;
}

/**
 * 支持 Ref 形式展开
 */
export type WithRef<T extends {}> = { [K in keyof T]: T[K] | Ref<T[K]> };

export interface SetupContext<Emit, Slot, Expose extends {}, Attrs> {
  attrs: Attrs;
  slots: Readonly<Partial<Slot>>;
  emit: EmitFn<Emit>;
  expose: (exposed: WithRef<Expose>) => void;
}

export interface SetupContextLike {
  attrs: Data;
  slots: Record<string, Function>;
}

export type Data = Record<string, unknown>;

export type MergeDefaultProps<DefaultProps extends {}, Props extends DefaultProps> = DefaultProps &
  Required<Pick<Props, keyof DefaultProps>>;

export interface DefaultSlots {
  default?: () => any;
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
export type VChildrenType<Slots extends {}> = any | VSlotType<Slots>;

export type RefType<Expose extends {}> = Ref<Expose | undefined> | string; // string 用于兼容 template 引用

/**
 * 提取 ref 类型
 */
export type ExtraRef<T extends DefineComponent<any, any, any, any>, Expose = T['__ref']> = Expose;

/**
 * 提取 ref 类型，用于列表渲染 ref
 */
export type ExtraArrayRef<T extends DefineComponent<any, any, any, any>, Expose = T['__ref']> = Expose[];

/**
 * 提取 Props 类型
 */
export type ExtraProps<T extends DefineComponent<any, any, any, any>, Props = T['__props']> = Props;

export type PropsType<Props extends {}, Emit extends {}, Slots extends {}, Expose extends {}> = Props &
  EmitsToProps<Emit> & { 'v-slots'?: Partial<VSlotType<Slots>> } & { 'v-children'?: VChildrenType<Slots> } & {
    ref?: RefType<Expose | Expose[]>;
  };

export interface DefineComponentContext<
  Emit extends ObjectEmitsOptions = {},
  Expose extends {} = {},
  Slots extends { [key: string]: Function } = {},
  Attrs extends {} = {}
> {
  attrs: Attrs;
  slots: Slots;
  emit: EmitFn<Emit>;
  expose: ExposeFn<Expose>;
}

export interface ComponentInstance<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> {
  $props: PropsType<Props, Emit, Slots, Expose>;
  // 支持 volar 推断
  $slots: VSlotType<Slots>;
  $emit: EmitFn<Emit>;
}

export interface DefineComponent<Props extends {}, Emit extends {}, Expose extends {}, Slots extends {}> {
  new (...args: any[]): ComponentInstance<Props, Emit, Expose, Slots>;

  // 方便外部提取
  __ref: Expose;
  __props: Props;
  __emits: Emit;
  __slots: Slots;
}
