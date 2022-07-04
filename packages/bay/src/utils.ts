import { ElMessage } from 'element-plus';
import { debounce } from '@wakeadmin/utils';
import { getAsset } from './services';

export const gotoLogin = debounce(
  () => {
    ElMessage.error('会话失效，请重新登录');
    window.setTimeout(() => {
      const LOGIN_URL = getAsset('URL_LOGIN', '/login.html');
      window.location.assign(`${LOGIN_URL}?url=${window.encodeURIComponent(window.location.href)}`);
    }, 1000);
  },
  1000,
  { leading: true }
);
