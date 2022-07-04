import * as services from './expose/services';
import { getBayBaseUrl, isMicroApp, getMicroApp, getActiveRule } from '@wakeadmin/mapp/child';

declare const exposes: typeof services & {
  getBayBaseUrl: typeof getBayBaseUrl;
  isMicroApp: typeof isMicroApp;
  getMicroApp: typeof getMicroApp;
  getActiveRule: typeof getActiveRule;
};

export default exposes;
