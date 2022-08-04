import {
  computed,
  inject,
  injectable,
  makeObservable,
  observable,
  singleton,
  watch,
  BaseModel,
} from '@wakeadmin/framework';
import type { IBay, MicroApp } from '@wakeadmin/mapp/main';
import type { I18nInstance } from '@wakeadmin/i18n';

import { BayRepo } from './BayRepo';
import { TreeContainer, RouteType } from './tree';
import { PromiseQueue } from './base';
import { IBayModel } from './types';
import type { SessionInfo } from './session';
import { gotoLogin } from './utils';
import { AUTO_INDEX } from './constants';

declare global {
  interface DIMapper {
    'DI.bay.BayModel': BayModel;
  }

  interface EventMapper {
    /**
     * 基座启动
     */
    'Event.bay.setup': BayModel;

    /**
     * 基座启动异常
     */
    'Event.bay.setupError': Error;
  }
}

/**
 * 基座状态
 */
export enum BayStatus {
  INITIAL,
  PENDING,
  READY,
  ERROR,
}

/**
 * 菜单获取接口
 */
@injectable()
@singleton()
export class BayModel extends BaseModel implements IBayModel {
  @inject('DI.bay.BayRepo')
  repo!: BayRepo;

  @inject('DI.bay')
  bay!: IBay;

  @inject('DI.bay.i18n')
  i18n!: I18nInstance;

  /**
   * 基座状态
   */
  @observable.ref
  status: BayStatus = BayStatus.INITIAL;

  /**
   * 基座异常
   */
  @observable.ref
  error?: Error;

  /**
   * 菜单
   */
  @observable.ref
  menu?: TreeContainer;

  /**
   * 会话信息
   */
  @observable.ref
  sessionInfo?: SessionInfo;

  /**
   * 菜单折叠
   */
  @observable.ref
  sidebarCollasped = false;

  get loading() {
    return this.status !== BayStatus.READY && this.status !== BayStatus.ERROR;
  }

  @computed
  get location() {
    const { path, hashPath } = this.bay.location;
    return `${path}#${hashPath}`;
  }

  /**
   * 在后台菜单配置中定义了路由的微应用
   */
  @computed
  get appsInMenus(): Set<MicroApp> {
    const entries = this.menu?.entries;
    const apps = this.bay.apps;

    if (entries == null) {
      return new Set();
    }

    return new Set(
      apps.filter(i => {
        if (Array.isArray(i.activeRule)) {
          return i.activeRule.some(j => entries.has(j));
        } else {
          return entries.has(i.activeRule);
        }
      })
    );
  }

  @inject('DI.bay.promiseQueue')
  private setupQueue!: PromiseQueue<this>;

  private initialized = false;

  constructor() {
    super();

    makeObservable(this);

    window.__MAPP_BAY_MODEL__ = this;

    // 支持菜单节点调试
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const me = this;
    Object.defineProperty(window, '$m', {
      enumerable: false,
      get() {
        // @ts-expect-error
        const currentSelectNode = window.$0 as HTMLElement | undefined;
        if (currentSelectNode != null) {
          const id = currentSelectNode?.dataset?.id;
          if (typeof id === 'string') {
            return me.menu?.findByPullIdentifierPath(id).result;
          }
        }

        return null;
      },
    });
  }

  /**
   * 等待启动, 只有基座正常启动之后才会 resolve。
   * 异常也不会抛出错误, 适用于要等待基座正常启动之后才进行的操作
   */
  async waitSetup(): Promise<this> {
    if (this.status !== BayStatus.READY) {
      // 推入队列中，
      return await this.setupQueue.push();
    }

    return this;
  }

