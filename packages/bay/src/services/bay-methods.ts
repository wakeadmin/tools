/**
 * 基座相关 API
 */
import { getInject } from '@wakeadmin/framework';
import { BayModel } from '@/BayModel';

type BayModelMethods = {
  [K in keyof BayModel as BayModel[K] extends (...args: any[]) => any ? K : never]: BayModel[K];
};

const bindApi = <
  K extends keyof BayModelMethods,
  Value extends (...args: any[]) => any = BayModelMethods[K],
  A = Parameters<Value>,
  R = ReturnType<Value>,
  FR = R extends Promise<any> ? R : Promise<R>
>(
  name: K
) => {
  return (async (...args: any) => {
    const bay = getInject('DI.bay.BayModel');

    await bay.waitSetup();

    return (bay[name] as any).apply(bay, args);
    // @ts-expect-error
  }) as any as (...args: A) => FR;
};

export const waitSetup = bindApi('waitSetup');
export const logout = bindApi('logout');
export const toggleSidebar = bindApi('toggleSidebar');

export const getSidebarCollapsed = bindApi('getSidebarCollapsed');
export const expandSidebar = bindApi('expandSidebar');
export const collapseSidebar = bindApi('collapseSidebar');
export const showMenu = bindApi('showMenu');
export const hideMenu = bindApi('hideMenu');
export const hideSidebar = bindApi('hideSidebar');
export const showSidebar = bindApi('showSidebar');
export const openByAppName = bindApi('openByAppName');
export const openByAppAlias = bindApi('openByAppAlias');
export const openMain = bindApi('openMain');
export const openByIdentifierPath = bindApi('openByIdentifierPath');
export const openTreeNode = bindApi('openTreeNode');
export const openOutside = bindApi('openOutside');
export const openError = bindApi('openError');
export const openUrl = bindApi('openUrl');
export const findMenuByIdentifierPath = bindApi('findMenuByIdentifierPath');

export const generateLandingUrl = bindApi('generateLandingUrl');
