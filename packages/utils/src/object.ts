import omit from 'lodash/omit';
import pick from 'lodash/pick';
import merge from 'lodash/merge';

export { omit, pick, merge };

/**
 * 查看属性是否定义
 * @param target
 * @param key
 * @returns
 */
export function hasProp(target: Object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(target, key);
}

/**
 * 添加不能枚举的字段
 * @param target
 * @param key
 */
export function addHiddenProp(target: Object, key: PropertyKey, value: any) {
  Object.defineProperty(target, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value,
  });
}

export function isPropertyKey(key: any): key is PropertyKey {
  switch (typeof key) {
    case 'string':
    case 'number':
    case 'symbol':
      return true;
    default:
      return false;
  }
}
