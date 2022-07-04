import { registerBundles } from '@wakeadmin/i18n';

registerBundles({
  zh: () => import('./zh.tr'),
  'zh-Hant': () => import('./zh-Hant.tr'),
  tj: () => import('./th.tr'),
  en: () => import('./en.tr'),
});
