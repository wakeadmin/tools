import { EventEmitter, trimQueryAndHash } from '@wakeadmin/utils';
import { RegistrableApp, addGlobalUncaughtErrorHandler, prefetchApps, registerMicroApps, start } from 'qiankun';
import { App, createApp } from 'vue';
import { Router, createRouter, createWebHistory } from 'vue-router';

import {
  BayHooks,
  BayOptions,
  IBay,
  INetworkInterceptorRegister,
  MicroApp,
  MicroAppStatus,
  Parameter,
} from '../../types';

import { AJAXInterceptor, FetchInterceptor } from '../NetworkInterceptor';
import { UniverseHistory } from '../UniverseHistory';
import { NoopPage } from '../components';
import { BayProviderContext, DEFAULT_ROOT } from '../constants';

import { AppContext } from './AppContext';
import { ParcelContext } from './ParcelContext';
import { AssetFilter } from './exclude-asset';
import { flushMountQueue } from './mount-delay';
import { groupAppsByIndependent, normalizeModernApps, normalizeOptions } from './options';
import { Navigator, createRoutes, generateLandingUrl } from './route';
import { MicroAppNormalized } from './types';
import { normalizeUrl } from './utils';

export class Bay implements IBay {
  app: App;

  router: Router;

  rawOptions: BayOptions;

  options: BayOptions;

  mounted: boolean = false;

  started: boolean = false;

  /**
   * 事件总线，用于通信
   */
  eventBus = new EventEmitter();

  baseUrl: string;

  /**
   * 所有应用
   */
  apps: MicroAppNormalized[];

  independentApps: MicroAppNormalized[];

  nonIndependentApps: MicroAppNormalized[];

  private parcelContext: ParcelContext;

  get location() {
    return this.history.location;
  }

  /**
   * 当前激活的微应用
   */
  get currentMicroApp(): MicroApp | undefined {
    return this.appContext.currentApp.value;
  }

  /**
   * 当前微应用的状态
   */
  get currentMicroAppStatus(): MicroAppStatus {
    return this.appContext.currentAppStatus.value;
  }

  /**
   * 当前微应用的状态
   */
  get currentMicroAppError(): Error | undefined {
    return this.appContext.currentAppError.value;
  }

  get isCurrentMicroAppLoading(): boolean {
    return this.appContext.isCurrentAppLoading.value;
  }

  get isCurrentMicroAppError(): boolean {
    return this.appContext.isCurrentAppError.value;
  }

  private history: UniverseHistory;

  private networkInterceptors: INetworkInterceptorRegister[] = [];
  private ajaxInterceptor?: AJAXInterceptor;
  private fetchInterceptor?: FetchInterceptor;

  private navigator: Navigator;

  private appContext: AppContext;

  private assetFilter = new AssetFilter();

  constructor(options: BayOptions) {
    /**
     * 参数初始化
     */
    this.rawOptions = options;
    this.options = normalizeOptions(options);

    this.baseUrl = this.options.baseUrl ?? '/';
    this.apps = this.options.apps as MicroAppNormalized[];
    const { independentApps, nonIndependentApps } = groupAppsByIndependent(this.apps);
    this.independentApps = independentApps;
    this.nonIndependentApps = nonIndependentApps;

    const modernApps = this.apps.filter(app => app.modern).map(app => normalizeModernApps(app));

    if (this.options.networkInterceptors?.length) {
      this.registerNetworkInterceptor(...this.options.networkInterceptors);
    }

    this.navigator = new Navigator(this);
    this.appContext = new AppContext(this);
    this.parcelContext = new ParcelContext(modernApps, this.appContext);

    if (options.excludeAssetFilter) {
      this.assetFilter.addFiler(options.excludeAssetFilter);
    }

    /**
     * 应用初始化
     */
    this.app = createApp(this.options.rootComponent ?? NoopPage);
    this.router = this.createRouter();
    this.history = new UniverseHistory(l => {
      this.triggerHooks('locationChange', l);
      this.parcelContext.mountOrUnmountAppIfNeed();
    });

    this.app.use(this.router);
    this.app.provide(BayProviderContext, this);

    this.registerApps();
    addGlobalUncaughtErrorHandler((event, source, lineno, colno, error) => {
      this.triggerHooks('globalUncaughtError', { event, source, lineno, colno, error });
    });
  }

