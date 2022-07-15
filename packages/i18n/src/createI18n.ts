import { createI18n as _createI18n, FallbackLocale } from 'vue-i18n';
import { unref, watch, isRef } from 'vue';

import {
  BundleRegister,
  normalizeMapper,
  createEventBus,
  LocaleDetect,
  DEFAULT_LOCALE,
  DEFAULT_DATETIME_FORMATS,
  DEFAULT_NUMBER_FORMATS,
  DEFAULT_MAPPER,
  EVENT_LOCALE_CHANGE,
  EVENT_READY,
  EVENT_MESSAGE_CHANGE,
  __getGlobalInstance,
  __resetReadyState,
  __setGlobalInstance,
  __flushReadyWaitQueue,
} from '@wakeadmin/i18n-shared';
import { fallbackWithLocaleChain } from './fallback';
import { I18nInstance, I18nOptions } from './types';

/**
 * 创建 i18n 实例
 * @param options
 * @returns
 */
export function createI18n(options?: I18nOptions): I18nInstance {
  // 已经创建了实例，现在重新创建一个，
  if (__getGlobalInstance() != null) {
    console.warn(
      `[i18n] 推荐全局只使用一个 i18n 实例，避免多次调用 createI18n. 这会导致你使用全局 API 时出现不可预见的后果`
    );
  }

  // 接受新的等待
  __resetReadyState();

  let { detect, mapper, fallbackLocale, datetimeFormats, numberFormats, locale, ...other } = options ?? {};

  const localeMapper = normalizeMapper(mapper ?? DEFAULT_MAPPER);
  const detector = detect ?? new LocaleDetect();

  fallbackLocale ??= DEFAULT_LOCALE;
  datetimeFormats = { ...DEFAULT_DATETIME_FORMATS, ...datetimeFormats };
  numberFormats = { ...DEFAULT_NUMBER_FORMATS, ...numberFormats };
  locale = localeMapper(locale ?? detector.locale);

  const i18n = _createI18n({
    locale,
    fallbackLocale,
    datetimeFormats,
    numberFormats,
    ...other,
  });

  // 扩展方法

  let SET_LOCALE_CONTEXT = false;
  const vueI18nInstance = i18n.global as I18nInstance['i18n'];
  const eventBus = createEventBus();

  const setLocale = (nextLocale: string) => {
    try {
      SET_LOCALE_CONTEXT = true;
      nextLocale = localeMapper(nextLocale);
      // 写入缓存
      detector.locale = nextLocale;

      if (isRef(vueI18nInstance.locale)) {
        vueI18nInstance.locale.value = nextLocale;
      } else {
        vueI18nInstance.locale = nextLocale;
      }
      return nextLocale;
    } finally {
      SET_LOCALE_CONTEXT = false;
    }
  };

  const getLocale = () => {
    return unref(vueI18nInstance.locale);
  };

  const getFallbackLocaleChain = (loc?: string, fallback?: FallbackLocale) => {
    loc ??= getLocale();
    fallback ??= unref(vueI18nInstance.fallbackLocale);

    return fallbackWithLocaleChain(vueI18nInstance, fallback, loc);
  };

  const bundleRegister = new BundleRegister(
    (loc, bundle) => {
      vueI18nInstance.mergeLocaleMessage(loc, bundle);
    },
    getFallbackLocaleChain,
    () => {
      eventBus.emit(EVENT_MESSAGE_CHANGE);
    }
  );

  // 监听语言变动
  watch(
    () => unref(vueI18nInstance.locale),
    loc => {
      // 检查是否通过 setLocale 调用
      if (!SET_LOCALE_CONTEXT) {
        console.error(`[i18n] 禁止直接设置 .locale 来设置当前语言， 必须使用 setLocale()`);
      }

      eventBus.emit(EVENT_LOCALE_CHANGE, loc);
      bundleRegister.schedulerMerge();
    },
    { flush: 'sync' }
  );

  const instance = {
    install: i18n.install,
    i18n: vueI18nInstance,
    eventBus,
    detect: detector,
    localeMapper,
    setLocale,
    getLocale,
    getFallbackLocaleChain,
    registerBundles: bundleRegister.registerBundles,
  };

  __setGlobalInstance(instance);

  Promise.resolve().then(() => {
    eventBus.emit(EVENT_READY, instance);
    __flushReadyWaitQueue();

    // 全局共享的语言包
    if (typeof window !== 'undefined' && window.__I18N_BUNDLES__) {
      bundleRegister.registerBundles(window.__I18N_BUNDLES__);
    }
  });

  return instance;
}
