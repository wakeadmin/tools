/**
 * 排除拦截
 */
import { ExcludeAssetFilter } from '@wakeadmin/mapp-shared';

export class AssetFilter {
  private filters: ExcludeAssetFilter[] = [];
  private cache = new Map<string, boolean>();

  addFiler(rule: ExcludeAssetFilter) {
    this.filters.push(rule);

    // 规则变化，清除缓存
    this.cache.clear();
  }

  filter(src: string): boolean {
    if (this.cache.has(src)) {
      return this.cache.get(src) as boolean;
    }

    const test = (rules: ExcludeAssetFilter[]) => {
      let found = false;
      for (const rule of rules) {
        if (typeof rule === 'string') {
          if (src.includes(rule)) {
            found = true;
            break;
          }
        } else if (rule instanceof RegExp) {
          if (rule.test(src)) {
            found = true;
            break;
          }
        } else if (typeof rule === 'function') {
          if (rule(src)) {
            found = true;
            break;
          }
        } else if (Array.isArray(rule)) {
          if (test(rule)) {
            found = true;
            break;
          }
        }
      }

      return found;
    };

    const result = test(this.filters);

    this.cache.set(src, result);

    return result;
  }
}
