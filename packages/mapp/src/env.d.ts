interface Window {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __POWERED_BY_QIANKUN__?: boolean;

  /**
   * 当前应用
   * 子应用可见
   */
  __MAPP_CURRENT_APP__?: import('./types').MicroApp;
}

declare module 'path-browserify' {
  export default (await import('path')).default;
}
