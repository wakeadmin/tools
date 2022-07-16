/* eslint-disable @typescript-eslint/no-use-before-define */
/**
 * 静态资源注册
 *
 * 通常用于主题配置场景，比如默认头像、logo. 可以通过这个方法获取外部注入的静态资源链接
 */
import { NamedRegistry } from '@wakeadmin/utils';

type MappAssetPayload = [string, string] | Record<string, string>;

declare global {
  /**
   * 声明资源，方便只能提示
   * 命名规范:
   *   TYPE_MODULE_NAME:
   *     TYPE: 类型，如 IMG、ICO、TXT,
   *     MODULE: 模块名称，如 BAY
   *     NAME: 资源命名
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface MappAssetKey {}

  /**
   * 全局注册点, 借鉴 webpack 的 chunk 加载
   * 使用方式: 一定要使用 push 方法
   * (window.__MAPP_ASSETS__ = window.__MAPP_ASSETS__ || []).push(['key', 'value'])
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/array-type, no-var
  var __MAPP_ASSETS__: Array<MappAssetPayload> | undefined;
}

const registry = new NamedRegistry<string>();
let mounted = false;

function mountGlobalIfNeed() {
  if (mounted) {
    return;
  }
  mounted = true;

  // 初始化
  const register = (payload: MappAssetPayload) => {
    if (Array.isArray(payload)) {
      registerAsset(payload[0], payload[1]);
    } else {
      Object.keys(payload).forEach(k => {
        registerAsset(k, payload[k]);
      });
    }
  };

  if (globalThis.__MAPP_ASSETS__) {
    globalThis.__MAPP_ASSETS__.forEach(register);
  }

  const mount: any[] = (globalThis.__MAPP_ASSETS__ = []);
  const _push = mount.push;

  mount.push = function (...items: any[]): number {
    items.forEach(register);

    return _push.apply(mount, items);
  };
}

/**
 * 获取静态资源
 * @param key
 * @param fallback 默认值, 最佳实践是必须提供
 */
export function getAsset<T extends keyof MappAssetKey, Desc = MappAssetKey[T]>(key: T, fallback: string): string;
export function getAsset(key: string, fallback: string): string;
export function getAsset(key: string, fallback?: string): string | undefined {
  mountGlobalIfNeed();
  return registry.registered(key) ?? fallback;
}

/**
 * 注册静态资源
 * @param key
 * @param value 通常是链接或者文本内容
 */
export function registerAsset(key: keyof MappAssetKey, value: string): void;
export function registerAsset(key: string, value: string): void;
export function registerAsset(key: string, value: string): void {
  mountGlobalIfNeed();

  registry.unregister(key);
  registry.register(key, value);
}

/**
 * 监听静态资源变动
 */
export const listenAssets = registry.subscribe;
