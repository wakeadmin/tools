export * from '../types';

export * from './creator';

if (process.env.NODE_ENV !== 'production') {
  if (window.__POWERED_BY_QIANKUN__) {
    throw new Error(`[mapp/main] 不能在子应用导入和使用`);
  }
}
