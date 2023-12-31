import VueI18n, { FallbackLocale } from 'vue-i18n';

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
  Cache,
  I18nBundle,
} from '@wakeadmin/i18n-shared';
import { merge } from '@wakeadmin/utils';
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

  let { detect, mapper, fallbackLocale, dateTimeFormats, numberFormats, locale, messages, localCache, ...other } =
    options ?? {};
  let ready = false;
  let bundleRegister: BundleRegister;

  const localeMapper = normalizeMapper(mapper ?? DEFAULT_MAPPER);
  const detector = detect ?? new LocaleDetect();

  // 语言丢失处理器，如果语言包处于加载状态，则返回空字符串，避免出现闪烁
  const missingHandler = () => {
    if (!ready || bundleRegister.hasPendingBundle()) {
      return '  ';
    }

    return undefined;
  };

  fallbackLocale ??= DEFAULT_LOCALE;
  dateTimeFormats = { ...DEFAULT_DATETIME_FORMATS, ...dateTimeFormats };
  numberFormats = { ...DEFAULT_NUMBER_FORMATS, ...numberFormats };
  locale = localeMapper(locale ?? detector.locale);

  const i18n = new VueI18n({
    locale,
    fallbackLocale,
    dateTimeFormats,
    numberFormats,
    missing: missingHandler,
    messages,
    ...other,
  });

  // 扩展方法

  let SET_LOCALE_CONTEXT = false;
  const vueI18nInstance = i18n as I18nInstance['i18n'];
  const eventBus = createEventBus();
  const getLocale = () => {
    return vueI18nInstance.locale;
  };

  const getFallbackLocaleChain = (loc?: string, fallback?: FallbackLocale) => {
    loc ??= getLocale();
    fallback ??= vueI18nInstance.fallbackLocale;

    // WARN: 这里访问了 vue-i18n 的内部细节
    // @ts-expect-error
    return vueI18nInstance._getLocaleChain(loc, fallback);
  };

  // 本地缓存
  let cache: Cache | undefined;

  if (localCache) {
    cache = new Cache(typeof localCache === 'string' ? localCache : undefined);
  }

  bundleRegister = new BundleRegister(
    (loc, bundle) => {
      const initialMessages = messages?.[loc];
      let cloneBundle = bundle;

      // 拷贝
      if (initialMessages) {
        cloneBundle = merge({}, initialMessages, cloneBundle);
      }

      vueI18nInstance.setLocaleMessage(loc, cloneBundle);

      // 缓存设置
      cache?.set(loc, cloneBundle);
    },
    getFallbackLocaleChain,
    () => {
      eventBus.emit(EVENT_MESSAGE_CHANGE);
    }
  );

  if (cache) {
    // 缓存获取
    bundleRegister.registerBundles(
      cache.keys.reduce<Record<string, I18nBundle>>((prev, cur) => {
        prev[cur] = () => Promise.resolve(cache?.get(cur));

        return prev;
      }, {})
    );
  }

  const setLocale = (nextLocale: string) => {
    try {
      SET_LOCALE_CONTEXT = true;

      // 标识符映射
      nextLocale = localeMapper(nextLocale);
      // 写入缓存
      detector.locale = nextLocale;

      vueI18nInstance.locale = nextLocale;

      eventBus.emit(EVENT_LOCALE_CHANGE, nextLocale);
      bundleRegister.schedulerMerge();

      return nextLocale;
    } finally {
      SET_LOCALE_CONTEXT = false;
    }
  };

  // patch set locale, 避免外部直接修改
  const localeDesc =
    Object.getOwnPropertyDescriptor(vueI18nInstance, 'locale') ??
    Object.getOwnPropertyDescriptor(Object.getPrototypeOf(vueI18nInstance), 'locale');
  if (localeDesc != null) {
    // eslint-disable-next-line accessor-pairs
    Object.defineProperty(vueI18nInstance, 'locale', {
      ...localeDesc,
      set(value) {
        if (!SET_LOCALE_CONTEXT) {
          throw new Error(`[i18n] 禁止直接设置 .locale 来设置当前语言， 必须使用 setLocale()`);
        }
        localeDesc.set?.call(this, value);
      },
    });
  }

  const instance = {
    install: () => {
      throw new Error(`在 vue2 环境不支持，请使用下列方法安装：

import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const {i18n} = createI18n({...})

new Vue({i18n})

`);
    },
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
  __flushReadyWaitQueue();

  // 全局共享的语言包
  if (typeof window !== 'undefined' && window.__I18N_BUNDLES__) {
    // 远程加载的语言包优先级高一点，这里设置为 5， 默认是 10
    bundleRegister.registerBundles(window.__I18N_BUNDLES__, 5);
  }

  Promise.resolve().then(() => {
    // 放在这里是给外部有机会可以监听到该事件，后面可以改成可重放事件
    eventBus.emit(EVENT_READY, instance);
    ready = true;
  });

  return instance;
}
