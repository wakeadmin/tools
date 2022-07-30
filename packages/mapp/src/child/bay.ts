import { IBay } from '../types';

export * from '../types';

/**
 * 获取基座实例
 * @returns
 */
const _getBay = () => {
  const bay = window.__MAPP_BAY__;

  if (process.env.NODE_ENV !== 'production') {
    if (bay == null) {
      throw new Error(`[mapp/child] 无法获取到基座实例，请确保子应用在基座下运行`);
    }

    if (window.__MAPP_CURRENT_APP__ == null) {
      throw new Error('[mapp/child] 只能在子应用中导入和使用');
    }
  }

  return bay;
};

/**
 * 是否处于微应用模式
 */
export const isMicroApp = !!window.__POWERED_BY_QIANKUN__;

/**
 * 获取基座实例
 */
export const getBay = _getBay;

/**
 * 获取基座 baseUrl
 * @returns
 */
export const getBayBaseUrl = () => {
  return getBay()?.baseUrl;
};

/**
 * 获取当前子应用的配置
 */
export const getMicroApp = () => {
  return getBay() && window.__MAPP_CURRENT_APP__;
};

/**
 * 获取当前应用的 baseUrl, 如果子应用使用 history 路由模式，可以用这个方法获取基础路径
 * 对于 hash 路由，不需要关心 baseUrl
 */
export const getActiveRule = (): string | string[] | undefined => {
  return getMicroApp()?.activeRule;
};

/**
 * 获取事件总线
 * @returns
 */
export const getEventBus = () => {
  return getBay()?.eventBus;
};

export const openError: IBay['openError'] = (...args) => {
  getBay()?.openError(...args);
};

export const openApp: IBay['openApp'] = (...args) => {
  getBay()?.openApp(...args);
};

export const openUrl: IBay['openUrl'] = (...args) => {
  getBay()?.openUrl(...args);
};

export const openMain: IBay['openMain'] = (...args) => {
  getBay()?.openMain(...args);
};
