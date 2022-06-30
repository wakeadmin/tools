import { registerCustomElements } from '@wakeadmin/ce';
import { Header } from './Header';

// 注册自定义组件
const components = registerCustomElements('wkc', {
  Header,
});

export type BayLayoutComponents = typeof components;

// 注册到全局类型
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends BayLayoutComponents {}
  }
}
