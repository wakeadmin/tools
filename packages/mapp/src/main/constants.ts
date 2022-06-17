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
 * 默认挂载的 root
 */
export const DEFAULT_ROOT = '#root';
export const DEFAULT_ROOT_WITHOUT_PREFIX = DEFAULT_ROOT.slice(1);

/**
 * 获取 bay 实例
 */
export const BayProviderContext: InjectionKey<IBay> = Symbol('bay-provider');
