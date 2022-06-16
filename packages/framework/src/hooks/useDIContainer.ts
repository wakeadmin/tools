import { inject, computed, Ref } from '@wakeadmin/demi';
import { Container, container } from '@wakeapp/framework-core';

import { DIContainerContext } from '../components';

/**
 * 获取上级注入的容器
 * @returns
 */
export function useDIContainer(): Ref<Container> {
  const injected = inject(DIContainerContext);

  return computed(() => injected?.container ?? container);
}
