/* eslint-disable no-magic-numbers */
import { Vue2, isVue2, isVNode, isRef, getCurrentInstance, Ref } from '@wakeadmin/demi';
import kebabCase from 'lodash/kebabCase';
import lowerFirst from 'lodash/lowerFirst';

import { isBrowser, shallowMerge, isPlainObject, ownKeys, isVue2Dot7 } from '../utils';

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
  // vue3
  'ref_for',
]);
const EVENT_MODIFIER_PREFIX: Record<string, string> = {
  capture: '!',
  once: '~',
  passive: '&',
  native: '',
};
const VUE2_ELEMENT_INSTANCE_CACHE: Record<string, any> = {};
const VUE2_REFS_CACHE = Symbol('ref-cache');

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

export function vue2GetElementInstance(tag: string) {
  const normalizedTag = tag.toLowerCase();

  if (normalizedTag in VUE2_ELEMENT_INSTANCE_CACHE) {
    return VUE2_ELEMENT_INSTANCE_CACHE[normalizedTag];
  }

  // 内置组件, 或 自定义组件
  const el = document.createElement(normalizedTag);
  let isUnknown = normalizedTag.includes('-')
    ? el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement
    : el.constructor === window.HTMLUnknownElement;

  // 未知元素
  if (isUnknown) {
    return (VUE2_ELEMENT_INSTANCE_CACHE[normalizedTag] = null);
  } else {
    return (VUE2_ELEMENT_INSTANCE_CACHE[normalizedTag] = el);
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
  const slotsFromChildren = children.length === 1 && isSlots(children[0]) ? children[0] : undefined;
  const normalizedChildren = children.length ? children : null;

  if (slots != null) {
    if (process.env.NODE_ENV !== 'production') {
      if (!isSlots(slots)) {
        throw new Error('v-slots 必须为对象, 值为函数');
      }

      if (slots.default != null && children.length) {
        throw new Error(`在 v-slots 已经定义了 default slot, 不能同时设置 children`);
      }

      if (slotsFromChildren != null) {
        throw new Error(`已经使用 v-slots 定义了命名 slot, 禁止使用 children 设置 slots`);
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

    if (slots) {
      // 显式定义了 v-slots
      return slots;
    } else if (slotsFromChildren) {
      // slots 必须以对象的形式传入
      return slotsFromChildren;
    }

    // 转换为 slots 对象，避免性能警告
    return normalizedChildren ? { default: () => normalizedChildren } : null;
  }

  // vue2
  const set = (_slots: any) => {
    Object.assign((props.scopedSlots = props.scopedSlots ?? {}), _slots);
  };

  if (slots) {
    // 显式定义了 slots
    set(slots);
  } else if (slotsFromChildren) {
    // 数组的话，只能是第一个
    set(slotsFromChildren);
  } else if (normalizedChildren) {
    return normalizedChildren;
  }

  return null;
}

/**
 * 预处理 ref
 *
 * 在 vue2 下，ref 只能是字符串。
 *
 * @param tag
 * @param props
 */
export function processRef(tag: any, props: any) {
  // 处理 ref_for
  const refInFor = props?.refInFor || props?.ref_for;
  if (refInFor) {
    props[isVue2 ? 'refInFor' : 'ref_for'] = true;
  }

  // Vue3/ 2.7 都支持
  if (!isVue2 || isVue2Dot7) {
    return;
  }

  const ref = props?.ref as string | undefined | Ref<any>;

  if (ref == null || typeof ref === 'string') {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!isRef(ref)) {
      throw new Error('ref 只能是字符串或者 Ref 对象');
    }
  }

  const instance = getCurrentInstance() as unknown as { refs: object; [VUE2_REFS_CACHE]?: Map<Ref, string> } | null;

  if (instance == null) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error('h 必须在 render 函数中使用');
    }

    // 不起作用
    return;
  }

  const cache = (instance[VUE2_REFS_CACHE] = instance[VUE2_REFS_CACHE] ?? new Map());

  // 已设置
  if (!cache.has(ref)) {
    const uid = `__ref_${cache.size}__`;
    cache.set(ref, uid);

    Object.defineProperty(instance.refs, uid, {
      enumerable: true,
      configurable: true,
      get() {
        return ref.value;
      },
      set(value) {
        ref.value = value;
      },
    });
  }

  // 转换为字符串
  props.ref = cache.get(ref);
}
