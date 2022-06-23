import { computed, makeObservable, observable } from '@wakeadmin/framework';
import { TreeContainer } from './TreeContainer';

import { MenuType, TreeNodeRaw } from './types';
import { noEmptyString, normalizeUrl } from './utils';

/**
 * 菜单节点
 */
export class TreeNode {
  /**
   * 父节点
   */
  readonly parent?: TreeNode;

  /**
   * 根节点
   */
  get root(): TreeNode {
    return this.parent ? this.parent.root : this;
  }

  readonly container: TreeContainer;

  /**
   * 原始配置
   */
  readonly raw: TreeNodeRaw;

  /**
   * 唯一 id
   */
  get uid() {
    return this.raw.id;
  }

  /**
   * 权限标识符，在同一个深度唯一
   */
  get identifier() {
    return this.raw.identifier;
  }

  /**
   * 完整的权限标识符路径
   */
  @computed
  get identifierPath() {
    return this.parent ? `${this.parent.identifier}.${this.identifier}` : this.identifier;
  }

  /**
   * 菜单名称
   */
  get name() {
    return this.raw.name;
  }

  /**
   * 图标，支持命名图标（内置）、http、svg 图标
   */
  get icon() {
    return this.raw.icon;
  }

  /**
   * 菜单类型
   */
  get type(): MenuType {
    return this.raw.isMenu ? MenuType.Menu : MenuType.Button;
  }

  /**
   * 层级，从 0 开始，即一级菜单为 0
   */
  get level() {
    return this.raw.level;
  }

  /**
   * 排序序号，默认1000， 越小排在越前
   *
   * 一般后端返回的就已经是排序后的
   */
  get order() {
    return this.raw.seq ?? 1000;
  }

  /**
   * 用于导航的 url
   */
  readonly url?: string;

  /**
   * 用于路径匹配的 key， 即规范化后的路径
   */
  readonly matchKey?: string;

  /**
   * 下级节点
   */
  children: TreeNode[] = [];

  /**
   * 激活状态
   */
  @computed
  get active() {
    return !!this.burning;
  }

  /**
   * 是否为叶子节点
   */
  get isLeaf() {
    return this.children.length === 0;
  }

  /**
   * 折叠状态, 默认折叠
   */
  @observable.ref
  collapsed?: boolean = true;

  @observable.ref
  private burning: number = 0;

  /**
   * @param node 原始数据
   * @param parent 父节点
   */
  constructor(node: TreeNodeRaw, container: TreeContainer, parent?: TreeNode) {
    this.container = container;
    this.parent = parent;
    this.raw = node;

    /**
     * 规范化 url
     */
    if (noEmptyString(node.url)) {
      const root = this.findMenuRoot();
      const { url, matchable } = normalizeUrl(node.url, root?.url);
      this.url = url;
      this.matchKey = matchable;
    }

    makeObservable(this);
  }

  /**
   * 折叠
   */
  collapse = () => {
    // 只折叠当前节点，记录下级节点的展开状态
    this.collapsed = true;
  };

  /**
   * 展开
   */
  expand = () => {
    this.collapsed = false;

    // 上级也需要展开
    this.parent?.expand();
  };

  /**
   * 打开
   */
  open = () => {
    // TODO: 实现
  };

  /**
   * 点燃，激活
   *
   * 这个方法由 TreeContainer 调用
   */
  _lightUp = () => {
    this.burning++;

    // 自动展开
    this.collapsed = false;

    // 注册
    this.container._registerBurning(this);

    // 向上冒泡
    this.parent?._lightUp();
  };

  /**
   * 熄灭
   *
   * 这个方法由 TreeContainer 调用
   */
  _extinguish() {
    this.burning--;
  }

  /**
   * 查找菜单(包含 url)根节点
   */
  private findMenuRoot() {
    // 本身就是根节点
    if (this.root === this) {
      return undefined;
    }

    // 上溯找到第一个节点
    let lastMenuRoot: TreeNode | undefined;
    let current: TreeNode | undefined = this.parent;

    while (current) {
      if (current.url != null) {
        lastMenuRoot = current;
      }

      current = current.parent;
    }

    return lastMenuRoot;
  }
}
