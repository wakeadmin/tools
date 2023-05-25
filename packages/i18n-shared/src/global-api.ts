/* eslint-disable @typescript-eslint/naming-convention */
import { I18nInstance, I18nBundle, FallbackLocale } from './types';

/**
 * 全局 API。如果应用需要并存多个 i18n 实例，应该避免使用这些 API
 */
let globalInstance: I18nInstance;
let readyWaitQueue: Function[] = [];
let ready = false;

/**
 * 等待 i18n 全局实例就绪
 * @returns
 */
export function __waitReady(): Promise<void> {
  if (!ready) {
    return new Promise(resolve => {
      readyWaitQueue.push(resolve);
    });
  }

  return Promise.resolve();
}

export function __resetReadyState() {
  ready = false;
}

export function __flushReadyWaitQueue() {
  ready = true;

  if (readyWaitQueue.length) {
    const clone = readyWaitQueue;
    readyWaitQueue = [];
    for (const i of clone) {
      try {
        i();
      } catch {
        // ignore
      }
    }
  }
}

export function __setGlobalInstance(instance: I18nInstance) {
  globalInstance = instance;
}

export function __getGlobalInstance() {
  return globalInstance;
}

/**
 * 获取全局实例
 * @returns
 */
export function getGlobalInstance(): I18nInstance {
  if (globalInstance == null) {
    throw new Error(`请先使用 createI18n 创建实例`);
  }
  return globalInstance;
}

/**
 * 获取全局 vue i18n 实例
 */
export function getGlobalI18n(): I18nInstance['i18n'] {
  return getGlobalInstance().i18n;
}

/**
 * 获取语言链
 * @returns string[]
 */
export function getFallbackLocaleChain(locale?: string, fallback?: FallbackLocale) {
  return getGlobalInstance().getFallbackLocaleChain(locale, fallback);
}

/**
 * 获取当前语言
 * @returns
 */
export function getLocale() {
  return getGlobalInstance().getLocale();
}

/**
 * 设置当前语言
 * @param locale
 */
export function setLocale(locale: string) {
  return getGlobalInstance().setLocale(locale);
}

/**
 * 注册语言包
 * @param bundles
 */
export async function registerBundles(bundles: { [locale: string]: I18nBundle }, layer?: number): Promise<void> {
  await __waitReady();
  return await getGlobalInstance().registerBundles(bundles, layer);
}
