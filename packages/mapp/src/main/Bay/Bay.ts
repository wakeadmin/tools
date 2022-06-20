import { createApp, App } from 'vue';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { EventEmitter } from '@wakeadmin/utils';
import { registerMicroApps, start, RegistrableApp } from 'qiankun';

import {
  BayHooks,
  BayOptions,
  ErrorPageProps,
  IBay,
  Parameter,
  RouteLocation,
  RouteLocationOptions,
  INetworkInterceptorRegister,
} from '../../types';

import { NoopPage } from '../components';
import { BayProviderContext, DEFAULT_ROOT } from '../constants';
import { UniverseHistory } from '../UniverseHistory';
import { AJAXInterceptor, FetchInterceptor } from '../NetworkInterceptor';

import { normalizeOptions } from './options';
import { createRoutes, getErrorRoute } from './route';

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
    this.options = normalizeOptions(options);

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
    this.router.push(getErrorRoute(data));
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

  private createRouter() {
    const routes = createRoutes(this.baseUrl, this.apps);

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
}
