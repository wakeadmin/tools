import type { DefineComponent, App } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';
import type { EventEmitter } from '@wakeadmin/utils';

import { UniverseLocation, RouteLocationOptions, RouteLocation } from './route';
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

export type PageComponent<T = any> = DefineComponent<T>;

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
   */
  landing: PageComponent;

  /**
   * 异常页面，默认路由为 /error?type=http&code=400, 也支持 /error?type=custom&title=xx&message=xx 这种形式
   */
  error: PageComponent<ErrorPageProps>;
}

export interface BayHooks {
  /**
   * 在路由创建之前调用. 可以在这里修改即将注册的路由配置
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
   * 基座钩子
   */
  hooks?: Partial<BayHooks>;

  /**
   * 网络拦截器，可以用于检测 AJAX/fetch 的请求和响应
   * 你也可以通过 registerNetworkInterceptor 方法来注册
   */
  networkInterceptors?: INetworkInterceptorRegister[];
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
   * 打开错误页面
   */
  openError(data: ErrorPageProps & RouteLocationOptions): void;

  /**
   * 打开应用
   * @param name
   * @param route 应用路由
   */
  openApp(name: string, route: RouteLocation): void;

  /**
   * 注册网络拦截器
   */
  registerNetworkInterceptor(...interceptors: INetworkInterceptorRegister[]): void;

  /**
   * TODO: 其他方法
   */
}
