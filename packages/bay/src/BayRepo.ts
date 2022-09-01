// TODO: bay 后续不会关心具体的业务接口，这里的内容后续会移除，由外部配置
import { injectable, singleton } from '@wakeadmin/framework';
import { BaseRepoImplement } from '@/base';

import { TreeNodeRaw } from './tree';
import { RoleInfo, SessionInfo, AppInfo, IndustryInfo } from './session';

declare global {
  interface DIMapper {
    'DI.bay.BayRepo': BayRepo;
  }
}

interface SessionData {
  userId: string;
  userName: string;
  userPhone: string;
  employeeId: number;
  domainId: number;
  buId: number;
  buName: string;
  tenantAdmin: boolean;
  roleList: RoleInfo[];
  selectRole: RoleInfo;
  selectApp: AppInfo & IndustryInfo;
}

const MOCK_ENABLED = '[%= typeof mockEnabled !== "undefined" ? mockEnabled : "" %]' as string;

/**
 * 菜单获取接口
 */
@injectable()
@singleton()
export class BayRepo extends BaseRepoImplement {
  /**
   * 获取所有菜单
   * @returns
   */
  async getMenus() {
    console.warn(MOCK_ENABLED);
    if (MOCK_ENABLED === 'true') {
      return (await import('./tree/__fixture__/menu')).default;
    }

    return this.requestor
      .requestByPost<TreeNodeRaw[]>(
        '/permission/web/wd/menu/show/menu',
        {
          // 根节点为 0
          menuIdList: [0],
          allChildren: true,
        },
        {
          headers: { 'content-Type': 'application/x-www-form-urlencoded' },
        }
      )
      .then(menu => {
        const sortMenu: (list: TreeNodeRaw[]) => TreeNodeRaw[] = list => {
          return list
            .sort((a, b) => a.seq! - b.seq!)
            .map(item => {
              if (item.childMenu) {
                item.childMenu = sortMenu(item.childMenu);
              }
              return item;
            });
        };
        return sortMenu(menu);
      });
  }

  /**
   * 获取会话信息
   * @returns
   */
  async getSessionInfo(): Promise<SessionInfo> {
    const { selectApp, selectRole, roleList, ...other } =
      MOCK_ENABLED === 'true'
        ? (await import('./session/__fixtures__/session')).default
        : await this.requestor.requestByGet<SessionData>('/wd/employee/web/login/query');

    return {
      appInfo: selectApp,
      industryInfo: selectApp,
      userInfo: {
        ...other,
        roles: roleList,
        currentRole: selectRole,
      },
    };
  }

  /**
   * 退出登录
   */
  async logout(): Promise<void> {
    try {
      await this.requestor.requestByGet('/permission/web/wd/login/logout');
    } catch (err) {
      // 忽略错误，无所谓
      console.error(`[bay] 退出登录失败:`, err);
    }
  }
}
