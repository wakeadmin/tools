import type { DefineComponent, App, Component, FunctionalComponent } from 'vue';
import type { RouteRecordRaw, RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';
import type { EventEmitter } from '@wakeadmin/utils';
import type { MicroApp, ErrorPageProps, LandingPageProps, IBayBase } from '@wakeadmin/mapp-shared';

import { UniverseLocation } from './route';
import { INetworkInterceptorRegister } from './network-interceptor';

export { MicroApp, ErrorPageProps, LandingPageProps };

export type PageComponent<T = any> =
  | DefineComponent<T, any, any, any, any, any, any, any, any>
  | FunctionalComponent<T>;

/**
 * 微应用状态
 * https://zh-hans.single-spa.js.org/docs/api#getappstatus
 */
export type MicroAppStatus =
  | 'NOT_LOADED'
  | 'LOADING_SOURCE_CODE'
  | 'NOT_BOOTSTRAPPED'
  | 'BOOTSTRAPPING'
  | 'NOT_MOUNTED'
  | 'MOUNTING'
  | 'MOUNTED'
  | 'UPDATING'
  | 'UNMOUNTING'
  | 'UNLOADING'
  | 'SKIP_BECAUSE_BROKEN'
  | 'LOAD_ERROR';

/**
 * 内置界面定义
 */
export interface BuiltinPages {
  /**
   * 主页面，默认微应用都挂载在这个页面
   * 实现的组件需要提供 #root 节点，来挂载微应用
   */
  main: PageComponent;

  /**
   * 独立页面。基本就是一个空的框架
   *
   * 实现的组件需要提供 #root 节点，来挂载微应用
   */
  independent: PageComponent;

  /**
   * 落地页, 默认路由为 /__landing__
   */
  landing: PageComponent<LandingPageProps>;

  /**
   * 异常页面，默认路由为 /__error__?type=http&code=400, 也支持 /__error__?type=custom&title=xx&message=xx 这种形式
   */
  error: PageComponent<ErrorPageProps>;
}

export interface BayHooks {
  /**
   * 在路由创建之前调用. 可以在这里修改即将注册的路由配置.
   *
   * @param routes
   */
  beforeRouterCreate(routes: RouteRecordRaw[]): void;

  /**
   * 路由进入主界面, 如果页面路径没有在子应用中注册, 默认会跳转到全局的 404 页面，可以返回 false 阻止默认行为
   */
  beforeRouterEnterMain(routeInfo: {
    /**
     * 是否找到子应用
     */
    matched: boolean;
    /**
     * 当前匹配的应用
     */
    matchedApp?: MicroApp;
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    apps: MicroApp[];
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  }): Promise<void | false | RouteLocationRaw>;

  /**
   * 在应用创建之前调用。可以在这里修改即将注册的微应用配置
   */
  beforeAppsRegister(app: MicroApp[]): void;

  /**
   * 路由变动
   */
  locationChange(location: UniverseLocation): void;

  /**
   * 微应用加载前调用，对应 qiankun 的生命周期方法
   * @param app
   */
  beforeAppLoad(app: MicroApp): void;

  beforeAppMount(app: MicroApp): void;

  afterAppMount(app: MicroApp): void;

  beforeAppUnmount(app: MicroApp): void;

  afterAppUnmount(app: MicroApp): void;

  /**
   * 全局未补货错误
   */
  globalUncaughtError(info: {
    event: Event | string;
    source?: string;
    lineno?: number;
    colno?: number;
    error?: Error;
  }): any;
}

/**
 * 基座初始化参数
 * 基座将采用 history 路由，微应用推荐使用 hash 路由
 */
export interface BayOptions {
  /**
   * 基础路径, 默认从 process.env.MAPP_BASE_URL 中获取，如果没有则使用 /
   */
  baseUrl?: string;

  /**
   * 页面实现
   */
  pages?: Partial<BuiltinPages>;

  /**
   * 微应用注册
   */
  apps: MicroApp[];

  /**
   * 自定义路由
   */
  routes?: RouteRecordRaw[];

  /**
   * 基座钩子
   */
  hooks?: Partial<BayHooks>;

  /**
   * 网络拦截器，可以用于检测 AJAX/fetch 的请求和响应
   * 你也可以通过 registerNetworkInterceptor 方法来注册
   */
  networkInterceptors?: INetworkInterceptorRegister[];

  /**
   * 根组件。将传递给 createApp
   * 必须携带 RouterView
   */
  rootComponent?: Component;
}

/**
 * 基座实例
 */
export interface IBay extends IBayBase {
  /**
   * 配置
   */
  options: BayOptions;

  /**
   * 未规范化前的配置
   */
  rawOptions: BayOptions;

  /**
   * 事件总线
   */
  eventBus: EventEmitter;

  /**
   * 当前路径。这个是响应式数据
   */
  readonly location: UniverseLocation;

  /**
   * 路由实例
   */
  router: Router;

  /**
   * vue 应用实例
   */
  app: App;

  /**
   * 应用配置
   */
  apps: MicroApp[];

  independentApps: MicroApp[];

  nonIndependentApps: MicroApp[];

  /**
   * 当前激活的微应用
   */
  currentMicroApp?: MicroApp;

  /**
   * 当前微应用的状态
   */
  currentMicroAppStatus: MicroAppStatus;

  /**
   * 当前微应用的异常信息
   */
  currentMicroAppError?: Error;

  /**
   * 当前微应用是否处于加载状态
   */
  isCurrentMicroAppLoading: boolean;

  /**
   * 当前微应用是否处于异常状态
   */
  isCurrentMicroAppError: boolean;

  /**
   * 基础路径
   */
  baseUrl: string;

  mounted: boolean;

  started: boolean;

  /**
   * 挂载应用
   * @param target 可选，默认是 #app
   */
  mount(target?: string | HTMLElement): void;

  /**
   * 启动应用。建议在基座挂载到 DOM 节点之后调用
   */
  start(): void;

  /**
   * 注册网络拦截器
   */
  registerNetworkInterceptor(...interceptors: INetworkInterceptorRegister[]): void;

  /**
   * TODO: 其他方法
   */
}
