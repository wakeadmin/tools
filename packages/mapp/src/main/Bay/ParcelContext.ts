import { mountRootParcel, type ParcelConfig, type Parcel } from 'single-spa';
import { AppContext } from './AppContext';
import { MicroAppNormalized, ModernMicroAppNormalized } from './types';

import { loadEntry } from '@qiankunjs/loader';
import { Noop } from '@wakeadmin/utils';
import isFunction from 'lodash/isFunction';
import { parcelUnmountDeferred, qiankunUnmountDeferred, Deferred } from './deferred';

const isDev = process.env.NODE_ENV === 'development';

const LOG_PREFIX = '[Single SPA Parcel] ';

const PARCEL_INSTANCE_APP_NAME = '__$$app_name__';

const QIANKUN_CONTEXT_KEYS = ['__POWERED_BY_QIANKUN__'];

/**
 * document.head的快照
 * 用于处理添加到document.head里的元素
 *
 * **只处理新增节点**
 */
class DocumentHeadSnapshot {
  private snapshotRecordMap: Map<string, Node[][]> = new Map();
  private currentAppName?: string;
  private observer: MutationObserver;

  constructor() {
    this.observer = new MutationObserver(records => {
      if (!this.currentAppName) {
        return;
      }
      const nodeRecord = this.snapshotRecordMap.get(this.currentAppName)![0];

      if (!nodeRecord) {
        return;
      }

      for (const record of records) {
        if (record.type === 'childList' && record.addedNodes) {
          for (const node of record.addedNodes) {
            if (node.nodeName.toLocaleLowerCase() === 'style') {
              nodeRecord.push(node);
            }
          }
        }
      }
    });

    this.observer.observe(document.head, { childList: true });
  }

  /**
   * 创建一个子应用快照列表
   *
   * 如果存在 不做任何操作
   * @param name
   */
  create(name: string) {
    this.currentAppName = name;
    if (this.snapshotRecordMap.has(name)) {
      return;
    }
    this.snapshotRecordMap.set(name, []);
  }
  /**
   * 创建一个快照点
   */
  store() {
    if (this.currentAppName) {
      this.snapshotRecordMap.get(this.currentAppName)!.unshift([]);
    }
  }

  /**
   * 恢复到上一个快照
   * @returns
   */
  restore() {
    if (!this.currentAppName) {
      return;
    }
    const snapshot = this.snapshotRecordMap.get(this.currentAppName)![0] || [];

    this.removeNodes(snapshot);
  }

  /**
   * 使用最新的快照进行还原
   */
  use() {
    if (!this.currentAppName) {
      return;
    }
    const list = this.snapshotRecordMap.get(this.currentAppName)![0] || [];
    this.appendNodes(list);
  }

  private appendNodes(nodeList: Node[]) {
    const parentElement = document.head;
    nodeList.filter(node => node.parentElement === parentElement).forEach(node => parentElement.appendChild(node));
  }
  private removeNodes(nodeList: Node[]) {
    const parentElement = document.head;
    nodeList.filter(node => node.parentElement === parentElement).forEach(node => (node as any as Element).remove());
  }
}

export class ParcelContext {
  private parcelInstance?: Parcel & {
    [PARCEL_INSTANCE_APP_NAME]: string;
  };

  private global = window;
  private documentHeadSnapshot = new DocumentHeadSnapshot();

  private currentApp?: MicroAppNormalized;

  private isLoading: boolean = false;

  private mountDeferredWeakMap: WeakMap<Parcel, Deferred<void>> = new WeakMap();

  constructor(private apps: ModernMicroAppNormalized[], private appContext: AppContext) {}

  mountOrUnmountAppIfNeed(container?: HTMLElement) {
    const app = this.getMatchedApp();
    if (!app) {
      return this.unmountAppIfNeed();
    }
    return this.mountApp(app, container);
  }

  private async mountApp(app: ModernMicroAppNormalized, container?: HTMLElement) {
    isDev && console.log(`${LOG_PREFIX}匹配应用 `, app.name);

    if (this.currentApp?.name === app.name) {
      return;
    }

    if (this.parcelInstance) {
      await this.unmountApp();
    }

    if (
      this.appContext.currentApp.value ||
      this.appContext.currentLoadingApp.value ||
      this.appContext.currentMountingApp.value
    ) {
      isDev && console.log(`${LOG_PREFIX}等待qiankun卸载子应用 -> `, this.appContext.currentApp.value?.name);

      await qiankunUnmountDeferred.promise;
      isDev && console.log(`${LOG_PREFIX}qiankun卸载子应用完成 -> `, this.appContext.currentApp.value?.name);
    }

    this.loadApp(app, container);
  }

  private unmountAppIfNeed() {
    if (this.parcelInstance) {
      this.isLoading = false;
      return this.unmountApp();
    }

    return Promise.resolve();
  }

  private getMatchedApp(location: Location = window.location): ModernMicroAppNormalized | undefined {
    return this.apps.find(item => item.activeRuleWhen.some(fn => fn(location)));
  }

  private unmountApp() {
    if (this.parcelInstance) {
      isDev && console.debug(`${LOG_PREFIX}卸载子应用 -> ${this.currentApp?.name}`);

      return this.parcelInstance.unmount().then(() => {
        if (isDev) {
          const deferred = this.mountDeferredWeakMap.get(this.parcelInstance!);
          deferred?.reject(
            `${LOG_PREFIX}子应用(${this.parcelInstance![PARCEL_INSTANCE_APP_NAME]})挂载失败 -> 当前子应用已被卸载`
          );
        }
        this.parcelInstance = undefined;
      });
    }

    return Promise.resolve();
  }

