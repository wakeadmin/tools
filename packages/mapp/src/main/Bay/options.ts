import { removeTrailingSlash, addHeadingSlash } from '@wakeadmin/utils';
import path from 'path-browserify';

import { BayOptions, MicroApp } from '../../types';

import { DEFAULT_ROOT } from '../constants';

export function normalizeApps(baseUrl: string, apps: MicroApp[]) {
  // 所有 activeRule 都基于基座 base
  const tryAddBaseToActiveRule = (activeRule: string) => {
    if (activeRule.startsWith(baseUrl)) {
      return activeRule;
    }

    return `${removeTrailingSlash(baseUrl)}${addHeadingSlash(removeTrailingSlash(activeRule))}`;
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
    const normalizedActiveRule = tryAddBaseToActiveRule(activeRule);
    const normalizedEntry = tryAddBaseToEntry(entry);

    //  检查name、activeRule、entry 是否重复
    if (process.env.NODE_ENV !== 'production') {
      if (appNameSet.has(app.name)) {
        throw new Error(`[mapp] 微应用名称重复: ${app.name}`);
      }

      if (activeRuleSet.has(normalizedActiveRule)) {
        throw new Error(`[mapp] 微应用 activeRule 重复: ${app.name} ${normalizedActiveRule}`);
      }

      // if (entrySet.has(normalizedEntry)) {
      //   throw new Error(`[mapp] 微应用 entry 重复: ${app.name} ${normalizedEntry}`);
      // }

      appNameSet.add(app.name);
      activeRuleSet.add(normalizedActiveRule);

      // 暂时不检查 entry 重复
      // entrySet.add(normalizedEntry);
    }

    return {
      activeRule: normalizedActiveRule,
      entry: normalizedEntry,
      container: app.container ?? DEFAULT_ROOT,
      ...other,
    };
  });
}

export function groupAppsByIndependent(apps: MicroApp[]) {
  const independentApps: MicroApp[] = [];
  const nonIndependentApps: MicroApp[] = [];

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

  return {
    baseUrl,
    apps: normalizeApps(baseUrl, apps),
    ...others,
  };
}
