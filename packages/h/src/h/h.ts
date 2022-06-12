/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/prefer-function-type */
import {
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
  isVue2,
} from 'vue-demi';
import { directiveBindingToArguments, isDirectiveArgumentsBinding, withDirectives, DirectiveProperty } from './helper';

import { processProps, processChildren, wrap } from './process';

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
  const finalProps = processProps(type, props) ?? {};
  const _children = children.length ? children : finalProps.children;
  const finalChildren = processChildren(type, finalProps, _children);

  if (!isVue2) {
    let directives: DirectiveProperty[] | undefined;
    if (finalProps.directives && isDirectiveArgumentsBinding(finalProps.directives)) {
      directives = finalProps.directives;
      delete finalProps.directives;
    }
    // 需要使用 withDirectives 来包装
    const vnode = vueh(type, finalProps, finalChildren);
    if (directives) {
      return withDirectives(vnode, directiveBindingToArguments({ directives }));
    }
    return vnode;
  } else {
    return wrap(vueh(type, finalProps, finalChildren));
  }
}
