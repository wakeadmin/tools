/* eslint-disable vue/prefer-import-from-vue */
/* eslint-disable import/export */
import * as Vue from '@vue/runtime-dom';

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

// @vue/runtime-dom 导出的类型更加丰富一点，我们需要依赖这里的一些类型
export * from '@vue/runtime-dom';

// 以下是 vue 2/3 通用的类型
// export {
//   EffectScope,
//   computed,
//   customRef,
//   effectScope,
//   getCurrentInstance,
//   getCurrentScope,
//   inject,
//   isProxy,
//   isReactive,
//   isReadonly,
//   isRef,
//   isShallow,
//   markRaw,
//   nextTick,
//   onActivated,
//   onBeforeMount,
//   onBeforeUnmount,
//   onBeforeUpdate,
//   onDeactivated,
//   onErrorCaptured,
//   onMounted,
//   onRenderTracked,
//   onRenderTriggered,
//   onScopeDispose,
//   onServerPrefetch,
//   onUnmounted,
//   onUpdated,
//   provide,
//   proxyRefs,
//   reactive,
//   readonly,
//   ref,
//   shallowReactive,
//   shallowReadonly,
//   shallowRef,
//   toRaw,
//   toRef,
//   toRefs,
//   triggerRef,
//   unref,
//   useAttrs,
//   useCssModule,
//   useCssVars,
//   useListeners,
//   useSlots,
//   warn,
//   watch,
//   watchEffect,
//   watchPostEffect,
//   watchSyncEffect,
// } from 'vue-demi';

// // 纯类型
// export {
//   Ref,
//   UnwrapRef,
//   UnwrapNestedRefs,
//   ComputedRef,
//   WritableComputedRef,
//   ShallowUnwrapRef,
//   ShallowReactive,
//   ShallowRef,
//   ToRef,
//   ToRefs,
//   PropType,
//   InjectionKey,
// } from 'vue-demi';

export { V as Vue, Vue2, isVue2, isVue3, install };

// 覆盖 vue 2 模块定义
declare module 'vue' {
  export {
    EffectScope,
    computed,
    customRef,
    effectScope,
    getCurrentInstance,
    getCurrentScope,
    inject,
    isProxy,
    isReactive,
    isReadonly,
    isRef,
    isShallow,
    markRaw,
    nextTick,
    onActivated,
    onBeforeMount,
    onBeforeUnmount,
    onBeforeUpdate,
    onDeactivated,
    onErrorCaptured,
    onMounted,
    onRenderTracked,
    onRenderTriggered,
    onScopeDispose,
    onServerPrefetch,
    onUnmounted,
    onUpdated,
    defineComponent,
    defineAsyncComponent,
    provide,
    proxyRefs,
    reactive,
    readonly,
    ref,
    shallowReactive,
    shallowReadonly,
    shallowRef,
    toRaw,
    toRef,
    toRefs,
    triggerRef,
    unref,
    useAttrs,
    useCssModule,
    useCssVars,
    useListeners,
    useSlots,
    warn,
    watch,
    watchEffect,
    watchPostEffect,
    watchSyncEffect,

    // types
    Ref,
    UnwrapRef,
    UnwrapNestedRefs,
    ComputedRef,
    WritableComputedRef,
    ShallowUnwrapRef,
    ShallowReactive,
    ShallowRef,
    ToRef,
    ToRefs,
    PropType,
    InjectionKey,
  } from '@vue/runtime-dom';
}
