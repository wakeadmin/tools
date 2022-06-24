import { NoopObject } from '@wakeadmin/utils';
import pathUtils from 'path-browserify';
import { RouteRecordRaw, RouteLocationRaw, stringifyQuery } from 'vue-router';

import { ErrorPageProps, RouteLocationOptions, IBay } from '../../types';

import { ErrorPage, IndependentPage, LandingPage, MainPage } from '../components';
import { ERROR_PAGE, LANDING_PAGE } from '../constants';
import { groupAppsByIndependent } from './options';
import { MicroAppNormalized } from './types';

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
export function createRoutes(baseUrl: string, apps: MicroAppNormalized[]) {
  /**
   * 内置路由
   */
  const builtinRoutes: RouteRecordRaw[] = [];

  // 错误页面
  builtinRoutes.push({
    name: 'error',
    path: ERROR_PAGE,
    component: ErrorPage,
    meta: {
      builtin: true,
    },
  });

  // 落地页
  builtinRoutes.push({
    name: 'landing',
    path: LANDING_PAGE,
    component: LandingPage,
    meta: {
      builtin: true,
    },
  });

  /**
   * 独立页面路由
   */
  const independentRoutes: RouteRecordRaw[] = [];
  const { independentApps, nonIndependentApps } = groupAppsByIndependent(apps);

  for (const app of independentApps) {
    independentRoutes.push({
      name: app.name,
      path: app.activeRuleRaw,
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
      const found = nonIndependentApps.some(a => to.path.startsWith(a.activeRuleRaw));
      if (!found) {
        console.warn(`[mapp] ${to.path} 未匹配到任何子应用，将重定向到 404 页面`);
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

/**
 * 路由导航相关工具集
 */
export class Navigator {
  private bay: IBay;
  constructor(bay: IBay) {
    this.bay = bay;
  }

  /**
   * 打开错误页面
   * @param data
   */
  openError: IBay['openError'] = data => {
    this.bay.router.push(getErrorRoute(data));
  };

  openApp: IBay['openApp'] = option => {
    const { name, route } = option;

    const app = this.bay.getApp(name);

    if (app == null) {
      throw new Error(`[mapp] openApp 未找到应用：${name}`);
    }

    const { path = '/', query = NoopObject, mode = 'hash', redirect } = route;
    const mainPath = app.activeRule;
    const queryString = query && stringifyQuery(query);
    const appPath = `${path}${queryString ? `?${queryString}` : ''}`;

    const fullPath = mode === 'history' ? pathUtils.join(mainPath, appPath) : `${mainPath}#${appPath}`;

    this.navigate(fullPath, redirect);
  };

  openUrl: IBay['openUrl'] = url => {
    if (typeof url === 'string') {
      this.navigate(url);
    } else {
      const { path, query = NoopObject, hashPath, hashQuery, redirect } = url;
      const queryString = query && stringifyQuery(query);
      let fullPath = `${path}${queryString ? `?${queryString}` : ''}`;

      // 设置 hash
      if (hashPath || hashQuery) {
        const hashQueryString = hashQuery && stringifyQuery(hashQuery);
        fullPath += `#${hashPath ?? '/'}${hashQueryString ? `?${hashQueryString}` : ''}`;
      }

      this.navigate(fullPath, redirect);
    }
  };

  openMain: IBay['openMain'] = options => {
    const redirect = options?.redirect;

    const firstMainApp = this.bay.nonIndependentApps[0];
    if (firstMainApp == null) {
      throw new Error(`[mapp] 未配置子应用, 无法跳转`);
    }

    this.navigate(firstMainApp.activeRule, redirect);
  };

  private navigate(target: string, redirect: boolean = false) {
    window.history[redirect ? 'replaceState' : 'pushState'](null, '', target);
  }
}
