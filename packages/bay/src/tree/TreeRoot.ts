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

  constructor(root: TreeNodeRaw, container: TreeContainer) {
    this.container = container;
    this.root = this.createNode(root);

    makeObservable(this);
  }

  /**
   * 创建并索引节点信息
   * @param data
   */
  createNode(data: TreeNodeRaw, parent?: TreeNode): TreeNode {
    const node = new TreeNode(data, parent);

    // 递归创建
    if (data.childMenu?.length) {
      node.children = data.childMenu.map(i => {
        return this.createNode(i, node);
      });
    }

    this.container._registerNode(node);

    return node;
  }
}
