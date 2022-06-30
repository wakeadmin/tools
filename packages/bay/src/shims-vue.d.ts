/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.png' {
  export default string;
}

declare module '*.scss?inline' {
  export default string;
}

interface Window {
  /**
   * 基座服务挂载点, 子应用从这里读取
   */
  __MAPP_SERVICES__?: any;
}
