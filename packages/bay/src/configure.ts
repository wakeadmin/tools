import Framework, { configureDI } from '@wakeadmin/framework';
import { initial, compose } from '@wakeapp/wakedata-backend';
import { createBay, IBay } from '@wakeadmin/mapp/main';

import { BayModel } from './BayModel';
import { BayRepo } from './BayRepo';
import { Main } from './components';
import App from './App';

declare global {
  interface DIMapper {
    'DI.bay': IBay;
  }
}

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
    },
    hooks: {},
    routes: [],
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
    // 拦截器
    interceptor: compose(),
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
  configureBackend();
  const bay = configureBay();

  return bay;
}
