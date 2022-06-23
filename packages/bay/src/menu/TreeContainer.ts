import { computed, makeObservable, observable } from '@wakeadmin/framework';

import { TreeNode } from './TreeNode';
import { TreeRoot } from './TreeRoot';
import { TreeNodeRaw } from './types';
import { purifyUrl, splitIdentifierPath, trimPathSection } from './utils';

/**
 * 容器，用于控制菜单的逻辑
 */
export class TreeContainer {
  /**
   * 菜单树
   */
  @observable.shallow
  roots: TreeRoot[] = [];

  /**
   * 当前激活菜单树
   */
  @computed
  get activeRoot(): TreeRoot | undefined {
    return this.roots.find(i => i.active);
  }

  /**
   * 当前激活的节点路径，从子节点开始
   */
  get activeNodes() {
    return this.currentBurnings;
  }

  /**
   * 当前激活的节点
   * TODO: 是否需要响应式?
   */
  private currentBurnings: TreeNode[] = [];

  /**
   * 根据权限标识符索引
   */
  private indexByIdentifier: Map<string, TreeNode[]> = new Map();

  private findByPathCache: Map<string, TreeNode | undefined> = new Map();

  constructor(roots: TreeNodeRaw[]) {
    this.roots = roots.map(i => {
      return new TreeRoot(i, this);
    });

    makeObservable(this);
  }

  /**
   * 路由匹配
   */
  matchRoute(route: string) {
    const normalized = purifyUrl(route);

    // 待匹配的分组，已经激活的优先级最高
    const matchGroups: TreeRoot[] = this.roots.slice(0);
    const activeIdx = matchGroups.findIndex(i => i.active);
    if (activeIdx !== -1) {
      const removed = matchGroups.splice(activeIdx, 1);
      matchGroups.unshift(...removed);
    }

    // 开始匹配
    let matchedNode: TreeNode | undefined;
    let matchedKey: string | null = normalized;
    let exactMatched = true;

    while (!matchedNode && matchedKey) {
      for (const group of matchGroups) {
        matchedNode = group.findByMatchKey(matchedKey);
        if (matchedNode) {
          break;
        }
      }

      // 逐级裁剪路径
      matchedKey = trimPathSection(matchedKey);
      exactMatched = false;
    }

    // 点亮激活
    if (matchedNode) {
      this.lightUp(matchedNode, exactMatched);
    } else {
      console.warn(`[bay] 路由匹配失败: ${route}, 未找到匹配该节点的菜单节点`);
    }

    return matchedNode;
  }

  /**
   * 基于当前激活的上下文，来检查是否有指定权限
   *
   * 即按照当前激活的节点路径，向上查找是否包含指定标识符的下级节点
   */
  findUnderActiveContext(identifier: string) {
    if (identifier.includes('.')) {
      console.warn(
        `[bay] 基于上下文查找节点，不推荐使用'权限标识符路径'，这会使用查找效率更低的'路径查找方法': ${identifier}`
      );

      return this.findByPath(identifier);
    }

    const activeNode = this.activeNodes[0];

    if (activeNode == null) {
      console.warn('[bay] 基于上下文查找节点失败，当前没有激活的上下文');
      return undefined;
    }

    let current: TreeNode | undefined = activeNode;

    // 从激活节点开始，上溯查找包含指定标识符的节点
    while (current) {
      if (current.containsIdentifier(identifier)) {
        return current;
      }

      current = current.parent;
    }

    return undefined;
  }

  /**
   * 根据全限定标识符来查找节点，支持宽松模式，即不要求完全匹配
   *
   * 在冲突较多的情况下，性能会比较差
   * TODO: 需要节点树就绪后才能安全使用缓存
   */
  findByPath(path: string): TreeNode | undefined {
    if (this.findByPathCache.has(path)) {
      return this.findByPathCache.get(path);
    }

    const identifiers = splitIdentifierPath(path);
    if (!identifiers.length) {
      throw new Error(`[bay] 权限标识符路径不合法: ${path}`);
    }

    // 递归查找
    const find = (list: string[], parentMatched?: TreeNode): TreeNode | undefined => {
      const root = list[0];

      // 匹配结束
      if (root == null) {
        return parentMatched;
      }

      const nodes = this.indexByIdentifier.get(root);
      const rest = list.slice(1);
      const conflictWarn = (results: TreeNode[]) => {
        console.warn(
          `[bay] 查找 ${path} 时， 存在多个节点匹配到同一个标识符: ${root}, 请检查菜单配置或程序，避免标识符冲突. 默认会采用第一个作为结果`,
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
            conflictWarn(results);
          }

          return results[0];
        }
      } else {
        // 基于 parentMatched 查找
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nodesUnderParentMatched = nodes.filter(n => parentMatched!.contains(n));
        const results: TreeNode[] = nodesUnderParentMatched.map(n => find(rest, n)).filter((n): n is TreeNode => !!n);

        if (results.length > 1) {
          conflictWarn(results);
        }

        return results[0];
      }
    };

    const result = find(identifiers);
    this.findByPathCache.set(path, result);

    return result;
  }

  /**
   * 此方法由 TreeNode 内部调用。由于 Typescript 没有所谓的包权限控制，因此这里使用 _ 下划线开头
   */
  _registerBurning(node: TreeNode) {
    this.currentBurnings.push(node);
  }

  /**
   * 收集节点信息并建立索引
   * @param node
   */
  _registerNode(node: TreeNode) {
    const identifier = node.identifier;

    const value = this.indexByIdentifier.get(identifier);
    if (value != null) {
      value.push(node);
    } else {
      this.indexByIdentifier.set(identifier, [node]);
    }
  }

  /**
   * 激活
   * @param node 必须为叶子节点
   * @param exact 是否为精确匹配
   *
   */
  private lightUp(node: TreeNode, exact: boolean = false) {
    const waitExtinguish = this.currentBurnings;
    this.currentBurnings = [];

    // 激活
    node._lightUp(exact);

    // 取消旧的节点
    for (const i of waitExtinguish) {
      i._extinguish();
    }
  }
}
