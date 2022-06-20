import { createApp } from 'vue';
import { registerMicroApps, RegistrableApp, start } from 'qiankun';
import { createRouter, createWebHistory } from 'vue-router';
import path from 'path';
import Framework from '@wakeadmin/framework';

import { getConfig } from './config';
import App from './Root.vue';
import Home from './Home.vue';
import './di-test';

const app = createApp(App);
const base = process.env.MAPP_BASE_URL;

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/:all*',
      component: Home,
    },
  ],
});

app.use(router);
app.use(Framework);

let microApps = getConfig();

// 添加 baseURL 到 activeRules
const addBaseUrlToApps = (baseUrl: string = '/', apps: RegistrableApp<any>[] = []) => {
  const addHeadingSlash = (str: string) => {
    return str.startsWith('/') ? str : '/' + str;
  };

  const removeEndingSlash = (str: string) => {
    return str.endsWith('/') ? str.slice(0, -1) : str;
  };

  const tryAddBase = (target: string) => {
    if (target.startsWith(baseUrl)) {
      return target;
    }

    return removeEndingSlash(baseUrl) + addHeadingSlash(target);
  };

  const tryAddBaseToEntry = (entry: string) => {
    if (entry.startsWith('http') || entry.startsWith('//') || entry.startsWith('/')) {
      return entry;
    }

    return path.join(baseUrl, entry);
  };

  return apps.map(i => {
    return {
      ...i,
      activeRule: typeof i.activeRule === 'string' ? tryAddBase(i.activeRule) : i.activeRule,
      entry: typeof i.entry === 'string' ? tryAddBaseToEntry(i.entry) : i.entry,
    };
  });
};

microApps = addBaseUrlToApps(base, microApps);

console.log('正在注册微应用', microApps);

registerMicroApps(microApps);

app.mount('#base');

// @ts-expect-error
window.__base__app__ = app;

start();
