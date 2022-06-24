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
} from '@wakeadmin/framework';
import type { IBay } from '@wakeadmin/mapp/main';

import { MenuRepo } from './MenuRepo';
import { TreeContainer } from './TreeContainer';

declare global {
  interface DIMapper {
    'DI.bay.MenuModel': MenuModel;
  }
}

/**
 * 菜单获取接口
 */
@injectable()
@singleton()
export class MenuModel {
  @inject('DI.bay.MenuRepo')
  repo!: MenuRepo;

  @inject('DI.bay')
  bay!: IBay;

  @observable.ref
  container?: TreeContainer;

  @computed
  get location() {
    const { path, hashPath } = this.bay.location;
    return `${path}#${hashPath}`;
  }

  constructor() {
    makeObservable(this);
  }

  // watch 和 createMenus 不能在构造函数中调用因为依赖注入还没完成
  @postConstruct()
  initialize() {
    this.createMenus();

    // 监听路由变动并匹配菜单
    watch(
      () => ({
        container: this.container,
        location: this.location,
      }),
      ({ container, location }) => {
        if (container == null || location == null) {
          return;
        }

        container.matchRoute(location);
      },
      { immediate: true, flush: 'pre' }
    );
  }

  createMenus = withRunState(async () => {
    const menus = await this.repo.getMenus();

    this.container = new TreeContainer(menus);
  });
}
