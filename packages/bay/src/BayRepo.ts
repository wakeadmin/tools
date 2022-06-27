import { injectable, singleton } from '@wakeadmin/framework';
import { BaseRepoImplement } from '@/base';

// import { TreeNodeRaw } from './tree';
import menus from './tree/__fixture__/menu';
import { RoleInfo, SessionInfo, AppInfo, IndustryInfo } from './session';
import mockSessionData from './session/__fixtures__/session';

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
  getMenus() {
    return menus;
    // return this.requestor.requestByPost<TreeNodeRaw[]>(
    //   '/permission/web/wd/menu/show/menu',
    //   {
    //     // 根节点为 0
    //     menuIdList: [0],
    //     allChildren: true,
    //   },
    //   {
    //     headers: { 'content-Type': 'application/x-www-form-urlencoded' },
    //   }
    // );
  }

  async getSessionInfo(): Promise<SessionInfo> {
    const { selectApp, selectRole, roleList, ...other } = mockSessionData as SessionData;

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
}
