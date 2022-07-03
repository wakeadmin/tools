/* eslint-disable consistent-return */
import { hasProp, addHiddenProp, isESModule, PromiseQueue } from '@wakeadmin/utils';

import { I18nBundle } from './types';

/**
 * 语言包缓存
 */
const LOADED = Symbol('loaded');

function isLoaded(obj: any) {
  return hasProp(obj, LOADED);
}

function setLoaded(obj: any) {
  addHiddenProp(obj, LOADED, 1);
}

/**
 * 语言包注册器
 */
export class BundleRegister {
  private executing = false;

  private resources: { [locale: string]: Set<I18nBundle> } = {};

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

          // 异步加载函数
          if (typeof bundle === 'function') {
            task.push(
              (async () => {
                const module = await bundle();
                (messages[locale] ??= []).push(isESModule(module) ? module.default : module);
              })()
            );
          } else {
            // 直接就是语言包
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
        // 合并
        for (const locale of messageKeys) {
          for (const bundle of messages[locale]) {
            this.registerBundle(locale, bundle);
          }
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
  registerBundles = async (bundles: { [locale: string]: I18nBundle }): Promise<void> => {
    let dirty = false;
    Object.keys(bundles).forEach(k => {
      const normalizedKey = k.toLowerCase();
      const list = (this.resources[normalizedKey] ??= new Set());
      const b = bundles[k];

      if (!list.has(b)) {
        list.add(b);
        dirty = true;
      }
    });

    if (dirty) {
      return await this.schedulerMerge();
    }
  };
}