  /**
   * 这个方法只能在主界面启动时调用
   */
  async initialize() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    await this.singletonInitialize();
    await this.retryableInitialize();
  }

  /**
   * 重试
   */
  retry() {
    if (this.status !== BayStatus.ERROR) {
      console.warn(`[bay] 只有异常状态下，才能重试`);
      return;
    }

    this.retryableInitialize();
  }

  /**
   * 退出登录
   */
  logout = async () => {
    await this.repo.logout();
    gotoLogin();
  };

  getSidebarCollapsed = () => {
    return this.sidebarCollasped;
  };

  expandSidebar = () => {
    this.sidebarCollasped = false;
  };

  collapseSidebar = () => {
    this.sidebarCollasped = true;
  };

  /**
   * 切换侧边栏折叠状态
   */
  toggleSidebar = () => {
    this.sidebarCollasped = !this.sidebarCollasped;
  };

  /**
   * 根据微应用的名称打开。
   */
  openByAppName: IBayModel['openByAppName'] = (name, options) => {
    if (!this.assertOpen()) {
      return;
    }

    const app = this.bay.getApp(name);

    if (app == null) {
      console.warn(`[bay] openByAppName(${name}) 所指定的子应用未找到`);
      return;
    }

    if (!this.appsInMenus.has(app)) {
      console.warn(`[bay] openByAppName(${name}) 所指定的子应用未在菜单中定义`);
    }

    this.bay.openApp({ name, ...options });
  };

  /**
   *
   * 根据微应用的别名打开, 常用于多态应用。这里会优先打开在菜单中定义的微应用
   *
   * @param alias
   * @param options
   */
  openByAppAlias: IBayModel['openByAppAlias'] = (alias, options) => {
    const apps = this.bay.getAppByAlias(alias);

    if (apps.length === 0) {
      console.warn(`[bay] openByAppAlias(${alias}) 所指定的子应用未找到`);

      // 回退
      this.openByAppName(alias, options);
      return;
    }

    if (!this.assertOpen()) {
      return;
    }

    // 优先查找在菜单中定义的微应用
    const definedApps = apps.filter(i => this.appsInMenus.has(i));

    if (definedApps.length) {
      if (definedApps.length > 1) {
        console.warn(`[bay] openByAppAlias(${alias}) 所指定的子应用存在多个，出现歧义将打开第一个`, definedApps);
      }

      this.openByAppName(definedApps[0].name, options);
      return;
    }

    // 默认打开第一个
    this.openByAppName(apps[0].name, options);
  };

  /**
   * 打开主界面, 即菜单中定义的第一个根节点
   * @param options
   */
  openMain: IBayModel['openMain'] = options => {
    if (!this.assertOpen()) {
      return;
    }
    const first = this.menu?.topMenus?.[0];
    if (first == null) {
      console.warn(`[bay] openMain 菜单未配置`);
      return;
    }

    const node = !first.url ? first.children[0] : first;

    if (node == null) {
      console.warn(`[bay] openMain 菜单未配置`);
      return;
    }

    this.openTreeNode(node, options);
  };

  /**
   * 根据权限标识符路径打开
   */
  openByIdentifierPath: IBayModel['openByIdentifierPath'] = (path, options) => {
    if (!this.assertOpen()) {
      return;
    }

    const result = this.menu?.findByIdentifierPath(path);
    if (result?.result != null) {
      this.openTreeNode(result.result, options);
    } else {
      console.warn(`[bay] openByIdentifierPath 未找到标识符路径为 ${path} 的节点`);
    }
  };

  /**
   * 打开菜单节点
   */
  openTreeNode: IBayModel['openTreeNode'] = (node, options) => {
    if (!node.url) {
      console.warn(`[bay] 无法打开菜单节点，url 为空`, node);
      return;
    }

    switch (node.routeType) {
      case RouteType.Href: {
        // 外部链接, 直接打开
        this.openOutside(node.url, options);
        break;
      }
      case RouteType.None:
        break;
      default: {
        // 首先判断是否是微应用, 如果是微应用, 则使用 history 打开
        const app = this.bay.getAppByRoute(node.url);
        if (app) {
          this.bay.openUrl({ path: node.url, ...options });
        } else {
          // 外部链接
          this.openOutside(node.url, options);
        }
      }
    }
  };

  /**
   * 打开外部链接
   */
  openOutside: IBayModel['openOutside'] = (url, options) => {
    const redirect = options?.redirect;
    if (redirect) {
      window.location.replace(url);
    } else {
      window.location.assign(url);
    }
  };

  /**
   * 打开链接
   * @param url
   */
  openUrl: IBayModel['openUrl'] = url => {
    this.bay.openUrl(url);
  };

  /**
   * 打开错误页面
   * @param args
   */
  openError: IBayModel['openError'] = (...args) => {
    this.bay.openError(...args);
  };

  /**
   * 生成落地页链接
   * @param props
   * @param addHost
   * @returns
   */
  generateLandingUrl: IBayModel['generateLandingUrl'] = (props, addHost) => {
    return this.bay.generateLandingUrl(props, addHost);
  };

  /**
   * 注册语言包
   * @param bundles
   */
  registerBundles: IBayModel['registerBundles'] = bundles => {
    return this.i18n.registerBundles(bundles);
  };

  /**
   * 设置语言
   * @param locale
   * @returns
   */
  setLocale: IBayModel['setLocale'] = locale => {
    return this.i18n.setLocale(locale);
  };

  /**
   * 获取语言
   * @returns
   */
  getLocale: IBayModel['getLocale'] = () => {
    return this.i18n.getLocale();
  };

  private assertOpen(): boolean {
    if (this.menu == null) {
      console.warn(`[bay] openByIdentifierPath 需要等待基座启动后才能调用`);
      return false;
    }
    return true;
  }

  /**
   * 仅需执行一次
   */
  private singletonInitialize() {
    // 监听路由变动并匹配菜单
    watch(
      () => ({
        container: this.menu,
        location: this.location,
      }),
      ({ container, location }) => {
        if (container == null || location == null) {
          return;
        }

        console.debug('[bay] 开始匹配节点', location);

        const { result, exact } = container.findByRoute(location);

        if (result) {
          // 自动跳转到叶子节点
          if (AUTO_INDEX && exact) {
            const leaf = container.getFirstMenuLeaf(result);
            // 外部链接不太适合 auto_index
            if (leaf !== result && leaf.routeType !== RouteType.Href) {
              console.debug(`[bay] 自动 index 重定向到: ${leaf.url}`, leaf);
              this.openTreeNode(leaf, {
                redirect: true,
                // 透传参数
                hashQuery: this.bay.location.hashQuery,
              });
              return;
            }
          }

          console.debug(`[bay] 匹配(${exact ? '精确' : ''})到节点:`, result);
          container.lightUp(result, exact);
        }
      },
      { flush: 'pre' }
    );
  }

  /**
   * 可重试的初始化
   */
  private async retryableInitialize() {
    try {
      this.status = BayStatus.PENDING;
      this.error = undefined;

      await Promise.all([this.getSessionInfo(), this.createMenus()]);
      this.status = BayStatus.READY;

      this.emit('Event.bay.setup', this);
      this.setupQueue.flushResolve(this);

      console.info(`[bay] 基座已启动`, this);

      // 开始预加载
      this.prefetch();
    } catch (err) {
      console.error(`[bay] 基座启动异常`, err);
      this.status = BayStatus.ERROR;
      this.error = err as Error;
      this.emit('Event.bay.setupError', err as Error);
    }
  }

  private prefetch() {
    const list = Array.from(this.appsInMenus.values());
    if (list.length) {
      console.debug('[bay] 开始预加载微应用', list);
      this.bay.prefetch(list);
    }
  }

  /**
   * 获取会话信息
   * @returns
   */
  private getSessionInfo = async () => {
    return (this.sessionInfo = await this.repo.getSessionInfo());
  };

  /**
   * 配置菜单
   * TODO: 菜单配置缓存，以提升加载效率
   */
  private createMenus = async () => {
    const menus = await this.repo.getMenus();

    return (this.menu = new TreeContainer(menus));
  };
}
