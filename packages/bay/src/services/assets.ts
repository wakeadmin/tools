import { NamedRegistry } from '@wakeadmin/utils';

/**
 * 静态资源注册
 *
 * 通常用于主题配置场景，比如默认头像、logo. 可以通过这个方法获取外部注入的静态资源链接
 */

declare global {
  /**
   * 声明资源，方便只能提示
   */
  interface MappAssetKey {
    BAY_LOGO: 'logo';
    BAY_AVATAR: '头像';
  }

  interface Window {
    /**
     * 全局注册点, 借鉴 webpack 的 chunk 加载
     * 使用方式: 一定要使用 push 方法
     * (window.__MAPP_ASSETS__ = window.__MAPP_ASSETS__ || []).push(['key', 'value'])
     */
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __MAPP_ASSETS__: [string, string][];
  }
}

const registry = new NamedRegistry<string>();

/**
 * 获取静态资源
 * @param key
 * @param fallback 默认值, 最佳实践是必须提供
 */
export function getAsset<T extends keyof MappAssetKey, Desc = MappAssetKey[T]>(key: T, fallback: string): string;
export function getAsset(key: string, fallback: string): string;
export function getAsset(key: string, fallback?: string): string | undefined {
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
  registry.unregister(key);
  registry.register(key, value);
}

/**
 * 监听静态资源变动
 */
export const listenAssets = registry.subscribe;

// 初始化
// eslint-disable-next-line no-lone-blocks
{
  if (window.__MAPP_ASSETS__) {
    window.__MAPP_ASSETS__.forEach(i => {
      registerAsset(i[0], i[1]);
    });
  }

  const mount = (window.__MAPP_ASSETS__ = []);
  mount.push = function (...items: any[]): number {
    items.forEach(i => {
      registerAsset(i[0], i[1]);
    });
    return 0;
  };
}
