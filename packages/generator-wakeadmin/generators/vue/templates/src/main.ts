<% if (type === 'vue2') { %>
import Vue from 'vue';
import Bay from '@wakeadmin/bay';

import App from './App.vue';
import router from './router';
import i18n from './i18n'
import './locales'

Vue.config.productionTip = false;

Vue.use(Bay);

let instance: Vue;

Bay.createMicroApp({
  async bootstrap() {
    console.log('bootstrap', process.env.BASE_URL);
  },

  async mount(container, props) {
    console.log('mount vue2', props);

    instance = new Vue({
      i18n: i18n.i18n,
      router,
      render: h => h(App),
    });

    instance.$mount(container?.querySelector('#app') || '#app');
  },

  async unmount(props: any) {
    console.log('unmount vue2', props);

    if (instance) {
      instance.$destroy();
    }
  },

  async update(props: any) {
    console.log('update vue2', props);
  },
});

<% } else { %>
import { createApp, App as TApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Bay from '@wakeadmin/bay';

import App from './App.vue';
import { routes } from './router';
import i18n from './i18n'
import './locales'

let app: TApp;

Bay.createMicroApp({
  async bootstrap() {
    console.log('bootstrap vue3');
  },
  async mount(container, props) {
    console.log('mount vue3', props);

    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    });

    app = createApp(App).use(router).use(Bay).use(i18n);

    app.mount(container?.querySelector('#app') ?? '#app');
  },

  async unmount() {
    console.log('unmount vue3');

    app.unmount();
  },

  async update() {
    console.log('update vue3');
  },
});

<% } %>
