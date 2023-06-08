import Vue from 'vue';
import type {
  PluginFunction,
  PluginObject,
  VueConstructor,
  Directive,
  DirectiveModifiers,
  InjectionKey,
  Component,
  VNodeData,
} from 'vue';
import { ScopedSlotReturnValue, ScopedSlotReturnArray } from 'vue/types/vnode';
import { EmitFn, ObjectEmitsOptions, EmitsOptions } from 'vue/types/v3-setup-context';

declare const isVue2: boolean;
declare const isVue3: boolean;
declare const Vue2: typeof Vue;
declare const version: string;
declare const install: (vue?: typeof Vue) => void;
export declare function warn(msg: string, vm?: Component | null): void;
/**
 * @deprecated To avoid bringing in all the tree-shakable modules, this API has been deprecated. Use `Vue2` or named exports instead.
 * Refer to https://github.com/vueuse/vue-demi/issues/41
 */
declare const V: typeof Vue;

// accept no generic because Vue 3 doesn't accept any
// https://github.com/vuejs/vue-next/pull/2758/
export declare type Plugin = PluginObject<any> | PluginFunction<any>;
export type { VNode } from 'vue';
export * from 'vue';
export { V as Vue, Vue2, isVue2, isVue3, version, install, DirectiveModifiers };

// #region createApp polyfill
export interface App<T = any> {
  config: VueConstructor['config'];
  use: VueConstructor['use'];
  mixin: VueConstructor['mixin'];
  component: VueConstructor['component'];
  directive(name: string): Directive | undefined;
  directive(name: string, directive: Directive): this;
  provide<T>(key: InjectionKey<T> | string, value: T): this;
  mount: Vue['$mount'];
  unmount: Vue['$destroy'];
}

export declare function createApp(rootComponent: any, rootProps?: any): App;
// #endregion

// 扩展以下类型，确保和 vue 3 大致一致
export * from 'vue/types/jsx';
export { ComponentObjectPropsOptions } from 'vue/types/v3-component-props';
export { DefineComponent } from 'vue/types/v3-define-component';
export { Directive } from 'vue/types/v3-directive';

export interface AppContext<T = any> extends App {}

export const render: (vnode: VNode | null, container: HostElement, isSVG?: boolean) => void;
export const createVNode: (
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props?: (Data & VNodeProps) | null,
  children?: unknown,
  patchFlag?: number,
  dynamicProps?: string[] | null,
  isBlockNode?: boolean
) => VNode;
export type VNodeChild = ScopedSlotReturnValue;
export type VNodeArrayChildren = ScopedSlotReturnArray;
export type VNodeProps = VNodeData;

export type DirectiveArguments = (
  | [Directive]
  | [Directive, any]
  | [Directive, any, string]
  | [Directive, any, string, DirectiveModifiers]
)[];

export type RenderFunction = () => VNodeChild;

export type SimpleComponent<Props> = {
  new (...args: any[]): {
    $props: Props;
  };
};

type Hook<T = () => void> = T | T[];
export interface BaseTransitionProps<HostElement> {
  mode?: 'in-out' | 'out-in' | 'default';
  appear?: boolean;
  persisted?: boolean;
  onBeforeEnter?: Hook<(el: HostElement) => void>;
  onEnter?: Hook<(el: HostElement, done: () => void) => void>;
  onAfterEnter?: Hook<(el: HostElement) => void>;
  onEnterCancelled?: Hook<(el: HostElement) => void>;
  onBeforeLeave?: Hook<(el: HostElement) => void>;
  onLeave?: Hook<(el: HostElement, done: () => void) => void>;
  onAfterLeave?: Hook<(el: HostElement) => void>;
  onLeaveCancelled?: Hook<(el: HostElement) => void>;
  onBeforeAppear?: Hook<(el: HostElement) => void>;
  onAppear?: Hook<(el: HostElement, done: () => void) => void>;
  onAfterAppear?: Hook<(el: HostElement) => void>;
  onAppearCancelled?: Hook<(el: HostElement) => void>;
}
export interface TransitionProps extends BaseTransitionProps<Element> {
  name?: string;
  type?: 'transition' | 'animation';
  css?: boolean;
  duration?:
    | number
    | {
        enter: number;
        leave: number;
      };
  enterFromClass?: string;
  enterActiveClass?: string;
  enterToClass?: string;
  appearFromClass?: string;
  appearActiveClass?: string;
  appearToClass?: string;
  leaveFromClass?: string;
  leaveActiveClass?: string;
  leaveToClass?: string;
}

export type TransitionGroupProps = Omit<TransitionProps, 'mode'> & {
  tag?: string;
  moveClass?: string;
};

export interface KeepAliveProps {
  max?: number | string;
  include?: string | RegExp | (string | RegExp)[];
  exclude?: string | RegExp | (string | RegExp)[];
}

export const Transition: SimpleComponent<TransitionProps>;
export const TransitionGroup: SimpleComponent<TransitionGroupProps>;
export const KeepAlive: SimpleComponent<KeepAliveProps>;
export const vShow: Directive;

// 仅 vue 3
// 组件
export const Teleport: never;
export const Suspense: never;
export const Fragment: never;
export const Text: never;
export const Comment: never;

// 方法
export const resolveComponent: (name: string, maybeSelfReference?: boolean) => any;
export const resolveDirective: (name: string) => Directive | undefined;
export const isVNode: void;
export const withDirectives: void;

export type TeleportProps = unknown;
export type SuspenseProps = unknown;
export type FunctionalComponent<P, E> = unknown;
export type ConcreteComponent<P> = unknown;
export type ComponentOptions<P> = unknown;

// 支持 h 库的一些特殊需求
declare module 'vue/types/jsx' {
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

export { EmitFn, ObjectEmitsOptions, EmitsOptions, EmitsToProps };

declare module 'vue/types/v3-component-public-instance' {
  interface Vue3Instance<D, P, PublicProps, E, Defaults, MakeDefaultsOptional, Options> {
    // 覆盖 props 类型，以支持 h JSX 的事件调用
    $props: Readonly<
      MakeDefaultsOptional extends true ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults> : P & PublicProps
    > &
      EmitsToProps<E>;
  }
}
