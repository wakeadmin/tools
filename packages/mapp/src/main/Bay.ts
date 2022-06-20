import { createApp, App } from 'vue';
import { createRouter, createWebHistory, Router, RouteRecordRaw, RouteLocationRaw } from 'vue-router';
import { removeTrailingSlash, addHeadingSlash, EventEmitter } from '@wakeadmin/utils';
import path from 'path-browserify';
import { registerMicroApps, start, RegistrableApp } from 'qiankun';

import {
  BayHooks,
  BayOptions,
  ErrorPageProps,
  MicroApp,
  IBay,
  Parameter,
  RouteLocation,
  RouteLocationOptions,
  INetworkInterceptorRegister,
} from '../types';

import { ErrorPage, IndependentPage, LandingPage, MainPage, NoopPage } from './components';
import { BayProviderContext, DEFAULT_ROOT, ERROR_PAGE, LANDING_PAGE } from './constants';
import { UniverseHistory } from './UniverseHistory';
import { AJAXInterceptor, FetchInterceptor } from './NetworkInterceptor';

export class Bay implements IBay {
  app: App;

  router: Router;

  rawOptions: BayOptions;

  options: BayOptions;

  stared: boolean = false;

  /**
   * 事件总线，用于通信
   */
  eventBus = new EventEmitter();

  get baseUrl(): string {
    return this.options.baseUrl ?? '/';
  }

  get apps() {
    return this.options.apps;
  }

  get location() {
    return this.history.location;
  }

  private history: UniverseHistory;

  private networkInterceptors: INetworkInterceptorRegister[] = [];
  private ajaxInterceptor?: AJAXInterceptor;
  private fetchInterceptor?: FetchInterceptor;

  constructor(options: BayOptions) {
    this.rawOptions = options;
    this.options = this.normalizedOptions(options);

    if (this.options.networkInterceptors?.length) {
      this.registerNetworkInterceptor(...this.options.networkInterceptors);
    }

    this.app = createApp(NoopPage);
    this.router = this.createRouter();
    this.history = new UniverseHistory(l => {
      this.triggerHooks('locationChange', l);
    });

    this.app.use(this.router);
    this.app.provide(BayProviderContext, this);

    this.registerApps();
  }

  mount(root?: string | HTMLElement): void {
    if (this.stared && process.env.NODE_ENV !== 'production') {
      throw new Error(`[mapp] 不能重复挂载`);
    }

    this.app.mount(root ?? DEFAULT_ROOT);

    // 启动 qiankun
    start();

    this.stared = true;
  }

  openError(data: ErrorPageProps & RouteLocationOptions): void {
    this.router.push(this.getErrorRoute(data));
  }

  /**
   * TODO: 跨应用跳转
   * @param name
   * @param route
   */
  openApp(name: string, route: RouteLocation): void {}

  registerNetworkInterceptor(...interceptors: INetworkInterceptorRegister[]): void {
    const shouldAttach = !this.networkInterceptors.length && interceptors.length;

    if (shouldAttach) {
      this.ajaxInterceptor = new AJAXInterceptor();
      this.fetchInterceptor = new FetchInterceptor();

      this.ajaxInterceptor.attach();
      this.fetchInterceptor.attach();
    }

    this.networkInterceptors.push(...interceptors);
    this.ajaxInterceptor?.register(...interceptors);
    this.fetchInterceptor?.register(...interceptors);
  }

  private normalizedOptions(options: BayOptions) {
    let { baseUrl: base = process.env.MAPP_BASE_URL ?? '/', apps, ...others } = options;

    // 所有 activeRule 都基于基座 base
    const tryAddBaseToActiveRule = (activeRule: string) => {
      if (activeRule.startsWith(base)) {
        return activeRule;
      }

      return `${removeTrailingSlash(base)}${addHeadingSlash(activeRule)}`;
    };

    // 如果是相对路径，都相对于基座 base
    const tryAddBaseToEntry = (entry: string) => {
      if (entry.startsWith('http') || entry.startsWith('//') || entry.startsWith('/')) {
        return entry;
      }

      return path.join(base, entry);
    };

    const appNameSet = new Set<string>();

    // 将 base 追加到 app 上
    apps = apps.map(app => {
      const { activeRule, entry, ...other } = app;

      if (appNameSet.has(app.name)) {
        throw new Error(`[mapp] 微应用名称重复: ${app.name}`);
      }
      appNameSet.add(app.name);

      return {
        activeRule: tryAddBaseToActiveRule(activeRule),
        entry: tryAddBaseToEntry(entry),
        container: app.container ?? DEFAULT_ROOT,
        ...other,
      };
    });

    return {
      base,
      apps,
      ...others,
    };
  }

  private createRouter() {
    const base = this.baseUrl;

    /**
     * 内置路由
     */
    const builtinRoutes: RouteRecordRaw[] = [];

    builtinRoutes.push({
      name: 'error',
      path: path.join(base, ERROR_PAGE),
      component: ErrorPage,
      meta: {
        builtin: true,
      },
    });

    builtinRoutes.push({
      name: 'landing',
      path: path.join(base, LANDING_PAGE),
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

    for (const app of this.apps) {
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
          return this.getErrorRoute({
            type: 'http',
            code: '404',
          });
        }

        return undefined;
      },
    };

    const routes: RouteRecordRaw[] = [...builtinRoutes, ...independentRoutes, mainRoutes];

    this.triggerHooks('beforeRouterCreate', routes);

    const router = createRouter({
      history: createWebHistory(),
      routes,
    });

    return router;
  }

  private registerApps() {
    const apps = this.apps;

    this.triggerHooks('beforeAppsRegister', apps);

    registerMicroApps(apps as RegistrableApp<any>[]);
  }

  /**
   * 触发钩子
   * @param name
   * @param options
   */
  private triggerHooks<Name extends keyof BayHooks, Option = Parameter<BayHooks[Name]>>(name: Name, option: Option) {
    // @ts-expect-error
    this.options.hooks?.[name]?.call(null, option as any);
  }

  private getErrorRoute(data: ErrorPageProps & RouteLocationOptions): RouteLocationRaw {
    const { redirect, ...query } = data;
    return {
      name: 'error',
      replace: data.redirect,
      query: query as any,
    };
  }
}
