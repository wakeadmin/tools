/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LifeCycleFn, LoadableApp } from 'qiankun';
import { shallowRef, reactive, computed, shallowReactive } from 'vue';
import { addErrorHandler } from 'single-spa';

import { IBay, MicroApp, BayHooks, Parameter, MicroAppStatus } from '../../types';

const TERMINATED_STATUS: MicroAppStatus[] = [
  'MOUNTED',
  'UPDATING',
  'UNMOUNTING',
  'UNLOADING',
  'SKIP_BECAUSE_BROKEN',
  'LOAD_ERROR',
];

/**
 * 应用上下文
 */
export class AppContext {
  private bay: IBay;

  /**
   * 当前激活的 app
   */
  currentApp = shallowRef<MicroApp>();

  /**
   * 应用状态
   */
  appsStatus: Record<string, MicroAppStatus> = reactive({});

  /**
   * 应用错误信息
   */
  appsError: Record<string, Error> = shallowReactive({});

  /**
   * 当前应用的状态
   */
  currentAppStatus = computed<MicroAppStatus>(() => {
    const app = this.currentApp;
    const status = this.appsStatus;

    if (app.value == null) {
      return 'NOT_LOADED';
    }

    return status[app.value.name] ?? 'NOT_LOADED';
  });

  /**
   * 当前应用的错误信息
   */
  currentAppError = computed<Error | undefined>(() => {
    const app = this.currentApp;

    if (app.value == null || !this.isCurrentAppError) {
      return undefined;
    }

    return this.appsError[app.value.name];
  });

  /**
   * 当前应用是否处于加载状态
   */
  isCurrentAppLoading = computed(() => {
    const status = this.currentAppStatus.value;

    return !TERMINATED_STATUS.includes(status);
  });

  /**
   * 当前应用是否异常
   */
  isCurrentAppError = computed(() => {
    const status = this.currentAppStatus.value;

    return status === 'LOAD_ERROR';
  });

  /**
   * 当前正在加载的应用
   */
  currentLoadingApp = shallowRef<MicroApp>();

  /**
   * 当前正在挂载的应用
   */
  currentMountingApp = shallowRef<MicroApp>();

  constructor(bay: IBay) {
    this.bay = bay;
    addErrorHandler(error => {
      const appName = error.appOrParcelName;
      const app = this.bay.getApp(appName)!;

      console.log('[mapp] 应用加载失败: ', app, error);
      this.appsError[appName] = error;
    });

    window.addEventListener('mapp:first-load', evt => {
      const { app: appName } = (evt as CustomEvent<{ app: string }>).detail;
      const app = this.bay.getApp(appName)!;
      this.currentLoadingApp.value = this.currentApp.value = app;
    });

    window.addEventListener('single-spa:app-change', (evt: Event) => {
      const { newAppStatuses } = (evt as CustomEvent<{ newAppStatuses: { [app: string]: MicroAppStatus } }>).detail;
      Object.assign(this.appsStatus, newAppStatuses);
    });
  }

  beforeLoad: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks(
      'beforeAppLoad',
      (this.currentLoadingApp.value = this.currentApp.value = global.__MAPP_CURRENT_APP__ = this.getApp(app))
    );
  };

  beforeMount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('beforeAppMount', (this.currentMountingApp.value = this.currentApp.value = this.getApp(app)));
  };

  afterMount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('afterAppMount', this.getApp(app));
  };

  beforeUnmount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('beforeAppUnmount', this.getApp(app));
  };

  afterUnmount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('afterAppUnmount', this.getApp(app));
  };

  private getApp(app: LoadableApp<any>) {
    return this.bay.getApp(app.name)!;
  }

  private triggerHooks<Name extends keyof BayHooks, Option = Parameter<BayHooks[Name]>>(name: Name, option: Option) {
    (this.bay as any).triggerHooks(name, option);
  }
}
