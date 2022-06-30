import { registerCustomElements } from '@wakeadmin/ce';
import { Header } from './Header';
import { Content } from './Content';
import { SidebarBottomSlot, SidebarTopSlot } from './SidebarSlot';
import { HeaderSlot } from './HeaderSlot';

// 注册自定义组件
const components = registerCustomElements('wkc', {
  Header,
  Content,
  SidebarBottomSlot,
  SidebarTopSlot,
  HeaderSlot,
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
