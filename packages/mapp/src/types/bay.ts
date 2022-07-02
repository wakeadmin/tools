import type { DefineComponent, App, Component, FunctionalComponent } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';
import type { EventEmitter } from '@wakeadmin/utils';

import { UniverseLocation, RouteLocationOptions, RouteLocationAsPathAndHash } from './route';
import { INetworkInterceptorRegister } from './network-interceptor';

/**
 * 微应用描述
 */
export interface MicroApp {
  /**
   * 应用名称, 必须唯一
   * 如果集成的是 @wakeadmin/vue-cli-plugin-mapp-child
   * 在控制台可以看到生成的应用名称
   */
  name: string;

  /**
   * 用于多业态应用，绑定到同一个身份上
   */
  alias?: string;

  /**
   * HTML 入口
   * 例如 /__apps__/vue3, 指向微应用的静态资源的目录即可。本地开发时可以指向本地路径，例如  //localhost:17355
   */
  entry: string;

  /**
   * 激活的路由, 路由前缀，以 / 开始，例如 /wkb。注意不需要包含基座 base，会自动添加。
   */
  activeRule: string;

  /**
   * 挂载的 DOM 节点, 默认为 #root
   */
  container?: string | HTMLElement;

  /**
   * 传递给子应用的参数
   */
  props?: Record<string, any>;

  /**
   * 微应用版本号
   */
  version?: string;

  /**
   * 应用描述
   */
  description?: string;

  /**
   * 可选，默认为 false。一般情况下微应用都是挂载在由基座的提供的页面框架内，某些特殊场景，微应用要完全接管一个页面，比如登录。这时候就开启
   */
  independent?: boolean;
}

export type PageComponent<T = any> =
  | DefineComponent<T, any, any, any, any, any, any, any, any>
  | FunctionalComponent<T>;

export type ErrorPageProps =
  | {
      // HTTP 错误
      type: 'http';
      /**
       * HTTP 错误代码
       */
      code?: string;
    }
  | {
      // 自定义错误
      type: 'custom';
      title?: string;
      detail?: string;
    };

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
   * 落地页, 默认路由为 /landing
   * TODO: 移除
   */
  landing: PageComponent;

  /**
   * 异常页面，默认路由为 /error?type=http&code=400, 也支持 /error?type=custom&title=xx&message=xx 这种形式
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
export interface IBay {
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
   * 基础路径
   */
  baseUrl: string;

  /**
   * 挂载和启动应用
   * @param target 可选，默认是 #app
   */
  mount(target?: string | HTMLElement): void;

  /**
   * 注册网络拦截器
   */
  registerNetworkInterceptor(...interceptors: INetworkInterceptorRegister[]): void;

  // ---------------- 路由导航相关方法 ---------------------

  /**
   * 打开错误页面
   */
  openError(data: ErrorPageProps & RouteLocationOptions): void;

  /**
   * 打开子应用
   * @param name 子应用名称
   * @param route 子应用路由
   */
  openApp(options: Omit<RouteLocationAsPathAndHash, 'path'> & RouteLocationOptions & { name: string }): void;

  /**
   * 直接打开路径
   * @param url
   */
  openUrl(url: string | (RouteLocationAsPathAndHash & RouteLocationOptions)): void;

  /**
   * 打开主页面。将打开非 independent 的第一个子应用
   * @param options
   */
  openMain(options?: RouteLocationOptions): void;

  // ---------------------------- 应用相关方法 ------------------------------------

  /**
   * 获取应用
   * @param name
   */
  getApp(name: string): MicroApp | null;

  /**
   * 根据路由获取应用，即匹配 activeRule
   * activeRule 和给定的 route 的 pathname 部分必须精确匹配
   */
  getAppByRoute(route: string): MicroApp | null;

  /**
   * 根据别名获取应用
   * @param alias
   */
  getAppByAlias(alias: string): MicroApp[];

  /**
   * TODO: 其他方法
   */
}
