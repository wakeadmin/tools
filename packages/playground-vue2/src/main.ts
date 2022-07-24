import Vue from 'vue';
import Bay from '@wakeadmin/bay';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(Bay);

let instance: Vue;

console.log(process.env.HELLO);

Bay.createMicroApp({
  async bootstrap() {
    console.log('bootstrap', process.env.BASE_URL);
  },

  async mount(container, props) {
    console.log('mount vue2', props);

    instance = new Vue({
      // @ts-expect-error
      router,
      store,
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
