import * as services from './expose/services';
import { getBayBaseUrl, isMicroApp, getMicroApp, getActiveRule, createMicroApp } from '@wakeadmin/mapp-child';

declare const exposes: typeof services & {
  getBayBaseUrl: typeof getBayBaseUrl;
  isMicroApp: typeof isMicroApp;
  getMicroApp: typeof getMicroApp;
  getActiveRule: typeof getActiveRule;
  createMicroApp: typeof createMicroApp;
};

export default exposes;
