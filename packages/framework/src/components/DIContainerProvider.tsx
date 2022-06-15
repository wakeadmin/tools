import { Container, EventBus } from '@wakeapp/framework-core';
import { declareComponent, declareProps, assertNotFragment, ExtraProps } from '@wakeadmin/h';
import { provide } from '@wakeadmin/demi';

import { ContainerProviderKey } from '../constants';

/**
 * 提供容器
 * 在这个组件下级的组件使用 useInject 将从这个容器中获取依赖
 */
export const DIContainerProvider = declareComponent({
  props: declareProps<{
    container?: Container;
    eventBus?: EventBus;
  }>(['container', 'eventBus']),
  setup(props, { slots }) {
    provide(ContainerProviderKey, props);

    return () => assertNotFragment(slots.default?.());
  },
});

export type DIContainerProviderProps = ExtraProps<typeof DIContainerProvider>;
