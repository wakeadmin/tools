import { computed, makeObservable, observable } from '@wakeadmin/framework';

import { TreeNode } from './TreeNode';
import { TreeRoot } from './TreeRoot';
import { TreeNodeRaw } from './types';
import { purifyUrl, trimPathSection } from './utils';

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
   */
  private currentBurnings: TreeNode[] = [];

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

    while (!matchedNode && matchedKey) {
      for (const group of matchGroups) {
        matchedNode = group.findByMatchKey(matchedKey);
        if (matchedNode) {
          break;
        }
      }

      // 逐级裁剪路径
      matchedKey = trimPathSection(matchedKey);
    }

    // 点亮激活
    if (matchedNode) {
      this.lightUp(matchedNode);
    } else {
      console.warn(`[bay] 路由匹配失败: ${route}, 未找到匹配该节点的菜单节点`);
    }

    return matchedNode;
  }

  /**
   * 此方法由 TreeNode 内部调用
   */
  _registerBurning(node: TreeNode) {
    this.currentBurnings.push(node);
  }

  /**
   * 激活
   * @param node 必须为叶子节点
   */
  private lightUp(node: TreeNode) {
    const waitExtinguish = this.currentBurnings;
    this.currentBurnings = [];

    // 激活
    node._lightUp();

    // 取消旧的节点
    for (const i of waitExtinguish) {
      i._extinguish();
    }
  }
}
