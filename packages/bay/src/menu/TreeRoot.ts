import { computed, makeObservable } from '@wakeadmin/framework';

import { TreeContainer } from './TreeContainer';
import { TreeNodeRaw } from './types';
import { TreeNode } from './TreeNode';

/**
 * 维护树的状态
 */
export class TreeRoot {
  readonly root: TreeNode;

  readonly container: TreeContainer;

  /**
   * 当前树是否激活
   */
  @computed
  get active() {
    return this.root.active;
  }

  /**
   * 根据规范化后的路径匹配索引
   */
  private indexByMatchKey: Map<string, TreeNode> = new Map();

  constructor(root: TreeNodeRaw, container: TreeContainer) {
    this.container = container;
    this.root = this.createNode(root);

    makeObservable(this);
  }

  /**
   * 这里假设这个 key 是规范化之后的
   * @param key
   */
  findByMatchKey(key: string) {
    return this.indexByMatchKey.get(key);
  }

  /**
   * 创建并索引节点信息
   * @param data
   */
  createNode(data: TreeNodeRaw, parent?: TreeNode): TreeNode {
    const node = new TreeNode(data, this.container, parent);

    // 递归创建
    if (data.childMenu?.length) {
      node.children = data.childMenu.map(i => {
        return this.createNode(i, node);
      });
    }

    // 记录索引信息
    if (node.matchKey) {
      if (this.indexByMatchKey.has(node.matchKey)) {
        console.warn(`[bay] 存在重复的路由: ${node.matchKey}, 请检查菜单配置`);
      } else {
        this.indexByMatchKey.set(node.matchKey, node);
      }
    }

    return node;
  }
}
