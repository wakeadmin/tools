import { LocaleDetector } from './types';

export const DEFAULT_LOCALE_PERSIST_KEY = '__locale__';

/**
 * 当前语言检查
 */
export class LocaleDetect implements LocaleDetector {
  get locale() {
    return this.currentLocale;
  }

  set locale(locale: string) {
    this.currentLocale = locale;
    this.save(locale);
  }

  private currentLocale: string;

  constructor() {
    this.currentLocale = this.detect();
  }

  private detect() {
    return window.localStorage.getItem(DEFAULT_LOCALE_PERSIST_KEY) ?? navigator.language;
  }

  private save(locale: string) {
    window.localStorage.setItem(DEFAULT_LOCALE_PERSIST_KEY, locale);
  }
}
