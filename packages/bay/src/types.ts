import { LocationQueryRaw } from 'vue-router';
import { IBay, RouteLocationAsPath, RouteLocationOptions } from '@wakeadmin/mapp/main';

import { TreeNode } from './tree';

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

export interface INavigation {
  /**
   * 根据微应用的名称打开。
   * @param name
   * @param options
   */
  openByAppName(name: string, options?: AppNavigateOptions): void;

  /**
   * 根据微应用的别名打开, 常用于多态应用。这里会优先打开在菜单中定义的微应用
   * @param alias
   * @param options
   */
  openByAppAlias(alias: string, options?: AppNavigateOptions): void;

  /**
   * 打开主界面, 即菜单定义的第一个根节点
   * @param options
   */
  openMain(options?: RouteLocationOptions): void;

  /**
   * 根据权限标识符路径导航
   * @param path
   * @param options
   */
  openByIdentifierPath(path: string, options?: NodeNavigateOptions): void;

  /**
   * 打开菜单节点
   * @param node
   * @param options
   */
  openTreeNode(node: TreeNode, options?: NodeNavigateOptions): void;

  /**
   * 打开外部链接
   * @param url
   * @param options
   */
  openOutside(url: string, options?: RouteLocationOptions): void;

  /**
   * 打开错误页面
   */
  openError: IBay['openError'];
}

export type IBayModel = INavigation;
