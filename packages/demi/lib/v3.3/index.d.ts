// vue 3.3+
import * as Vue from 'vue';
import type { VNode, IntrinsicElementAttributes, ReservedProps, NativeElements, StyleValue } from '@vue/runtime-dom';

declare const isVue2: boolean;
declare const isVue3: boolean;
declare const Vue2: any;
declare const install: (vue?: any) => void;
/**
 * @deprecated To avoid bringing in all the tree-shakable modules, this API has been deprecated. Use `Vue2` or named exports instead.
 * Refer to https://github.com/vueuse/vue-demi/issues/41
 */
declare const V: typeof Vue;

export function set<T>(target: any, key: any, val: T): T;
export function del(target: any, key: any): void;

// 支持 h 库的一些特殊需求
declare module '@vue/runtime-dom' {
  interface HTMLAttributes {
    // FIXME: vue 没有设置这个属性
    textContent?: string;

    // 支持 shadow dom
    part?: string;
    slot?: string;

    // 避免原生组件报错
    'v-children'?: any;

    // 原生组件没有 v-slots
    'v-slots'?: never;
  }

  interface SVGAttributes {
    // 避免原生组件报错
    'v-children'?: any;

    // 原生组件没有 v-slots
    'v-slots'?: never;
  }
}

// vue 3.3+ 之后 JSX 不会暴露到全局，这回导致 h 库无法正式使用, 这里将 JSX 暴露到全局
// global JSX namespace registration
// somehow we have to copy=pase the jsx-runtime types here to make TypeScript happy
declare global {
  namespace JSX {
    export interface Element extends VNode {}
    export interface ElementClass {
      $props: {};
    }
    export interface ElementAttributesProperty {
      $props: {};
    }
    export interface IntrinsicElements extends NativeElements {
      // allow arbitrary elements
      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      [name: string]: any;
    }
    interface ElementChildrenAttribute {
      // JSX 从 v-slots 推断子元素
      // 和 vue 的 jsx 插件语法保持一致
      // 'v-slots': {};
      // 为什么不直接用 v-slots, 因为 children 的类型应该更加宽松，v-slots 则必须为对象
      'v-children': {};
    }
    export interface IntrinsicAttributes extends ReservedProps {
      class?: any;
      style?: StyleValue;
    }
  }
}

export type DirectiveModifiers = Record<string, boolean>;

export * from 'vue';
export { V as Vue, Vue2, isVue2, isVue3, install };
