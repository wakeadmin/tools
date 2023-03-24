import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    type Element = VNode;
    type ElementClass = Vue;
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  }
}
