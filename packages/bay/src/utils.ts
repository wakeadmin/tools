import { ElMessage } from 'element-plus';
import { debounce } from '@wakeadmin/utils';
import { getGlobalI18n } from '@wakeadmin/i18n';
import { Composer } from 'vue-i18n';

import { getAsset } from './services';

export const gotoLogin = debounce(
  () => {
    ElMessage.error('会话失效，请重新登录');
    window.setTimeout(() => {
      const LOGIN_URL = getAsset('URL_LOGIN', '/login.html');
      window.location.assign(`${LOGIN_URL}?url=${window.encodeURIComponent(window.location.href)}`);
    }, 700);
  },
  3000,
  { leading: true }
);

export function getMenuI18nKey(path: string) {
  return `menu.${path}$`;
}

export function useT() {
  const global = getGlobalI18n();
  // @ts-expect-error
  return global.__composer.t as Composer['t'];
}
