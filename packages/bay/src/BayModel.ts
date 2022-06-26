import {
  computed,
  inject,
  injectable,
  makeObservable,
  observable,
  singleton,
  withRunState,
  watch,
  postConstruct,
  BaseModel,
} from '@wakeadmin/framework';
import type { IBay, RouteLocationOptions } from '@wakeadmin/mapp/main';

import { BayRepo } from './BayRepo';
import { TreeContainer, TreeNode, RouteType } from './tree';
import { PromiseQueue } from './base';

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
export class BayModel extends BaseModel {
  @inject('DI.bay.BayRepo')
  repo!: BayRepo;

  @inject('DI.bay')
  bay!: IBay;

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
  get appsInMenus() {
    const entries = this.menu?.entries;
    const apps = this.bay.apps;

    if (entries == null) {
      return new Set();
    }

    return new Set(apps.filter(i => entries.has(i.activeRule)));
  }

  @inject('DI.bay.promiseQueue')
  private setupQueue!: PromiseQueue<this>;

  constructor() {
    super();

    makeObservable(this);
  }

  /**
   * 等待启动, 只有基座正常启动之后才会 resolve。
   * 异常也不会抛出错误, 适用于要等待基座正常启动之后才进行的操作
   */
  async setup(): Promise<this> {
    if (this.status !== BayStatus.READY) {
      // 推入队列中，
      return await this.setupQueue.push();
    }

    return this;
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
   * 根据微应用的名称打开。
   * TODO: 支持参数
   */
  openByAppName(name: string, options: RouteLocationOptions) {
    const app = this.bay.getApp(name);

    if (app == null) {
      console.warn(`[bay] openByAppName(${name}) 所指定的子应用未找到`);
      return;
    }

    if (!this.appsInMenus.has(app)) {
      console.warn(`[bay] openByAppName(${name}) 所指定的子应用未在菜单中定义`);
    }

    this.bay.openApp({ name, route: options });
  }

  /**
   *
   * 根据微应用的别名打开, 常用于多态应用。这里会优先打开在菜单中定义的微应用
   *
   * @param alias
   * @param options
   */
  openByAppAlias(alias: string, options: RouteLocationOptions) {}

  /**
   * 打开主界面, 即菜单中定义的第一个根节点
   * @param options
   */
  openMain(options: RouteLocationOptions) {}

  /**
   * 根据权限标识符路径打开
   * @param path
   *
   * TODO: 支持参数
   */
  openByIdentifierPath(path: string, options: RouteLocationOptions) {
    if (this.menu == null) {
      console.warn(`[bay] openByIdentifierPath 需要等待基座启动后才能调用`);
      return;
    }

    const result = this.menu.findByIdentifierPath(path);
    if (result.result != null) {
      this.openTreeNode(result.result, options);
    } else {
      console.warn(`[bay] openByIdentifierPath 未找到标识符路径为 ${path} 的节点`);
    }
  }

  /**
   * 打开菜单节点
   * TODO: 支持参数
   * @param node
   */
  openTreeNode(node: TreeNode, options: RouteLocationOptions): void {
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
  }

  /**
   * 打开外部链接
   */
  openOutside(url: string, options: RouteLocationOptions) {
    const redirect = options.redirect;
    if (redirect) {
      window.location.replace(url);
    } else {
      window.location.assign(url);
    }
  }

  // watch 和 createMenus 不能在构造函数中调用因为依赖注入还没完成
  @postConstruct()
  protected initialize() {
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

        const { result, exact } = container.findByRoute(location);
        if (result) {
          container.lightUp(result, exact);
        }
      },
      { immediate: true, flush: 'pre' }
    );

    this.retryableInitialize();
  }

  /**
   * 可重试的初始化
   */
  private async retryableInitialize() {
    try {
      this.status = BayStatus.PENDING;
      this.error = undefined;

      await Promise.all([this.createMenus()]);
      this.status = BayStatus.READY;

      this.emit('Event.bay.setup', this);
      this.setupQueue.flushResolve(this);

      console.info(`[bay] 基座已启动`, this);
    } catch (err) {
      console.error(`[bay] 基座启动异常`, err);
      this.status = BayStatus.ERROR;
      this.error = err as Error;
      this.emit('Event.bay.setupError', err as Error);
    }
  }

  /**
   * 配置菜单
   */
  private createMenus = withRunState(async () => {
    const menus = await this.repo.getMenus();

    this.menu = new TreeContainer(menus);
  });
}
