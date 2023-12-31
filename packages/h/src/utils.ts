import { version } from '@wakeadmin/demi';

const objectPrototype = Object.prototype;
const plainObjectString = Object.toString();
const hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== 'undefined';
const CAMELIZE_REGEXP = /(-|_|\.|\s)+(.)?/g;

export const isVue2Dot7 = version.startsWith('2.7.');

export const isBrowser = typeof window !== 'undefined';

export function isObject<T = object>(obj: any): obj is T {
  return obj != null && typeof obj === 'object';
}

/**
 * 查看属性是否定义
 * @param target
 * @param key
 * @returns
 */
export function hasProp(target: Object, key: PropertyKey): boolean {
  return objectPrototype.hasOwnProperty.call(target, key);
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

export function isPlainObject(value: any) {
  if (!isObject(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  if (proto == null) {
    return true;
  }
  const protoConstructor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof protoConstructor === 'function' && protoConstructor.toString() === plainObjectString;
}

export const ownKeys: (target: any) => PropertyKey[] =
  typeof Reflect !== 'undefined' && Reflect.ownKeys
    ? Reflect.ownKeys
    : hasGetOwnPropertySymbols
    ? obj => Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj) as any)
    : /* istanbul ignore next */ Object.getOwnPropertyNames;

export function isCamelCase(str: string): boolean {
  return typeof str === 'string' && !str.includes('-');
}

export const identity = <T = any>(i: T) => i;

/**
 * 转换成小写驼峰格式
 *
 * @example
 * ```javascript
 * camelize('innerHTML');          // 'innerHTML'
 * camelize('action_name');        // 'actionName'
 * camelize('css-class-name');     // 'cssClassName'
 * camelize('update:modalValue');  // 'update:modalValue'
 * camelize('update:modal-value');  // 'update:modalValue'
 * camelize('Q w Q');  // 'QWQ'
 * ```
 * @param str
 */
export function camelize(str: string): string {
  return str
    .replace(CAMELIZE_REGEXP, (_: string, sep: string, chr: string) => {
      return chr ? chr.toUpperCase() : '';
    })
    .replace(/^([A-Z])/, (chr: string) => chr.toLowerCase());
}
