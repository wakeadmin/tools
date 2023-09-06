import { mountRootParcel, type Parcel } from 'single-spa';
import { AppContext } from './AppContext';
import { MicroAppNormalized, ModernMicroAppNormalized } from './types';

import { loadEntry } from '@qiankunjs/loader';
import { Noop } from '@wakeadmin/utils';
import isFunction from 'lodash/isFunction';
import { parcelUnmountDeferred, qiankunUnmountDeferred } from './shared';
import { Deferred } from './utils';

const isDev = process.env.NODE_ENV === 'development';

const LOG_PREFIX = '[Single SPA Parcel] ';

export class ParcelContext {
  private parcelInstance?: Parcel;

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
      this.parcelInstance = undefined;
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
        const deferred = this.mountDeferredWeakMap.get(this.parcelInstance!);
        if (deferred) {
          deferred.reject('unmount');
        }
        this.parcelInstance = undefined;
      });
    }

    return Promise.resolve();
  }

  // 并发可能还是有点问题
  private async loadApp(app: ModernMicroAppNormalized, target?: HTMLElement): Promise<void> {
    if (this.isLoading && this.currentApp?.name === app.name) {
      return await this.mountDeferredWeakMap.get(this.parcelInstance!)!.promise;
    }

    this.currentApp = app;
    this.isLoading = true;

    isDev && console.debug(`${LOG_PREFIX}开始加载子应用 -> ${app.name}`);

    await app.loader!(true);

    const container =
      target ??
      ((typeof app.container === 'string' ? document.querySelector(app.container) : app.container!) as HTMLElement);

    const loadedApp = Object.create(app, {
      container: {
        value: container,
      },
    });

    this.appContext.beforeLoad(loadedApp, window);

    await loadEntry(app.entry, container, {
      fetch: window.fetch,
    });

    isDev && console.debug(`${LOG_PREFIX}加载子应用完成 -> ${app.name}`);

    // 这里重新判断下当前正在加载的子应用是否是最新的
    // --mountA-----------loadedA----
    // ----mountB----loadedB---------
    // 假设有两个并发如上 可以发现A会在B后面运行下面的代码 从而导致子应用不正确
    if (this.currentApp.name !== app.name) {
      throw new Error('unmont');
    }

    const { bootstrap, mount, unmount, update } = this.getAppLifeCycles(app.name);

    const parcelConfig = {
      name: app.name,

      bootstrap,

      mount: [
        () => {
          isDev && console.debug(`${LOG_PREFIX}开始挂载子应用 -> ${app.name};  挂载点: `, container);
          parcelUnmountDeferred.resolve();
          parcelUnmountDeferred.reset();
          return this.appContext.beforeMount(loadedApp, window);
        },
        (props: Record<string, unknown>) =>
          mount({ ...props, container }).catch((err: unknown) =>
            console.debug(`${LOG_PREFIX}子应用 (${app.name}) 挂载失败`, err)
          ),
        () => {
          isDev && console.debug(`${LOG_PREFIX}挂载子应用完成 -> ${app.name}`);
          this.isLoading = false;
          return this.appContext.afterMount(loadedApp, window);
        },
      ],

      unmount: [
        () => {
          isDev && console.debug(`${LOG_PREFIX}开始卸载子应用 -> ${app.name}`);
          return this.appContext.beforeUnmount(loadedApp, window);
        },
        (props: Record<string, unknown>) =>
          unmount({ ...props, container }).catch((err: unknown) =>
            console.debug(`${LOG_PREFIX}子应用 (${app.name}) 卸载失败`, err)
          ),
        () => {
          isDev && console.debug(`${LOG_PREFIX}卸载子应用完成 -> ${app.name}`);
          parcelUnmountDeferred.resolve();
          this.currentApp = undefined;
          return this.appContext.afterUnmount(loadedApp, window);
        },
      ],

      update: Noop,
    };

    if (update) {
      parcelConfig.update = update;
    }

    this.parcelInstance = mountRootParcel(parcelConfig, { domElement: container });
  }

  private getAppLifeCycles(appName: string) {
    // @ts-expect-error
    const obj = window[appName];

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
}
