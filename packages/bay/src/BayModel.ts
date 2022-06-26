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
import type { IBay } from '@wakeadmin/mapp/main';

import { BayRepo } from './BayRepo';
import { TreeContainer } from './tree';
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
  get definedApps() {
    const entries = this.menu?.entries;
    const apps = this.bay.apps;

    if (entries == null) {
      return [];
    }

    return apps.filter(i => entries.has(i.activeRule));
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
