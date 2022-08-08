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

    if (this.isActiveApp(app)) {
      this.apps.unshift(app);
    }
  }

  switchLocalMappActive(app: MicroApp) {
    const status = this.isActiveApp(app);
    this.updateLocalMapp({
      ...app,
      // @ts-expect-error
      __active__: !status,
    });
  }

  addLocalMapp(mapp: MicroApp) {
    // @ts-expect-error
    mapp.__local__ = true;
    // @ts-expect-error
    mapp.__active__ = true;
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
    // 根据name、activeRule 去重, 本地优先
    const list: MicroApp[] = [];

    for (let i = this.apps.length - 1; i >= 0; i--) {
      const app = this.apps[i];

      if (!this.isActiveApp(app)) {
        continue;
      }

      const item = this.normalizeApp(app);
      let isDup = false;

      for (const inList of list) {
        if (inList.name === item.name || this.isActiveRuleDuplicated(inList.activeRule, item.activeRule)) {
          // 已存在
          isDup = true;
          break;
        }
      }

      if (!isDup) {
        list.push(item);
      }
    }

    return list;
  }

  isLocalApp(app: MicroApp) {
    // @ts-expect-error
    return app.__local__;
  }

  /**
   * 微应用是否属于启用状态
   * @remarks
   * 线下注册的一律为启用状态
   *
   * 本地注册的通过`__active__`是否为`true`进行判断
   *
   * @param app
   *
   */
  isActiveApp(app: MicroApp): boolean {
    if (this.isLocalApp(app)) {
      // @ts-expect-error
      return app.__active__;
    }

    return true;
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

  private normalizeApp(app: MicroApp) {
    const { name, activeRule, ...other } = app;

    return {
      name: name.trim(),
      activeRule: this.normalizedActiveRule(activeRule),
      ...other,
    };
  }

  private normalizedActiveRule(activeRule: string | string[]) {
    if (Array.isArray(activeRule)) {
      return activeRule.map(i => i.trim());
    }
    let normalized = activeRule.trim();

    if (normalized.includes(',')) {
      // 拆分
      const list = normalized
        .split(',')
        .map(i => i.trim())
        .filter(Boolean);
      return list.length > 1 ? list : list[0];
    }
    return normalized;
  }

  private isActiveRuleDuplicated(activeRuleA: string | string[], activeRuleB: string | string[]) {
    const a = Array.isArray(activeRuleA) ? activeRuleA : [activeRuleA];
    const b = Array.isArray(activeRuleB) ? activeRuleB : [activeRuleB];

    for (const i of a) {
      for (const j of b) {
        if (i === j) {
          return true;
        }
      }
    }

    return false;
  }
}
