import Framework, { configureDI } from '@wakeadmin/framework';
import { initial } from '@wakeapp/wakedata-backend';
import { createBay, IBay } from '@wakeadmin/mapp/main';
import { ElMessage } from 'element-plus';
import debounce from 'lodash/debounce';

import * as services from './services';
import { BayModel } from './BayModel';
import { BayRepo } from './BayRepo';
import { ErrorPage, LandingPage, Main } from './components';
import { UNAUTH } from './constants';
import App from './App';
import { getAsset } from './services';

declare global {
  interface DIMapper {
    'DI.bay': IBay;
  }
}

const gotoLogin = debounce(
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

export function configureBay() {
  const bay = createBay({
    rootComponent: App,
    apps: [
      {
        name: 'playgroundVue3',
        activeRule: '/wkb.html',
        entry: '//localhost:63285',
      },
    ],
    pages: {
      main: Main,
      error: ErrorPage,
      landing: LandingPage,
    },
    hooks: {},
    routes: [],
    networkInterceptors: [
      async (_, next) => {
        const response = await next();
        // 判断是否会话过期
        const json = await response.json();
        if (json) {
          const errorCode = json.errorCode ?? json.code;

          // 会话失效，跳转到登录页面
          if (errorCode === UNAUTH) {
            gotoLogin();
          }
        }
      },
    ],
  });

  configureDI(({ registerConstant, registerSingletonClass }) => {
    registerConstant('DI.bay', bay);
    registerSingletonClass('DI.bay.BayModel', BayModel);
    registerSingletonClass('DI.bay.BayRepo', BayRepo);
  });

  bay.app.use(Framework);

  return bay;
}

export function configureBackend() {
  const BASE_URL = '/';

  initial({
    fetch: window.fetch.bind(window),
    baseURL: BASE_URL,
    defaultErrorMessage: '系统出差中',
    /**
     * 多语言
     */
    // (request, next) => {
    //   request.headers['Accept-Language'] = i18n.language;
    //   return next();
    // },
  });
}

export function createApp() {
  // 暴露给下级子应用的服务
  window.__MAPP_SERVICES__ = services;

  const bay = configureBay();

  // 在 bay 初始化之后执行，否则无法拦截到请求
  configureBackend();

  return bay;
}
