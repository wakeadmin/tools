/* eslint-disable @typescript-eslint/no-shadow */
import type {
  DefineComponent,
  ComponentPropsOptions,
  ExtractPropTypes,
  EmitsOptions,
  ObjectEmitsOptions,
  ShallowUnwrapRef,
  ExtractDefaultPropTypes,
  HTMLAttributes,
  Ref,
} from 'vue';
import { VNodeRef } from '@vue/runtime-core';

interface ReservedProps {
  key?: string | number | symbol;
  ref_for?: boolean;
  ref_key?: string;
}

type ElementAttrs<T> = T & ReservedProps;

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
export type InferProps<Constructor> = Constructor extends DefineComponent<
  infer Props,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>
  ? Props
  : {};

/**
 * 从 Vue 构造函数中提取 Emit 定义
 */
export type InferEmits<Constructor> = Constructor extends DefineComponent<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  infer Emit,
  any
>
  ? Emit
  : {};

/**
 * 从 Vue 构造函数中提取 RawBinding
 */
export type InferRawBindings<Constructor> = Constructor extends DefineComponent<
  any,
  infer RawBindings,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>
  ? RawBindings
  : {};

declare type EmitsToProps<T extends EmitsOptions> = T extends string[]
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

/**
 * 转换 emit 参数为 CustomEvent
 */
export type CustomElementEmit<Emit extends EmitsOptions, EE = {} extends Emit ? {} : Required<EmitsToProps<Emit>>> = {
  [K in keyof EE]?: EE[K] extends (...args: any[]) => any ? (evt: CustomEvent<Parameters<EE[K]>>) => void : never;
};

/**
 * 生成 props 类型
 */
export type CustomElementProps<PropsOrPropOptions, Defaults = ExtractDefaultPropTypes<PropsOrPropOptions>> = Omit<
  PropsOrPropOptions extends ComponentPropsOptions ? ExtractPropTypes<PropsOrPropOptions> : PropsOrPropOptions,
  keyof Defaults
> &
  Partial<Defaults>;

/**
 * 生成实例方法
 */
export type CustomElementBindings<Bindings = {}> = {} extends Bindings
  ? { ref?: VNodeRef }
  : { ref?: Ref<ShallowUnwrapRef<Bindings>> };

export type CustomElementProperties<
  Constructor extends DefineComponent<any, any, any, any, any, any, any, any, any>,
  P = InferProps<Constructor>,
  B = InferRawBindings<Constructor>,
  E extends EmitsOptions = InferEmits<Constructor>
> = ElementAttrs<CustomElementProps<P> & CustomElementEmit<E> & CustomElementBindings<B> & HTMLAttributes>;

export type CustomElements<
  PREFIX extends string,
  COMPONENTS extends { [key: string]: DefineComponent<any, any, any, any, any, any, any, any, any> },
  P extends string = CustomElementPrefix<PREFIX>
> = {
  // @ts-expect-error
  [K in keyof COMPONENTS as `${P}-${KebabCase<K>}`]: CustomElementProperties<COMPONENTS[K]>;
};
