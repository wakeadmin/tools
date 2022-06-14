import { set, isVue2, isReactive } from 'vue-demi';

import { isPlainObject } from '../utils';

import { NotUndefined } from './types';

/**
 * 给 props 添加默认值，只能在 setup 中使用
 */
export function withDefaults<T extends {}, D extends { [K in keyof T]?: T[K] }>(
  props: T,
  defaultValue: D
): T & { [K in keyof D]: K extends keyof T ? NotUndefined<T[K]> : never } {
  if (process.env.NODE_ENV !== 'production' && (!isReactive(props) || !isPlainObject(props))) {
    throw new Error(`withDefaults() expects a reactive object but received a plain one.`);
  }

  const DEFAULT_VALUE_KEYS = Object.keys(defaultValue);

  // vue2 如果 props 属性为空，可能不会响应，这里最好设置默认值
  if (isVue2) {
    for (const key in defaultValue) {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        set(props, key, defaultValue[key]);
      }
    }
  }

  return new Proxy(props, {
    get(target, p) {
      const value = Reflect.get(target, p);
      if (value === undefined && Reflect.has(defaultValue, p)) {
        return Reflect.get(defaultValue, p);
      }
      return value;
    },
    // 让 default value 可被枚举
    getOwnPropertyDescriptor(target, p) {
      if (Reflect.has(target, p)) {
        return Reflect.getOwnPropertyDescriptor(target, p);
      }

      return Reflect.getOwnPropertyDescriptor(defaultValue, p);
    },
    ownKeys(target) {
      const keys = Reflect.ownKeys(target);
      for (const key of DEFAULT_VALUE_KEYS) {
        if (!keys.includes(key)) {
          keys.push(key);
        }
      }

      return keys;
    },
  }) as any;
}