  private async loadApp(app: ModernMicroAppNormalized, target?: HTMLElement): Promise<void> {
    if (this.isLoading && this.parcelInstance?.[PARCEL_INSTANCE_APP_NAME] === app.name) {
      // eslint-disable-next-line @typescript-eslint/return-await
      return this.mountDeferredWeakMap.get(this.parcelInstance)!.promise;
    }

    this.isLoading = true;

    this.simulateQiankunContext();

    const { config, container } = await this.load(app, target);

    const instance = mountRootParcel(config, { domElement: container });

    // @ts-expect-error
    instance[PARCEL_INSTANCE_APP_NAME] = app.name;

    this.mountDeferredWeakMap.set(instance, new Deferred());
    this.parcelInstance = instance as any;
  }

  private async load(
    app: ModernMicroAppNormalized,
    target: HTMLElement | undefined
  ): Promise<{
    container: HTMLElement;
    config: ParcelConfig;
  }> {
    this.currentApp = app;

    isDev && console.debug(`${LOG_PREFIX}开始加载子应用 -> ${app.name}`);

    this.documentHeadSnapshot.create(app.name);
    this.documentHeadSnapshot.use();
    this.documentHeadSnapshot.store();

    await app.loader!(true);

    const container =
      target ??
      ((typeof app.container === 'string' ? document.querySelector(app.container) : app.container!) as HTMLElement);

    const loadedApp = Object.create(app, {
      container: {
        value: container,
      },
    });

    this.appContext.beforeLoad(loadedApp, this.global);

    await loadEntry(app.entry, container, {
      fetch: window.fetch,
    });

    isDev && console.debug(`${LOG_PREFIX}加载子应用完成 -> ${app.name}`);

    // 这里重新判断下当前正在加载的子应用是否是最新的
    // --loadAppA-----------loadEntryA----
    // ----loadAppB----loadEntryB---------
    // 假设有两个并发如上 可以发现A会在B后面运行下面的代码 从而导致子应用不正确
    if (this.currentApp.name !== app.name) {
      throw new Error(
        `${LOG_PREFIX}子应用挂载失败: 当前子应用为 ${app.name}, 需要挂载的子应用为 ${this.currentApp.name}`
      );
    }

    const { bootstrap, mount, unmount, update } = this.getAppLifeCycles(app.name);

    const config = {
      name: app.name,

      bootstrap,

      mount: [
        () => {
          isDev && console.debug(`${LOG_PREFIX}开始挂载子应用 -> ${app.name};  挂载点: `, container);
          parcelUnmountDeferred.reset();
          return this.appContext.beforeMount(loadedApp, this.global);
        },
        (props: Record<string, unknown>) =>
          mount({ ...props, container }).catch((err: unknown) =>
            console.debug(`${LOG_PREFIX}子应用 (${app.name}) 挂载失败`, err)
          ),
        () => {
          isDev && console.debug(`${LOG_PREFIX}挂载子应用完成 -> ${app.name}`);
          this.isLoading = false;
          return this.appContext.afterMount(loadedApp, this.global);
        },
        () => {
          this.mountDeferredWeakMap.get(this.parcelInstance!)?.resolve();
          return Promise.resolve();
        },
      ],

      unmount: [
        () => {
          isDev && console.debug(`${LOG_PREFIX}开始卸载子应用 -> ${app.name}`);
          return this.appContext.beforeUnmount(loadedApp, this.global);
        },
        (props: Record<string, unknown>) =>
          unmount({ ...props, container }).catch((err: unknown) =>
            console.debug(`${LOG_PREFIX}子应用 (${app.name}) 卸载失败`, err)
          ),
        () => {
          isDev && console.debug(`${LOG_PREFIX}卸载子应用完成 -> ${app.name}`);
          parcelUnmountDeferred.resolve();
          this.currentApp = undefined;
          return this.appContext.afterUnmount(loadedApp, this.global);
        },
        () => {
          container.innerHTML = '';
          this.documentHeadSnapshot.restore();
          this.cancelSimulateQiankunContext();
          return Promise.resolve();
        },
      ],

      update: Noop,
    };

    if (update) {
      config.update = update;
    }
    return { config, container };
  }

  private getAppLifeCycles(appName: string) {
    // @ts-expect-error
    const obj = this.global[appName];

    if (!obj) {
      throw new Error(`${LOG_PREFIX}无法获取到子应用 (${appName}) 的生命周期函数`);
    }

    const { bootstrap, mount, unmount, update } = obj;

    if (isFunction(bootstrap) && isFunction(mount) && isFunction(unmount)) {
      return { bootstrap, mount, unmount, update };
    }

    throw new Error(
      `${LOG_PREFIX}子应用 (${appName}) 的生命周期函数异常，请确保 bootstrap, mount, unmount 三个字段为函数`
    );
  }

  private simulateQiankunContext() {
    for (const key of QIANKUN_CONTEXT_KEYS) {
      // @ts-expect-error
      this.global[key] = true;
    }
  }

  private cancelSimulateQiankunContext() {
    for (const key of QIANKUN_CONTEXT_KEYS) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete (this.global as any)[key];
    }
  }
}
