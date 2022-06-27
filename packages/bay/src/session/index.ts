/**
 * 应用信息
 */
export interface AppInfo {
  /**
   * 应用名称
   */
  appName: string;

  /**
   * 应用id
   */
  id: number;

  /**
   * 应用描述信息
   */
  appDescribeInfo?: string;

  /**
   * 应用图片。
   */
  appImage?: string;

  /**
   * 所属企业
   */
  tenantId: number;

  nodeId: number;
  parentNodeId: number;
}

/**
 * 角色
 */
export interface RoleInfo {
  id: string;

  /**
   * 角色标识符
   */
  identifier: string;

  /**
   * 角色名称
   */
  name: string;

  /**
   * 未知，待补充
   */
  type: number;
  level: number;
}

/**
 * 行业信息
 */
export interface IndustryInfo {
  industryCategoryId: number;

  /**
   * 行业名称
   */
  industryCategoryName: string;

  /**
   * 行业描述
   */
  industryCategoryDesc: string;

  /**
   * 行业标识符
   */
  keyFlag: string;
}

export interface UserInfo {
  /**
   * 用户 id
   */
  userId: string;

  /**
   * 用户名
   */
  userName: string;

  /**
   * 手机号码
   */
  userPhone: string;

  /**
   * 员工 id
   */
  employeeId: number;

  /**
   * 是否为企业管理员
   */
  tenantAdmin: boolean;

  /**
   * 当前会话下的角色
   */
  currentRole: RoleInfo;

  /**
   * 当前用户附属的所有角色
   */
  roles: RoleInfo[];

  // buId: 2646;
  // buName: '商超5';
  // domainId: 903;
}

/**
 * 会话信息
 */
export interface SessionInfo {
  userInfo: UserInfo;
  industryInfo: IndustryInfo;

  appInfo: AppInfo;
}
