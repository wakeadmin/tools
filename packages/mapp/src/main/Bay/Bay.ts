import { createApp, App } from 'vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { EventEmitter, trimQueryAndHash } from '@wakeadmin/utils';
import { registerMicroApps, start, RegistrableApp, prefetchApps } from 'qiankun';

import { BayHooks, BayOptions, IBay, Parameter, INetworkInterceptorRegister, MicroApp } from '../../types';

import { NoopPage } from '../components';
import { BayProviderContext, DEFAULT_ROOT } from '../constants';
import { UniverseHistory } from '../UniverseHistory';
import { AJAXInterceptor, FetchInterceptor } from '../NetworkInterceptor';

import { groupAppsByIndependent, normalizeOptions } from './options';
import { createRoutes, generateLandingUrl, Navigator } from './route';
import { AppContext } from './AppContext';
import { normalizeUrl } from './utils';
import { MicroAppNormalized } from './types';
import { flushMountQueue } from './mount-delay';

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

  baseUrl: string;

  /**
   * 所有应用
   */
  apps: MicroAppNormalized[];

  independentApps: MicroAppNormalized[];

  nonIndependentApps: MicroAppNormalized[];

  get location() {
    return this.history.location;
  }

  private history: UniverseHistory;

  private networkInterceptors: INetworkInterceptorRegister[] = [];
  private ajaxInterceptor?: AJAXInterceptor;
  private fetchInterceptor?: FetchInterceptor;

  private navigator: Navigator;

  private appContext: AppContext;

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

    if (this.options.networkInterceptors?.length) {
      this.registerNetworkInterceptor(...this.options.networkInterceptors);
    }
    this.navigator = new Navigator(this);
    this.appContext = new AppContext(this);

    /**
     * 应用初始化
     */
    this.app = createApp(this.options.rootComponent ?? NoopPage);
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
    start({
      // 关闭自动fetch，由开发者手动指定
      prefetch: false,
    });

    this.stared = true;
  }

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

    return this.apps.find(i => i.activeRule === normalized) ?? null;
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
    const routes = createRoutes(this.baseUrl, this.apps);

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
    const apps = this.apps;

    this.triggerHooks('beforeAppsRegister', apps);

    registerMicroApps(apps as RegistrableApp<any>[], this.appContext);
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
}
