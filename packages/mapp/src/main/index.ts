export * from '../types';

export * from './creator';
export { DEFAULT_ROOT, DEFAULT_ROOT_FOR_CHILD, DEFAULT_ROOT_FOR_CHILD_WITHOUT_PREFIX } from './constants';

if (process.env.NODE_ENV !== 'production') {
  if (window.__POWERED_BY_QIANKUN__) {
    throw new Error(`[mapp/main] 不能在子应用导入和使用`);
  }
}
