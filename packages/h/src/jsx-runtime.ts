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
  const { children, ...finalProps } = props;

  if (key != null) {
    Object.assign(finalProps, {
      key,
    });
  }

  if (Array.isArray(children)) {
    if (children.length) {
      return h(type, finalProps, ...children);
    } else {
      return h(type, finalProps);
    }
  }

  return h(type, finalProps, children);
}

export const jsxs = jsx;
export const jsxDEV = jsx;
