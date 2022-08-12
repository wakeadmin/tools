/**
 * 插件，用于修改 Vue 的一些行为
 */
import { isVue2 } from '@wakeadmin/demi';
import { camelCase, kebabCase, hasProp, addHiddenProp } from '@wakeadmin/utils';
import { getEventNameFindCache } from './declareComponent/process';

const INSTALLED = Symbol('h-plugin-installed');

export const plugin = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  install(Vue: any) {
    if (hasProp(Vue, INSTALLED)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('@wakeadmin/h 已经 use 过, 不要重复安装');
      }

      return;
    }

    addHiddenProp(Vue, INSTALLED, true);

    // 支持camelCase/kebab-case 多种方式调用
    if (isVue2) {
      const ctor = Vue;
      const _$emit = ctor.prototype.$emit;

      ctor.prototype.$emit = function (event: string, ...args: any[]) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const vm = this;

        // 缓存查找的结果
        const cache = getEventNameFindCache(vm);

        if (event in cache) {
          return _$emit.call(vm, cache[event], ...args);
        }

        const find = (name: string) => {
          if (name in vm._events) {
            return name;
          }

          return undefined;
        };

        const rc =
          find(event) ||
          find(
            event
              .split(':')
              .map(i => camelCase(i))
              .join(':')
          ) ||
          find(
            event
              .split(':')
              .map(i => kebabCase(i))
              .join(':')
          );

        if (rc != null) {
          cache[event] = rc;
          return _$emit.call(vm, rc, ...args);
        }

        return _$emit.apply(vm, arguments);
      };
    }
  },
};
