import { ExtendedI18nOptions } from '@wakeadmin/i18n-shared';
import VueI18n, { I18nOptions as VueI18nOptions, FallbackLocale } from 'vue-i18n';
import Vue from 'vue';

export type I18nOptions = VueI18nOptions & ExtendedI18nOptions;

declare global {
  interface I18nSharedTypeParams {
    VueI18nInstance: VueI18n;
    FallbackLocale: FallbackLocale;
    VueApp: typeof Vue;
  }
}

export { I18nInstance } from '@wakeadmin/i18n-shared';
