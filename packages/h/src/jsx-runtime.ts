import { h } from './h';

/**
 * 支持 自动 JSX, used by Babel's {runtime:"automatic"} JSX transform
 * @param type
 * @param props
 * @param key
 * @param __self
 * @param __source
 */
export function jsx(
  type: any,
  props: Record<string, any>,
  key?: string | number | symbol,
  __self?: string,
  __source?: string
) {
  const { children = [], ...finalProps } = props;
  Object.assign(finalProps, {
    key,
  });

  return h(type, finalProps, ...children);
}

export const jsxs = jsx;
export const jsxDEV = jsx;
