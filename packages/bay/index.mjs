import { getBayBaseUrl, isMicroApp, getMicroApp, getActiveRule, createMicroApp } from '@wakeadmin/mapp/child';

if (window.__MAPP_SERVICES__ == null) {
  throw new Error(`import '@wakeadmin/bay' 只有作为 bay 子应用时才能访问该模块`);
}

const expose = Object.create(window.__MAPP_SERVICES__);

Object.assign(expose, {
  getBayBaseUrl,
  isMicroApp,
  getMicroApp,
  getActiveRule,
  createMicroApp,
});

export default expose;
