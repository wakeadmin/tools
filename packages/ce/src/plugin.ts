/* eslint-disable @typescript-eslint/array-type */
import { Plugin } from 'vue';
import { hasProp, addHiddenProp } from '@wakeadmin/utils';
import { IGNORE_PROPS } from './constants';

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
        return true;
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

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const __CE_OPTIONS__: string | undefined;
}

export function getOptionsFromEnv(): PluginOptions | undefined {
  if (typeof __CE_OPTIONS__ !== 'undefined') {
    // eslint-disable-next-line
    return new Function(`return ${__CE_OPTIONS__}`)();
  }

  return undefined;
}

export function isIgnoreAttribute(attr: string) {
  return IGNORE_PROPS.has(attr);
}

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
    ...getOptionsFromEnv(),
    ...option,
  };

  const { customElement, mustUseProp } = options;

  if (isVue2) {
    // Vue2
    const config = app.config as any;

    // 自定义元素识别
    const ignoredElements: Array<string | RegExp> = (config.ignoredElements ??= []);
    if (customElement) {
      ignoredElements.push(...(Array.isArray(customElement) ? customElement : [customElement]));
    }

    // 强制使用 props
    if (mustUseProp) {
      type MustUseProp = (tag: string, type: string | null, name: string) => boolean;

      const originMustUseProp = config.mustUseProp as MustUseProp | undefined;
      const matcher = createMatcher(mustUseProp);

      const patchedMustUseProp: MustUseProp = function (this: any, tag, type, name) {
        return originMustUseProp?.apply(this, arguments as any) || (!isIgnoreAttribute(name) && matcher(tag));
      };

      config.mustUseProp = patchedMustUseProp;
    }
  } else {
    // Vue3
    // 不做处理，避免警告
    // const isCustomElementMatcher = createMatcher(customElement);
    // const mustUsePropMatcher = createMatcher(mustUseProp);
    // const originIsCustomElement = app.config.compilerOptions.isCustomElement;
    // app.config.compilerOptions.isCustomElement = tag => {
    //   return originIsCustomElement?.(tag) || isCustomElementMatcher(tag);
    // };
    // // 和 vue2 兼容
    // // @ts-expect-error
    // app.config.compilerOptions.mustUseProp = (tag: string, type: string | null, name) => {
    //   return !isIgnoreAttribute(name) && mustUsePropMatcher(tag);
    // };
  }
};
