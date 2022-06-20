import type { LocationQueryRaw } from 'vue-router';

export interface RouteLocationOptions {
  /**
   * 重定向模式
   */
  redirect?: boolean;
}

export interface RouteLocationMode {
  /**
   * 路由模式, 基座默认为 path, 子应用默认为 hash
   */
  mode?: 'hash' | 'history';
}

export interface RouteLocationAsPath {
  /**
   * 路由路径
   */
  path: string;

  /**
   * 查询字符串
   */
  query?: LocationQueryRaw;
}

export interface RouteLocationAsPathAndHash extends RouteLocationAsPath {
  /**
   * hash 路由路径
   */
  hashPath?: string;

  /**
   * hash 路由查询字符串
   */
  hashQuery?: LocationQueryRaw;
}

/**
 * 统一路由监听, 可以监听 history 路由和 hash 路由的变化
 */
export interface UniverseLocation {
  /**
   * 完整路径
   */
  href: string;

  /**
   * 页面路径，不包含参数
   */
  path: string;

  /**
   * 查询字符串
   */
  query: Record<string, any>;

  /**
   * hash 路径
   */
  hashPath: string;

  /**
   * hash 查询字符串
   */
  hashQuery: Record<string, any>;
}
