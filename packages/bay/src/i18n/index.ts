import { registerBundles } from '@wakeadmin/i18n';

registerBundles({
  zh: () => import('./zh.tr'),
  'zh-Hant': () => import('./zh-Hant.tr'),
  tj: () => import('./th.tr'),
  en: () => import('./en.tr'),
});

// 外部语言包
if (window.__MAPP_I18N__) {
  registerBundles(window.__MAPP_I18N__);
}
