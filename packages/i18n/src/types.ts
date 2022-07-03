import { ExtendedI18nOptions } from '@wakeadmin/i18n-shared';
import { I18nOptions as NextI18nOptions, VueI18n, Composer, FallbackLocale } from 'vue-i18n';
import { App } from 'vue';

export type I18nOptions = NextI18nOptions & ExtendedI18nOptions;

declare global {
  interface I18nSharedTypeParams {
    VueI18nInstance: VueI18n<any, any, any> | Composer<any, any, any>;
    FallbackLocale: FallbackLocale;
    VueApp: App;
  }
}

export { I18nInstance } from '@wakeadmin/i18n-shared';
