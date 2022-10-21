import {
  RouteLocationOptions,
  RouteLocationAsPathAndHash,
  ErrorPageProps,
  LocationQueryRaw,
  ExcludeAssetFilter,
} from '@wakeadmin/mapp-shared';

export interface TreeNode {
  parent?: TreeNode;
  readonly root: TreeNode;
  readonly uid: string;
  readonly identifier: string;
  readonly identifierPath: string;
  readonly name: string;
  readonly icon: string | undefined;
  readonly level: number;
  readonly children: TreeNode[];
}

export interface FindResult {
  result?: TreeNode;
  /**
   * 是否精确匹配
   */
  exact?: boolean;
}

export interface AppNavigateOptions extends RouteLocationOptions {
  /**
   * hash 路由
   */
  hashPath?: string;
  /**
   * pathname 部分查询字符串
   */
  query?: LocationQueryRaw;
  /**
   * hash 部分查询字符串
   */
  hashQuery?: LocationQueryRaw;
}
export interface NodeNavigateOptions extends RouteLocationOptions {
  /**
   * 查询字符串
   */
  query?: LocationQueryRaw;
  /**
   * 子路由查询字符串
   */
  hashQuery?: LocationQueryRaw;
}
/**
 * 落地页参数
 */
export declare type LandingProps =
  | {
      type: 'app';
      name: string;
      options?: AppNavigateOptions;
    }
  | {
      type: 'app-alias';
      alias: string;
      options?: AppNavigateOptions;
    }
  | {
      type: 'main';
      options?: NodeNavigateOptions;
    }
  | {
      type: 'identifier';
      path: string;
      options?: NodeNavigateOptions;
    }
  | {
      type: 'url';
      url: string | RouteLocationAsPathAndHash;
    };

export const waitSetup: () => Promise<void>;
export const logout: () => Promise<void>;

export const toggleSidebar: () => Promise<void>;
export const getSidebarCollapsed: () => Promise<boolean>;
export const expandSidebar: () => Promise<void>;
export const collapseSidebar: () => Promise<void>;

export const showMenu: (animate?: boolean | undefined) => Promise<void>;
export const hideMenu: (animate?: boolean | undefined) => Promise<void>;

export const hideSidebar: (animate?: boolean | undefined) => Promise<void>;
export const showSidebar: (animate?: boolean | undefined) => Promise<void>;

export const openByAppName: (name: string, options?: AppNavigateOptions | undefined) => Promise<void>;
export const openByAppAlias: (alias: string, options?: AppNavigateOptions | undefined) => Promise<void>;
export const openMain: (options?: NodeNavigateOptions | undefined) => Promise<void>;
export const openByIdentifierPath: (path: string, options?: NodeNavigateOptions | undefined) => Promise<void>;
export const openTreeNode: (node: TreeNode, options?: NodeNavigateOptions | undefined) => Promise<void>;
export const openOutside: (url: string, options?: RouteLocationOptions | undefined) => Promise<void>;
export const openError: (data: ErrorPageProps & RouteLocationOptions) => Promise<void>;
export const openUrl: (url: string | (RouteLocationAsPathAndHash & RouteLocationOptions)) => Promise<void>;

export const findMenuByIdentifierPath: (path: string) => Promise<FindResult | undefined>;
export const generateLandingUrl: (props: LandingProps, addHost?: boolean | undefined) => Promise<string>;

export const showMainLoading: () => Promise<void>;
export const hideMainLoading: () => Promise<void>;
export const addExcludeAssetFilter: (filters: ExcludeAssetFilter) => Promise<void>;
