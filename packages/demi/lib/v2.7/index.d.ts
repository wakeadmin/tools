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

declare const isVue2: boolean;
declare const isVue3: boolean;
declare const Vue2: typeof Vue | undefined;
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
export { V as Vue, Vue2, isVue2, isVue3, version, install };

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
export { EmitFn, ObjectEmitsOptions, EmitsOptions } from 'vue/types/v3-setup-context';

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
  max?: number;
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
