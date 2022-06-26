import { injectable, singleton } from '@wakeadmin/framework';
import { BaseRepoImplement } from '@/base';

import { TreeNodeRaw } from './types';

declare global {
  interface DIMapper {
    'DI.bay.MenuRepo': MenuRepo;
  }
}

/**
 * 菜单获取接口
 */
@injectable()
@singleton()
export class MenuRepo extends BaseRepoImplement {
  /**
   * 获取所有菜单
   * @returns
   */
  getMenus() {
    return this.requestor.requestByPost<TreeNodeRaw[]>(
      '/permission/web/wd/menu/show/menu',
      {
        // 根节点为 0
        menuIdList: [0],
        allChildren: true,
      },
      {
        headers: { 'content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  }
}
