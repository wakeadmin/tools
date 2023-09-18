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
  activeRule: string | string[];

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

  /**
   * 可选，默认为 false。
   *
   * 开启时将认为该应用为一个支持现代浏览器的应用
   *
   * 因此将允许使用 module script 这些功能
   *
   * 该功能只工作在开发模式下 并且不支持沙盒隔离
   */
  modern?: boolean;

  /**
   * 路由模式，默认为 hash
   */
  routeMode?: 'hash' | 'history';
}

export type ErrorPageProps =
  | {
      // HTTP 错误
      type: 'http';
      /**
       * HTTP 错误代码
       */
      code?: string;

      /**
       * 额外参数
       */
      extra?: string;
    }
  | {
      // 自定义错误
      type: 'custom';
      title?: string;
      detail?: string;
    };

export interface LandingPageProps {
  data: any;
}

// 以下是路由相关
export type LocationQueryValue = string | null;
export type LocationQueryValueRaw = LocationQueryValue | number | undefined;
export type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;

export interface RouteLocationOptions {
  /**
   * 重定向模式
   */
  redirect?: boolean;
}

export interface RouteLocationAsPath {
  /**
   * 路由路径
   */
  path?: string;

  /**
   * 查询字符串
   */
  query?: LocationQueryRaw;
}

export interface RouteLocationAsPathAndHash extends RouteLocationAsPath {
  /**
   * hash 路由路径
   */
  hashPath?: string;

  /**
   * hash 路由查询字符串
   */
  hashQuery?: LocationQueryRaw;
}

/**
 * 统一路由监听, 可以监听 history 路由和 hash 路由的变化
 */
export interface UniverseLocation {
  /**
   * 完整路径
   */
  href: string;

  /**
   * 页面路径，不包含参数
   */
  path: string;

  /**
   * 查询字符串
   */
  query: Record<string, any>;

  /**
   * hash 路径
   */
  hashPath: string;

  /**
   * hash 查询字符串
   */
  hashQuery: Record<string, any>;
}

export interface IBayNavigation {
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
}

export type ExcludeAssetFilter = string | RegExp | ((url: string) => boolean) | ExcludeAssetFilter[];

export interface IBayBase extends IBayNavigation {
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
   * 生成 landing 地址
   * @param data
   * @param addHost 是否追加域名信息
   */
  generateLandingUrl(data: Record<string, any>, addHost?: boolean): string;

  /**
   * 预加载微应用
   */
  prefetch(apps: MicroApp[]): void;

  // ----------------- 安全相关方法 --------------------

  /**
   * 添加部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理。
   * @param filter
   */
  addExcludeAssetFilter(filter: ExcludeAssetFilter): void;
}

export interface CreateMicroAppOptions<Props = {}> {
  /**
   * 应用启动逻辑
   */
  bootstrap?: (props: Props) => Promise<void>;

  /**
   * 应用挂载
   */
  mount: (container: HTMLElement | undefined, props: Props) => Promise<void>;

  /**
   * 应用更新
   */
  update?: (props: Props) => Promise<void>;

  /**
   * 应用卸载
   */
  unmount: (props: Props) => Promise<void>;

  /**
   * 应用对外暴露的共享 API
   */
  expose?: () => Promise<Record<string, any>>;
}
