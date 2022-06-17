import { createApp, App as TApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import { routes } from './router';
import store from './store';

export async function bootstrap() {
  console.log('bootstrap vue3');
}

let app: TApp;

export async function mount(props?: { container: HTMLElement }) {
  console.log('mount vue3', props);

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  app = createApp(App).use(store).use(router);

  app.mount(props?.container?.querySelector('#app') ?? '#app');
  // @ts-expect-error
  window.top.__vue3_app__ = app;
}

export async function unmount() {
  console.log('unmount vue3');

  app.unmount();
}

export function update() {
  console.log('update vue3');
}

if (typeof window.__POWERED_BY_QIANKUN__ === 'undefined') {
  bootstrap();

  mount();
}
