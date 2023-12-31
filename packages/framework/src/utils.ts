import { isPropertyKey, Noop } from '@wakeadmin/utils';

export { hasProp, addHiddenProp, isPropertyKey, isObject, isPlainObject } from '@wakeadmin/utils';

const objectPrototype = Object.prototype;
const hasGetOwnPropertySymbols = typeof Object.getOwnPropertySymbols !== 'undefined';

export const NOOP = Noop;

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

/**
 * 检查是否为属性装饰器
 * @param name
 * @param args
 */
export const assertPropertyDecorator = (name: string, args: any[]) => {
  if (args.length < 2 || typeof args[0] !== 'object' || !isPropertyKey(args[1])) {
    throw new TypeError(`@${name} 只能用于装饰属性`);
  }
};
