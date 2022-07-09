import { isESModule } from '@wakeadmin/utils';

import { I18nAsyncBundle } from './types';

/**
 * 异步模块加载器
 * @param bundle
 */
export async function asyncModuleLoader(bundle: I18nAsyncBundle) {
  try {
    const module = await bundle();
    return isESModule(module) ? module.default : module;
  } catch (err) {
    console.error(`[i18n] 异步模块加载失败: `, err);
    return {};
  }
}

/**
 * HTTP 加载器
 * @param url
 */
export async function httpLoader(url: string) {
  try {
    const res = await window.fetch(url, { credentials: 'include' });
    if (res.ok) {
      return await res.json();
    }

    throw new Error(`请求失败：${res.status} ${res.statusText}`);
  } catch (err) {
    console.error(`[i18n] 语言包加载失败(${url}): `, err);
    return {};
  }
}
