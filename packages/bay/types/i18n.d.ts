import { I18nBundle, getLocale, setLocale } from '@wakeadmin/i18n-shared';

export const registerBundles: (bundles: { [locale: string]: I18nBundle }) => Promise<void>;
export { getLocale, setLocale };
