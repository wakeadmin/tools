import { MicroApp, getBay } from '@wakeadmin/mapp/main';
import { injectable, makeObservable, observable, singleton } from '@wakeadmin/framework';
import { debounce } from '@wakeadmin/utils';

const LOCAL_MAPP_KEY = '__LOCAL_MAPP__';
const DEBUG_SCRIPT_KEY = '__DEBUG_SCRIPT__';

declare global {
  interface DIMapper {
    'DI.bay.MicroAppModel': MicroAppModel;
  }
}

@injectable()
@singleton()
export class MicroAppModel {
  @observable
  apps: MicroApp[] = [];

  /**
   * 调试脚本, 这些脚本将使用 module 形式注入
   */
  @observable
  debugScript: string = '';

  constructor() {
    const localAppsStr = window.localStorage.getItem(LOCAL_MAPP_KEY);
    if (localAppsStr != null) {
      this.apps.push(...JSON.parse(localAppsStr));
    }

    this.debugScript = window.localStorage.getItem(DEBUG_SCRIPT_KEY) ?? '';

    /**
     * 微应用注册
     */
    if (window.__MAPPS__) {
      window.__MAPPS__.forEach(a => {
        this.registerMapp(a);
      });
    }

    const mount = (window.__MAPPS__ = [] as MicroApp[]);

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    mount.push = function (...items: MicroApp[]): number {
      items.forEach(i => {
        self.registerMapp(i);
      });
      return 0;
    };

    makeObservable(this);
  }

  registerMapp(app: MicroApp) {
    if (getBay() != null) {
      throw new Error('不能在基座初始化之后注册微应用');
    }

    this.apps.unshift(app);
  }

  addLocalMapp(mapp: MicroApp) {
    // @ts-expect-error
    mapp.__local__ = true;
    this.apps.push(mapp);

    this.saveLocalMapps();
  }

  deleteLocalMapp(mapp: MicroApp) {
    const idx = this.apps.findIndex(i => i.name === mapp.name && this.isLocalApp(i));

    if (idx !== -1) {
      this.apps.splice(idx, 1);

      this.saveLocalMapps();
    }
  }

  updateLocalMapp(mapp: MicroApp) {
    const idx = this.apps.findIndex(i => i.name === mapp.name && this.isLocalApp(i));

    if (idx !== -1) {
      this.apps[idx] = { ...this.apps[idx], ...mapp };
      this.saveLocalMapps();
    }
  }

  /**
   * 获取已注册的 apps
   * @returns
   */
  getMapps() {
    // 去重, 本地优先
    const set = new Map<string, MicroApp>();
    this.apps.forEach(i => set.set(i.name, i));

    return Array.from(set.values());
  }

  isLocalApp(app: MicroApp) {
    // @ts-expect-error
    return app.__local__;
  }

  // 保存后需要重启才能生效
  saveLocalMapps() {
    const list = this.apps.filter(this.isLocalApp);
    window.localStorage.setItem(LOCAL_MAPP_KEY, JSON.stringify(list));
  }

  /**
   * 设置调试脚本
   * @param value
   */
  saveDebugScript(value: string) {
    this.debugScript = value;
    this.debouncedSaveDebugScript(value);
  }

  private debouncedSaveDebugScript = debounce((value: string) => {
    window.localStorage.setItem(DEBUG_SCRIPT_KEY, value);
  }, 500);
}
