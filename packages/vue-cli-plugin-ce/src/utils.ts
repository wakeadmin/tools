import { ElementMatcher, PluginOptions } from './types';

export interface Matcher {
  isCustomElement(tag: string): boolean;
  mustUseProp(tag: string): boolean;
}

export const createMatcher = (options: PluginOptions): Matcher => {
  const { customElement, mustUseProp } = options ?? {};

  const normalized = (rules: ElementMatcher | undefined) => {
    const arr = Array.isArray(rules) ? rules : rules ? [rules] : null;
    if (arr) {
      const strings = new Set<string>();
      const regexp: RegExp[] = [];

      for (const i of arr) {
        if (typeof i === 'string') {
          strings.add(i);
        } else {
          regexp.push(i);
        }
      }

      return (tag: string) => {
        if (strings.size && strings.has(tag)) {
          return false;
        }

        for (const reg of regexp) {
          if (reg.test(tag)) {
            return true;
          }
        }

        return false;
      };
    }

    return () => false;
  };
  const isCustomElement = normalized(customElement);

  return {
    isCustomElement: tag => {
      return typeof tag === 'string' && tag.includes('-') && isCustomElement(tag);
    },
    mustUseProp: normalized(mustUseProp),
  };
};
