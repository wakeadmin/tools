/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed, makeObservable, observable } from '@wakeadmin/framework';
import { NoopArray } from '@wakeadmin/utils';
import { WARNING_CODE_CHILD_CONFLICT, WARNING_CODE_ROOT_CONFLICT } from './constants';

import { TreeNode } from './TreeNode';
import { TreeNodeRaw, FindResult, RouteType, MenuType } from './types';
import { purifyUrl, splitIdentifierPath, trimPathSection, trimQueryAndHash, truncateIdentifierPath } from './utils';

const EMPTY_RESULT: FindResult = {
  result: undefined,
  exact: false,
};

/**
 * 容器，用于控制菜单的逻辑
 */
export class TreeContainer {
  /**
   * 过滤出菜单节点
   * @param node
   */
  static filterMenu(nodes: TreeNode[]): TreeNode[] {
    return nodes.filter(node => node.type === MenuType.Menu);
  }

  /**
   * 菜单树
   */
  @observable.shallow
  roots: TreeNode[] = [];

  /**
   * 当前激活的叶子节点，从子节点开始
   */
  @observable.ref
  activeNode?: TreeNode;

  /**
   * 所有菜单里面定义的页面入口
   */
  @observable
  entries: Set<string> = new Set<string>();

  /**
   * 当前激活菜单树
   */
  @computed
  get activeRoot(): TreeNode | undefined {
    return this.roots.find(i => i.active);
  }

  /**
   * 一级菜单
   */
  @computed
  get topMenus() {
    return TreeContainer.filterMenu(this.roots);
  }

  /**
   * 一级按钮
   */
  @computed
  get topButtons() {
    return this.roots.filter(i => i.type === MenuType.Button);
  }

  /**
   * 侧边栏二级菜单
   */
  @computed
  get secondaryNodes(): TreeNode[] {
    const node = this.activeRoot;
    if (node == null) {
      return NoopArray;
    }

    // 第一级为菜单
    if (node.url != null) {
      return node.children;
    }

    // 第一级为分组
    const activeRoot = node.children.find(i => i.active);
    if (activeRoot) {
      return activeRoot.children;
    }

    return NoopArray;
  }

  @computed
  get secondaryMenus() {
    return TreeContainer.filterMenu(this.secondaryNodes);
  }

  /**
   * 四级菜单
   */
  @computed
  get tabMenus(): TreeNode[] {
    const sidebarMenus = this.secondaryMenus;
    // 从二级菜单开始，向下找出两级
    let level = 2;

    let children: TreeNode[] | undefined = sidebarMenus;

    while (level > 0 && children?.length) {
      children = children.find(i => i.active)?.children;

      level--;
    }

    if (level === 0 && children?.length) {
      return children;
    }

    return NoopArray;
  }

  /**
   * 当前激活的二级叶子节点，用于配合 ElMenu 实现激活和打开
   */
  @computed
  get activeSecondaryNode(): TreeNode | undefined {
    const activeNode = this.activeNode;
    if (!activeNode) {
      return undefined;
    }

    // 如果根节点为分组，那么叶子节点就是 4 级
    const path = truncateIdentifierPath(activeNode.identifierPath, activeNode.root.isGroup ? 4 : 3);

    return this.findByPullIdentifierPath(path).result;
  }

  /**
   * 根据权限标识符索引
   */
  private indexByIdentifier: Map<string, TreeNode[]> = new Map();

  /**
   * 根据匹配键索引
   * 同一个 matchKey 下，一棵树只能一个节点
   */
  private indexByMatchKey: Map<string, TreeNode[]> = new Map();

  /**
   * 根据完整的权限标识符路径索引，用于快速查找
   * 全限定权限标识符肯定是唯一的
   */
  private indexByIdentifierPath: Map<string, TreeNode> = new Map();

  private findByIdentifierPathCache: Map<string, FindResult> = new Map();
  private findByMatchKeyCache: Map<string, FindResult> = new Map();

  constructor(roots: TreeNodeRaw[]) {
    this.roots = roots.map(i => {
      return this.createNode(i);
    });

    makeObservable(this);
  }

  /**
   * 根据全限定权限标识符查找
   * @param path
   */
  findByPullIdentifierPath(path: string): FindResult {
    return {
      result: this.indexByIdentifierPath.get(path),
      exact: true,
    };
  }

