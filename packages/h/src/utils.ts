const plainObjectString = Object.toString();
const hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== 'undefined';

export const isBrowser = typeof window !== 'undefined';

export function isObject(obj: any): obj is object {
  return obj != null && typeof obj === 'object';
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

export function shallowMerge<T extends {}, S extends {}>(target: T, source: S): T & S {
  for (const key in source) {
    if (!Object.prototype.hasOwnProperty.call(source, key)) {
      continue;
    }

    const sourceValue = source[key];

    // 跳过空对象
    if (!ownKeys(sourceValue).length) {
      continue;
    }

    const targetValue = (target as any)[key];
    if (isObject(sourceValue) && isObject(targetValue)) {
      Object.assign(targetValue, sourceValue);
    } else {
      (target as any)[key] = sourceValue;
    }
  }

  return target as T & S;
}
