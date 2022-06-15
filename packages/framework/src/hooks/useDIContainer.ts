import { inject, computed, Ref } from '@wakeadmin/demi';
import { Container, container } from '@wakeapp/framework-core';

import { ContainerProviderKey } from '../constants';
import { DIContainerProviderProps } from '../components';

/**
 * 获取上级注入的容器
 * @returns
 */
export function useDIContainer(): Ref<Container> {
  const injected = inject<DIContainerProviderProps>(ContainerProviderKey);

  return computed(() => injected?.container ?? container);
}
