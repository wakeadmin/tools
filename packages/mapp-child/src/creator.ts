/* eslint-disable @typescript-eslint/return-await */
import type { LifeCycles } from 'single-spa';
import type { CreateMicroAppOptions } from '@wakeadmin/mapp-shared';
import { isMicroApp, getMicroApp } from './bay';

export { CreateMicroAppOptions };

/**
 * 集成子应用
 * @param options
 */
export function createMicroApp<Props = {}>(options: CreateMicroAppOptions<Props>) {
  if (!isMicroApp) {
    const NoopProps = {};
    options.bootstrap?.(NoopProps as any);
    options.mount(undefined, NoopProps as any);
    return;
  }

  const app = getMicroApp();

  if (app?.name == null) {
    throw new Error(`[mapp/child] 子应用 name 不能为空，且必须全局唯一`);
  }

  const exposes: LifeCycles<{ container: HTMLElement }> & { expose: CreateMicroAppOptions['expose'] } = {
    bootstrap: async props => {
      return await options.bootstrap?.(props as unknown as Props);
    },
    mount: async props => {
      return await options.mount?.(props?.container, props as unknown as Props);
    },
    update: async props => {
      return await options.update?.(props as unknown as Props);
    },
    unmount: async props => {
      return await options.unmount?.(props as unknown as Props);
    },
    // 共享 API
    expose: options.expose,
  };

  // 挂载到 window，方便 qiankun 识别
  // @ts-expect-error
  window[app.name] = exposes;
}
