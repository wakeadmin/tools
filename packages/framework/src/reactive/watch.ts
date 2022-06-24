/**
 * vue 默认的 watch 会添加到 正在渲染的 vue 组件实例的 effectScope 中，这回导致
 * 组件卸载后，effect 也会被释放
 */
import { watch as vueWatch, effectScope } from '@wakeadmin/demi';

export const watch: typeof vueWatch = function () {
  // 使用一个 detached 的effect scope，
  const scope = effectScope(true);
  const args = arguments as any;

  scope.run(() => {
    vueWatch.apply(null, args);
  });

  return scope.stop.bind(scope);
};
