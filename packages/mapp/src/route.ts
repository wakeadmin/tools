import type { LocationAsPath, RouteQueryAndHash } from 'vue-router';

export interface RouteLocationOptions {
  /**
   * 重定向模式
   */
  redirect?: boolean;
}

export type RouteLocation = string | (LocationAsPath & RouteQueryAndHash & RouteLocationOptions);

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
