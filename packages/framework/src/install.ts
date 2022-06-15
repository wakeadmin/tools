import { App, isVue2 } from '@wakeadmin/demi';
import { setCurrentPageInstanceGetter, clearPageScope } from '@wakeapp/framework-core';
import { addHiddenProp, hasProp } from './utils';

const INSTALLED = Symbol('framework-install');
const PAGE_SCOPE_MARK = Symbol('framework-page-scope');
const global = {};

export function mark(instance: any) {
  if (instance && !hasProp(instance, PAGE_SCOPE_MARK)) {
    addHiddenProp(instance, PAGE_SCOPE_MARK, true);
  }
}

export function isMark(instance: any) {
  return hasProp(instance, PAGE_SCOPE_MARK);
}

export function getInstanceFromMatcheds(matcheds: any) {
  if (Array.isArray(matcheds) && matcheds.length) {
    const matched = matcheds[matcheds.length - 1];
    if (matched) {
      const instance = matched.instances?.default;

      // mark
      if (instance) {
        mark(instance);
        return instance;
      }
    }
  }

  return undefined;
}

export function getMatchedFromVue3Router(app: App) {
  const matcheds = app.config.globalProperties.$route?.matched;

  return getInstanceFromMatcheds(matcheds) ?? global;
}

export function getMatchedFromVue2Router(vm: any) {
  const matcheds = vm?.$route?.matched;
  return getInstanceFromMatcheds(matcheds) ?? global;
}

/**
 * 安装插件
 * @param app
 */
export function install(app: App) {
  if (process.env.NODE_ENV !== 'production' && hasProp(app, INSTALLED)) {
    throw new Error(`@wakeadmin/framework 只能 install 一次`);
  }

  addHiddenProp(app, INSTALLED, true);

  if (isVue2) {
    const globalApp = app as any;
    const $mount = globalApp.$mount;
    let vm: any;
    globalApp.$mount = function (...args: any[]) {
      return (vm = $mount.apply(this, args));
    };

    setCurrentPageInstanceGetter(() => {
      return getMatchedFromVue2Router(vm);
    });
  } else {
    setCurrentPageInstanceGetter(() => {
      return getMatchedFromVue3Router(app);
    });
  }

  // add mixin
  app.mixin({
    [isVue2 ? 'beforeDestroy' : 'beforeUnmount']() {
      // 已经标记为页面实例，可以销毁
      if (isMark(this)) {
        clearPageScope(this);
      }
    },
  });
}

export const plugin = { install };
