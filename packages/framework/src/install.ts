/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { App, Plugin, isVue2, nextTick } from '@wakeadmin/demi';
import { setCurrentPageInstanceGetter, clearPageScope, mergePageScope } from '@wakeapp/framework-core';
import { addHiddenProp, hasProp } from './utils';

const INSTALLED = Symbol('framework-install');
const PAGE_SCOPE_MARK = Symbol('framework-page-scope');
const TEMP_INSTANCE = Symbol('framework-template-instance');
const global = {};
const WARNING = `[framework] 获取不到页面实例, 将使用全局实例, 建议在 setup、render、mounted 这些作用域获取注入`;

export function mark(instance: any) {
  if (instance && !hasProp(instance, PAGE_SCOPE_MARK)) {
    addHiddenProp(instance, PAGE_SCOPE_MARK, true);
  }
}

export function isMark(instance: any) {
  return hasProp(instance, PAGE_SCOPE_MARK);
}

export interface MaybeMatched {
  components: Record<string, any>;
  instances: Record<string, any>;
}

export function getInstanceFromMatcheds(matcheds: MaybeMatched[]) {
  if (Array.isArray(matcheds) && matcheds.length) {
    const matched = matcheds[matcheds.length - 1];
    if (matched) {
      // Vue3 在这里无法可靠地获取到 instances
      // vue-router 是通过 ref 来获取实例的,
      // 因此，如果在 created、setup 这些场景获取依赖注入，将会不获取到数据
      // 这里的做法是先挂载到临时对象中，在组件 created 之后再迁移回组件实例
      //
      // Vue2 则不会有相关问题，它的实例在 beforeCreate 时就会设置好，并且没有好的方式在组件实例中获取到构造函数,
      // 因此这里不处理
      const instance = matched.instances?.default;

      // 创建临时实例
      if (!isVue2 && instance == null && matched.components?.default) {
        const component = matched.components?.default;
        if (!hasProp(component, TEMP_INSTANCE)) {
          const templateInstance = {};
          addHiddenProp(component, TEMP_INSTANCE, templateInstance);
          return templateInstance;
        } else {
          return component[TEMP_INSTANCE];
        }
      }

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
  // @ts-ignore vue 2 下会报错
  const matcheds = app.config.globalProperties.$route?.matched;

  const instance = getInstanceFromMatcheds(matcheds as MaybeMatched[]) ?? global;
  if (process.env.NODE_ENV !== 'production' && instance === global) {
    console.warn(WARNING);
  }

  return instance;
}

export function getMatchedFromVue2Router(vm: any) {
  const matcheds = vm?.$route?.matched;
  const instance = getInstanceFromMatcheds(matcheds) ?? global;

  if (process.env.NODE_ENV !== 'production' && instance === global) {
    console.warn(WARNING);
  }

  return instance;
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
    let root: any;
    setCurrentPageInstanceGetter(() => {
      return getMatchedFromVue2Router(root);
    });

    app.mixin({
      beforeCreate() {
        if (root !== this.$root) {
          root = this.$root;
        }
      },
      // eslint-disable-next-line vue/no-deprecated-destroyed-lifecycle
      beforeDestroy() {
        // 已经标记为页面实例，可以销毁
        if (isMark(this)) {
          clearPageScope(this);
        }
      },
    });
  } else {
    // Vue3
    setCurrentPageInstanceGetter(() => {
      return getMatchedFromVue3Router(app);
    });

    // add mixin
    app.mixin({
      beforeCreate(this: any) {
        const ctor = this.$.type;
        // 需要合并临时实例
        if (hasProp(ctor, TEMP_INSTANCE)) {
          const instance = ctor[TEMP_INSTANCE];
          ctor[TEMP_INSTANCE] = this;
          mark(this);
          mergePageScope(this, instance);
        }
      },
      mounted(this: any) {
        // 但是组件可能在 mounted 中进行 getInject, 因此这里最好延后处理
        const ctor = this.$.type;
        if (hasProp(ctor, TEMP_INSTANCE)) {
          // 释放临时实例
          nextTick(() => {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete ctor[TEMP_INSTANCE];
          });
        }
      },
      // @ts-ignore vue 2 会报错，可以忽略
      beforeUnmount() {
        // 已经标记为页面实例，可以销毁
        if (isMark(this)) {
          clearPageScope(this);
        }
      },
    });
  }
}

export const plugin = { install } as unknown as Plugin;
