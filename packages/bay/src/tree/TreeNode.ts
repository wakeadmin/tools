import { computed, makeObservable, observable } from '@wakeadmin/framework';
import { TOP_LEVEL } from './constants';

import { MenuType, RouteType, TreeNodeRaw } from './types';
import { noEmptyString, normalizeRoute } from './utils';

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

  get isRoot(): boolean {
    return this.root === this;
  }

  /**
   * 根节点是否为分组
   * 如果为分组，那么其子节点是实际意义上的 ‘入口’
   */
  get isGroup() {
    return this.isRoot && this.type === MenuType.Menu && this.routeType === RouteType.None;
  }

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
  get identifierPath(): string {
    return this.parent ? `${this.parent.identifierPath}.${this.identifier}` : this.identifier;
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
   * 节点路由类型
   */
  readonly routeType: RouteType;

  private childNodes: TreeNode[] = [];
  // 索引，方便提高查找效率
  private childNodesByIdentifier: Map<string, TreeNode> = new Map();

  /**
   * 下级节点
   */
  get children() {
    return this.childNodes;
  }

  set children(children: TreeNode[]) {
    this.childNodes = children;
    this.childNodesByIdentifier = new Map(children.map(i => [i.identifier, i]));
  }

  /**
   * 激活状态
   */
  @computed
  get active() {
    return !!this.burning;
  }

  /**
   * 是否精确匹配
   */
  readonly exactMatched: boolean = false;

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
  constructor(node: TreeNodeRaw, parent?: TreeNode) {
    this.parent = parent;
    this.raw = node;

    // 获取规范化路由
    const { url, matchKey, routeType } = this.getRouteInfo();
    this.url = url;
    this.matchKey = matchKey;
    this.routeType = routeType;

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
   * 判断是否包含指定标识符的子节点
   * @param identifier
   */
  containsIdentifier(identifier: string) {
    return this.childNodesByIdentifier.has(identifier);
  }

  getChildByIdentifier(identifier: string) {
    return this.childNodesByIdentifier.get(identifier);
  }

  /**
   * 判断是否包含指定节点
   * @param node
   */
  contains(node: TreeNode): boolean {
    if (this.root !== node.root) {
      // 不是在同一棵树
      return false;
    }

    if (this.isRoot) {
      return true;
    }

    let current: TreeNode | undefined = node;
    while (current) {
      if (current === this) {
        return true;
      }

      current = current.parent;
    }

    return false;
  }

  /**
   * 点燃，激活
   *
   * 这个方法由 TreeContainer 调用
   * @param exact 是否为精确匹配
   */
  _lightUp = (exact?: boolean) => {
    this.burning++;

    // @ts-expect-error
    this.exactMatched = !!exact;

    // 自动展开
    this.collapsed = false;

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

    this.parent?._extinguish();
  }

  /**
   * 获取路由信息
   */
  private getRouteInfo() {
    const sourceUrl = this.raw.url;
    let url: string | undefined;
    let matchKey: string | undefined;
    let routeType: RouteType = RouteType.None;

    /**
     * 规范化 url
     */
    if (noEmptyString(sourceUrl)) {
      const root = this.findRootUrl();

      // 下级节点应该都能够找到 root, 除了二级节点可能为分组项
      if (root == null && this.level > 1) {
        console.warn(`[bay] 未找到根路径, 请检查菜单配置, 节点: `, this);
      }

      // TODO: 支持相对路径
      // 相对路径会基于父 url 拼接, 形成 sourceUrl 再进行规范化
      // 相对路径只能用于子路由, 即父节点的 routeType 不能 Main
      // @ 路径的相对路径也是基于 hash 进行计算的。
      // 上溯找出路径, 跳过空 url
      const result = normalizeRoute(sourceUrl, root?.url);
      url = result.url;
      matchKey = result.matchable;
      routeType = result.routeType;
    } else if (this.type === MenuType.Menu && this.level !== TOP_LEVEL) {
      // 顶层节点可以不指定，作为分组使用
      console.warn(`[bay] 菜单类型的节点应该指定 url, 节点: ${this.raw.name}(${this.identifierPath})`, this);
    }

    return {
      url,
      matchKey,
      routeType,
    };
  }

  /**
   * 查找菜单(包含 url)根节点
   */
  private findRootUrl() {
    // 本身就是根节点
    if (this.root === this) {
      return undefined;
    }

    // 上溯找到第一个节点
    let lastRootHasUrl: TreeNode | undefined;
    let current: TreeNode | undefined = this.parent;

    while (current) {
      if (current.url != null) {
        lastRootHasUrl = current;
      }

      current = current.parent;
    }

    return lastRootHasUrl;
  }
}