  /**
   * 路由匹配
   * @param route 当前路由
   */
  findByRoute(route: string): FindResult {
    const normalized = purifyUrl(route);

    if (this.findByMatchKeyCache.has(normalized)) {
      return this.findByMatchKeyCache.get(normalized)!;
    }

    // 开始匹配
    let matchedNode: TreeNode | undefined;
    let matchedKey: string | null = normalized;

    // 是否精确匹配
    let exactMatched = true;

    while (matchedKey) {
      const matcheds = this.indexByMatchKey.get(matchedKey);

      if (matcheds?.length) {
        if (matcheds.length === 1) {
          matchedNode = matcheds[0];
          break;
        } else {
          // 存在冲突
          console.warn(`[bay] 路由匹配存在冲突: ${route}, 将就近匹配`, matcheds);

          // 优先从当前激活树中获取
          if (this.activeNode != null && (matchedNode = matcheds.find(i => i.root === this.activeNode?.root))) {
            break;
          }

          // 选择第一个节点
          matchedNode = matcheds[0];
          break;
        }
      }

      // 逐级裁剪路径
      matchedKey = trimPathSection(matchedKey);
      exactMatched = false;
    }

    // 点亮激活
    if (!matchedNode) {
      console.warn(`[bay] 路由匹配失败: ${route}, 未找到匹配该节点的菜单节点`);
    }

    const result: FindResult = {
      result: matchedNode,
      exact: exactMatched,
    };

    this.findByMatchKeyCache.set(normalized, result);

    return result;
  }

  /**
   * 基于当前激活的上下文，来检查是否有指定权限
   *
   * 即按照当前激活的节点路径，向上查找是否包含指定标识符的下级节点
   */
  findByIdentifierUnderActiveContext(identifier: string): FindResult {
    if (identifier.includes('.')) {
      console.warn(
        `[bay] 基于上下文查找节点时，不推荐使用'权限标识符路径'，这会使用查找效率更低的'路径查找方法': ${identifier}`
      );

      return this.findByIdentifierPath(identifier);
    }

    const activeNode = this.activeNode;

    if (activeNode == null) {
      console.warn(`[bay] 基于上下文查找节点失败，当前没有激活的上下文: ${identifier}`);
      return EMPTY_RESULT;
    }

    let current: TreeNode | undefined = activeNode;
    // 如果在当前节点找到就是精确匹配
    let exactMatched = true;
    let matched: TreeNode | undefined;

    // 从激活节点开始，上溯查找包含指定标识符的节点
    while (current) {
      // 当前节点就是
      if (current.identifier === identifier) {
        matched = current;
        break;
      }

      if ((matched = current.getChildByIdentifier(identifier))) {
        break;
      }

      current = current.parent;
      exactMatched = false;
    }

    return { result: matched, exact: exactMatched };
  }

  /**
   * 根据全限定标识符来查找节点，支持宽松模式，即不要求完全匹配
   *
   * 在冲突较多的情况下，性能会比较差
   */
  findByIdentifierPath(path: string): FindResult {
    if (this.indexByIdentifierPath.has(path)) {
      return this.findByPullIdentifierPath(path);
    }

    if (this.findByIdentifierPathCache.has(path)) {
      return this.findByIdentifierPathCache.get(path)!;
    }

    const identifiers = splitIdentifierPath(path);
    if (!identifiers.length) {
      throw new Error(`[bay] 权限标识符路径不合法: ${path}`);
    }

    let exactMatched = true;
    const find = (list: string[], parentMatched?: TreeNode): TreeNode | undefined => {
      const root = list[0];

      // 匹配结束
      if (root == null) {
        return parentMatched;
      }

      const nodes = this.indexByIdentifier.get(root);
      const rest = list.slice(1);

      const conflictWarn = (code: number, results: TreeNode[]) => {
        // 一旦冲突就不是精确匹配了
        exactMatched = false;
        console.warn(
          `[bay: ${code}] 查找 ${path} 时， 存在多个节点匹配到同一个标识符: ${root}, 请检查菜单配置或程序，避免标识符冲突. 默认会采用第一个作为结果`,
          results
        );
      };

      // 未匹配到任何标识符, 匹配完全失败
      if (!nodes?.length) {
        return undefined;
      }

      if (!parentMatched) {
        // 根节点查找
        if (nodes.length === 1) {
          // 精确找到根节点
          parentMatched = nodes[0];
          return find(rest, parentMatched);
        } else {
          // 存在冲突, 每个节点都要尝试匹配一下
          const results: TreeNode[] = nodes.map(n => find(rest, n)).filter((n): n is TreeNode => !!n);

          if (results.length > 1) {
            conflictWarn(WARNING_CODE_ROOT_CONFLICT, results);
          }

          return results[0];
        }
      } else {
        // 基于 parentMatched 查找
        const nodesUnderParentMatched = nodes.filter(n => parentMatched!.contains(n));
        const results: TreeNode[] = nodesUnderParentMatched.map(n => find(rest, n)).filter((n): n is TreeNode => !!n);

        if (results.length > 1) {
          conflictWarn(WARNING_CODE_CHILD_CONFLICT, results);
        }

        return results[0];
      }
    };

    const matched = find(identifiers);
    const result: FindResult = {
      result: matched,
      exact: exactMatched,
    };

    this.findByIdentifierPathCache.set(path, result);

    return result;
  }

