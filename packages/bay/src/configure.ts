import Framework, { registerConstant } from '@wakeadmin/framework';
import { initial, compose } from '@wakeapp/wakedata-backend';
import { createBay, IBay } from '@wakeadmin/mapp/main';

declare global {
  interface DIMapper {
    'DI.bay': IBay;
  }
}

export function configureBay() {
  const bay = createBay({
    apps: [],
    hooks: {},
    routes: [
      // TODO: 移除，自定义路由
      {
        path: '/home',
        name: 'home',
        component: () => import('./views/HomeView.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('./views/AboutView.vue'),
      },
    ],
  });

  registerConstant('DI.bay', bay);

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
