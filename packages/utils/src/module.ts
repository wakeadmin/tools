/**
 * 判断是否为 ES 模块
 * @param obj
 * @returns
 */
export function isESModule<T = any>(obj: any): obj is { default: T } {
  return obj.__esModule || obj[Symbol.toStringTag] === 'Module';
}
