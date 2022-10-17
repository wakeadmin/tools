/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/prefer-function-type */
import {
  h as vueh,
  Text,
  Comment,
  TeleportProps,
  ConcreteComponent,
  ComponentOptions,
  DefineComponent,
  SuspenseProps,
  FunctionalComponent,
  EmitsOptions,
  VNodeProps,
  VNode,
  VNodeArrayChildren,
  Component,
  isVue2,
} from '@wakeadmin/demi';
import { directiveBindingToArguments, isDirectiveArgumentsBinding, withDirectives, DirectiveProperty } from './helper';

import { processProps, processChildren, wrap, processRef } from './process';
import { Fragment, Teleport, Suspense } from './components';

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
  // 支持直传模式，兼容 vue 原生，另外在某些场景可以避免数组转换
  if (children.length === 1 && Array.isArray(children[0])) {
    children = children[0];
  }

  // Fragment 比较特殊，不要将 slot 转换成对象模式, 而且 props 仅支持 key
  let vnode: VNode;
  if (type === Fragment) {
    vnode = vueh(type, props, children);
  } else {
    props = props ?? {};
    const finalChildren = processChildren(type, props, children);
    const finalProps = processProps(type, props) ?? {};
    processRef(type, finalProps);

    if (!isVue2) {
      // 需要使用 withDirectives 来包装
      let directives: DirectiveProperty[] | undefined;
      if (finalProps.directives && isDirectiveArgumentsBinding(finalProps.directives)) {
        directives = finalProps.directives;
        delete finalProps.directives;
      }

      vnode = vueh(type, finalProps, finalChildren);
      if (directives) {
        vnode = withDirectives(vnode, directiveBindingToArguments({ directives }));
      }
    } else {
      vnode = vueh(type, finalProps, finalChildren);
    }
  }

  if (isVue2) {
    return wrap(vnode);
  }

  return vnode;
}

/**
 * 支持从 h.Fragment 中访问 Fragment
 */
// @ts-ignore
h.Fragment = Fragment;
