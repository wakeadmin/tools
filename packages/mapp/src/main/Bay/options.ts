/* eslint-disable no-lone-blocks */
import { removeTrailingSlash } from '@wakeadmin/utils';
import path from 'path-browserify';
import { pathToActiveWhen } from 'single-spa';

import { BayOptions, MicroApp } from '../../types';

import { DEFAULT_ROOT_FOR_CHILD, MAX_WAIT_TIMES } from '../constants';
import { parcelUnmountDeferred, qiankunUnmountDeferred } from './deferred';
import { pushMountQueue } from './mount-delay';
import { MicroAppNormalized, ModernMicroAppNormalized } from './types';
import { normalizeUrl, runPromiseChain, toArray, trimBaseUrl } from './utils';

function hasContainer(container: string | HTMLElement) {
  if (typeof container === 'string') {
    return !!document.querySelector(container);
  }

  return !!container;
}

const createLoader = (container: string | HTMLElement, name: string, waitReady?: () => Promise<void>) => {
  // qiankun 会等待这里 resolve 才会开始挂载
  // 我们在这里等待路由 resolve
  let loaded = false;
  let retryTime = 0;

  async function waitMounterSetup() {
    // 放入等待队列
    await new Promise<void>(resolve => {
      pushMountQueue(resolve);
    });

    if (!hasContainer(container)) {
      if (retryTime >= MAX_WAIT_TIMES) {
        throw new Error(`[mapp] 加载子应用(${name})：等待挂载点超时`);
      }

      retryTime++;
      // 继续等待
      await waitMounterSetup();
    } else {
      // 等待完成
      retryTime = 0;
    }
  }

  // 这个方法会被调用三次
  // 第一次：应用激活时，这时候应用静态资源还没有加载
  // 第二次: 应用挂载之前，这时候应用静态资源已经加载完毕，准备开始挂载
  // 第三次：应该挂载完成
  return async (loading: boolean): Promise<void> => {
    if (!loading) {
      return undefined;
    }

    if (!loaded) {
      // 首次加载时不需要阻塞，这里耗时比较长，通常vue-router 已经挂载了
      loaded = true;
      window.dispatchEvent(new CustomEvent('mapp:first-load', { detail: { app: name } }));
    }

    if (!hasContainer(container)) {
      // 等待路由就绪
      return await waitMounterSetup();
    }

    // 外部定义的就绪器等待
    if (typeof waitReady === 'function') {
      return await waitReady();
    }

    return undefined;
  };
};

export function normalizeApps(
  baseUrl: string,
  apps: MicroApp[],
  waitReady?: () => Promise<void>
): MicroAppNormalized[] {
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
      loader: createLoader(container, app.name, waitReady),
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
  let { baseUrl = process.env.MAPP_BASE_URL ?? '/', hooks = {}, apps, bayReady, ...others } = options;

  baseUrl = normalizeUrl(baseUrl);

  return {
    baseUrl,
    apps: normalizeApps(
      baseUrl,
      apps,
      runPromiseChain([bayReady || (() => Promise.resolve()), () => parcelUnmountDeferred.promise])
    ),
    hooks: {
      ...hooks,
      beforeAppMount: app => {
        if (hooks.beforeAppMount) {
          hooks.beforeAppMount(app);
        }
        qiankunUnmountDeferred.reset();
      },
      afterAppUnmount(app) {
        if (hooks.afterAppUnmount) {
          hooks.afterAppUnmount(app);
        }
        qiankunUnmountDeferred.resolve();
      },
    },
    ...others,
  };
}

export function normalizeModernApps(app: MicroAppNormalized): ModernMicroAppNormalized {
  return Object.assign(app, {
    activeRuleWhen: toArray(app.activeRule).map(rule => pathToActiveWhen(rule, true)),
  });
}