  /**
   * 激活
   * @param node 必须为叶子节点
   * @param exact 是否为精确匹配
   *
   */
  lightUp(node: TreeNode, exact: boolean = false) {
    const oldNode = this.activeNode;

    // 激活
    node._lightUp(exact);

    this.activeNode = node;

    // 取消旧的节点
    oldNode?._extinguish();
  }

  /**
   * 取消当前节点
   */
  extinguish() {
    if (this.activeNode == null) {
      return;
    }

    this.activeNode._extinguish();
    this.activeNode = undefined;
  }

  /**
   * 清除查找缓存
   */
  clearFindCache() {
    this.findByIdentifierPathCache.clear();
    this.findByMatchKeyCache.clear();
  }

  /**
   * 创建并索引节点信息
   * @param data
   */
  private createNode(data: TreeNodeRaw, parent?: TreeNode): TreeNode {
    const node = new TreeNode(data, parent);

    // 递归创建
    if (data.childMenu?.length) {
      node.children = data.childMenu.map(i => {
        return this.createNode(i, node);
      });
    }

    this.registerNode(node);

    return node;
  }

  /**
   * 收集节点信息并建立索引
   * @param node
   */
  private registerNode(node: TreeNode) {
    this.createIndexByIdentifier(node);
    this.createIndexByMatchedKey(node);
    this.createIndexByIdentifierPath(node);
    this.collectionEntry(node);
  }

  /**
   * 收集页面入口
   * @param node
   */
  private collectionEntry(node: TreeNode) {
    if (node.routeType === RouteType.Main || node.routeType === RouteType.Outside) {
      this.entries.add(trimQueryAndHash(node.url!));
    }
  }

  private createIndexByIdentifierPath(node: TreeNode) {
    const path = node.identifierPath;

    if (this.indexByIdentifierPath.has(path)) {
      console.warn(`[bay] 全限定标识符冲突，请检查菜单配置：${path}`, this.indexByIdentifierPath.get(path), node);
    }

    this.indexByIdentifierPath.set(path, node);
  }

  /**
   * 创建菜单匹配索引
   * @param node
   * @returns
   */
  private createIndexByMatchedKey(node: TreeNode) {
    if (node.matchKey == null) {
      return;
    }

    const rawList = this.indexByMatchKey.get(node.matchKey);
    const list = rawList ?? [];
    const key = node.matchKey;

    if (list.length) {
      // 可能存在冲突
      // 在同一颗树中
      const nodeIndexUnderSameRoot = list.findIndex(i => i.root === node.root);

      if (nodeIndexUnderSameRoot !== -1) {
        // 存在同一个树下的节点
        const nodeUnderSameRoot = list[nodeIndexUnderSameRoot];
        if (node.contains(nodeUnderSameRoot)) {
          // 不做处理，优先使用更深的节点
          return;
        } else if (nodeUnderSameRoot.contains(node)) {
          // 当前节点优先级更好，替换掉
          list[nodeIndexUnderSameRoot] = node;
        } else {
          // 没有交集的两个节点
          console.warn(
            `[bay] 同一棵树下，存在重复的路由: ${key}, 这可能导致路由匹配出现歧义，请检查菜单配置`,
            node,
            nodeUnderSameRoot
          );
          // 选择层级更深的节点
          list[nodeIndexUnderSameRoot] = node.level > nodeUnderSameRoot.level ? node : nodeUnderSameRoot;
        }
      } else {
        list.push(node);
        console.warn(`[bay] 存在重复的路由: ${key}, 这可能导致路由匹配出现歧义，请检查菜单配置`, list);
      }
    } else {
      list.push(node);
    }

    if (rawList !== list) {
      this.indexByMatchKey.set(key, list);
    }
  }

  /**
   * 创建标识符匹配索引
   * @param node
   */
  private createIndexByIdentifier(node: TreeNode) {
    const identifier = node.identifier;

    const value = this.indexByIdentifier.get(identifier);
    if (value != null) {
      value.push(node);
    } else {
      this.indexByIdentifier.set(identifier, [node]);
    }
  }
}
