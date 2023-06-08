import type { HTMLAttributes, Ref, VNodeProps, VueElementConstructor } from 'vue';

/**
 * 去掉 - 后缀
 */
export type CustomElementPrefix<S extends string> = S extends `${infer P}-` ? P : S;

export type KebabCase<S extends string> = S extends `${infer Head}${infer Tail}`
  ? `${Lowercase<Head>}${Tail extends Uncapitalize<Tail> ? '' : '-'}${KebabCase<Tail>}`
  : S;

/**
 * 从 Vue 构造函数中提取 Props 定义
 */
export type InferProps<Constructor> = Constructor extends new (...args: any[]) => { $props: infer Props }
  ? Props
  : never;

type IsEventName<T> = T extends keyof VNodeProps ? never : T extends string & `on${string}` ? T : never;
type PickEventName<T> = keyof { [K in T as IsEventName<K>]: any };

/**
 * 从 Vue 构造函数中提取 Emit 定义
 */
export type InferEmits<Constructor, Props = InferProps<Constructor>> = Pick<Props, PickEventName<keyof Props>>;

/**
 * 从 Vue 构造函数中提取 RawBinding
 */
export type InferRawBindings<Constructor> = Constructor extends new (...args: any[]) => infer RawBindings
  ? RawBindings
  : {};

/**
 * 转换 emit 参数为 CustomEvent
 */
export type CustomElementEmit<Emits> = {
  [K in keyof Emits]?: Emits[K] extends (...args: any[]) => any
    ? (evt: CustomEvent<Parameters<Emits[K]>>) => void
    : never;
};

/**
 * 生成实例方法
 */
export interface CustomElementBindings<Bindings> {
  ref?: Ref<Bindings>;
}

export type CustomElementProperties<
  Constructor extends VueElementConstructor<any>,
  P = InferProps<Constructor>,
  B = InferRawBindings<Constructor>,
  E = InferEmits<Constructor>
> = Omit<P, keyof E> & CustomElementEmit<Required<E>> & HTMLAttributes & CustomElementBindings<B>;

export type CustomElements<
  PREFIX extends string,
  COMPONENTS extends { [key: string]: VueElementConstructor<any> },
  P extends string = CustomElementPrefix<PREFIX>
> = {
  // @ts-expect-error
  [K in keyof COMPONENTS as `${P}-${KebabCase<K>}`]: CustomElementProperties<COMPONENTS[K]>;
};
