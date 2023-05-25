/* eslint-disable @typescript-eslint/no-empty-interface */
import { EventEmitter } from '@wakeadmin/utils';

/**
 * 语言检测/持久化
 */
export interface LocaleDetector {
  locale: string;
}

/**
 * 语言标识符映射
 */
export type LocaleMapper = Record<string, string> | ((source: string) => string);

export type I18nAsyncBundle = () => Promise<{ default?: Record<string, any>; [key: string]: any }>;

/**
 * 语言包类型
 * 支持 url、异步模块、语言包
 */
export type I18nBundle = Record<string, any> | I18nAsyncBundle | I18nAsyncBundle[] | string | string[];

/**
 * 扩展的初始化参数
 */
export interface ExtendedI18nOptions {
  /**
   * 当前语言检测
   */
  detect?: LocaleDetector;

  /**
   * locale 标识符映射
   */
  mapper?: LocaleMapper;

  /**
   * 是否本地缓存。默认关闭
   * 如果传入 string，将会作为本地缓存的 key
   */
  localCache?: boolean | string;
}

declare global {
  /**
   * 供子模块详细定义类型参数
   */
  interface I18nSharedTypeParams {
    // VueI18nInstance: vue i18n 实例类型
    // FallbackLocale
    // VueApp 应用类型
  }

  interface Window {
    // 支持从全局获取语言包
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __I18N_BUNDLES__: { [locale: string]: I18nBundle };
  }
}

// @ts-expect-error
type ExtraParams<T, V = I18nSharedTypeParams[T]> = V;

export type FallbackLocale = ExtraParams<'FallbackLocale'>;
export type VueApp = ExtraParams<'VueApp'>;
export type VueI18nInstance = ExtraParams<'VueI18nInstance'>;

/**
 * i18n 实例
 */
export interface I18nInstance {
  /**
   * vue 插件安装
   * @param app
   */
  install(app: VueApp): void;

  i18n: VueI18nInstance;
  /**
   * 可以用于监听 i18n 的相关事件
   */
  eventBus: EventEmitter;

  /**
   * 当前语言检查、持久化
   */
  detect: LocaleDetector;

  /**
   * 语言标识符映射
   */
  localeMapper: (locale: string) => string;

  /**
   * 设置语言
   */
  setLocale(locale: string): string;

  /**
   * 获取当前语言
   */
  getLocale(): string;

  /**
   * 获取回退语言链
   */
  getFallbackLocaleChain(locale?: string, fallback?: FallbackLocale): string[];

  /**
   * 注册语言包
   * @param bundles
   */
  registerBundles(bundles: { [locale: string]: I18nBundle }, layer?: number): Promise<void>;
}

/* ------------- 以下类型从 vue-i18n 中拷贝 ----------------- */

export interface DateTimeFormats {
  [locale: string]: DateTimeFormat;
}

export interface DateTimeFormat {
  [key: string]: DateTimeFormatOptions;
}

export type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;

export type DateTimeHumanReadable = 'long' | 'short' | 'narrow';

export interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  year?: DateTimeDigital;
  month?: DateTimeDigital | DateTimeHumanReadable;
  day?: DateTimeDigital;
  hour?: DateTimeDigital;
  minute?: DateTimeDigital;
  second?: DateTimeDigital;
  weekday?: DateTimeHumanReadable;
  era?: DateTimeHumanReadable;
  timeZoneName?: 'long' | 'short';
  localeMatcher?: LocaleMatcher;
  formatMatcher?: FormatMatcher;
}

export type LocaleMatcher = 'lookup' | 'best fit';

export type DateTimeDigital = 'numeric' | '2-digit';

export type FormatMatcher = 'basic' | 'best fit';

export interface NumberFormat {
  [key: string]: NumberFormatOptions;
}

export type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;

export interface NumberFormats {
  [locale: string]: NumberFormat;
}

export interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
  style?: 'decimal' | 'percent';
  currency?: string;
  currencyDisplay?: CurrencyDisplay;
  localeMatcher?: LocaleMatcher;
  formatMatcher?: FormatMatcher;
}

export type CurrencyDisplay = 'symbol' | 'code' | 'name';

export interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
  style: 'currency';
  currency: string;
  currencyDisplay?: CurrencyDisplay;
  localeMatcher?: LocaleMatcher;
  formatMatcher?: FormatMatcher;
}
