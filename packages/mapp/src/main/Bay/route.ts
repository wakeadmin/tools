import { joinQuery } from '@wakeadmin/utils';
import { RouteRecordRaw, RouteLocationRaw, stringifyQuery, LocationQueryRaw } from 'vue-router';
import pathUtils from 'path-browserify';

import { ErrorPageProps, RouteLocationOptions, IBay, BayHooks } from '../../types';

import { ErrorPage, IndependentPage, LandingPage, MainPage } from '../components';
import { ERROR_PAGE, LANDING_PAGE } from '../constants';
import { groupAppsByIndependent } from './options';
import { MicroAppNormalized } from './types';

/**
 * 生成落地页链接
 * @param baseUrl
 * @param data
 * @param addHost
 * @returns
 */
export function generateLandingUrl(baseUrl: string, data: any, addHost: boolean = false) {
  let url = pathUtils.join(baseUrl, LANDING_PAGE);
  url = joinQuery(url, `s=${encodeURIComponent(btoa(JSON.stringify(data)))}`);
  if (addHost) {
    url = window.location.origin + url;
  }

  return url;
}

/**
 * 解析落地页参数
 */
export function parseLandingData(query: LocationQueryRaw) {
  const s = query?.s;
  if (s == null) {
    throw new Error(`[bay] 落地页参数丢失`);
  }

  return JSON.parse(atob(decodeURIComponent(s as string)));
}

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
export function createRoutes(
  baseUrl: string,
  apps: MicroAppNormalized[],
  onBeforeEnterMain?: BayHooks['beforeRouterEnterMain']
) {
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
    if (Array.isArray(app.activeRuleRaw)) {
      // 不支持命名路由
      app.activeRuleRaw.forEach(p => {
        independentRoutes.push({
          name: `${app.name}-${p}`,
          path: p,
          component: IndependentPage,
          meta: {
            independent: true,
            app,
          },
        });
      });
    } else {
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
    beforeEnter: async (to, from) => {
      // 验证是否为 nonIndependentApps 的子路由
      // 如果不是，将重定向到 404 页面
      const found = nonIndependentApps.find(a => {
        return Array.isArray(a.activeRuleRaw)
          ? a.activeRuleRaw.some(subPath => to.path.startsWith(subPath))
          : to.path.startsWith(a.activeRuleRaw);
      });
      const context = {
        to,
        from,
        matched: !!found,
        matchedApp: found,
        apps: nonIndependentApps,
      };

      const rtn = await onBeforeEnterMain?.(context);

      // 应用未找到, 默认行为是跳转到 404， 应用可以返回 false 或者 location 取消默认行为
      if (!found && rtn === undefined) {
        console.warn(`[mapp] ${to.path} 未匹配到任何子应用，将重定向到 404 页面`);
        return getErrorRoute({
          type: 'http',
          code: '404',
        });
      }

      return rtn;
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
    const target = pathUtils.join(this.bay.baseUrl, ERROR_PAGE);
    const { redirect, ...query } = data;

    // 外部调用时，避免携带 state，否则可能会导致子应用误解析
    this.openUrl({ path: target, query: query as any, redirect });
  };

  openApp: IBay['openApp'] = option => {
    const { name, ...route } = option;

    const app = this.bay.getApp(name);

    if (app == null) {
      throw new Error(`[mapp] openApp 未找到应用：${name}`);
    }

    if (Array.isArray(app.activeRule)) {
      if (app.activeRule.length > 1) {
        console.warn(`[mapp] openApp(${name}) 有歧义, activeRule 为数组，将选择一个项`, app);
      }
      this.openUrl({ ...route, path: app.activeRule[0] });
    } else {
      this.openUrl({ ...route, path: app.activeRule });
    }
  };

  openUrl: IBay['openUrl'] = url => {
    if (typeof url === 'string') {
      this.navigate(url);
    } else {
      let { path = '/', query, hashPath, hashQuery, redirect } = url;
      const queryString = query && stringifyQuery(query);
      const hashIdx = path.indexOf('#');

      if (hashIdx !== -1) {
        // 分离 hash
        const hashPart = path.slice(hashIdx + 1);
        path = path.slice(0, hashIdx);
        hashPath ??= hashPart;
      }

      let fullPath = queryString ? joinQuery(path, queryString) : path;

      // 设置 hash
      if (hashPath || hashQuery) {
        const hashQueryString = hashQuery && stringifyQuery(hashQuery);
        hashPath ??= '/';

        fullPath += `#${hashQueryString ? joinQuery(hashPath, hashQueryString) : hashPath}`;
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

    this.openApp({ name: firstMainApp.name, redirect });
  };

  private navigate(target: string, redirect: boolean = false) {
    window.history[redirect ? 'replaceState' : 'pushState'](null, '', target);
  }
}
