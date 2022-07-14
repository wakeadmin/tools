import { registerCustomElements } from '@wakeadmin/ce';
import { Icon } from '@/components';

import { Header } from './Header';
import { Content } from './Content';
import { SidebarBottomSlot, SidebarTopSlot } from './SidebarSlot';
import { HeaderSlot, HeaderDropdownMenu } from './HeaderSlot';
import { Fullscreen } from './Fullscreen';
import { Breadcrumb } from './Breadcrumb';
import { FloatFooter } from './FloatFooter';
import { Allows, AllowsPage } from './Allows';
import { ErrorPage, ErrorPageNotFound, ErrorPageForbidden } from './ErrorPage';

// 注册自定义组件
const components = registerCustomElements('wkc', {
  Header,
  Content,
  SidebarBottomSlot,
  SidebarTopSlot,
  HeaderSlot,
  HeaderDropdownMenu,
  Fullscreen,
  Breadcrumb,
  FloatFooter,
  Allows,
  AllowsPage,
  ErrorPage,
  ErrorPageNotFound,
  ErrorPageForbidden,
  Icon,
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
