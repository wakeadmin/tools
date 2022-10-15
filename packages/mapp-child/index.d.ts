import { MicroApp, IBayBase } from '@wakeadmin/mapp-shared';
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

export function createMicroApp<Props = {}>(options: CreateMicroAppOptions<Props>): void;
