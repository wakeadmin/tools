export interface HeaderDropdownItemDesc {
  /**
   * 图标。支持内置图标或者 svg
   */
  icon?: string | (() => string | undefined);
  /**
   * 标题
   */
  title: string | (() => string);
  /**
   * 点击处理器
   */
  onClick?: () => void;
  /**
   * 唯一 id, 可选。会自动生成
   */
  id?: string;
}
/**
 * 注册菜单。
 *
 * 推荐使用 wkc-header-dropdown-menu 组件, 而不是这个接口
 * @param item
 * @returns 菜单释放，记得调用
 */
export declare function registerHeaderDropdownItem(item: HeaderDropdownItemDesc): () => boolean;
export declare function getHeaderDropdowns(): HeaderDropdownItemDesc[];
/**
 * 订阅 dropdown 菜单更新
 */
export declare const subscribeHeaderDropdownChange: (
  subscriber: import('@wakeadmin/utils').RegistrySubscriber<HeaderDropdownItemDesc>
) => () => boolean;
