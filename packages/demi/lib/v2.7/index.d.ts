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

    // 修复 HTMLAttribute 事件错误问题：https://github.com/vuejs/vue/issues/12832,
    // 必须在这里显式定义才能覆盖
    // TODO: 等 Vue 修复后移除:
    //#region
    // clipboard events
    onCopy?: (evt: ClipboardEvent) => void;
    onCut?: (evt: ClipboardEvent) => void;
    onPaste?: (evt: ClipboardEvent) => void;

    // composition events
    onCompositionend?: (evt: CompositionEvent) => void;
    onCompositionstart?: (evt: CompositionEvent) => void;
    onCompositionupdate?: (evt: CompositionEvent) => void;

    // drag drop events
    onDrag?: (evt: DragEvent) => void;
    onDragend?: (evt: DragEvent) => void;
    onDragenter?: (evt: DragEvent) => void;
    onDragexit?: (evt: DragEvent) => void;
    onDragleave?: (evt: DragEvent) => void;
    onDragover?: (evt: DragEvent) => void;
    onDragstart?: (evt: DragEvent) => void;
    onDrop?: (evt: DragEvent) => void;

    // focus events
    onFocus?: (evt: FocusEvent) => void;
    onFocusin?: (evt: FocusEvent) => void;
    onFocusout?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;

    // form events
    onChange?: (evt: Event) => void;
    onBeforeinput?: (evt: Event) => void;
    onInput?: (evt: Event) => void;
    onReset?: (evt: Event) => void;
    onSubmit?: (evt: Event) => void;
    onInvalid?: (evt: Event) => void;

    // image events
    onLoad?: (evt: Event) => void;
    onError?: (evt: Event) => void;

    // keyboard events
    onKeydown?: (evt: KeyboardEvent) => void;
    onKeypress?: (evt: KeyboardEvent) => void;
    onKeyup?: (evt: KeyboardEvent) => void;

    // mouse events
    onAuxclick?: (evt: MouseEvent) => void;
    onClick?: (evt: MouseEvent) => void;
    onContextmenu?: (evt: MouseEvent) => void;
    onDblclick?: (evt: MouseEvent) => void;
    onMousedown?: (evt: MouseEvent) => void;
    onMouseenter?: (evt: MouseEvent) => void;
    onMouseleave?: (evt: MouseEvent) => void;
    onMousemove?: (evt: MouseEvent) => void;
    onMouseout?: (evt: MouseEvent) => void;
    onMouseover?: (evt: MouseEvent) => void;
    onMouseup?: (evt: MouseEvent) => void;

    // media events
    onAbort?: (evt: Event) => void;
    onCanplay?: (evt: Event) => void;
    onCanplaythrough?: (evt: Event) => void;
    onDurationchange?: (evt: Event) => void;
    onEmptied?: (evt: Event) => void;
    onEncrypted?: (evt: Event) => void;
    onEnded?: (evt: Event) => void;
    onLoadeddata?: (evt: Event) => void;
    onLoadedmetadata?: (evt: Event) => void;
    onLoadstart?: (evt: Event) => void;
    onPause?: (evt: Event) => void;
    onPlay?: (evt: Event) => void;
    onPlaying?: (evt: Event) => void;
    onProgress?: (evt: Event) => void;
    onRatechange?: (evt: Event) => void;
    onSeeked?: (evt: Event) => void;
    onSeeking?: (evt: Event) => void;
    onStalled?: (evt: Event) => void;
    onSuspend?: (evt: Event) => void;
    onTimeupdate?: (evt: Event) => void;
    onVolumechange?: (evt: Event) => void;
    onWaiting?: (evt: Event) => void;

    // selection events
    onSelect?: (evt: Event) => void;

    // UI events
    onScroll?: (evt: UIEvent) => void;

    // touch events
    onTouchcancel?: (evt: TouchEvent) => void;
    onTouchend?: (evt: TouchEvent) => void;
    onTouchmove?: (evt: TouchEvent) => void;
    onTouchstart?: (evt: TouchEvent) => void;

    // pointer events
    onPointerdown?: (evt: PointerEvent) => void;
    onPointermove?: (evt: PointerEvent) => void;
    onPointerup?: (evt: PointerEvent) => void;
    onPointercancel?: (evt: PointerEvent) => void;
    onPointerenter?: (evt: PointerEvent) => void;
    onPointerleave?: (evt: PointerEvent) => void;
    onPointerover?: (evt: PointerEvent) => void;
    onPointerout?: (evt: PointerEvent) => void;

    // wheel events
    onWheel?: (evt: WheelEvent) => void;

    // animation events
    onAnimationstart?: (evt: AnimationEvent) => void;
    onAnimationend?: (evt: AnimationEvent) => void;
    onAnimationiteration?: (evt: AnimationEvent) => void;

    // transition events
    onTransitionend?: (evt: TransitionEvent) => void;
    onTransitionstart?: (evt: TransitionEvent) => void;
    //#endregion
  }

  interface SVGAttributes {
    // 修复 HTMLAttribute 事件错误问题：https://github.com/vuejs/vue/issues/12832,
    // 必须在这里显式定义才能覆盖
    // TODO: 等 Vue 修复后移除:
    //#region
    // clipboard events
    onCopy?: (evt: ClipboardEvent) => void;
    onCut?: (evt: ClipboardEvent) => void;
    onPaste?: (evt: ClipboardEvent) => void;

    // composition events
    onCompositionend?: (evt: CompositionEvent) => void;
    onCompositionstart?: (evt: CompositionEvent) => void;
    onCompositionupdate?: (evt: CompositionEvent) => void;

    // drag drop events
    onDrag?: (evt: DragEvent) => void;
    onDragend?: (evt: DragEvent) => void;
    onDragenter?: (evt: DragEvent) => void;
    onDragexit?: (evt: DragEvent) => void;
    onDragleave?: (evt: DragEvent) => void;
    onDragover?: (evt: DragEvent) => void;
    onDragstart?: (evt: DragEvent) => void;
    onDrop?: (evt: DragEvent) => void;

    // focus events
    onFocus?: (evt: FocusEvent) => void;
    onFocusin?: (evt: FocusEvent) => void;
    onFocusout?: (evt: FocusEvent) => void;
    onBlur?: (evt: FocusEvent) => void;

    // form events
    onChange?: (evt: Event) => void;
    onBeforeinput?: (evt: Event) => void;
    onInput?: (evt: Event) => void;
    onReset?: (evt: Event) => void;
    onSubmit?: (evt: Event) => void;
    onInvalid?: (evt: Event) => void;

    // image events
    onLoad?: (evt: Event) => void;
    onError?: (evt: Event) => void;

    // keyboard events
    onKeydown?: (evt: KeyboardEvent) => void;
    onKeypress?: (evt: KeyboardEvent) => void;
    onKeyup?: (evt: KeyboardEvent) => void;

    // mouse events
    onAuxclick?: (evt: MouseEvent) => void;
    onClick?: (evt: MouseEvent) => void;
    onContextmenu?: (evt: MouseEvent) => void;
    onDblclick?: (evt: MouseEvent) => void;
    onMousedown?: (evt: MouseEvent) => void;
    onMouseenter?: (evt: MouseEvent) => void;
    onMouseleave?: (evt: MouseEvent) => void;
    onMousemove?: (evt: MouseEvent) => void;
    onMouseout?: (evt: MouseEvent) => void;
    onMouseover?: (evt: MouseEvent) => void;
    onMouseup?: (evt: MouseEvent) => void;

    // media events
    onAbort?: (evt: Event) => void;
    onCanplay?: (evt: Event) => void;
    onCanplaythrough?: (evt: Event) => void;
    onDurationchange?: (evt: Event) => void;
    onEmptied?: (evt: Event) => void;
    onEncrypted?: (evt: Event) => void;
    onEnded?: (evt: Event) => void;
    onLoadeddata?: (evt: Event) => void;
    onLoadedmetadata?: (evt: Event) => void;
    onLoadstart?: (evt: Event) => void;
    onPause?: (evt: Event) => void;
    onPlay?: (evt: Event) => void;
    onPlaying?: (evt: Event) => void;
    onProgress?: (evt: Event) => void;
    onRatechange?: (evt: Event) => void;
    onSeeked?: (evt: Event) => void;
    onSeeking?: (evt: Event) => void;
    onStalled?: (evt: Event) => void;
    onSuspend?: (evt: Event) => void;
    onTimeupdate?: (evt: Event) => void;
    onVolumechange?: (evt: Event) => void;
    onWaiting?: (evt: Event) => void;

    // selection events
    onSelect?: (evt: Event) => void;

    // UI events
    onScroll?: (evt: UIEvent) => void;

    // touch events
    onTouchcancel?: (evt: TouchEvent) => void;
    onTouchend?: (evt: TouchEvent) => void;
    onTouchmove?: (evt: TouchEvent) => void;
    onTouchstart?: (evt: TouchEvent) => void;

    // pointer events
    onPointerdown?: (evt: PointerEvent) => void;
    onPointermove?: (evt: PointerEvent) => void;
    onPointerup?: (evt: PointerEvent) => void;
    onPointercancel?: (evt: PointerEvent) => void;
    onPointerenter?: (evt: PointerEvent) => void;
    onPointerleave?: (evt: PointerEvent) => void;
    onPointerover?: (evt: PointerEvent) => void;
    onPointerout?: (evt: PointerEvent) => void;

    // wheel events
    onWheel?: (evt: WheelEvent) => void;

    // animation events
    onAnimationstart?: (evt: AnimationEvent) => void;
    onAnimationend?: (evt: AnimationEvent) => void;
    onAnimationiteration?: (evt: AnimationEvent) => void;

    // transition events
    onTransitionend?: (evt: TransitionEvent) => void;
    onTransitionstart?: (evt: TransitionEvent) => void;
    //#endregion
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
