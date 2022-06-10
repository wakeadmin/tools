/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/prefer-function-type */
import kebabCase from 'lodash/kebabCase';
import {
  isVue2,
  h as vueh,
  Text,
  Comment,
  Fragment,
  Teleport,
  TeleportProps,
  ConcreteComponent,
  ComponentOptions,
  Suspense,
  DefineComponent,
  SuspenseProps,
  FunctionalComponent,
  EmitsOptions,
  VNodeProps,
  VNode,
  VNodeArrayChildren,
  Component,
} from 'vue-demi';

type RawChildren = string | number | boolean | VNode | VNodeArrayChildren | (() => any) | RawSlots;

type RawProps = VNodeProps & {
  [Symbol.iterator]?: never;
} & Record<string, any>;

type RawSlots = {
  [name: string]: unknown;
};

interface Constructor<P = any> {
  new (...args: any[]): {
    $props: P;
  };
}

export function h(type: string, props?: RawProps | null, ...children: RawChildren[]): VNode;

export function h(
  type: typeof Text | typeof Comment,
  props?: null,
  ...children: Array<string | number | boolean>
): VNode;

export function h(type: typeof Fragment, props?: RawProps | null, ...children: RawChildren[]): VNode;

export function h(type: typeof Teleport, props: RawProps & TeleportProps, ...children: RawChildren[]): VNode;

export function h(type: typeof Suspense, props?: (RawProps & SuspenseProps) | null, ...children: RawChildren[]): VNode;

export function h<P, E extends EmitsOptions = {}>(
  type: FunctionalComponent<P, E>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  ...children: RawChildren[]
): VNode;

export function h<P>(
  type: ConcreteComponent<P> | string,
  props?: (RawProps & P) | ({} extends P ? null : never),
  ...children: RawChildren[]
): VNode;

export function h(type: Component, props: null, children?: RawChildren | RawSlots): VNode;

export function h<P>(
  type: ComponentOptions<P>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  ...children: RawChildren[]
): VNode;

export function h<P>(
  type: Constructor<P>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  ...children: RawChildren[]
): VNode;

export function h<P>(
  type: DefineComponent<P>,
  props?: (RawProps & P) | ({} extends P ? null : never),
  ...children: RawChildren[]
): VNode;

export function h(type: any, props: any, ...children: any[]): VNode {
  return vueh(type, props, children);
}

const EVENT_KEY = /^on[A-Z][a-zA-Z0-9:]*/;
const ALLOWED_EVENT_MODIFIER = new Set(['capture', 'once', 'passive', 'native']);
const EVENT_MODIFIER_PREFIX: Record<string, string> = {
  capture: '!',
  once: '~',
  passive: '&',
  native: '',
};

export function vue2EventDeclaration(
  key: string,
  value: any
): { isNative: boolean; name: string; value: Function } | null {
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

    let eventName =
      detectedModifier.map(m => EVENT_MODIFIER_PREFIX[m]).join('') +
      splitted
        .slice(0, i + 1)
        .join('')
        .toLowerCase();

    return { name: eventName, value, isNative };
  }

  return null;
}

export function normalizeProps(props: any) {
  if (props == null || typeof props !== 'object') {
    return props;
  }

  if (!isVue2) {
    return props;
  }

  const keys = Object.keys(props);
  const events = [];
  for (const key of keys) {
    const value = props[key];
  }
}
