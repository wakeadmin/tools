/* eslint-disable @typescript-eslint/no-empty-interface */
/**
 * 组件
 */
import { HTMLAttributes } from 'vue';

export interface WKCHeader {
  title?: string;
}

export interface WKCContent {}

export interface WKCSidebarBottomSlot {}
export interface WKCSidebarTopSlot {}
export interface WKCHeaderSlot {}

export interface WKCHeaderDropdownMenu {
  title: string;
  icon?: string;
  onClick?: () => void;
}

export interface WKCFullscreen {}

export interface WKCMenuless {
  animate?: boolean;
}

export interface CustomBreadcrumbItem {
  id?: string;
  title: string;
  onClick?: () => void;
}

export interface WKCBreadcrumb {
  includeRoot?: boolean;
  list?: CustomBreadcrumbItem[];
}

export interface WKCFloatFooter {}

export interface WKCAllows {
  type?: 'AND' | 'OR';
  to: string | string[];
  onAllow?: () => void;
}

export interface WKCAllowsPage extends WKCAllows {}

export interface WKCErrorPage {
  description?: string;
  image?: string;
}

export interface WKCErrorPageNotFound extends WKCErrorPage {}
export interface WKCErrorPageForbidden extends WKCErrorPage {}

export interface WKCIcon {
  icon: string;
}

interface WKCElementsBase {
  'wkc-header': WKCHeader;
  'wkc-content': WKCContent;
  'wkc-sidebar-bottom-slot': WKCSidebarBottomSlot;
  'wkc-sidebar-top-slot': WKCSidebarTopSlot;
  'wkc-header-slot': WKCHeaderSlot;
  'wkc-header-dropdown-menu': WKCHeaderDropdownMenu;
  'wkc-fullscreen': WKCFullscreen;
  'wkc-menuless': WKCMenuless;
  'wkc-breadcrumb': WKCBreadcrumb;
  'wkc-float-footer': WKCFloatFooter;
  'wkc-allows': WKCAllows;
  'wkc-allows-page': WKCAllowsPage;
  'wkc-error-page': WKCErrorPage;
  'wkc-error-page-not-found': WKCErrorPageNotFound;
  'wkc-error-page-forbidden': WKCErrorPageForbidden;
  'wkc-icon': WKCIcon;
}

export type WKCElements = { [K in keyof WKCElementsBase]: HTMLAttributes & WKCElementsBase[K] };

declare global {
  namespace JSX {
    interface IntrinsicElements extends WKCElements {}
  }
}
