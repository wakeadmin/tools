import Vue from 'vue';
import type {
  PluginFunction,
  PluginObject,
  VueConstructor,
  Directive,
  DirectiveModifiers,
  InjectionKey,
  Component,
  VNodeChildren,
  VNodeChildrenArrayContents,
  VNodeData,
} from 'vue';

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

export type VNodeChild = VNodeChildren;
export type VNodeArrayChildren = VNodeChildrenArrayContents;
export type VNodeProps = VNodeData;

export type DirectiveArguments = ([Directive] | [Directive, any] | [Directive, any, string] | [Directive, any, string, DirectiveModifiers])[];

export type RenderFunction = () => VNodeChild;

// 需要提供实现
export const Transition: any;
export const TransitionGroup: any;
export const KeepAlive: any;
export const Teleport: never;
export const Suspense: never;
export const Fragment: never;
export const Text: never;
export const Comment: never;
export const isVNode: never;
export const vShow: Directive;
export const resolveComponent: never;
export const withDirectives: never;
export const resolveDirective: never;

export type TeleportProps = unknown;
export type SuspenseProps = unknown;
export type FunctionalComponent = unknown;
export type ConcreteComponent = unknown;
