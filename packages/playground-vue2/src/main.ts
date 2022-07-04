import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^wkc-/];

let instance: Vue;

export async function bootstrap() {
  console.log('bootstrap', process.env.BASE_URL);
}

export async function mount(props?: { container?: HTMLElement }) {
  console.log('mount vue2', props);

  instance = new Vue({
    // @ts-expect-error
    router,
    store,
    render: h => h(App),
  });

  instance.$mount(props?.container?.querySelector('#app') || '#app');
}

export async function unmount(props: any) {
  console.log('unmount vue2', props);

  if (instance) {
    instance.$destroy();
  }
}

export function update(props: any) {
  console.log('update vue2', props);
}

if (typeof window.__POWERED_BY_QIANKUN__ === 'undefined') {
  bootstrap();

  mount();
}
