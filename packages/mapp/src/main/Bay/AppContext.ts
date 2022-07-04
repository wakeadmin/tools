/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LifeCycleFn, LoadableApp } from 'qiankun';
import { IBay, MicroApp, BayHooks, Parameter } from '../../types';

/**
 * 应用上下文
 */
export class AppContext {
  private bay: IBay;

  /**
   * 当前正在加载的应用
   */
  currentLoadingApp: MicroApp | undefined;

  /**
   * 当前正在挂载的应用
   */
  currentMountingApp: MicroApp | undefined;

  constructor(bay: IBay) {
    this.bay = bay;
  }

  beforeLoad: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('beforeAppLoad', (this.currentLoadingApp = global.__MAPP_CURRENT_APP__ = this.getApp(app)));
  };

  beforeMount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('beforeAppMount', (this.currentMountingApp = this.getApp(app)));
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
