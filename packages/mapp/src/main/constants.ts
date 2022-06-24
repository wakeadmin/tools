import { InjectionKey } from 'vue';

import { IBay } from '../types';

/**
 * 错误页面
 */
export const ERROR_PAGE = '/error';

/**
 * 跳板页
 */
export const LANDING_PAGE = '/landing';

/**
 * 基座挂载的默认 root
 */
export const DEFAULT_ROOT = '#app';

/**
 * 子应用默认挂载的 root
 */
export const DEFAULT_ROOT_FOR_CHILD = '#root';
export const DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX = DEFAULT_ROOT_FOR_CHILD.slice(1);

/**
 * 获取 bay 实例
 */
export const BayProviderContext: InjectionKey<IBay> = Symbol('bay-provider');
