/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/array-type */
import { Plugin } from 'vue';
import { hasProp, addHiddenProp } from '@wakeadmin/utils';

const INSTALLED_MARK = Symbol('ce-installed');

/**
 * 从 vue-cli-plugin-ce 注入
 */
export type ElementMatcher = string | RegExp | (string | RegExp)[];

export interface PluginOptions {
  /**
   * 是否为自定义组件
   */
  customElement: ElementMatcher;

  /**
   * 声明强制使用 domProp 元素
   */
  mustUseProp?: ElementMatcher;
}

export type MustUseProp = (tag: string, type?: string | null, name?: string) => boolean;

export const createMatcher = (rules: ElementMatcher | undefined) => {
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
/**
 * 运行时插件
 */
export const plugin: Plugin = (app, option?: PluginOptions) => {
  if (hasProp(app, INSTALLED_MARK)) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[@wakeadmin/ce] 插件安装了多次`);
    }

    return;
  }

  addHiddenProp(app, INSTALLED_MARK, true);

  const isVue2 = app.version.startsWith('2.');
  const options: Partial<PluginOptions> = {
    ...((process.env.CE_OPTIONS as PluginOptions | undefined) ?? {}),
    ...option,
  };

  const { customElement, mustUseProp } = options;

  if (isVue2) {
    // Vue2
    const ignoredElements: Array<string | RegExp> = ((app.config as any).ignoredElements ??= []);
    if (customElement) {
      ignoredElements.push(...(Array.isArray(customElement) ? customElement : [customElement]));
    }

    if (mustUseProp) {
      const originMustUseProp = (app.config as any).mustUseProp as MustUseProp | undefined;
      const matcher = createMatcher(mustUseProp);

      const patchedMustUseProp: MustUseProp = function (this: any, tag, type, name) {
        return originMustUseProp?.apply(this, arguments as any) || matcher(tag);
      };

      (app.config as any).mustUseProp = patchedMustUseProp;
    }
  } else {
    // Vue3
    const isCustomElementMatcher = createMatcher(customElement);

    const originIsCustomElement = app.config.compilerOptions.isCustomElement;

    app.config.compilerOptions.isCustomElement = tag => {
      return originIsCustomElement?.(tag) || isCustomElementMatcher(tag);
    };
  }
};
