import { createApp, App as TApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Bay from '@wakeadmin/bay';

import App from './App.vue';
import { routes } from './router';
import store from './store';

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

    app = createApp(App).use(store).use(router).use(Bay);

    app.mount(container?.querySelector('#app') ?? '#app');
    // @ts-expect-error
    window.top.__vue3_app__ = app;
  },

  async unmount() {
    console.log('unmount vue3');

    app.unmount();
  },

  async update() {
    console.log('update vue3');
  },
});
