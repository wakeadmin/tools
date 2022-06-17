interface Window {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __POWERED_BY_QIANKUN__?: boolean;
}

declare module 'path-browserify' {
  export default (await import('path')).default;
}
