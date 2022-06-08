const objectPrototype = Object.prototype;
const plainObjectString = Object.toString();
const hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== 'undefined';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = () => {};

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

export function isObject(value: any): value is Object {
  return value !== null && typeof value === 'object';
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

export const getDescriptor = (target: any, key: PropertyKey): PropertyDescriptor | undefined => {
  let source = target;

  while (source && source !== objectPrototype) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (descriptor) {
      return descriptor;
    }

    source = Object.getPrototypeOf(source);
  }

  return undefined;
};
