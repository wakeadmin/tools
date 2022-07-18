/* eslint-disable consistent-return */
import { hasProp, addHiddenProp, PromiseQueue } from '@wakeadmin/utils';

import { asyncModuleLoader, httpLoader } from './loader';
import { I18nAsyncBundle, I18nBundle } from './types';
import { LayerLink } from './layer';

/**
 * 语言包缓存
 */
const LOADED = Symbol('loaded');
const LOADED_URLS = new Set();
const LAYER = Symbol('layer');
const DEFAULT_LAYER = 10;

function isLoaded(bundle: I18nBundle) {
  if (typeof bundle === 'string') {
    return LOADED_URLS.has(bundle);
  }

  return hasProp(bundle, LOADED);
}

function setLoaded(bundle: I18nBundle) {
  if (typeof bundle === 'string') {
    LOADED_URLS.add(bundle);
  } else {
    addHiddenProp(bundle, LOADED, 1);
  }
}

/**
 * 语言包注册器
 */
export class BundleRegister {
  private executing = false;

  private resources: { [locale: string]: Set<I18nBundle> } = {};

  private layerLinks: { [locale: string]: LayerLink } = {};

  /**
   * 缓存资源的层级
   */
  private resourceLayer: Map<I18nBundle, number> = new Map();

  private pendingQueue = new PromiseQueue<void>();

  constructor(
    private registerBundle: (locale: string, bundle: Record<string, any>) => void,
    private getLocaleChain: () => string[],
    private onBundleChange: () => void
  ) {}

  /**
   * 调度语言包加载和合并
   */
  async schedulerMerge(): Promise<void> {
    if (this.executing) {
      return await this.pendingQueue.push();
    }

    try {
      this.executing = true;
      // 等待更多 bundle 插入，批量执行
      await Promise.resolve();

      // 加载当前语言
      const localeChain = this.getLocaleChain();

      let messages: { [locale: string]: Record<string, any>[] } = {};
      let task: Promise<void>[] = [];

      for (const locale of localeChain) {
        const resource = this.resources[locale.toLowerCase()];

        if (resource == null) {
          continue;
        }

        for (const bundle of resource.values()) {
          if (isLoaded(bundle)) {
            continue;
          }

          const layer = this.resourceLayer.get(bundle) ?? DEFAULT_LAYER;

          if (typeof bundle === 'function') {
            // 异步加载函数
            task.push(
              (async () => {
                const loadedBundle = await asyncModuleLoader(bundle as I18nAsyncBundle);
                if (loadedBundle) {
                  this.setLayer(loadedBundle, layer);
                  (messages[locale] ??= []).push(loadedBundle);
                }
              })()
            );
          } else if (typeof bundle === 'string') {
            // http 链接
            task.push(
              (async () => {
                const loadedBundle = await httpLoader(bundle);

                if (loadedBundle) {
                  this.setLayer(loadedBundle, layer);
                  (messages[locale] ??= []).push(loadedBundle);
                }
              })()
            );
          } else {
            // 直接就是语言包
            this.setLayer(bundle, layer);
            (messages[locale] ??= []).push(bundle);
          }

          setLoaded(bundle);
        }
      }

      if (task.length) {
        try {
          await Promise.all(task);
        } catch (err) {
          console.warn(`[bay] 加载语言包失败:`, err);
        }
      }

      const messageKeys = Object.keys(messages);

      if (messageKeys.length) {
        const messageToUpdate: { [locale: string]: LayerLink } = {};
        // 合并
        for (const locale of messageKeys) {
          const layerLink = (this.layerLinks[locale] ??= new LayerLink());

          for (const bundle of messages[locale]) {
            const layer = this.getLayer(bundle);

            layerLink.assignLayer(layer, bundle);
          }

          messageToUpdate[locale] = layerLink;
        }

        // 触发更新
        for (const locale in messageToUpdate) {
          this.registerBundle(locale, messageToUpdate[locale].flattenLayer());
        }

        this.onBundleChange();
      }
    } catch (err) {
      console.error(`[i18n] 语言包加载失败`, err);
    } finally {
      this.executing = false;
      this.pendingQueue.flushResolve();
    }
  }

  /**
   * 注册语言包
   */
  registerBundles = async (bundles: { [locale: string]: I18nBundle }, layer: number = 10): Promise<void> => {
    let dirty = false;
    Object.keys(bundles).forEach(k => {
      const normalizedKey = k.toLowerCase();
      const list = (this.resources[normalizedKey] ??= new Set());
      const bundle = bundles[k];

      const add = (b: I18nBundle) => {
        if (!list.has(b)) {
          list.add(b);
          this.resourceLayer.set(b, layer);
          dirty = true;
        }
      };

      if (Array.isArray(bundle)) {
        for (const child of bundle) {
          add(child);
        }
      } else {
        add(bundle);
      }
    });

    if (dirty) {
      return await this.schedulerMerge();
    }
  };

  private getLayer(value: any): number {
    return value?.[LAYER] ?? DEFAULT_LAYER;
  }

  private setLayer(value: object, layer: number) {
    Object.defineProperty(value, LAYER, {
      value: layer,
      enumerable: false,
    });
  }
}
