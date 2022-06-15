/* eslint-disable no-magic-numbers */
/* eslint-disable @typescript-eslint/array-type */
import {
  Directive as Vue3Directive,
  DirectiveArguments as Vue3DirectiveArguments,
  resolveComponent as vueResolveComponent,
  resolveDirective as vueResolveDirective,
  withDirectives as vueWithDirectives,
  isVNode as vueIsVNode,
  VNode,
  isVue2,
  vShow,
} from '@wakeadmin/demi';
import { isWrapped } from './process';

export declare type Directive<T = any, V = any> = Vue3Directive<T, V> | string;

// name, value, arg, modifiers
export declare type DirectiveArguments = Array<
  [Directive] | [Directive, any] | [Directive, any, string] | [Directive, any, string, DirectiveModifiers]
>;

export const resolveComponent: typeof vueResolveComponent = function (name) {
  if (isVue2) {
    return name;
  }

  return vueResolveComponent.apply(null, arguments as any);
};

/**
 * 查找指令
 * @param name
 * @returns
 */
export function resolveDirective(name: string): Directive | undefined {
  if (isVue2) {
    return name;
  }

  return vueResolveDirective.apply(null, arguments as any);
}

export interface DirectiveProperty {
  name: string | Directive;
  value: any;
  expression?: any;
  arg: any;
  modifiers: any;
}

export interface DirectiveBinding {
  directives: DirectiveProperty[];
}

export function isVNode(node: any): node is VNode {
  if (vueIsVNode) {
    return vueIsVNode(node);
  } else if (isVue2) {
    return isWrapped(node);
  }

  return false;
}

declare type DirectiveModifiers = Record<string, boolean>;

const DIRECTIVE_BINDING = Symbol('directive-binding');

export function isDirectiveArgumentsBinding(arg: any) {
  // @ts-expect-error
  return !!(Array.isArray(arg) && arg[DIRECTIVE_BINDING]);
}

export function directiveArgumentsToBinding(args: DirectiveArguments): DirectiveBinding {
  const directives = args.map(([name, value, arg, modifiers]) => ({
    // 兼容 vue3
    dir: name,
    name,
    value,
    arg,
    modifiers,
  }));

  Object.defineProperty(directives, DIRECTIVE_BINDING, {
    enumerable: false,
    configurable: false,
    value: true,
  });

  return {
    directives,
  };
}

export function directiveBindingToArguments(binding: DirectiveBinding): DirectiveArguments {
  return binding.directives.map(directive => {
    return [directive.name, directive.value, directive.arg, directive.modifiers];
  });
}

const VUE3_DIRECTIVES_MAP = {
  show: vShow,
};

export function withDirectives<T extends VNode>(vnode: T, directives: DirectiveArguments): T;
export function withDirectives(directives: DirectiveArguments): DirectiveBinding;
export function withDirectives<T extends VNode>(
  arg1: T | DirectiveArguments,
  arg2?: DirectiveArguments
): T | DirectiveBinding {
  if (isVNode(arg1)) {
    // 注入模式
    if (!isVue2) {
      return vueWithDirectives(
        arg1,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (arg2! as Vue3DirectiveArguments).map(i => {
          const dir = i[0];
          // 需要转换
          if (typeof dir === 'string') {
            const directive = VUE3_DIRECTIVES_MAP[dir] ?? resolveDirective(dir);
            if (directive) {
              i[0] = directive;
            }
          }
          return i;
        })
      );
    } else {
      // @ts-expect-error
      if (arg1.data) {
        // @ts-expect-error
        arg1.data.directives = [...(arg1.data?.directives ?? []), ...directiveArgumentsToBinding(arg2).directives];
      }

      return arg1;
    }
  } else {
    return directiveArgumentsToBinding(arg1);
  }
}

/**
 * 禁止 fragment
 * 这个函数在 Vue3 下无效
 */
export function assertNotFragment(children: any) {
  if (process.env.NODE_ENV !== 'production' && isVue2) {
    if (Array.isArray(children) && children.filter(v => v != null).length > 1) {
      throw new Error('Fragment is not allowed in Vue2');
    }
  }

  return children;
}
