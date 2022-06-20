/**
 * 微应用模式
 */
export const isMicroApp = !!window.__POWERED_BY_QIANKUN__;

/**
 * 获取当前应用的 baseUrl, 如果子应用使用 history 路由模式，可以用这个方法获取基础路径
 */
export const getBaseUrl = (): string => {
  return 'TODO:';
};

/**
 * 获取当前子应用的配置
 */
export const getMircroApp = () => {};

export * from '../types';
