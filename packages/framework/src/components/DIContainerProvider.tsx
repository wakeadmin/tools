import { Container, EventBus } from '@wakeapp/framework-core';
import { declareComponent, declareProps, assertNotFragment, ExtraProps } from '@wakeadmin/h';
import { provide, InjectionKey } from '@wakeadmin/demi';

export interface DIContainerContextValue {
  container?: Container;
  eventBus?: EventBus;
}

export const DIContainerContext: InjectionKey<DIContainerContextValue> = Symbol('container');

/**
 * 提供容器
 * 在这个组件下级的组件使用 useInject 将从这个容器中获取依赖
 */
export const DIContainerProvider = declareComponent({
  props: declareProps<DIContainerContextValue>(['container', 'eventBus']),
  setup(props, { slots }) {
    provide(DIContainerContext, props);

    return () => assertNotFragment(slots.default?.());
  },
});

export type DIContainerProviderProps = ExtraProps<typeof DIContainerProvider>;