  /**
   * 挂载基座
   * @param root
   */
  mount(root?: string | HTMLElement): void {
    if (this.mounted) {
      throw new Error(`[mapp] 不能重复挂载`);
    }

    this.app.mount(root ?? DEFAULT_ROOT);

    this.mounted = true;
  }

  /**
   * 启动微前端子应用
   */
  start() {
    if (this.started) {
      throw new Error(`[mapp] 不能重复启动`);
    }

    // 启动 qiankun
    start({
      // 关闭自动fetch，由开发者手动指定
      prefetch: false,
      excludeAssetFilter: src => {
        return this.assetFilter.filter(src);
      },
    });

    this.parcelContext.mountOrUnmountAppIfNeed();

    this.started = true;
  }

  /**
   * 添加资源过滤器, 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理。
   * @param filter
   */
  addExcludeAssetFilter: IBay['addExcludeAssetFilter'] = filter => {
    this.assetFilter.addFiler(filter);
  };

  prefetch(apps: MicroApp[]): void {
    prefetchApps(apps);
  }

  openError: IBay['openError'] = (...args) => {
    this.navigator.openError(...args);
  };
  openApp: IBay['openApp'] = (...args) => {
    this.navigator.openApp(...args);
  };
  openUrl: IBay['openUrl'] = (...args) => {
    this.navigator.openUrl(...args);
  };
  openMain: IBay['openMain'] = (...args) => {
    this.navigator.openMain(...args);
  };

  generateLandingUrl: IBay['generateLandingUrl'] = (data, addHost) => {
    return generateLandingUrl(this.baseUrl, data, addHost);
  };

  /**
   * 获取应用配置
   * @param name
   * @returns
   */
  getApp(name: string) {
    return this.apps.find(i => i.name === name) ?? null;
  }

  getAppByRoute(router: string): MicroApp | null {
    const normalized = normalizeUrl(trimQueryAndHash(router));

    // 最长路径匹配
    let matchedActiveRule: string = '';
    let matchedApp: MicroApp | null = null;

    for (const app of this.apps) {
      const activeRules = Array.isArray(app.activeRule) ? app.activeRule : [app.activeRule];

      for (const rule of activeRules) {
        // 精确匹配
        if (normalized === rule) {
          return app;
        }

        if (normalized.startsWith(rule)) {
          // 最长路径匹配
          if (rule.length > matchedActiveRule.length) {
            matchedActiveRule = rule;
            matchedApp = app;
          }
        }
      }
    }

    return matchedApp;
  }

  getAppByAlias(alias: string): MicroApp[] {
    return this.apps.filter(i => i.alias === alias);
  }

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

  private createRouter() {
    const routes = createRoutes(this.baseUrl, this.apps, async context => {
      return this.triggerHooks('beforeRouterEnterMain', context);
    });

    // 自定义路由
    // 追加路由前缀
    if (this.options.routes) {
      routes.unshift(...this.options.routes);
    }

    this.triggerHooks('beforeRouterCreate', routes);

    const router = createRouter({
      history: createWebHistory(this.baseUrl),
      routes,
    });

    router.afterEach(() => {
      flushMountQueue();
    });

    return router;
  }

  private registerApps() {
    const apps = this.apps.filter(app => !app.modern);

    this.triggerHooks('beforeAppsRegister', apps);

    registerMicroApps(apps as RegistrableApp<any>[], this.appContext);
  }

  /**
   * 触发钩子
   * @param name
   * @param option
   */
  private triggerHooks<Name extends keyof BayHooks, Option = Parameter<BayHooks[Name]>>(name: Name, option: Option) {
    // @ts-expect-error
    return this.options.hooks?.[name]?.call(null, option as any);
  }
}
