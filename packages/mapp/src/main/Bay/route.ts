import path from 'path-browserify';
import type { RouteRecordRaw, RouteLocationRaw } from 'vue-router';

import { MicroApp, ErrorPageProps, RouteLocationOptions } from '../../types';

import { ErrorPage, IndependentPage, LandingPage, MainPage } from '../components';
import { ERROR_PAGE, LANDING_PAGE } from '../constants';

/**
 * 构造错误页面路由描述
 * @param data
 * @returns
 */
export function getErrorRoute(data: ErrorPageProps & RouteLocationOptions): RouteLocationRaw {
  const { redirect, ...query } = data;
  return {
    name: 'error',
    replace: data.redirect,
    query: query as any,
  };
}

/**
 * 创建路由配置
 * @param baseUrl
 * @param apps
 */
export function createRoutes(baseUrl: string, apps: MicroApp[]) {
  /**
   * 内置路由
   */
  const builtinRoutes: RouteRecordRaw[] = [];

  builtinRoutes.push({
    name: 'error',
    path: path.join(baseUrl, ERROR_PAGE),
    component: ErrorPage,
    meta: {
      builtin: true,
    },
  });

  builtinRoutes.push({
    name: 'landing',
    path: path.join(baseUrl, LANDING_PAGE),
    component: LandingPage,
    meta: {
      builtin: true,
    },
  });

  /**
   * 独立页面路由
   */
  const independentRoutes: RouteRecordRaw[] = [];
  const independentApps: MicroApp[] = [];
  const nonIndependentApps: MicroApp[] = [];

  for (const app of apps) {
    if (app.independent) {
      independentApps.push(app);
    } else {
      nonIndependentApps.push(app);
    }
  }

  for (const app of independentApps) {
    independentRoutes.push({
      name: app.name,
      path: app.activeRule,
      component: IndependentPage,
      meta: {
        independent: true,
        app,
      },
    });
  }

  /**
   * 主页面
   */
  const mainRoutes: RouteRecordRaw = {
    name: 'main',
    // 匹配所有路径，因此放在最后
    path: '/:main*',
    component: MainPage,
    meta: {
      main: true,
      apps: nonIndependentApps,
    },
    beforeEnter: to => {
      // 验证是否为 nonIndependentApps 的子路由
      // 如果不是，将重定向到 404 页面
      const found = nonIndependentApps.some(a => to.path.startsWith(a.activeRule));
      if (!found) {
        return getErrorRoute({
          type: 'http',
          code: '404',
        });
      }

      return undefined;
    },
  };

  const routes: RouteRecordRaw[] = [...builtinRoutes, ...independentRoutes, mainRoutes];

  return routes;
}
