import { createApp, App as TApp } from 'vue';
import App from './App.vue';
import Bay from '@wakeadmin/bay';

let app: TApp;

Bay.createMicroApp({
  async mount(container, props) {
    app = createApp(App);
    app.mount(container?.querySelector('#app') ?? '#app');
  },
  async unmount() {
    app.unmount();
  },
});
