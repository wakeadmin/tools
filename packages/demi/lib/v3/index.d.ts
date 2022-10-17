import * as Vue from 'vue';
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

export type DirectiveModifiers = Record<string, boolean>;

export * from 'vue';
export { V as Vue, Vue2, isVue2, isVue3, install };
