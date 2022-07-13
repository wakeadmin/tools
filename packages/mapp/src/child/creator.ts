import { LifeCycles } from 'single-spa';
import { isMicroApp, getMicroApp } from './bay';

export interface MicroAppOptions<Props = {}> {
  /**
   * 应用启动逻辑
   */
  bootstrap?: (props: Props) => Promise<void>;

  /**
   * 应用挂载
   */
  mount: (container: HTMLElement | undefined, props: Props) => Promise<void>;

  /**
   * 应用更新
   */
  update?: (props: Props) => Promise<void>;

  /**
   * 应用卸载
   */
  unmount: (props: Props) => Promise<void>;

  /**
   * 应用对外暴露的共享 API
   */
  expose?: () => Promise<Record<string, any>>;
}

/**
 * 集成子应用
 * @param options
 */
export function createMicroApp<Props = {}>(options: MicroAppOptions<Props>) {
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

  const exposes: LifeCycles<{ container: HTMLElement }> & { expose: MicroAppOptions['expose'] } = {
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
