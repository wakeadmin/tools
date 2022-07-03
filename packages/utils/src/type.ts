import { isObject } from '@wakeapp/utils';

const plainObjectString = Object.toString();

export function isPlainObject(value: any): value is object {
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

export function isString(str: any): str is string {
  return typeof str === 'string';
}

export function isBoolean(bool: any): bool is boolean {
  return typeof bool === 'boolean';
}
