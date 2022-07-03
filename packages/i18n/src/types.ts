import { I18nOptions as NextI18nOptions, VueI18n, Composer, FallbackLocale } from 'vue-i18n';
import { EventEmitter } from '@wakeadmin/utils';
import { App } from 'vue';

export interface LocaleDetector {
  locale: string;
}

export type LocaleMapper = Record<string, string> | ((source: string) => string);

export type I18nBundle = Record<string, any> | (() => Promise<{ default: Record<string, any> }>);

export type I18nOptions = NextI18nOptions & {
  /**
   * 当前语言检测
   */
  detect?: LocaleDetector;

  /**
   * locale 标识符映射
   */
  mapper?: LocaleMapper;
};

export type VueI18nInstance = VueI18n<any, any, any> | Composer<any, any, any>;

export interface I18nInstance {
  instance: VueI18nInstance;
  /**
   * 可以用于监听 i18n 的相关事件
   */
  eventBus: EventEmitter;
  /**
   * vue 插件安装
   * @param app
   */
  install(app: App): void;

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
