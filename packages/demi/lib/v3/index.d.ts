import * as Vue from 'vue'
declare const isVue2: boolean
declare const isVue3: boolean
declare const Vue2: any
declare const install: (vue?: any) => void
/**
 * @deprecated To avoid bringing in all the tree-shakable modules, this API has been deprecated. Use `Vue2` or named exports instead.
 * Refer to https://github.com/vueuse/vue-demi/issues/41
 */
declare const V: typeof Vue

export function set<T>(target: any, key: any, val: T): T
export function del(target: any, key: any): void

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
}

export * from 'vue'
export {
  V as Vue,
  Vue2,
  isVue2,
  isVue3,
  install,
}
