import { LifeCycleFn } from 'qiankun';
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
    this.triggerHooks('beforeAppLoad', (this.currentLoadingApp = global.__MAPP_CURRENT_APP__ = app as MicroApp));
  };

  beforeMount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('beforeAppMount', (this.currentMountingApp = app as MicroApp));
  };

  afterMount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('afterAppMount', app);
  };

  beforeUnmount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('beforeAppUnmount', app);
  };

  afterUnmount: LifeCycleFn<any> = async (app, global) => {
    this.triggerHooks('afterAppUnmount', app);
  };

  private triggerHooks<Name extends keyof BayHooks, Option = Parameter<BayHooks[Name]>>(name: Name, option: Option) {
    (this.bay as any).triggerHooks(name, option);
  }
}
