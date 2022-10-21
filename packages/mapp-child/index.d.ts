import { MicroApp, IBayBase, CreateMicroAppOptions } from '@wakeadmin/mapp-shared';
import { EventEmitter } from '@wakeadmin/utils';

export const isMicroApp: boolean;
export const getBay: () => IBayBase | undefined;
export const getBayBaseUrl: () => string | undefined;
export const getMicroApp: () => MicroApp | undefined;
export const getActiveRule: () => string | string[] | undefined;
export const getEventBus: () => EventEmitter | undefined;
export const openError: IBayBase['openError'];
export const openApp: IBayBase['openApp'];
export const openUrl: IBayBase['openUrl'];
export const openMain: IBayBase['openMain'];

/**
 * 添加变量到真实的 window 对象上
 * 注意：只能在必要的场景使用，后果自负
 */
export function addGlobalVariable(name: string, value: any): void;

/**
 * 移除真实 window 对象上的变量
 *
 * 注意：只能在必要的场景使用，后果自负
 * @param name
 */
export function deleteGlobalVariable(name: string): void;

export function createMicroApp<Props = {}>(options: CreateMicroAppOptions<Props>): void;
