/* eslint-disable no-magic-numbers */
import kebabCase from 'lodash/kebabCase';
import { Vue2, isVue2, isVNode } from 'vue-demi';
import lowerFirst from 'lodash/lowerFirst';

import { isBrowser, shallowMerge, isPlainObject, ownKeys } from '../utils';

const WRAP_SYMBOL = Symbol('__vnode__');
const EVENT_KEY = /^on[A-Z][a-zA-Z0-9:]*/;
const ALLOWED_EVENT_MODIFIER = new Set(['capture', 'once', 'passive', 'native']);
const RESERVED_KEYS = new Set([
  'key',
  'ref',
  'refInFor',
  'slot',
  'props',
  'attrs',
  'on',
  'nativeOn',
  'directives',
  'scopedSlots',
  'key',
  'class',
  'style',
  'domProps',
  'children',
]);
const EVENT_MODIFIER_PREFIX: Record<string, string> = {
  capture: '!',
  once: '~',
  passive: '&',
  native: '',
};
// Vue2 下必须以 domProps 传入的属性

export interface IEventHandler {
  isNative: boolean;
  name: string;
  value: Function;
}

export interface IAttr {
  domProps: boolean;
  name: string;
  value: any;
}

export function isWrapped(vnode: any): boolean {
  if (!isVue2) {
    return isVNode(vnode);
  }

  return !!(vnode && typeof vnode === 'object' && vnode[WRAP_SYMBOL]);
}

export function wrap<T = any>(vnode: T): T {
  if (!isVue2) {
    return vnode;
  }

  if (vnode && typeof vnode === 'object' && !isWrapped(vnode)) {
    Object.defineProperty(vnode, WRAP_SYMBOL, {
      enumerable: false,
      configurable: false,
      value: true,
    });
  }

  return vnode;
}

export function processVue2Event(key: string, value: any): IEventHandler | null {
  if (EVENT_KEY.test(key) && typeof value === 'function') {
    const splitted = kebabCase(key)
      .split('-')
      .map(i => i.toLowerCase());
    // 描述符只能出现在末尾
    const detectedModifier: string[] = [];
    let isNative = false;
    let i = splitted.length - 1;

    for (; i > 1; i--) {
      const section = splitted[i];
      if (ALLOWED_EVENT_MODIFIER.has(section)) {
        detectedModifier.push(section);
        if (section === 'native') {
          isNative = true;
        }
      } else {
        // 不能中断
        break;
      }
    }

    const modifiersLength = detectedModifier.join('').length;
    let eventName =
      detectedModifier.map(m => EVENT_MODIFIER_PREFIX[m]).join('') +
      lowerFirst(key.slice(2, -modifiersLength || key.length));

    return { name: eventName, value, isNative };
  }

  return null;
}

const vue2ElementInstanceCache: Record<string, any> = {};

export function vue2GetElementInstance(tag: string) {
  const normalizedTag = tag.toLowerCase();

  if (normalizedTag in vue2ElementInstanceCache) {
    return vue2ElementInstanceCache[normalizedTag];
  }

  // 内置组件, 或 自定义组件
  const el = document.createElement(normalizedTag);
  let isUnknown = normalizedTag.includes('-')
    ? el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement
    : el.constructor === window.HTMLUnknownElement;

  // 未知元素
  if (isUnknown) {
    return (vue2ElementInstanceCache[normalizedTag] = null);
  } else {
    return (vue2ElementInstanceCache[normalizedTag] = el);
  }
}

export function vue2MustUseProps(tag: any, type: string | undefined, key: string): boolean {
  if (typeof tag !== 'string') {
    return false;
  }

  if (Vue2?.config?.mustUseProp(tag, type, key)) {
    return true;
  }

  if (!isBrowser) {
    return false;
  }

  // 浏览器下，通过 in 来检查是否为 dom props, 和 vue3 的行为保持一致
  const elementInstance = vue2GetElementInstance(tag);
  if (elementInstance) {
    return key in elementInstance;
  }

  return false;
}

export function processVue2Attr(el: { tag: string; type?: string }, key: string, value: any): IAttr {
  // Vue3 .prop
  if (key.startsWith('.')) {
    return {
      domProps: true,
      name: key.slice(1),
      value,
    };
  }

  // Vue3 .attr
  if (key.startsWith('^')) {
    return { domProps: false, name: key.slice(1), value };
  }

  if (vue2MustUseProps(el.tag, el.type, key)) {
    return { domProps: true, name: key, value };
  }

  return { domProps: false, name: key, value };
}

export function processProps(tag: any, props: any) {
  if (props == null || typeof props !== 'object') {
    return props;
  }

  if (!isVue2) {
    return props;
  }

  const keys = Object.keys(props);
  const finalProps: Record<string, any> = {};
  const attrs: Record<string, any> = {};
  const domProps: Record<string, any> = {};
  const nativeOn: Record<string, Function> = {};
  const on: Record<string, Function> = {};

  for (const key of keys) {
    const value = props[key];

    if (RESERVED_KEYS.has(key)) {
      finalProps[key] = value;
      continue;
    }

    // 事件处理
    const maybeEvent = processVue2Event(key, value);
    if (maybeEvent) {
      if (maybeEvent.isNative) {
        nativeOn[maybeEvent.name] = maybeEvent.value;
      } else {
        on[maybeEvent.name] = maybeEvent.value;
      }
      continue;
    }

    // attrs 处理
    const attr = processVue2Attr(
      { tag, type: props.type ?? props.attrs?.type ?? props.domProps?.type ?? props.props?.type },
      key,
      value
    );

    if (attr.domProps) {
      domProps[attr.name] = attr.value;
    } else {
      attrs[attr.name] = attr.value;
    }
  }

  shallowMerge(finalProps, { attrs, domProps, nativeOn, on });

  return finalProps;
}

/**
 * 判断是否为 slots 对象, 所有成员都为函数
 * @param children
 * @returns
 */
export function isSlots(children: any) {
  if (!isPlainObject(children) || isWrapped(children)) {
    return false;
  }

  const keys = ownKeys(children);

  return !!(
    keys.length &&
    keys.every(k => {
      return typeof children[k] === 'function';
    })
  );
}

/**
 * vue2 下将 slots 放到 scopedSlots 中
 * @param tag
 * @param props 这里会修改 props
 * @param children
 */
export function processChildren(tag: any, props: any, children: any[]) {
  const slots: Record<string, Function> | undefined = props?.['v-slots'];

  if (slots != null) {
    if (process.env.NODE_ENV !== 'production') {
      if (!isSlots(slots)) {
        throw new Error('v-slots 必须为对象, 值为函数');
      }

      if (slots.default != null && children.length) {
        throw new Error(`在 v-slots 已经定义了 default slot, 不能同时设置 children`);
      }
    }

    // 设置默认 slots
    if (children.length) {
      slots.default = () => children;
    }

    delete props?.['v-slots'];
  }

  if (!isVue2) {
    // Vue3

    // 显式定义了 v-slots
    if (slots) {
      return slots;
    }

    // slots 必须以对象的形式传入
    if (children.length === 1 && isSlots(children[0])) {
      return children[0];
    }

    return children;
  }

  const set = (_slots: any) => {
    Object.assign((props.scopedSlots = props.scopedSlots ?? {}), _slots);
  };

  // 显式定义了 slots
  if (slots) {
    set(slots);
    return null;
  }

  // 数组的话，只能是第一个
  if (children.length === 1 && isSlots(children[0])) {
    set(children[0]);
    return null;
  }

  return children;
}
