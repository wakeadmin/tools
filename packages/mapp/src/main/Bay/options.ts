/* eslint-disable no-lone-blocks */
import { removeTrailingSlash } from '@wakeadmin/utils';
import path from 'path-browserify';

import { BayOptions, MicroApp } from '../../types';

import { DEFAULT_ROOT_FOR_CHILD } from '../constants';
import { pushMountQueue } from './mount-delay';
import { MicroAppNormalized } from './types';
import { normalizeUrl, trimBaseUrl } from './utils';

function hasContainer(container: string | HTMLElement) {
  if (typeof container === 'string') {
    return !!document.querySelector(container);
  }

  return !!container;
}

const createLoader = (container: string | HTMLElement, name: string) => {
  // qiankun 会等待这里 resolve 才会开始挂载
  // 我们在这里等待路由 resolve
  let loaded = false;

  return async (loading: boolean): Promise<void> => {
    if (!loading) {
      return undefined;
    }

    if (!loaded) {
      // 首次加载时不需要阻塞，这里耗时比较长，通常vue-router 已经挂载了
      loaded = true;
      window.dispatchEvent(new CustomEvent('mapp:first-load', { detail: { app: name } }));
      return undefined;
    }

    if (!hasContainer(container)) {
      // 等待路由就绪
      return await new Promise<void>(resolve => {
        pushMountQueue(() => {
          resolve();
        });
      });
    }

    return undefined;
  };
};

export function normalizeApps(baseUrl: string, apps: MicroApp[]): MicroAppNormalized[] {
  // 所有 activeRule 都基于基座 base
  const tryAddBaseToActiveRule = (route: string) => {
    if (route.startsWith(baseUrl)) {
      return normalizeUrl(route);
    }

    return `${removeTrailingSlash(baseUrl)}${normalizeUrl(route)}`;
  };

  // 如果是相对路径，都相对于基座 base
  const tryAddBaseToEntry = (entry: string) => {
    if (entry.startsWith('http') || entry.startsWith('//') || entry.startsWith('/')) {
      return entry;
    }

    return path.join(baseUrl, entry);
  };

  const appNameSet = new Set<string>();
  const activeRuleSet = new Set<string>();
  // const entrySet = new Set<string>();

  // 将 base 追加到 app 上
  return apps.map(app => {
    const { activeRule, entry, ...other } = app;
    const normalizedActiveRule = Array.isArray(activeRule)
      ? activeRule.map(tryAddBaseToActiveRule)
      : tryAddBaseToActiveRule(activeRule);
    const normalizedEntry = tryAddBaseToEntry(entry);

    const warn = (message: string) => {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(message);
      } else {
        console.error(message);
      }
    };

    {
      //  检查name、activeRule、entry 是否重复
      if (appNameSet.has(app.name)) {
        warn(`[mapp] 微应用名称重复: ${app.name}`);
      }

      if (Array.isArray(normalizedActiveRule)) {
        const found = normalizedActiveRule.find(i => activeRuleSet.has(i));
        if (found) {
          warn(`[mapp] 微应用 activeRule 重复: ${app.name} ${found}`);
        }
      } else if (activeRuleSet.has(normalizedActiveRule)) {
        warn(`[mapp] 微应用 activeRule 重复: ${app.name} ${normalizedActiveRule}`);
      }

      // if (entrySet.has(normalizedEntry)) {
      //   throw new Error(`[mapp] 微应用 entry 重复: ${app.name} ${normalizedEntry}`);
      // }

      appNameSet.add(app.name);
      if (Array.isArray(normalizedActiveRule)) {
        normalizedActiveRule.forEach(i => activeRuleSet.add(i));
      } else {
        activeRuleSet.add(normalizedActiveRule);
      }

      // 暂时不检查 entry 重复
      // entrySet.add(normalizedEntry);
    }

    const container = app.container ?? DEFAULT_ROOT_FOR_CHILD;

    return {
      activeRule: normalizedActiveRule,
      activeRuleRaw: Array.isArray(normalizedActiveRule)
        ? normalizedActiveRule.map(i => trimBaseUrl(baseUrl, i))
        : trimBaseUrl(baseUrl, normalizedActiveRule),
      entry: normalizedEntry,
      container,
      loader: createLoader(container, app.name),
      ...other,
    };
  });
}

export function groupAppsByIndependent(apps: MicroAppNormalized[]) {
  const independentApps: MicroAppNormalized[] = [];
  const nonIndependentApps: MicroAppNormalized[] = [];

  for (const app of apps) {
    if (app.independent) {
      independentApps.push(app);
    } else {
      nonIndependentApps.push(app);
    }
  }

  return { independentApps, nonIndependentApps };
}

/**
 * 规范化参数
 * @param options
 * @returns
 */
export function normalizeOptions(options: BayOptions): BayOptions {
  let { baseUrl = process.env.MAPP_BASE_URL ?? '/', apps, ...others } = options;

  baseUrl = normalizeUrl(baseUrl);

  return {
    baseUrl,
    apps: normalizeApps(baseUrl, apps),
    ...others,
  };
}
