/**
 * 惟客云菜单项配置
 */
export interface TreeNodeRaw {
  /**
   * 禁用状态, 没有实际意义，后端接口会过滤掉已经禁用的菜单
   */
  disabled?: number;

  /**
   * 唯一 id
   */
  id: string;

  /**
   * 父节点 id，一级菜单这里 id 为 '0'
   */
  parentId: string;

  /**
   * 权限标识符，在同一个深度唯一
   */
  identifier: string;

  /**
   * 菜单名称
   */
  name: string;

  /**
   * 路由配置，可能为空
   */
  url?: string;

  /**
   * 层级, 从 0 开始，即一级菜单为 0
   */
  level: number;

  /**
   * 是否为菜单类型
   */
  isMenu: number;

  /**
   * 图标，支持命名图标（内置）、http、svg 图标
   */
  icon?: string;

  /**
   * 排序序号，默认1000， 越小排在越前
   */
  seq?: number;

  createTime?: number;

  updateTime?: number;

  /**
   * 子级
   */
  childMenu?: TreeNodeRaw[];
}

/**
 * 菜单类型
 */
export enum MenuType {
  /**
   * 菜单
   */
  Menu = 'menu',

  /**
   * 按钮
   */
  Button = 'button',
}

/**
 * 规范化后的链接
 */
export interface NormalizedUrl {
  /**
   * 原始链接
   */
  raw: string;

  /**
   * 规范化后，可以用于导航的链接
   */
  url: string;

  /**
   * 规范化后，可以用于路径匹配的链接
   * 会去掉查询字符串等干扰因素
   */
  matchable: string;
}
