/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '*.png' {
  export default string;
}

declare module '*.tr' {
  export default object;
}

declare module '*.svg' {
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

  /**
   * 已注册的微应用
   */
  __MAPPS__?: import('@wakeadmin/mapp/main').MicroApp[];

  __MAPP_BAY_MODEL__?: import('./BayModel').BayModel;

  /**
   * 外部注入的语言包
   */
  __MAPP_I18N__?: Record<string, string>;
}
