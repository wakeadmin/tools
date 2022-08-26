import Framework, { configureDI, getInject } from '@wakeadmin/framework';
import { initial } from '@wakeapp/wakedata-backend';
import { createBay, IBay } from '@wakeadmin/mapp/main';
import { createI18n, I18nInstance } from '@wakeadmin/i18n';

import App from './App';
import * as services from './services';
import { BayModel } from './BayModel';
import { MicroAppModel } from './MicroAppModel';
import { BayRepo } from './BayRepo';
import { ErrorPage, LandingPage, Main, Debug } from './components';
import { AUTO_INDEX, UNAUTH } from './constants';
import { gotoLogin } from './utils';
import './i18n';

declare global {
  interface DIMapper {
    'DI.bay': IBay;

    /**
     * I18n 实例
     */
    'DI.bay.i18n': I18nInstance;

    /**
     * Vue I18n 实例
     */
    'DI.bay.i18n.instance': I18nInstance['i18n'];
    /**
     * 翻译函数
     */
    'DI.bay.i18n.t': I18nInstance['i18n']['t'];
  }
}

export function configureBay() {
  configureDI(({ registerSingletonClass }) => {
    registerSingletonClass('DI.bay.MicroAppModel', MicroAppModel);
  });

  const i18nInstance = createI18n();

  const apps = getInject('DI.bay.MicroAppModel').getMapps();

  const bay = createBay({
    rootComponent: App,
    apps,
    pages: {
      main: Main,
      error: ErrorPage,
      landing: LandingPage,
    },
    hooks: {
      async beforeRouterEnterMain(info) {
        if (!info.matched && info.to.path === '/' && AUTO_INDEX) {
          // 自动跳转到首页
          const bayModel = getInject('DI.bay.BayModel');

          // 这里被迫提取初始化
          bayModel.initialize();
          await bayModel.waitSetup();

          bayModel.openMain();

          return false;
        }
      },
    },
    routes: [
      {
        path: '/__debug__',
        name: 'debug',
        component: Debug,
      },
    ],
    networkInterceptors: [
      async (request, next) => {
        // 注入当前语言
        request.headers.set('Accept-Language', i18nInstance.getLocale());

        const response = await next();

        if (request.headers.get('X-Disable-Intercept')) {
          // 跳过拦截器处理
          return;
        }

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

  bay.app.use(Framework);
  bay.app.use(i18nInstance);

  configureDI(({ registerConstant, registerSingletonClass }) => {
    registerConstant('DI.bay', bay);
    registerConstant('DI.bay.i18n', i18nInstance);
    registerConstant('DI.bay.i18n.instance', i18nInstance.i18n);
    registerConstant('DI.bay.i18n.t', i18nInstance.i18n.t.bind(i18nInstance.i18n));

    registerSingletonClass('DI.bay.BayModel', BayModel);
    registerSingletonClass('DI.bay.BayRepo', BayRepo);
  });

  return bay;
}

export function configureBackend() {
  const BASE_URL = '/';

  initial({
    fetch: window.fetch.bind(window),
    baseURL: BASE_URL,
    defaultErrorMessage: '系统出差中',
  });
}

/**
 * 注入调试脚本
 */
export function injectDebugScripts() {
  const debugScript = getInject('DI.bay.MicroAppModel').debugScript;
  const scripts = debugScript
    .trim()
    .split(/\s*,\s*/)
    .filter(i => Boolean(i.trim()));

  if (scripts.length) {
    for (const src of scripts) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = src;
      script.defer = true;

      document.head.append(script);

      console.debug(`[bay] 正在注入调试脚本：${src}`);
    }
  }
}

export function createApp() {
  if (window.__MAPP_SERVICES__ != null) {
    throw new Error(`[bay] 基座重复加载，请检查子应用 entry 配置是否正确`);
  }

  // 暴露给下级子应用的服务
  window.__MAPP_SERVICES__ = services;

  const bay = configureBay();

  // 在 bay 初始化之后执行，否则无法拦截到请求
  configureBackend();
  injectDebugScripts();

  return bay;
}
