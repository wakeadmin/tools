import { getCurrentInstance, isRef } from 'vue-demi';

import { hasProp } from '../utils';

export function vue2AsVmProperty(vm: any, key: string, getter: () => any) {
  const props = vm.$options.props;
  // 属性不能冲突
  if (!(key in vm) && !(props && hasProp(props, key))) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: getter,
    });
  } else if (process.env.NODE_ENV !== 'production') {
    if (key in vm) {
      throw new Error(`${key} 已经在 vm 中存在`);
    } else {
      throw new Error(`${key} 已经在 props 中定义`);
    }
  }
}

/**
 * vue2 下支持 expose
 */
export function vue2Expose(exposed: Record<string, any>): void {
  if (process.env.NODE_ENV !== 'production' && exposed != null && typeof exposed !== 'object') {
    throw new Error('expose 必须为对象形式');
  }

  if (exposed == null) {
    return;
  }

  const instance = getCurrentInstance();

  if (process.env.NODE_ENV !== 'production' && instance == null) {
    throw new Error('expose() 只能在 setup 中调用');
  }

  if (instance == null) {
    return;
  }

  const vm = instance.proxy as any;

  if (process.env.NODE_ENV !== 'production' && vm.exposed) {
    throw new Error('expose() 只能调用一次');
  }

  vm.exposed = exposed;

  // 代理到 vm 上
  for (const key in exposed) {
    vue2AsVmProperty(vm, key, () => {
      const value = exposed[key];
      // Ref 需要展开
      if (isRef(value)) {
        return value.value;
      }
      return value;
    });
  }
}
