import { EventEmitter } from '@wakeadmin/utils';

export interface LocaleDetector {
  locale: string;
}

export type LocaleMapper = Record<string, string> | ((source: string) => string);

export type I18nBundle = Record<string, any> | (() => Promise<{ default: Record<string, any> }>);

export interface ExtendedI18nOptions {
  /**
   * 当前语言检测
   */
  detect?: LocaleDetector;

  /**
   * locale 标识符映射
   */
  mapper?: LocaleMapper;
}

declare global {
  /**
   * 供子模块详细定义类型
   */
  interface I18nSharedTypeParams {
    // VueI18nInstance: vue i18n 实例类型
    // FallbackLocale
    // VueApp 应用类型
  }
}

// @ts-expect-error
type ExtraParams<T, D = unknown> = I18nSharedTypeParams[T] extends unknown ? D : I18nSharedTypeParams[T];

export type FallbackLocale = ExtraParams<'FallbackLocale', string>;
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

  instance: VueI18nInstance;
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
  registerBundles(bundles: { [locale: string]: I18nBundle }): Promise<void>;
}
